/**
 * Central site configuration.
 *
 * These values are used by the footer, the contact section, the SMS/legal
 * pages and the JSON-LD structured data, so changing one here updates every
 * place it appears.
 */

const FALLBACK_URL = "https://www.drorklar.com";

/**
 * Resolves the public site URL from the environment.
 *
 * `??` alone is not enough: an env var that is present but empty (which is how
 * an unset value arrives on some hosts, Vercel included) is a string, so it
 * passes through and then throws `ERR_INVALID_URL` in `new URL()` at module
 * evaluation, failing the build. Anything blank, malformed, or missing a
 * protocol is normalised here instead.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_URL;

  // Accept a bare domain ("drorklar.com") as well as a full URL.
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    // Drop any trailing slash so `${site.url}/privacy` never doubles up.
    return new URL(candidate).origin;
  } catch {
    return FALLBACK_URL;
  }
}

export const site = {
  name: "Dror Klar",
  brand: "Dror Klar Digital Marketing",
  role: "Digital Marketing Specialist",
  // Always a valid absolute origin, with no trailing slash.
  url: resolveSiteUrl(),

  title: "Dror Klar | Digital Marketing Specialist",
  description:
    "Dror Klar is an independent digital marketing specialist helping businesses improve their online presence through websites, advertising, lead generation, and digital strategy.",

  // Primary business email. Inquiries and legal contact both use this.
  email: "hello@drorklar.com",
  phone: "(281) 249-9772",
  // Digits only (E.164), used for the tel: link.
  phoneHref: "+12812499772",

  // Version stamp recorded alongside SMS consent. Bump this string whenever the
  // consent language below is edited, so stored records stay auditable.
  smsDisclosureVersion: "2026-09-sms-v2",
} as const;

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "How I Work", href: "/#process" },
  { label: "Contact", href: "/#contact" },
] as const;

export const SMS_CONSENT_LABEL =
  "I agree to receive SMS messages from Dror Klar regarding my inquiry, updates, and customer support. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase.";

export const services = [
  {
    title: "Website Design & Development",
    description:
      "Modern, responsive websites and landing pages designed to communicate clearly and convert visitors into inquiries.",
    value: "Website Design",
  },
  {
    title: "Google Ads",
    description:
      "Search advertising campaigns focused on reaching potential customers when they are actively looking for relevant services.",
    value: "Google Ads",
  },
  {
    title: "Meta Advertising",
    description:
      "Facebook and Instagram advertising strategies designed to generate awareness, inquiries, and qualified leads.",
    value: "Meta Ads",
  },
  {
    title: "Lead Generation",
    description:
      "Digital lead-generation systems that help businesses create more opportunities from their online presence.",
    value: "Lead Generation",
  },
  {
    title: "Local Marketing",
    description:
      "Strategies designed to improve the online visibility of local service businesses and connect them with potential customers.",
    value: "Local Marketing",
  },
  {
    title: "Marketing Strategy",
    description:
      "Practical digital strategies based on the business, audience, goals, and available marketing channels.",
    value: "Marketing Strategy",
  },
] as const;

/** Options for the contact form's service dropdown. */
export const serviceOptions = [
  ...services.map((service) => service.value),
  "Other",
] as const;

export const industries = [
  "Local Service Businesses",
  "Contractors",
  "Home-Service Companies",
  "Professional Services",
  "Growing Small Businesses",
  "Independent Brands",
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "I learn about your business, target customers, current marketing, and goals.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "I identify the opportunities and develop a focused digital strategy.",
  },
  {
    number: "03",
    title: "Build & Launch",
    description:
      "I implement the agreed website, advertising, or marketing solution.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "I review performance and identify practical opportunities for improvement.",
  },
] as const;

export const values = [
  {
    title: "Direct Communication",
    description: "You work directly with me throughout the project.",
  },
  {
    title: "Tailored Strategy",
    description:
      "Every strategy is shaped around the needs and goals of the individual business.",
  },
  {
    title: "Results-Focused",
    description:
      "I focus on marketing activities that can contribute to measurable business outcomes.",
  },
] as const;
