import type { Address } from "@/types";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AddressErrors = Partial<Record<keyof Address, string>>;

export function validateEmail(email: string): string | undefined {
  const v = email.trim();
  if (!v) return "Enter your email address.";
  if (v.length > 254 || !EMAIL_RE.test(v)) return "Enter an email address like name@example.com.";
  return undefined;
}

const REQUIRED: { field: Exclude<keyof Address, "line2">; message: string }[] = [
  { field: "fullName", message: "Enter your full name." },
  { field: "line1", message: "Enter your street address." },
  { field: "city", message: "Enter your city." },
  { field: "region", message: "Enter your state or region." },
  { field: "postalCode", message: "Enter your postal code." },
  { field: "country", message: "Enter your country." },
];

export function validateAddress(a: Address): AddressErrors {
  const errors: AddressErrors = {};
  for (const { field, message } of REQUIRED) {
    const v = a[field].trim();
    if (!v) errors[field] = message;
    else if (v.length > 100) errors[field] = "Use 100 characters or fewer.";
  }
  if (!errors.postalCode && !/^[A-Za-z0-9][A-Za-z0-9 -]{1,10}[A-Za-z0-9]$/.test(a.postalCode.trim())) {
    errors.postalCode = "Enter a valid postal code, using letters, numbers, spaces or hyphens.";
  }
  if ((a.line2 ?? "").length > 100) errors.line2 = "Use 100 characters or fewer.";
  return errors;
}
