"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Lightbox from "@/components/ui/Lightbox";
import { quoteHref } from "@/content/site";
import type { ResolvedImage } from "@/lib/images";

type Variant = { id: string; label: string; itemNumber: string; images: ResolvedImage[] };

type Props = {
  name: string;
  kicker: string;
  // Prva varijanta je osnovna mašina ("Standard")
  variants: Variant[];
  // Ključni podaci, nacrtani na serveru
  chips: ReactNode;
  brochure?: string;
};

const PARAM = "varijanta";

export default function MachineHero({ name, kicker, variants, chips, brochure }: Props) {
  const [variantId, setVariantId] = useState(variants[0].id);
  const [imageIndex, setImageIndex] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);

  // Izabrana varijanta se čuva u adresi (?varijanta=...); osnovna mašina je bez parametra.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get(PARAM);
    if (variants.some((variant) => variant.id === value)) setVariantId(value!);
  }, [variants]);

  const variant = variants.find((item) => item.id === variantId) ?? variants[0];
  const isBase = variant === variants[0];
  const image = variant.images[imageIndex] ?? variant.images[0];
  const quote = quoteHref(variant.itemNumber, isBase ? undefined : variant.label);

  const select = (next: Variant) => {
    setVariantId(next.id);
    setImageIndex(0);
    const url = new URL(window.location.href);
    if (next === variants[0]) url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, next.id);
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7">
        <button
          type="button"
          onClick={() => setZoom(imageIndex)}
          aria-label="Uvećaj sliku"
          className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white ring-1 ring-line"
        >
          <img
            key={image.src}
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 1024px) 56vw, 100vw"
            alt={image.alt}
            fetchPriority="high"
            className="absolute inset-0 size-full object-contain p-6 lg:p-10"
          />
        </button>

        {variant.images.length > 1 && (
          <ul className="mt-3 grid grid-cols-5 gap-3">
            {variant.images.map((item, i) => (
              <li key={item.src}>
                <button
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-label={`Slika ${i + 1} od ${variant.images.length}`}
                  aria-current={i === imageIndex}
                  className={`relative block aspect-square w-full overflow-hidden rounded-xl bg-white transition-shadow ${
                    i === imageIndex ? "ring-2 ring-brand" : "ring-1 ring-line hover:ring-brand-light"
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
      </div>

      <div className="lg:col-span-5 lg:pl-4">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand sm:text-[13px]">
          {kicker}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-extrabold leading-[1] tracking-[-0.035em]">
          {name}
        </h1>
        <p className="mt-4 text-lg text-muted">
          Šifra <span className="font-mono font-medium text-ink">{variant.itemNumber}</span>
        </p>

        {variants.length > 1 && (
          <fieldset className="mt-8">
            <legend className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Varijanta
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {variants.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item === variant}
                  onClick={() => select(item)}
                  className={`rounded-full border px-4 py-2 text-[15px] font-medium transition-colors ${
                    item === variant
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-white text-ink hover:border-brand hover:text-brand"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-8">{chips}</div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link
            href={quote}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            Zatraži ponudu
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          {brochure && (
            <a
              href={brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-line bg-white px-8 py-4 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Preuzmi brošuru
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">PDF</span>
            </a>
          )}
        </div>
      </div>

      {/* Telefon: dugme za ponudu uvek pri dnu ekrana */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <Link
          href={quote}
          className="flex items-center justify-between gap-3 rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-white"
        >
          <span>
            Zatraži ponudu
            <span className="ml-2 font-mono text-sm font-normal text-white/70">
              {variant.itemNumber}
            </span>
          </span>
          <ArrowIcon />
        </Link>
      </div>

      <Lightbox
        images={variant.images.map((item) => item.full)}
        index={zoom}
        onChange={(next) => {
          setZoom(next);
          if (next !== null) setImageIndex(next);
        }}
      />
    </div>
  );
}
