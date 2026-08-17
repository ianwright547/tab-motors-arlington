"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import {
  ADMIN_COOKIE,
  adminAuthConfigured,
  createSessionToken,
  isAdminAuthenticated,
  sessionCookieOptions,
  verifyPassword,
} from "./auth";
import { getDb } from "./db";
import { leads } from "./db/schema";
import { adminLeadUpdateSchema } from "./validation";
import {
  clientIpFromHeaders,
  hashIp,
  isLoginLocked,
  loginLockoutMinutes,
  recordLoginAttempt,
} from "./security";

export type LoginState = { error?: string };

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!adminAuthConfigured()) {
    return {
      error:
        "Login isn't set up yet. Set ADMIN_PASSWORD and SESSION_SECRET in .env.local, then restart.",
    };
  }

  const password = String(formData.get("password") ?? "");
  const ipHash = await hashIp(clientIpFromHeaders(await headers()));

  if (await isLoginLocked(ipHash)) {
    return {
      error: `Too many failed attempts. Try again in ${loginLockoutMinutes} minutes.`,
    };
  }

  if (!(await verifyPassword(password))) {
    await recordLoginAttempt(ipHash, false);
    // Deliberately vague: confirming which part was wrong helps an attacker
    // and helps nobody else.
    return { error: "That password isn't right." };
  }

  await recordLoginAttempt(ipHash, true);

  const store = await cookies();
  store.set(ADMIN_COOKIE, await createSessionToken(), sessionCookieOptions());

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export type UpdateLeadState = { error?: string; saved?: boolean };

export async function updateLeadAction(
  _previous: UpdateLeadState,
  formData: FormData,
): Promise<UpdateLeadState> {
  // Server actions are reachable by anyone who can guess the endpoint, so this
  // check is load-bearing — the layout's redirect only protects the page.
  if (!(await isAdminAuthenticated())) {
    return { error: "Your session expired. Please sign in again." };
  }

  const leadId = Number(formData.get("leadId"));
  if (!Number.isInteger(leadId) || leadId < 1) {
    return { error: "Couldn't work out which lead that was." };
  }

  const statusValue = formData.get("status");
  const notesValue = formData.get("notes");

  const parsed = adminLeadUpdateSchema.safeParse({
    status: typeof statusValue === "string" && statusValue ? statusValue : undefined,
    notes: typeof notesValue === "string" ? notesValue : undefined,
  });

  if (!parsed.success) {
    return { error: "Those values weren't valid." };
  }

  const updates: Record<string, unknown> = {};
  if (parsed.data.status) updates.status = parsed.data.status;
  if (parsed.data.notes !== undefined) updates.notes = parsed.data.notes || null;

  if (Object.keys(updates).length === 0) return { saved: true };

  try {
    const db = await getDb();
    await db.update(leads).set(updates).where(eq(leads.id, leadId));
  } catch (error) {
    console.error("Failed to update lead:", error);
    return { error: "Couldn't save that. Try again." };
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${leadId}`);
  return { saved: true };
}
