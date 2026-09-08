/**
 * Contact form validation + sanitization.
 *
 * Shared by the client form and the API route so that client-side checks are a
 * convenience, never the security boundary — the server re-validates every
 * submission independently.
 */

export type ContactFormValues = {
  name: string;
  email: string;
  business: string;
  website: string;
  phone: string;
  service: string;
  message: string;
  smsConsent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

export const emptyContactForm: ContactFormValues = {
  name: "",
  email: "",
  business: "",
  website: "",
  phone: "",
  service: "",
  message: "",
  smsConsent: false,
};

/** Field length ceilings — also enforced server-side to bound payload size. */
export const LIMITS = {
  name: 100,
  email: 254,
  business: 120,
  website: 200,
  phone: 25,
  service: 60,
  message: 4000,
} as const;

/**
 * Strips control characters and collapses whitespace. This neutralises header
 * injection attempts (CR/LF) before a value ever reaches an email transport.
 */
export function sanitize(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Preserves intentional line breaks in the message while removing other control chars. */
export function sanitizeMultiline(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

/**
 * Pragmatic email shape check: one @, a dot-bearing domain, no whitespace.
 * Deliberately not RFC-exhaustive — real verification is a delivery concern.
 */
const EMAIL_PATTERN = /^[^\s@,;:<>()[\]\\]+@[^\s@.,;:<>()[\]\\]+(\.[^\s@.,;:<>()[\]\\]+)+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value) && value.length <= LIMITS.email;
}

/**
 * Phone is optional for a plain inquiry, and REQUIRED when SMS consent is
 * given — the number collected here is the number the consent applies to.
 * When supplied it must look like a plausible phone number (7–15 digits, per
 * E.164's practical range).
 */
export function isValidPhone(value: string): boolean {
  if (!value) return true;
  if (!/^[\d\s+().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/** Website is optional; accepts bare domains as well as full URLs. */
export function isValidWebsite(value: string): boolean {
  if (!value) return true;
  if (/\s/.test(value)) return false;
  return /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(value);
}

/**
 * Validates a submission. Returns field-keyed messages; an empty object means
 * the submission is valid.
 *
 * Note: `smsConsent` is never required — a visitor can always submit the form
 * without opting in to SMS. The only coupling is the reverse: opting IN
 * requires a phone number, so consent always names the number it applies to.
 */
export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.website.trim() && !isValidWebsite(values.website.trim())) {
    errors.website = "Please enter a valid website address.";
  }

  /* Phone: optional on its own, but required once SMS consent is ticked, so a
     consent record can never exist without the number it applies to. Consent
     itself is still never required to submit the form. */
  const phone = values.phone.trim();
  if (values.smsConsent && !phone) {
    errors.phone =
      "Please add the mobile number you'd like SMS messages sent to, or untick SMS consent.";
  } else if (phone && !isValidPhone(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell me a little about your project.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a bit more detail (at least 10 characters).";
  }

  return errors;
}
