"use client";

import { type ReactNode, useState } from "react";
import Lightbox, { type LightboxImage } from "./Lightbox";

type Item = {
  // Umanjena slika, nacrtana na serveru
  thumb: ReactNode;
  // Velika slika za uvećani prikaz
  full: LightboxImage;
  // Klase pločice u mreži (raspored određuje stranica)
  className?: string;
};

// Mreža slika; klik otvara uvećani prikaz.
export default function Gallery({ items, className = "" }: { items: Item[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className={className}>
        {items.map((item, i) => (
          <li key={item.full.src} className={item.className}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Uvećaj sliku ${i + 1} od ${items.length}`}
              className="group relative block size-full cursor-zoom-in overflow-hidden rounded-2xl bg-brand-deep"
            >
              {item.thumb}
              <span className="absolute inset-0 bg-brand/30 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox images={items.map((item) => item.full)} index={index} onChange={setIndex} />
    </>
  );
}
