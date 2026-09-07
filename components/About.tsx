import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { values } from "@/lib/site";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-neutral-200 bg-white py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            id="about-heading"
            eyebrow="About"
            title="A Personal Approach to Digital Growth"
          />

          <div className="max-w-2xl space-y-6">
            <Reveal>
              <p className="text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
                I&rsquo;m Dror Klar, an independent digital marketing specialist
                focused on helping businesses build a stronger digital presence
                and generate meaningful opportunities online.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
                I believe effective marketing should be clear, measurable, and
                aligned with real business goals. I work directly with each
                client, from understanding the challenge to developing and
                implementing the right digital strategy.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Value cards */}
        <ul className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {values.map((value, index) => (
            <Reveal as="li" key={value.title} delay={index * 80}>
              <div className="group h-full rounded-xl border border-neutral-200 bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-soft">
                <span
                  aria-hidden="true"
                  className="block h-8 w-8 rounded-lg border border-neutral-200 bg-neutral-50 transition-colors duration-300 group-hover:border-black group-hover:bg-black"
                />
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-black">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-neutral-600">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
