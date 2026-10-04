import { preload } from "react-dom";
import { getImage } from "@/lib/images";

type Props = {
  // Putanja slike u media-src/ bez ekstenzije, npr. "primene/hidrodemolicija/01"
  src: string;
  // Obavezno. Prazan string samo za čisto dekorativne slike.
  alt: string;
  // Koliko je slika široka na ekranu, npr. "(min-width: 1024px) 33vw, 100vw"
  sizes: string;
  // Slika popunjava roditelja (roditelj mora biti relative)
  fill?: boolean;
  // Samo za slike na prvom ekranu: učitava se odmah
  priority?: boolean;
  className?: string;
};

export default function Img({
  src,
  alt,
  sizes,
  fill = false,
  priority = false,
  className = "",
}: Props) {
  const image = getImage(src);

  if (priority) {
    preload(image.fallback, {
      as: "image",
      imageSrcSet: image.srcSet,
      imageSizes: sizes,
      fetchPriority: "high",
    });
  }

  return (
    <img
      src={image.fallback}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`${fill ? "absolute inset-0 size-full" : ""} ${className}`}
    />
  );
}
