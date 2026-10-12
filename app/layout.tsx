import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import ConsentManager from "@/components/consent/ConsentManager";
import CookieBanner from "@/components/consent/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { siteUrl } from "@/content/site";
import { consentDefaultScript } from "@/lib/consent";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Mlazmatik | FALCH visokopritisne mašine i pribor",
    template: "%s | Mlazmatik",
  },
  description:
    "Industrijske visokopritisne mašine i pribor FALCH, uz servis i demonstracije.",
  metadataBase: new URL(siteUrl),
  openGraph: { siteName: "Mlazmatik", locale: "sr_RS", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        {/* Google Consent Mode v2: sve odbijeno dok posetilac ne odluči. Mora biti pre Google skripti. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      <body>
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Preskoči na sadržaj
        </a>
        <Header />
        <main id="sadrzaj">{children}</main>
        <Footer />
        <CookieBanner />
        <ConsentManager />
      </body>
    </html>
  );
}
