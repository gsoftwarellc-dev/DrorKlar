import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { processSteps } from "@/lib/site";

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-b border-neutral-200 bg-neutral-50 py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="How I Work"
          title="A Simple, Focused Process"
        />

        <ol className="relative mt-14 grid gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 90} className="relative">
              {/* Connector rule between steps on desktop */}
              {index < processSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.6875rem] hidden h-px w-full bg-neutral-200 lg:block"
                />
              ) : null}

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="relative z-10 block h-[0.375rem] w-[0.375rem] rounded-full bg-black outline outline-8 outline-neutral-50"
                />
                <p className="mt-7 font-mono text-xs tracking-[0.16em] text-neutral-500">
                  {step.number}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-black">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-neutral-600">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
