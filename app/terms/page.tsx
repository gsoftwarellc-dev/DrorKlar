import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms governing the use of drorklar.com and the digital marketing services provided by Dror Klar, including SMS messaging terms.",
  alternates: { canonical: `${site.url}/terms` },
  openGraph: {
    title: `Terms | ${site.name}`,
    description:
      "Terms governing the use of drorklar.com and the digital marketing services provided by Dror Klar, including SMS messaging terms.",
    url: `${site.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="June 17, 2026"
      intro={
        <p>
          These Terms govern your use of {site.url.replace("https://", "")} and
          describe the basis on which I, Dror Klar, provide digital marketing
          services as an independent specialist.
        </p>
      }
    >
      <h2 id="website-use">Website Use</h2>
      <p>
        By accessing this website you agree to use it lawfully and not to
        interfere with its operation, security, or availability. You agree not
        to attempt unauthorized access to any part of the site, to submit
        malicious code, or to use automated systems to scrape or overload it.
      </p>
      <p>
        The content on this website is provided for general information about my
        services. It does not constitute legal, financial, or professional
        advice, and it is not an offer to enter into a contract.
      </p>

      <h2 id="digital-marketing-services">Digital Marketing Services</h2>
      <p>
        I work as an independent digital marketing specialist. Any engagement
        begins only once the scope of work, deliverables, timeline, and fees
        have been agreed in writing with you.
      </p>
      <p>
        Where a separate written agreement, proposal, or statement of work
        exists and conflicts with these Terms, that document governs the
        specific engagement it covers.
      </p>
      <p>
        Delivering marketing work depends on your timely cooperation, including
        access to accounts and assets, feedback, approvals, and any required
        third-party budgets such as advertising spend. Advertising spend is paid
        by you to the relevant platform and is separate from my fees unless
        agreed otherwise.
      </p>

      <h2 id="no-guarantee-of-results">No Guarantee of Results</h2>
      <p>
        Digital marketing outcomes depend on many factors outside my control,
        including your market, competition, budget, pricing, offer, sales
        process, and the policies and algorithms of third-party platforms.
      </p>
      <p>
        I do not guarantee any specific result, including any particular number
        of leads, conversions, sales, revenue, return on investment, search
        engine ranking, or advertising cost. Any examples, projections, or
        estimates discussed are illustrative only and are not promises of
        performance.
      </p>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>
        The content of this website, including its text, layout, design, and
        code, belongs to me unless otherwise indicated, and may not be copied or
        reproduced without permission.
      </p>
      <p>
        You retain ownership of the materials you supply for a project, such as
        your brand assets, copy, and images, and you confirm that you have the
        rights to use them. Ownership of work I create for you is addressed in
        the written agreement for that engagement, and typically transfers on
        full payment.
      </p>

      <h2 id="third-party-services">Third-Party Services</h2>
      <p>
        Marketing work commonly involves third-party platforms and tools, such
        as advertising networks, hosting providers, analytics tools, and CRM
        systems. These are operated by others and governed by their own terms
        and policies.
      </p>
      <p>
        I am not responsible for the availability, pricing, policy changes,
        account decisions, or actions of those third parties, including
        suspension or rejection of advertising accounts or campaigns. Links from
        this website to other sites are provided for convenience and do not
        imply endorsement.
      </p>

      <h2 id="limitation-of-liability">Limitation of Liability</h2>
      <p>
        This website and its content are provided on an &ldquo;as is&rdquo; and
        &ldquo;as available&rdquo; basis, without warranties of any kind to the
        fullest extent permitted by law.
      </p>
      <p>
        To the maximum extent permitted by applicable law, I will not be liable
        for indirect, incidental, special, consequential, or punitive damages,
        or for lost profits, lost revenue, lost data, or business interruption,
        arising out of your use of this website or of services provided.
      </p>
      <p>
        Nothing in these Terms limits liability that cannot be excluded under
        applicable law.
      </p>

      <h2 id="sms-terms">SMS Terms</h2>
      <p>
        These SMS terms apply to text messages I send in connection with my
        services.
      </p>
      <ul>
        <li>
          <strong>Consent required.</strong> Messages are sent only when you
          have provided applicable consent, such as by checking the SMS consent
          checkbox on my contact form. The checkbox is never pre-selected.
        </li>
        <li>
          <strong>What messages cover.</strong> Messages relate to your
          inquiry, updates on it, and customer support &mdash; for example
          replying to a question you sent, following up on a conversation you
          began with me, or arranging a call. These are conversational and
          customer-care messages, not marketing blasts.
        </li>
        <li>
          <strong>Message frequency.</strong> Message frequency may vary.
        </li>
        <li>
          <strong>Costs.</strong> Message and data rates may apply. Charges are
          set by your mobile carrier, not by me.
        </li>
        <li>
          <strong>Opting out.</strong> Reply <strong>STOP</strong> at any time
          to opt out of further text messages.
        </li>
        <li>
          <strong>Help.</strong> Reply <strong>HELP</strong> for assistance, or
          email me at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </li>
        <li>
          <strong>Not a condition of purchase.</strong> Consent to receive SMS
          is not a condition of purchasing any goods or services, and declining
          it does not affect my response to your inquiry.
        </li>
        <li>
          <strong>Carriers.</strong> Mobile carriers are not liable for delayed
          or undelivered messages, and delivery is not guaranteed.
        </li>
      </ul>
      <p>
        A phone number is required to send an inquiry, and consent is recorded
        against the specific number entered on the contact form at the time
        consent is given. Messages are sent only to that number, and only if
        you ticked the consent box &mdash; submitting the form with a phone
        number but without ticking it does not opt you in.
      </p>
      <p>
        I only message people who gave consent directly to me. I do not treat
        contacts obtained from purchased, rented, scraped, or third-party lead
        lists as having opted in to SMS, and consent given to another business
        is never treated as consent to receive messages from me.
      </p>
      <p>
        Handling of phone numbers and consent records is described in my{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2 id="changes-to-terms">Changes to Terms</h2>
      <p>
        I may update these Terms from time to time to reflect changes to the
        website, to my services, or to legal requirements. The
        &ldquo;Last updated&rdquo; date at the top of this page shows when the
        most recent version took effect, and continued use of the website after
        that date means you accept the updated Terms.
      </p>

      <h2 id="contact">Contact</h2>
      <p>Questions about these Terms can be sent to me directly:</p>
      <ul>
        <li>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          Phone: <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
        </li>
      </ul>
      <p>Dror Klar &mdash; Independent Digital Marketing Specialist.</p>
    </LegalPage>
  );
}
