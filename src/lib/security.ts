import { and, count, eq, gte } from "drizzle-orm";
import { getDb } from "./db";
import { authAttempts, leads } from "./db/schema";

/**
 * Spam and abuse defenses for the public quote form and the admin login.
 *
 * The form is layered on purpose, because each layer alone is weak:
 *   1. honeypot field       — stops naive form-filling bots
 *   2. submission timing    — stops anything that fills 4 steps in 2 seconds
 *   3. per-IP rate limit    — stops the same source flooding the leads table
 *   4. Cloudflare Turnstile — optional, and the only one a determined bot has
 *                             real trouble with
 *
 * Nothing here shows the customer a puzzle. A CAPTCHA on a quote form costs
 * real leads, and for a local repair shop the volume never justifies it.
 */

const encoder = new TextEncoder();

/** Best-effort client IP behind Vercel's proxy. */
export function clientIpFromHeaders(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip");
}

export function clientIp(request: Request): string | null {
  return clientIpFromHeaders(request.headers);
}

/**
 * Salted hash of the IP. We need to recognise repeat requests, but we don't
 * need to be able to read anyone's address back out of the database, so we
 * store a digest instead.
 */
export async function hashIp(ip: string | null): Promise<string | null> {
  if (!ip) return null;
  const salt = process.env.SESSION_SECRET ?? "tab-motors-arlington";
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(`${salt}:${ip}`));
  return Buffer.from(digest).toString("base64url").slice(0, 32);
}

// ---------------------------------------------------------------------------
// Quote form
// ---------------------------------------------------------------------------

/** Nobody legitimately completes a four-step form this fast. */
const MIN_ELAPSED_MS = 3000;

const MAX_LEADS_PER_HOUR = 5;
const MAX_LEADS_PER_DAY = 15;

export type SpamVerdict = { ok: true } | { ok: false; reason: string; status: number };

export function checkHoneypotAndTiming(input: {
  honeypot?: string;
  elapsedMs?: number;
}): SpamVerdict {
  if (input.honeypot && input.honeypot.length > 0) {
    return { ok: false, reason: "Submission rejected.", status: 400 };
  }

  if (typeof input.elapsedMs === "number" && input.elapsedMs < MIN_ELAPSED_MS) {
    return {
      ok: false,
      reason: "That submitted a little too fast. Please try again.",
      status: 400,
    };
  }

  return { ok: true };
}

export async function checkLeadRateLimit(ipHash: string | null): Promise<SpamVerdict> {
  // Without an IP there's nothing to key on; the other layers still apply.
  if (!ipHash) return { ok: true };

  const db = await getDb();
  const now = Date.now();
  const hourAgo = new Date(now - 60 * 60 * 1000);
  const dayAgo = new Date(now - 24 * 60 * 60 * 1000);

  const [{ value: lastHour } = { value: 0 }] = await db
    .select({ value: count() })
    .from(leads)
    .where(and(eq(leads.ipHash, ipHash), gte(leads.createdAt, hourAgo)));

  if (Number(lastHour) >= MAX_LEADS_PER_HOUR) {
    return {
      ok: false,
      reason: `You've already sent ${MAX_LEADS_PER_HOUR} requests recently. Please call us at the number above and we'll help right away.`,
      status: 429,
    };
  }

  const [{ value: lastDay } = { value: 0 }] = await db
    .select({ value: count() })
    .from(leads)
    .where(and(eq(leads.ipHash, ipHash), gte(leads.createdAt, dayAgo)));

  if (Number(lastDay) >= MAX_LEADS_PER_DAY) {
    return {
      ok: false,
      reason: "Too many requests from this connection today. Please give us a call instead.",
      status: 429,
    };
  }

  return { ok: true };
}

// ---------------------------------------------------------------------------
// Cloudflare Turnstile (optional — skipped entirely when unconfigured)
// ---------------------------------------------------------------------------

export function turnstileEnabled(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  );
}

export async function verifyTurnstile(
  token: string | undefined,
  ip: string | null,
): Promise<SpamVerdict> {
  if (!turnstileEnabled()) return { ok: true };

  if (!token) {
    return { ok: false, reason: "Please complete the verification check.", status: 400 };
  }

  const body = new FormData();
  body.append("secret", process.env.TURNSTILE_SECRET_KEY!);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const result = (await response.json()) as { success?: boolean };
    if (!result.success) {
      return {
        ok: false,
        reason: "Verification failed. Please reload the page and try again.",
        status: 400,
      };
    }
  } catch {
    // If Cloudflare is unreachable, don't punish the customer — the honeypot,
    // timing and rate-limit layers are still in force.
    console.warn("Turnstile verification could not be reached; allowing submission.");
  }

  return { ok: true };
}

// ---------------------------------------------------------------------------
// Admin login brute-force protection
// ---------------------------------------------------------------------------

const MAX_FAILED_LOGINS = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function isLoginLocked(ipHash: string | null): Promise<boolean> {
  if (!ipHash) return false;

  const db = await getDb();
  const since = new Date(Date.now() - LOGIN_WINDOW_MS);

  const [{ value: failures } = { value: 0 }] = await db
    .select({ value: count() })
    .from(authAttempts)
    .where(
      and(
        eq(authAttempts.ipHash, ipHash),
        eq(authAttempts.succeeded, false),
        gte(authAttempts.attemptedAt, since),
      ),
    );

  return Number(failures) >= MAX_FAILED_LOGINS;
}

export async function recordLoginAttempt(
  ipHash: string | null,
  succeeded: boolean,
): Promise<void> {
  if (!ipHash) return;
  const db = await getDb();
  await db.insert(authAttempts).values({ ipHash, succeeded });
}

export const loginLockoutMinutes = LOGIN_WINDOW_MS / 60000;
