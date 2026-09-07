import Link from "next/link";
import Container from "./ui/Container";
import { navLinks, site } from "@/lib/site";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <p className="text-lg font-semibold tracking-[-0.02em] text-black">
              {site.name}
            </p>
            <p className="mt-1.5 text-[0.9375rem] text-black">
              {site.role}
            </p>
            <p className="mt-6 max-w-xs text-[0.8125rem] leading-relaxed text-black">
              Independent digital marketing support for businesses that want a
              stronger online presence — websites, advertising, and lead
              generation.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-black">
              Navigation
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] text-black transition-colors duration-200 hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] text-black transition-colors duration-200 hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-black">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.9375rem] text-black transition-colors duration-200 hover:opacity-70"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-[0.9375rem] text-black transition-colors duration-200 hover:opacity-70"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-black">
            &copy; 2026 {site.name}. All rights reserved.
          </p>
          <p className="text-[0.8125rem] text-black">
            SMS consent is optional and never required to work together.
          </p>
        </div>
      </Container>
    </footer>
  );
}
