"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Button from "./ui/Button";
import { FieldError, FieldLabel, Select, TextArea, TextInput } from "./ui/Field";
import {
  emptyContactForm,
  LIMITS,
  validateContact,
  type ContactErrors,
  type ContactFormValues,
} from "@/lib/validation";
import { serviceOptions, SMS_CONSENT_LABEL } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

/** Minimum gap between submissions, to block double-clicks and rapid retries. */
const SUBMIT_COOLDOWN_MS = 4000;

/** Hydration never changes after mount, so this store never emits. */
const subscribeNoop = () => () => {};

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  /** Whether the successfully submitted inquiry included SMS opt-in. */
  const [submittedWithSms, setSubmittedWithSms] = useState(false);

  const lastSubmitAt = useRef(0);
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  /* Until this is true the form has not hydrated and `handleSubmit` cannot run,
     so the submit button stays disabled — a submission in that window would
     otherwise fall through to the browser's native POST and leave the page.
     useSyncExternalStore gives `false` for the server render and `true` on the
     client without an effect, so there is no cascading re-render. */
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const update = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the visitor edits it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Guard against duplicate rapid submissions.
    if (inFlight.current) return;
    const now = Date.now();
    if (now - lastSubmitAt.current < SUBMIT_COOLDOWN_MS && status === "success") {
      return;
    }

    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      // Move focus to the first invalid control for keyboard/screen-reader users.
      const firstKey = Object.keys(nextErrors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
        ?.focus();
      return;
    }

    inFlight.current = true;
    lastSubmitAt.current = now;
    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          // Consent metadata is captured at the moment of submission.
          // The server records its own authoritative timestamp too.
          smsConsentTimestamp: values.smsConsent
            ? new Date().toISOString()
            : null,
        }),
      });

      const data: { ok?: boolean; errors?: ContactErrors; error?: string } =
        await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(
          data.error ??
            "Something went wrong while sending your message. Please try again.",
        );
        setStatus("error");
        return;
      }

      setSubmittedWithSms(values.smsConsent);
      setStatus("success");
      setValues(emptyContactForm);
      setErrors({});
    } catch {
      setServerError(
        "Your message could not be sent right now. Please try again, or email me directly.",
      );
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  /* ------------------------------------------------------------- SUCCESS */
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-neutral-200 bg-white p-8 shadow-soft sm:p-10"
      >
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-white">
            <path
              d="m5 10.5 3.5 3.5L15 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h3 className="mt-6 text-xl font-semibold tracking-tight text-black">
          Thanks for reaching out. Your message has been received.
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-black">
          I review every inquiry personally and will get back to you shortly.
        </p>

        {/* Only mentioned when the visitor actually opted in. */}
        {submittedWithSms ? (
          <p className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-[0.8125rem] leading-relaxed text-black">
            You opted in to receive SMS text messages about your inquiry. Message
            frequency may vary. Message and data rates may apply. Reply STOP to
            opt out or HELP for assistance.
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSubmittedWithSms(false);
          }}
          className="mt-7 text-[0.9375rem] font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* ---------------------------------------------------------------- FORM */
  const isSubmitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      method="post"
      action="/api/contact"
      noValidate
      className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft sm:p-8 lg:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <FieldLabel htmlFor="name" required>
            Full Name
          </FieldLabel>
          <TextInput
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            invalid={Boolean(errors.name)}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
            disabled={isSubmitting}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        {/* Email */}
        <div>
          <FieldLabel htmlFor="email" required>
            Email Address
          </FieldLabel>
          <TextInput
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            invalid={Boolean(errors.email)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@company.com"
            disabled={isSubmitting}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        {/* Business name */}
        <div>
          <FieldLabel htmlFor="business" optional>
            Business Name
          </FieldLabel>
          <TextInput
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.business}
            value={values.business}
            onChange={(e) => update("business", e.target.value)}
            placeholder="Your business"
            disabled={isSubmitting}
          />
        </div>

        {/* Website */}
        <div>
          <FieldLabel htmlFor="website" optional>
            Website
          </FieldLabel>
          <TextInput
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            maxLength={LIMITS.website}
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
            invalid={Boolean(errors.website)}
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? "website-error" : undefined}
            placeholder="yourbusiness.com"
            disabled={isSubmitting}
          />
          <FieldError id="website-error" message={errors.website} />
        </div>

        {/* Phone — required, so the number any SMS consent applies to is always
            on file and visibly tied to the opt-in below. */}
        <div>
          <FieldLabel htmlFor="phone" required>
            Phone Number
          </FieldLabel>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            invalid={Boolean(errors.phone)}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? "phone-error phone-hint" : "phone-hint"
            }
            placeholder="(555) 555-5555"
            disabled={isSubmitting}
          />
          <FieldError id="phone-error" message={errors.phone} />
          <p id="phone-hint" className="mt-2 text-[0.75rem] leading-relaxed text-black">
            {values.smsConsent
              ? "SMS messages will be sent to this number."
              : "Used to reach you about your inquiry. Providing it does not opt you in to text messages."}
          </p>
        </div>

        {/* Service */}
        <div>
          <FieldLabel htmlFor="service" optional>
            Service Interested In
          </FieldLabel>
          <Select
            id="service"
            name="service"
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="message" required>
            Message
          </FieldLabel>
          <TextArea
            id="message"
            name="message"
            rows={5}
            maxLength={LIMITS.message}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            invalid={Boolean(errors.message)}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="Tell me about your business and what you're trying to achieve."
            disabled={isSubmitting}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      {/* ------------------------------------------------------------------
          SMS CONSENT — deliberately separated from the rest of the form.
          Unchecked by default, never required, and applies ONLY to SMS.
          Submitting the form without ticking this box does not opt anyone in.
         ------------------------------------------------------------------ */}
      <fieldset className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
        <legend className="px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-black">
          Optional &mdash; SMS Consent
        </legend>

        <div className="flex items-start gap-3.5">
          <input
            id="smsConsent"
            name="smsConsent"
            type="checkbox"
            /* Never pre-selected. */
            checked={values.smsConsent}
            onChange={(e) => update("smsConsent", e.target.checked)}
            disabled={isSubmitting}
            aria-describedby="sms-legal"
            className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer rounded border-neutral-400 text-black accent-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          />
          <label
            htmlFor="smsConsent"
            className="cursor-pointer text-[0.8125rem] leading-relaxed text-black"
          >
            {SMS_CONSENT_LABEL}
          </label>
        </div>

        <p id="sms-legal" className="mt-4 border-t border-neutral-200 pt-4 text-[0.8125rem] text-black">
          View{" "}
          <Link
            href="/privacy"
            className="font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            className="font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            Terms
          </Link>
          .
        </p>
      </fieldset>

      {/* Server / network error */}
      {status === "error" && serverError ? (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-black bg-white p-4 text-[0.875rem] text-black"
        >
          {serverError}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || !hydrated}
          className="sm:min-w-[11rem]"
        >
          {isSubmitting ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4 motion-safe:animate-spin"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6.5"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="1.6"
                />
                <path
                  d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Sending&hellip;
            </>
          ) : (
            "Send Inquiry"
          )}
        </Button>

        <p className="text-[0.75rem] leading-relaxed text-black">
          Fields marked <span aria-hidden="true">*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
      </div>
    </form>
  );
}
