/** Join class names, skipping falsy values. Dependency-free; used by app components instead of the `cn` package. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Format integer minor units (e.g. cents) as a currency string. */
export function formatMoney(minorUnits: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(minorUnits / 100);
}

export function formatDate(iso: string, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(iso));
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
