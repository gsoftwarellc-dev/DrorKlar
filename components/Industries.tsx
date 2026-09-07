import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { industries } from "@/lib/site";

export default function Industries() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="border-b border-neutral-200 bg-white py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="industries-heading"
            eyebrow="Who I Work With"
            title="Built for Ambitious Businesses"
            subtitle="I work with businesses that want to strengthen their digital presence, improve lead generation, or build a more effective online customer-acquisition system."
          />

          {/* Positioning only — these are business types I work with, not a client list. */}
          <ul className="grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
            {industries.map((industry, index) => (
              <Reveal as="li" key={industry} delay={index * 60}>
                <div className="group flex h-full items-center gap-4 bg-white p-6 transition-colors duration-300 hover:bg-neutral-50">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 transition-colors duration-300 group-hover:bg-black"
                  />
                  <span className="text-[0.9375rem] font-medium tracking-tight text-black">
                    {industry}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
