import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./ui/Container";

type LegalPageProps = {
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
};

/** Shared shell for /privacy and /terms — narrow measure, generous leading. */
export default function LegalPage({
  title,
  updated,
  intro,
  children,
}: LegalPageProps) {
  return (
    <article className="bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.8125rem] text-neutral-500 transition-colors duration-200 hover:text-black"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                <path
                  d="M10 12.5 5.5 8 10 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to home
            </Link>
          </nav>

          <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.028em] text-black sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="mt-5 text-[0.875rem] text-neutral-500">
            Last updated: {updated}
          </p>
          <div className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600">
            {intro}
          </div>
        </Container>
      </header>

      {/* Body */}
      <Container className="py-16 sm:py-20">
        <div
          className="
            max-w-3xl
            [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-xl [&_h2]:font-semibold
            [&_h2]:tracking-tight [&_h2]:text-black sm:[&_h2]:text-2xl
            [&_h2:first-child]:mt-0
            [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-black
            [&_p]:mt-4 [&_p]:text-[0.9375rem] [&_p]:leading-[1.75] [&_p]:text-neutral-600
            [&_ul]:mt-4 [&_ul]:space-y-2.5 [&_ul]:pl-1
            [&_li]:relative [&_li]:pl-6 [&_li]:text-[0.9375rem] [&_li]:leading-[1.75] [&_li]:text-neutral-600
            [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6875rem]
            [&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:rounded-full [&_li]:before:bg-neutral-400
            [&_a]:font-medium [&_a]:text-black [&_a]:underline [&_a]:underline-offset-4
            [&_a:hover]:opacity-60 [&_a]:transition-opacity
            [&_strong]:font-semibold [&_strong]:text-black
          "
        >
          {children}
        </div>
      </Container>
    </article>
  );
}
