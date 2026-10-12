import manifest from "./images.json";

type Entry = { width: number; height: number; widths: number[] };

const images: Record<string, Entry> = manifest;

const fileFor = (src: string, width: number) => `/media/${src}-${width}.webp`;

// src je putanja slike u media-src/ bez ekstenzije, npr. "primene/hidrodemolicija/01"
export function getImage(src: string) {
  const image = images[src];
  if (!image) {
    throw new Error(
      `Slika "${src}" ne postoji u lib/images.json. Dodajte original u media-src/ i pokrenite "npm run images".`,
    );
  }
  return {
    width: image.width,
    height: image.height,
    srcSet: image.widths.map((w) => `${fileFor(src, w)} ${w}w`).join(", "),
    // Za pregledače bez srcset podrške
    fallback: fileFor(src, image.widths.findLast((w) => w <= 1280) ?? image.widths[0]),
    smallest: fileFor(src, image.widths[0]),
    largest: fileFor(src, image.widths.at(-1)!),
  };
}

export type ResolvedImage = {
  alt: string;
  src: string;
  srcSet: string;
  thumb: string;
  full: { src: string; width: number; height: number; alt: string };
};

// Podaci slike za klijentske komponente (koje ne smeju da uvoze manifest)
export function resolveImage(image: { src: string; alt: string }): ResolvedImage {
  const data = getImage(image.src);
  return {
    alt: image.alt,
    src: data.fallback,
    srcSet: data.srcSet,
    thumb: data.smallest,
    full: { src: data.largest, width: data.width, height: data.height, alt: image.alt },
  };
}
