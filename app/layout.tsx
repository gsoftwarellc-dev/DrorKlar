import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

/* Inter, applied globally as the single typeface for the whole site. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "digital marketing specialist",
    "independent digital marketing",
    "Google Ads",
    "Meta advertising",
    "lead generation",
    "local marketing",
    "website design",
    "marketing strategy",
    "Dror Klar",
  ],
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Structured data. Deliberately limited to facts stated on the site — a named
 * independent professional and the services offered. No invented address,
 * founding date, ratings, or review counts.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      jobTitle: site.role,
      description: site.description,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.brand,
      url: site.url,
      description: site.description,
      founder: { "@id": `${site.url}/#person` },
      areaServed: "US",
      knowsAbout: [
        "Website Design & Development",
        "Google Ads",
        "Meta Advertising",
        "Lead Generation",
        "Local Marketing",
        "Marketing Strategy",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.title,
      description: site.description,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} js`}>
      <head>
        {/* The `js` class above switches on the scroll-reveal styles, and is
            rendered server-side so the markup React hydrates against already
            matches — adding it from a script here would be a hydration
            mismatch. The <noscript> below is the real fallback: with no
            scripting, `js` is neutralised and `.reveal` content stays fully
            visible rather than being hidden by CSS that can never undo it. */}
        <noscript>
          <style>{`.js .reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-white font-sans text-black antialiased">
        {/* Keyboard users can jump straight to the content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
