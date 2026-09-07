import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import ServiceCard from "./ServiceCard";
import Reveal from "./ui/Reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-neutral-200 bg-neutral-50 py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="How I Can Help"
          subtitle="Practical digital marketing services designed around business growth."
        />

        <ul className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <Reveal as="li" key={service.title} delay={(index % 3) * 80}>
              <ServiceCard
                index={index}
                title={service.title}
                description={service.description}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
