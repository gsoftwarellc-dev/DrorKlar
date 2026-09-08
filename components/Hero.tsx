import Image from "next/image";
import Container from "./ui/Container";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-neutral-200 bg-white"
    >
      {/* Flat decorative geometry — no gradients. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 top-16 hidden h-[26rem] w-[26rem] rounded-full border border-neutral-200/70 lg:block" />
      </div>

      <Container className="relative pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-28">
        <div className="grid items-center gap-16 sm:gap-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
          {/* ---------------------------------------------------------- LEFT */}
          <div className="max-w-xl">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-black">
                <span aria-hidden="true" className="h-px w-8 bg-neutral-300" />
                Independent Digital Marketing Specialist
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1
                id="hero-heading"
                className="mt-7 text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.03em] text-black sm:text-[2.75rem] lg:text-[3rem]"
              >
                Hi, I&rsquo;m Dror Klar.
                <span className="mt-4 block text-[1.75rem] leading-[1.24] text-neutral-500 sm:text-[2rem] lg:text-[2.125rem]">
                  I help businesses turn digital marketing into measurable
                  growth.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-black sm:text-lg">
                I work directly with businesses to improve their online
                presence, generate qualified leads, and create digital
                experiences designed to convert visitors into customers.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/#contact" size="lg">
                  Let&rsquo;s Talk
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
                <Button href="/#services" variant="secondary" size="lg">
                  Explore My Services
                </Button>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <p className="mt-8 border-t border-neutral-200 pt-6 text-sm text-black">
                Personal strategy. Direct communication. Focused execution.
              </p>
            </Reveal>
          </div>

          {/* --------------------------------------------------------- RIGHT */}
          <Reveal delay={160} className="relative">
            <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
              {/* Offset outline frame behind the portrait */}
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -left-5 hidden h-full w-full rounded-2xl border border-neutral-300 sm:block"
              />
              {/* Fine dot grid, top-right */}
              <div
                aria-hidden="true"
                className="dot-grid absolute -right-7 -top-7 hidden h-28 w-28 rounded-lg sm:block"
              />

              {/* Portrait frame.
                  The photo is a white shirt on a white background, so the frame
                  carries a light neutral fill and a hairline border — without it
                  the subject would dissolve into the white page.
                  A fixed 4:5 ratio with top-anchored focus keeps the face high in
                  the frame and leaves clean room for the floating card below. */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-frame">
                <Image
                  src="/My_pic.png"
                  alt="Portrait of Dror Klar, independent digital marketing specialist"
                  fill
                  priority
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 26rem, 34rem"
                  className="object-cover object-top"
                />
                {/* Hairline inner edge for a crisp, framed print feel */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5"
                />
              </div>

              {/* Floating identity card */}
              <div className="absolute -bottom-6 left-2 right-2 rounded-xl border border-neutral-200 bg-white p-4 shadow-lift sm:-bottom-8 sm:left-auto sm:right-6 sm:w-[17.5rem] sm:p-5">
                <p className="text-[0.9375rem] font-semibold tracking-tight text-black">
                  {site.name}
                </p>
                <p className="mt-0.5 text-sm text-neutral-500">{site.role}</p>
                <p className="mt-3 flex items-center gap-2 border-t border-neutral-100 pt-3 text-[0.8125rem] text-neutral-600">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                  />
                  Available for selected projects
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
