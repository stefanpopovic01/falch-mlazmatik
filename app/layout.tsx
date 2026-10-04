import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/Header";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <body>
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Preskoči na sadržaj
        </a>
        <Header />
        <main id="sadrzaj">{children}</main>
      </body>
    </html>
  );
}
