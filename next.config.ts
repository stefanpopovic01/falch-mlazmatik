import type { NextConfig } from "next";

// Bezbednosna zaglavlja za sve stranice. Namerno bez pravila o skriptama (script-src):
// sajt je statičan i nema unosa koji se prikazuje drugima, a Google Tag Manager
// učitava skripte koje se biraju naknadno u njegovom panelu.
const securityHeaders = [
  // Drugi sajtovi ne mogu da prikažu ovaj sajt u okviru (iframe)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  // Drugim sajtovima se šalje samo domen, ne i puna adresa stranice
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Pregledač ne pogađa vrstu fajla
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Sajt ne koristi kameru, mikrofon ni lokaciju
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Slike se pripremaju unapred (npm run images) i služe kao obični fajlovi,
  // pa se Vercelova optimizacija slika ne koristi.
  images: { unoptimized: true },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
