"use client";

import { useEffect, useState } from "react";

type Connection = { saveData?: boolean; effectiveType?: string };

// Video se učitava samo ako veza nije spora i korisnik nije isključio animacije.
// U suprotnom ostaje poster slika ispod.
export default function HeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    const slow =
      connection?.saveData || /2g/.test(connection?.effectiveType ?? "");
    if (!reduced && !slow) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <video
      className={`absolute inset-0 -z-20 size-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={() => setReady(true)}
      aria-hidden
    >
      <source src="/media/hero.webm" type="video/webm" />
      <source src="/media/hero.mp4" type="video/mp4" />
    </video>
  );
}
