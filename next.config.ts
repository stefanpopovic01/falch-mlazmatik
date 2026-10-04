import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Slike se pripremaju unapred (npm run images) i služe kao obični fajlovi,
  // pa se Vercelova optimizacija slika ne koristi.
  images: { unoptimized: true },
};

export default nextConfig;
