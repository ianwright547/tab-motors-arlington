/** Strips everything but digits, dropping a leading US country code. */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

export function isValidUsPhone(input: string): boolean {
  const digits = normalizePhone(input);
  // 10 digits, and an area code / exchange code that can't start with 0 or 1.
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits);
}

/** (703) 243-3080 */
export function formatPhone(input: string): string {
  const digits = normalizePhone(input);
  if (digits.length !== 10) return input;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function telHref(input: string): string {
  const digits = normalizePhone(input);
  return digits.length === 10 ? `tel:+1${digits}` : `tel:${digits}`;
}

export function smsHref(input: string): string {
  const digits = normalizePhone(input);
  return digits.length === 10 ? `sms:+1${digits}` : `sms:${digits}`;
}

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/New_York",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "America/New_York",
});

/** Always renders in Eastern time — the shop's clock, not the viewer's. */
export function formatDateTime(value: Date | string): string {
  return dateTimeFormatter.format(new Date(value));
}

export function formatDate(value: Date | string): string {
  return dateFormatter.format(new Date(value));
}

export function relativeTime(value: Date | string): string {
  const then = new Date(value).getTime();
  const minutes = Math.round((Date.now() - then) / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;

  return formatDate(value);
}

export function formatMileage(value: number | null): string | null {
  if (value === null) return null;
  return `${value.toLocaleString("en-US")} mi`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
