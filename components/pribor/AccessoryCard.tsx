import Img from "@/components/ui/Img";
import type { Accessory } from "@/lib/accessories";

// Kartica pribora: fotografija, naziv i šifra.
// TODO: kada stranice pribora budu napravljene, kartica postaje link ka artiklu.
export default function AccessoryCard({ accessory }: { accessory: Accessory }) {
  const image = accessory.images[0];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line">
      <div className="relative aspect-[8/5] bg-white">
        {image && (
          <Img
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-3"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-line p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
          {accessory.code}
        </p>
        <p className="text-[15px] font-medium leading-snug text-ink">{accessory.name}</p>
      </div>
    </div>
  );
}
