import Link from "next/link";
import Img from "@/components/ui/Img";
import { type Accessory, accessoryHref, mainSpec } from "@/lib/accessories";

type Props = {
  accessory: Accessory;
  // Prikazuje glavni podatak (npr. pritisak) ispod naziva
  showSpec?: boolean;
  sizes?: string;
  heading?: "h2" | "h3" | "p";
};

// Kartica pribora: fotografija, šifra i naziv. Cela kartica je link ka artiklu.
export default function AccessoryCard({
  accessory,
  showSpec = false,
  sizes = "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw",
  heading: Heading = "p",
}: Props) {
  const image = accessory.images[0];
  const spec = showSpec ? mainSpec(accessory) : undefined;

  return (
    <Link
      href={accessoryHref(accessory)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white text-ink ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(96,84,151,0.6)]"
    >
      <div className="relative aspect-[8/5] bg-white">
        {image && (
          <Img
            src={image.src}
            alt=""
            fill
            sizes={sizes}
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-line p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
          {accessory.code}
        </p>
        <Heading className="text-[15px] font-medium leading-snug transition-colors group-hover:text-brand">
          {accessory.name}
        </Heading>
        {spec && <p className="mt-auto pt-2 font-mono text-xs text-muted">{spec}</p>}
      </div>
    </Link>
  );
}
