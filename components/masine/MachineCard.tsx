import Link from "next/link";
import Img from "@/components/ui/Img";
import {
  type Machine,
  engineLabels,
  formatNumber,
  machineHref,
  seriesLabels,
} from "@/lib/machines";

type Props = {
  machine: Machine;
  sizes?: string;
  heading?: "h2" | "h3";
};

export default function MachineCard({
  machine,
  sizes = "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw",
  heading: Heading = "h3",
}: Props) {
  const stats = [
    { label: "kW", value: formatNumber(machine.kw) },
    { label: "bar", value: formatNumber(machine.bar) },
    { label: "l/min", value: formatNumber(machine.lpm) },
  ];

  return (
    <Link
      href={machineHref(machine.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(96,84,151,0.55)]"
    >
      <div className="relative aspect-[4/3] bg-white">
        <Img
          src={machine.images[0].src}
          alt=""
          fill
          sizes={sizes}
          className="object-contain p-5 transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
          {machine.itemNumber}
        </span>
        {machine.hotWater && (
          <span className="absolute right-4 top-4 rounded-full bg-mist px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand ring-1 ring-line">
            Topla voda
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col border-t border-line p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
          {seriesLabels[machine.series]} · {engineLabels[machine.engine]}
        </p>
        <Heading className="mt-2 font-display text-xl font-extrabold leading-tight tracking-[-0.02em]">
          {machine.name}
        </Heading>

        <dl className="mt-auto grid grid-cols-3 gap-3 pt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse border-t border-line pt-3">
              <dt className="text-xs text-muted">{stat.label}</dt>
              <dd className="font-mono text-lg font-medium tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}
