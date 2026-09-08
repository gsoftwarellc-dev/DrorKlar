import { NextResponse } from "next/server";
import {
  LIMITS,
  sanitize,
  sanitizeMultiline,
  validateContact,
  type ContactFormValues,
} from "@/lib/validation";
import { serviceOptions, site, SMS_CONSENT_LABEL } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * This route validates and normalises the submission, then hands it to the
 * delivery integrations below. Out of the box it only logs to the server
 * console so the form works end-to-end with no external services configured.
 *
 * ▸ SECURITY: never put API keys in client components or NEXT_PUBLIC_* vars.
 *   Read secrets from process.env inside this file only. Set them in
 *   Vercel → Project → Settings → Environment Variables.
 */

export const runtime = "nodejs";
/** Always execute per-request; nothing here should ever be cached. */
export const dynamic = "force-dynamic";

/**
 * Very small in-memory rate limit: blocks rapid repeat submissions from the
 * same IP. Serverless instances are ephemeral and not shared, so this is a
 * speed bump, not a guarantee.
 *
 * ▸ UPGRADE: for durable limits across instances, back this with Upstash Redis
 *   or Vercel's Runtime Cache.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        hits.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  // ---------------------------------------------------------------- parse
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request format." },
      { status: 400 },
    );
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json(
      { ok: false, error: "Invalid request format." },
      { status: 400 },
    );
  }

  const body = payload as Record<string, unknown>;

  // ----------------------------------------------------------- rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many submissions. Please wait a moment and try again.",
      },
      { status: 429 },
    );
  }

  // ------------------------------------------------------------- sanitize
  const values: ContactFormValues = {
    name: sanitize(body.name, LIMITS.name),
    email: sanitize(body.email, LIMITS.email).toLowerCase(),
    business: sanitize(body.business, LIMITS.business),
    website: sanitize(body.website, LIMITS.website),
    phone: sanitize(body.phone, LIMITS.phone),
    service: sanitize(body.service, LIMITS.service),
    message: sanitizeMultiline(body.message, LIMITS.message),
    // Consent is only ever true when the client sent a literal boolean true.
    smsConsent: body.smsConsent === true,
  };

  // Reject a service value that isn't one of the known options.
  if (
    values.service &&
    !serviceOptions.includes(values.service as (typeof serviceOptions)[number])
  ) {
    values.service = "";
  }

  // -------------------------------------------------------------- validate
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  /* ---------------------------------------------------------------------
     SMS CONSENT RECORD
     Only present when the visitor explicitly ticked the checkbox. The
     timestamp is generated on the server so it cannot be spoofed by a client.
     A phone number on its own is NOT consent — consent requires this flag.

     `smsConsentPhone` records the number the consent was given for, so an
     opt-in can always be tied to the exact number it authorises (10DLC
     audits ask for this). Validation guarantees it is non-empty whenever
     smsConsent is true.
     --------------------------------------------------------------------- */
  const smsConsentRecord = values.smsConsent
    ? {
        smsConsent: true as const,
        smsConsentPhone: values.phone,
        smsConsentTimestamp: new Date().toISOString(),
        smsConsentSource: "website-contact-form",
        smsDisclosureVersion: site.smsDisclosureVersion,
        smsConsentText: SMS_CONSENT_LABEL,
        smsConsentIp: ip,
      }
    : { smsConsent: false as const };

  const submission = {
    ...values,
    ...smsConsentRecord,
    receivedAt: new Date().toISOString(),
  };

  try {
    /* =================================================================
       ▸ CONNECT EMAIL DELIVERY HERE
       -----------------------------------------------------------------
       Example with Resend (npm i resend), key stored as RESEND_API_KEY:

         import { Resend } from "resend";
         const resend = new Resend(process.env.RESEND_API_KEY);
         await resend.emails.send({
           from: "Website Inquiry <inquiries@drorklar.com>",
           to: process.env.CONTACT_INBOX ?? "hello@drorklar.com",
           replyTo: submission.email,
           subject: `New inquiry from ${submission.name}`,
           text: JSON.stringify(submission, null, 2),
         });
       ================================================================= */

    /* =================================================================
       ▸ CONNECT CRM HERE
       -----------------------------------------------------------------
       Push the lead to a CRM (HubSpot, GoHighLevel, Pipedrive…). Map
       `submission.smsConsent`, `smsConsentTimestamp` and
       `smsDisclosureVersion` onto the contact record so the opt-in is
       auditable. Do NOT mark a contact SMS-subscribed when smsConsent
       is false.
       ================================================================= */

    /* =================================================================
       ▸ CONNECT DATABASE HERE
       -----------------------------------------------------------------
       Persist the submission (Neon, Supabase, Postgres via the Vercel
       Marketplace). Store the consent fields as their own columns so a
       consent record can be produced on request.
       ================================================================= */

    // Default behaviour with no integrations wired up yet.
    console.log("[contact] New inquiry received:", {
      ...submission,
      // Avoid writing full message bodies into logs in production.
      message: `${submission.message.slice(0, 80)}…`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[contact] Failed to process inquiry:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Your message could not be sent right now. Please try again, or email me directly.",
      },
      { status: 500 },
    );
  }
}

/** Only POST is supported. */
export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
