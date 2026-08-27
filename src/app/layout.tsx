import type { Metadata } from "next";
import "@fontsource/open-sauce-one/400.css";
import "@fontsource/open-sauce-one/500.css";
import "@fontsource/open-sauce-one/600.css";
import "@fontsource/open-sauce-one/700.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/content/site";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.legalName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  icons: {
    icon: "/logo-recent.svg",
    shortcut: "/logo-recent.svg",
    apple: "/logo-recent.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    description: site.description,
    url: site.url,
    email: site.email,
    areaServed: "IN",
    knowsAbout: site.keywords,
  };

  return (
    <html lang="en" className="h-full bg-void antialiased">
      <body className="min-h-full bg-void font-sans text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%cMade with love by Parth 💖", "color: #ff3366; font-size: 24px; font-weight: bold; font-family: sans-serif;");`
          }}
        />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
