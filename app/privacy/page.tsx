import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Dror Klar collects, uses, and protects information submitted through drorklar.com, including phone numbers and optional SMS consent.",
  alternates: { canonical: `${site.url}/privacy` },
  openGraph: {
    title: `Privacy Policy | ${site.name}`,
    description:
      "How Dror Klar collects, uses, and protects information submitted through drorklar.com, including phone numbers and optional SMS consent.",
    url: `${site.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 17, 2026"
      intro={
        <p>
          This Privacy Policy explains how I, Dror Klar, an independent digital
          marketing specialist, handle information collected through{" "}
          {site.url.replace("https://", "")}.
        </p>
      }
    >
      <h2 id="information-i-collect">Information I Collect</h2>
      <p>
        I collect only the information you choose to provide, together with
        limited technical information that is generated automatically when you
        visit the website.
      </p>
      <ul>
        <li>
          <strong>Information you submit.</strong> When you complete the contact
          form, I receive your name, email address, and message, along with any
          optional details you choose to add such as your business name,
          website, phone number, and the service you are interested in.
        </li>
        <li>
          <strong>Information sent automatically.</strong> Like most websites,
          my hosting provider may process technical data such as IP address,
          browser type, device type, referring page, and timestamps as part of
          delivering and securing the site.
        </li>
      </ul>
      <p>
        I do not ask for sensitive personal information through this website,
        and I do not knowingly collect information from children.
      </p>

      <h2 id="how-i-use-information">How I Use Information</h2>
      <p>I use the information described above to:</p>
      <ul>
        <li>Respond to your inquiry and communicate with you about it.</li>
        <li>
          Provide, discuss, and deliver digital marketing services you have
          asked about.
        </li>
        <li>Prepare proposals, scopes of work, and related documentation.</li>
        <li>Operate, secure, and improve the website.</li>
        <li>Comply with applicable legal obligations.</li>
      </ul>
      <p>
        I do not sell your personal information, and I do not rent or trade it.
      </p>

      <h2 id="contact-form-information">Contact Form Information</h2>
      <p>
        Submitting the contact form does not subscribe you to any marketing
        list. It is a request for me to reply to your inquiry.
      </p>
      <p>
        Only your name, email address, and message are required. Every other
        field, including the phone number field, is optional and may be left
        blank without affecting your ability to send an inquiry.
      </p>

      <h2 id="phone-numbers-and-sms">Phone Numbers and SMS Communications</h2>
      <p>
        Providing a phone number in the contact form is optional, and doing so
        by itself does not opt you in to text messages.
      </p>
      <p>
        SMS consent is a separate, explicit choice. The SMS consent checkbox on
        the contact form is never pre-selected, is never required in order to
        submit an inquiry, and is not a condition of purchasing any service. I
        send SMS text messages only to people who have affirmatively checked
        that box or otherwise given me applicable consent directly.
      </p>
      <p>
        When you provide SMS consent, I record that you consented, the date and
        time of consent, and the version of the disclosure you agreed to, so
        that the consent can be verified later.
      </p>
      <p>
        <strong>
          Mobile phone information and SMS opt-in consent are not sold, rented,
          or shared with third parties for their own marketing or promotional
          purposes.
        </strong>{" "}
        This applies to all categories of third parties, including affiliates
        and lead buyers. Mobile information may be shared only with the service
        providers that help me deliver the messages you have consented to
        receive, such as a messaging or CRM provider acting on my behalf, and
        those providers are not permitted to use it for their own marketing.
      </p>
      <p>
        Message frequency may vary. Message and data rates may apply. You can
        opt out of SMS messages at any time by replying <strong>STOP</strong>,
        and you can reply <strong>HELP</strong> for assistance. Opting out of
        SMS does not prevent me from replying to your inquiry by email. Full SMS
        terms are set out in the{" "}
        <Link href="/terms">Terms</Link>.
      </p>

      <h2 id="cookies-and-analytics">Cookies / Basic Analytics</h2>
      <p>
        This website is designed to work without advertising cookies or
        cross-site tracking. Essential technical processes required to serve the
        site may use standard request logs.
      </p>
      <p>
        If I add a basic analytics tool in the future to understand aggregate
        traffic patterns, it will be used to measure overall website usage
        rather than to build profiles about individual visitors, and this policy
        will be updated to describe it.
      </p>

      <h2 id="service-providers">Service Providers</h2>
      <p>
        Running a website requires common infrastructure, so certain providers
        may process information on my behalf. These may include website hosting,
        domain and email delivery, form or CRM tools, and security services.
      </p>
      <p>
        These providers process information only to perform services for me,
        under my instructions. This operational processing is different from
        sharing information for someone else&rsquo;s marketing purposes, which I
        do not do. In particular, and as stated above, mobile phone information
        and SMS opt-in consent are never shared with third parties for their own
        marketing or promotional purposes.
      </p>
      <p>
        I may also disclose information where required by law, or where
        necessary to establish, exercise, or defend legal claims.
      </p>

      <h2 id="information-security">Information Security</h2>
      <p>
        I take reasonable measures to protect the information submitted through
        this website, including serving the site over an encrypted connection
        and limiting access to inquiry data.
      </p>
      <p>
        No method of transmission or storage over the internet is completely
        secure, so I cannot guarantee absolute security. Please do not send
        confidential or sensitive information through the contact form.
      </p>

      <h2 id="data-retention">Data Retention</h2>
      <p>
        I keep inquiry information for as long as needed to respond to you, to
        provide any services that follow, and to maintain ordinary business
        records.
      </p>
      <p>
        Records of SMS consent and opt-out requests are retained for as long as
        reasonably necessary to demonstrate compliance with applicable
        messaging rules, even after you opt out.
      </p>

      <h2 id="your-choices">Your Choices</h2>
      <ul>
        <li>
          <strong>Email.</strong> You can ask me to stop sending non-essential
          email at any time by replying to any message.
        </li>
        <li>
          <strong>SMS.</strong> Reply <strong>STOP</strong> to any text message
          to opt out, or <strong>HELP</strong> for assistance.
        </li>
        <li>
          <strong>Access, correction, and deletion.</strong> You can ask me to
          confirm what inquiry information I hold about you, correct it, or
          delete it. I will honor reasonable requests, subject to any records I
          am required to keep.
        </li>
        <li>
          <strong>Optional fields.</strong> You can simply leave optional fields
          such as your phone number blank.
        </li>
      </ul>
      <p>
        To make a request, email me at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2 id="updates">Updates to This Policy</h2>
      <p>
        I may update this Privacy Policy from time to time to reflect changes to
        the website, to my services, or to legal requirements. When I do, I will
        revise the &ldquo;Last updated&rdquo; date at the top of this page.
        Material changes to how SMS information is handled will not be applied
        retroactively to consent already given under different terms.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        If you have questions about this Privacy Policy or about how your
        information is handled, you can reach me directly:
      </p>
      <ul>
        <li>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          Phone: <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
        </li>
      </ul>
      <p>
        Dror Klar &mdash; Independent Digital Marketing Specialist. See also my{" "}
        <Link href="/terms">Terms</Link>.
      </p>
    </LegalPage>
  );
}
