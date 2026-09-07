# Dror Klar — Digital Marketing Specialist

Personal portfolio and inquiry website for **Dror Klar**, an independent digital
marketing specialist.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and
**Tailwind CSS v4**. No UI libraries, no animation libraries — every component
here is custom.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build    # production build
npm start        # serve the production build locally
npx eslint .     # lint
npx tsc --noEmit # typecheck
```

---

## Design system

| Token | Value | Used for |
| --- | --- | --- |
| Background | `#ffffff` | Every page surface |
| Text | `#000000` | Headings and primary copy |
| Neutrals | `#fafafa` → `#3f3f46` | Borders, muted copy, panel fills |
| Typeface | **Inter** | Applied globally via `next/font` |

**No gradients are used anywhere.** Buttons combine the two brand colors by
inverting them: black fill with white text (primary), white fill with a black
hairline border (secondary), and white-on-black inside the dark CTA band. The
one `radial-gradient` in `globals.css` draws the flat dot-grid texture behind
the portrait; it renders as solid dots with no color transition.

---

## Project structure

```
app/
  layout.tsx          Root layout: Inter, SEO metadata, JSON-LD, nav + footer
  page.tsx            Home page — composes the sections below
  privacy/page.tsx    /privacy
  terms/page.tsx      /terms
  not-found.tsx       404
  sitemap.ts          Generates /sitemap.xml
  robots.ts           Generates /robots.txt
  globals.css         Design tokens, reveal animation, focus styles
  api/contact/route.ts  Form endpoint (validation, rate limit, integrations)

components/
  Navbar.tsx  Hero.tsx  About.tsx  Services.tsx  Industries.tsx
  Process.tsx  CTA.tsx  Contact.tsx  ContactForm.tsx  Footer.tsx
  ServiceCard.tsx  LegalPage.tsx
  ui/  Button.tsx  Container.tsx  Field.tsx  Reveal.tsx  SectionHeading.tsx

lib/
  site.ts        All site copy, contact details, services, nav links
  validation.ts  Shared client + server validation and sanitization

public/
  My_pic.png     Hero portrait
```

---

## ✏️ Things to edit

### 1. Contact details (placeholders)

Everything lives in **`lib/site.ts`** — edit once, and the footer, contact
section, legal pages, and structured data all update:

```ts
email:     "hello@drorklar.com",   // ▸ replace
phone:     "+1 (000) 000-0000",    // ▸ replace
phoneHref: "+10000000000",         // ▸ replace (digits only)
```

### 2. Favicon

`app/favicon.ico` is a placeholder. Drop in your own `.ico` at the same path.

### 3. Open Graph image (optional)

Add `public/og.png` (1200×630), then reference it in `app/layout.tsx` under
`openGraph.images`.

---

## Connecting the contact form

Out of the box the form is **fully functional** — it validates, submits, and
logs the inquiry to the server console. To deliver inquiries somewhere real,
open **`app/api/contact/route.ts`** and fill in the marked blocks:

- `▸ CONNECT EMAIL DELIVERY HERE` — e.g. Resend, Postmark, SendGrid
- `▸ CONNECT CRM HERE` — e.g. HubSpot, GoHighLevel
- `▸ CONNECT DATABASE HERE` — e.g. Neon or Supabase via the Vercel Marketplace

Copy `.env.example` to `.env.local` and add the keys you need. **Never** prefix
a secret with `NEXT_PUBLIC_` — that ships it to the browser.

### Form behavior

- Required: **Full Name**, **Email Address**, **Message**
- Optional: Business Name, Website, **Phone Number**, Service
- Client-side validation with inline errors; focus jumps to the first invalid field
- Every field is re-validated and sanitized **server-side** — the client checks
  are convenience, not the security boundary
- Duplicate rapid submissions are blocked client-side, plus a 3-per-minute
  per-IP limit on the API route
- Loading, success, and error states are all handled

---

## SMS consent (important)

This site provides a genuine, explicit consumer opt-in pathway. The
implementation deliberately keeps SMS consent separate from the inquiry itself:

- The consent checkbox is **never pre-checked**
- It is **never required** to submit the form
- **Providing a phone number is not consent** — a number alone is stored with
  `smsConsent: false`
- Consent is only recorded when the client sends a literal boolean `true`
  (a truthy string like `"yes"` is rejected)
- When consent is given, the server records an auditable record:

  ```jsonc
  {
    "smsConsent": true,
    "smsConsentTimestamp": "…",        // server-generated, not client-supplied
    "smsConsentSource": "website-contact-form",
    "smsDisclosureVersion": "2026-01-sms-v1",
    "smsConsentIp": "…"
  }
  ```

- The success message only mentions SMS when the visitor actually opted in

If you change the consent wording in `lib/site.ts` (`SMS_CONSENT_LABEL`), bump
`smsDisclosureVersion` in the same file so stored consent records stay
auditable.

`/privacy` states that mobile phone information and SMS opt-in consent are not
sold or shared with third parties for their marketing purposes, while still
acknowledging ordinary operational service providers. `/terms` covers STOP,
HELP, frequency, rates, and that consent is not a condition of purchase.

---

## Deploying to Vercel

### Option A — Git (recommended)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Then at [vercel.com/new](https://vercel.com/new), import the repository.
Next.js is detected automatically — no build configuration needed.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### After the first deploy

1. **Add the domain** — Project → Settings → Domains → add `drorklar.com`
   (and `www.drorklar.com`), then point DNS as instructed.
2. **Set environment variables** — Project → Settings → Environment Variables.
   At minimum set `NEXT_PUBLIC_SITE_URL=https://drorklar.com` so canonical URLs
   and the sitemap are correct.
3. **Submit the sitemap** — `https://drorklar.com/sitemap.xml` in Google Search
   Console.

---

## Quality checks performed

- ✅ Production build passes; ESLint and TypeScript clean
- ✅ **0 WCAG 2.1 A/AA violations** (axe-core) on `/`, `/privacy`, `/terms`,
  including the contact form's error state
- ✅ No JavaScript errors in the console
- ✅ No horizontal overflow at 390px, 820px, or 1440px
- ✅ Semantic heading hierarchy: one `<h1>`, no skipped levels
- ✅ Site copy scanned for "we / our / us / team / agency" — none present
- ✅ No invented clients, testimonials, awards, metrics, or guarantees
