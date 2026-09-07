import Container from "./ui/Container";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

export default function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-28"
    >
      {/* Flat decorative outlines — solid black ground, no gradients. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full border border-white/10" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2
              id="cta-heading"
              className="text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.028em] text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Have a project in mind?
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              Tell me about your business and what you&rsquo;re trying to
              achieve. I&rsquo;ll review your inquiry and get back to you
              directly.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex justify-center">
              <Button href="/#contact" variant="inverse" size="lg">
                Start a Conversation
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M3 8h10m0 0-3.75-3.75M13 8l-3.75 3.75"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
