import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://stemp.sk"),
  title: {
    default: `${site.name} – ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Stemp s.r.o. – stavebná spoločnosť z Popradu so 30 rokmi skúseností. Komplexné rekonštrukcie, zatepľovanie, novostavby, inžinierska činnosť a stavebný dozor.",
  applicationName: site.name,
  generator: "Next.js",
  keywords: [
    "Stemp",
    "stavebná firma Poprad",
    "rekonštrukcie",
    "zatepľovanie",
    "novostavby",
    "stavebný dozor",
    "inžinierska činnosť",
    "východné Slovensko",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
    languages: { "sk-SK": "/" },
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://stemp.sk",
    siteName: site.name,
    title: `${site.name} – ${site.tagline}`,
    description:
      "30 rokov skúseností v stavebníctve – komplexné stavebné a rekonštrukčné služby.",
    images: [
      {
        url: "/og.jpg",
        width: 1024,
        height: 768,
        alt: `${site.name} – stavebná spoločnosť Poprad`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – ${site.tagline}`,
    description:
      "30 rokov skúseností v stavebníctve – komplexné stavebné a rekonštrukčné služby.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  category: "construction",
};

export const viewport: Viewport = {
  themeColor: "#1863dc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body className="flex min-h-screen flex-col bg-white">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <JsonLd />
      </body>
    </html>
  );
}
