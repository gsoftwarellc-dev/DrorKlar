import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** Renders light-on-dark for the black CTA section. */
  tone?: "dark" | "light";
  /** Ties the heading to its section via aria-labelledby. */
  id?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  id,
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={`${isCentered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <Reveal>
          <p
            className={`mb-5 flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] ${
              isCentered ? "justify-center" : ""
            } ${isLight ? "text-white/60" : "text-neutral-500"}`}
          >
            <span
              aria-hidden="true"
              className={`h-px w-8 ${isLight ? "bg-white/30" : "bg-neutral-300"}`}
            />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={60}>
        <h2
          id={id}
          className={`text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.025em] sm:text-4xl lg:text-[2.75rem] ${
            isLight ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle ? (
        <Reveal delay={120}>
          <p
            className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${
              isLight ? "text-white/70" : "text-neutral-600"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
