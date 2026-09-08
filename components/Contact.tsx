import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import ContactForm from "./ContactForm";
import Reveal from "./ui/Reveal";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-b border-neutral-200 bg-white py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left rail */}
          <div>
            <SectionHeading
              id="contact-heading"
              tone="ink"
              eyebrow="Contact"
              title="Let's Talk About Your Business"
              subtitle="Have a question or a project in mind? Send me a message and I'll get back to you directly."
            />

            <Reveal delay={160}>
              <dl className="mt-10 space-y-6 border-t border-neutral-200 pt-8">
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-black">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[0.9375rem] text-black underline underline-offset-4 transition-opacity hover:opacity-60"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-black">
                    Phone
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="text-[0.9375rem] text-black underline underline-offset-4 transition-opacity hover:opacity-60"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-black">
                    Response
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-black">
                    I review each inquiry personally and reply by email.
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
