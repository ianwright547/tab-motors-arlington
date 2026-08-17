import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Admin authentication: one owner, one password, one signed cookie.
 *
 * A full user table would be more machinery than this shop needs. What it does
 * need is that the cookie can't be forged, the password comparison can't be
 * timed, and changing the password kicks out existing sessions.
 *
 * Uses Web Crypto (not node:crypto) so the same code runs in any Next.js
 * runtime without a second implementation.
 */

export const ADMIN_COOKIE = "tm_admin_session";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const encoder = new TextEncoder();

function requireEnv(name: "SESSION_SECRET" | "ADMIN_PASSWORD"): string | null {
  const value = process.env[name];
  return value && value.length > 0 ? value : null;
}

/** True when the app has enough configuration for anyone to log in at all. */
export function adminAuthConfigured(): boolean {
  return Boolean(requireEnv("SESSION_SECRET") && requireEnv("ADMIN_PASSWORD"));
}

async function hmacKey(): Promise<CryptoKey> {
  const secret = requireEnv("SESSION_SECRET");
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Returns a view over a plain ArrayBuffer, which is what Web Crypto requires. */
function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function sha256(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

/** Fixed-length comparison, so a wrong guess takes as long as a right one. */
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

/**
 * A short fingerprint of the current password, embedded in the session. If the
 * owner changes ADMIN_PASSWORD, every existing session stops verifying — which
 * is exactly what you want if the password leaked.
 */
async function passwordFingerprint(): Promise<string> {
  const password = requireEnv("ADMIN_PASSWORD");
  if (!password) throw new Error("ADMIN_PASSWORD is not set");
  return toBase64Url(await sha256(password)).slice(0, 12);
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  const expected = requireEnv("ADMIN_PASSWORD");
  // Fail closed. An unset password must never mean "everything is allowed".
  if (!expected) return false;

  const [candidateHash, expectedHash] = await Promise.all([
    sha256(candidate),
    sha256(expected),
  ]);
  return constantTimeEqual(candidateHash, expectedHash);
}

export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `v1.${expiresAt}.${await passwordFingerprint()}`;
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(), encoder.encode(payload));
  return `${payload}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token || !adminAuthConfigured()) return false;

  const parts = token.split(".");
  if (parts.length !== 4) return false;

  const [version, expiresAt, fingerprint, signature] = parts;
  if (version !== "v1") return false;

  const payload = `${version}.${expiresAt}.${fingerprint}`;

  let valid: boolean;
  try {
    valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(),
      fromBase64Url(signature),
      encoder.encode(payload),
    );
  } catch {
    // Malformed base64 in a hand-crafted cookie.
    return false;
  }
  if (!valid) return false;

  // Signature checks out — now make sure it isn't stale or from before a
  // password change.
  if (fingerprint !== (await passwordFingerprint())) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/** For server components: bounce to the login page unless signed in. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    // Lax still sends the cookie on normal top-level navigation, while
    // blocking it on cross-site POSTs.
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}
