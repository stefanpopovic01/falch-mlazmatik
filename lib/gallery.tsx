import Img from "@/components/ui/Img";
import { getImage } from "./images";

type Image = { src: string; alt: string };

// Priprema stavku za <Gallery>: umanjena slika (server) i podaci velike slike.
export function galleryItem(image: Image, sizes: string, className: string, priority = false) {
  const full = getImage(image.src);
  return {
    className,
    full: { src: full.largest, width: full.width, height: full.height, alt: image.alt },
    thumb: (
      <Img
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    ),
  };
}
