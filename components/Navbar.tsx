"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { navLinks, site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Hairline border + shadow only after the page leaves the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Escape closes the mobile panel and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-neutral-200 shadow-[0_1px_2px_rgb(0_0_0/0.03)]"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-[4.5rem] items-center justify-between gap-6"
        >
          {/* Wordmark */}
          <Link
            href="/#home"
            onClick={close}
            className="group flex items-baseline gap-2 rounded-sm text-[1.0625rem] font-semibold tracking-[-0.02em] text-black"
          >
            {site.name}
            <span
              aria-hidden="true"
              className="hidden h-1 w-1 rounded-full bg-black opacity-40 transition-opacity duration-200 group-hover:opacity-100 sm:block"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative rounded-md px-3.5 py-2 text-[0.9375rem] text-neutral-600 transition-colors duration-200 hover:text-black"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button href="/#contact" className="hidden lg:inline-flex">
              Let&rsquo;s Talk
            </Button>

            {/* Hamburger */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 text-black transition-colors duration-200 hover:border-black lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 block h-[1.5px] w-5 bg-black transition-transform duration-300 ease-out ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-[1.5px] w-5 -translate-y-1/2 bg-black transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-5 bg-black transition-transform duration-300 ease-out ${
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-neutral-200 bg-white lg:hidden"
      >
        <Container className="py-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-neutral-100 last:border-b-0">
                <Link
                  href={link.href}
                  onClick={close}
                  className="block py-4 text-lg tracking-tight text-black"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Button href="/#contact" size="lg" className="w-full" onClick={close}>
              Let&rsquo;s Talk
            </Button>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            <Link href="/privacy" onClick={close} className="underline underline-offset-4 hover:text-black">
              Privacy Policy
            </Link>
            <span className="mx-2" aria-hidden="true">
              &middot;
            </span>
            <Link href="/terms" onClick={close} className="underline underline-offset-4 hover:text-black">
              Terms
            </Link>
          </p>
        </Container>
      </div>
    </header>
  );
}
