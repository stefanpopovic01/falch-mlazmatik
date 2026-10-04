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
    largest: fileFor(src, image.widths.at(-1)!),
  };
}
