"use client";

import { useState } from "react";
import type { ResolvedImage } from "@/lib/images";
import Lightbox from "./Lightbox";

type Props = {
  images: ResolvedImage[];
  // Odnos stranica velike slike, npr. "aspect-[4/3]"
  aspect?: string;
  sizes?: string;
};

// Galerija proizvoda: velika slika na beloj podlozi, sličice ispod, klik uvećava.
export default function ProductGallery({
  images,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 56vw, 100vw",
}: Props) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const image = images[index] ?? images[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setZoom(index)}
        aria-label="Uvećaj sliku"
        className={`relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white ring-1 ring-line ${aspect}`}
      >
        <img
          key={image.src}
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={image.alt}
          fetchPriority="high"
          className="absolute inset-0 size-full object-contain p-6 lg:p-10"
        />
      </button>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-3">
          {images.map((item, i) => (
            <li key={item.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slika ${i + 1} od ${images.length}`}
                aria-current={i === index}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl bg-white transition-shadow ${
                  i === index ? "ring-2 ring-brand" : "ring-1 ring-line hover:ring-brand-light"
                }`}
              >
                <img
                  src={item.thumb}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-contain p-1.5"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        images={images.map((item) => item.full)}
        index={zoom}
        onChange={(next) => {
          setZoom(next);
          if (next !== null) setIndex(next);
        }}
      />
    </>
  );
}
