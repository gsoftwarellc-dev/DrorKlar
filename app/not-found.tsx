import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs tracking-[0.16em] text-neutral-500">404</p>
      <h1 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.028em] text-black sm:text-4xl">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-neutral-600">
        The page you were looking for may have been moved or removed. Let&rsquo;s
        get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">
          Back to home
        </Button>
        <Button href="/#contact" variant="secondary" size="lg">
          Get in touch
        </Button>
      </div>
    </Container>
  );
}
