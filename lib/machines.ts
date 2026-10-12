import machinesData from "@/content/machines.json";
import { powerBuckets } from "@/content/machines-info";
import { routes } from "@/content/site";

export type Series = "wheel-jet" | "base-jet" | "trail-jet";
export type Engine = "electric" | "petrol" | "diesel";
export type MachineImage = { src: string; alt: string };

export type Machine = {
  slug: string;
  name: string;
  // Šifra mašine, npr. "G411"
  itemNumber: string;
  series: Series;
  engine: Engine;
  // Nazivne vrednosti za filtere i kartice: snaga pumpe, najviši pritisak, najveći protok
  kw: number;
  bar: number;
  lpm: number;
  hotWater: boolean;
  // Prikazuje mašinu u sekciji "Izdvojene mašine" na početnoj
  featured?: boolean;
  // Prva slika je naslovna
  images: MachineImage[];
  applicationImages: MachineImage[];
  specs: { group: string; label: string; value: string }[];
  // YouTube ID. Poster je slika "masine/<slug>/video".
  video?: string;
  // URL brošure (PDF)
  brochure?: string;
  // Šifre pribora
  standard: string[];
  recommended: string[];
  // Ručno izabrane slične mašine (slugovi); bez ovoga se biraju automatski
  similar?: string[];
  variants?: { label: string; itemNumber?: string; images?: MachineImage[] }[];
  // Napomene za proveru podataka. Ne prikazuju se na sajtu.
  review?: string[];
};

export const machines = machinesData as Machine[];

export const machineHref = (slug: string) => `${routes.masine}/${slug}`;

export const getMachine = (slug: string) => machines.find((machine) => machine.slug === slug);

export const featuredMachines = machines.filter((machine) => machine.featured);

export const seriesLabels: Record<Series, string> = {
  "wheel-jet": "Wheel Jet",
  "base-jet": "Base Jet",
  "trail-jet": "Trail Jet",
};

export const engineLabels: Record<Engine, string> = {
  electric: "Električni",
  petrol: "Benzinski",
  diesel: "Dizel",
};

// 1.8 -> "1,8"
export const formatNumber = (value: number) => String(value).replace(".", ",");

export const powerBucket = (kw: number) =>
  powerBuckets.find((bucket) => kw <= bucket.max) ?? powerBuckets[powerBuckets.length - 1];

// Vrednosti po kojima se mašina filtrira. Ključevi su i nazivi parametara u adresi.
export const filterValues = (machine: Machine) => ({
  snaga: powerBucket(machine.kw).id,
  izvedba: machine.series,
  motor: machine.engine,
  pritisak: String(machine.bar),
});

export type FilterKey = keyof ReturnType<typeof filterValues>;

// Opcije filtera se grade iz podataka, pa nijedna opcija nije prazna.
export function filterGroups() {
  const used = (key: FilterKey) => new Set(machines.map((machine) => filterValues(machine)[key]));
  const bars = [...new Set(machines.map((machine) => machine.bar))].sort((a, b) => a - b);
  return [
    {
      key: "snaga" as const,
      label: "Snaga",
      options: powerBuckets
        .filter((bucket) => used("snaga").has(bucket.id))
        .map((bucket) => ({ value: bucket.id, label: bucket.label })),
    },
    {
      key: "izvedba" as const,
      label: "Izvedba",
      options: (Object.keys(seriesLabels) as Series[])
        .filter((series) => used("izvedba").has(series))
        .map((series) => ({ value: series, label: seriesLabels[series] })),
    },
    {
      key: "motor" as const,
      label: "Motor",
      options: (Object.keys(engineLabels) as Engine[])
        .filter((engine) => used("motor").has(engine))
        .map((engine) => ({ value: engine, label: engineLabels[engine] })),
    },
    {
      key: "pritisak" as const,
      label: "Pritisak",
      options: bars.map((bar) => ({ value: String(bar), label: `${bar} bar` })),
    },
  ];
}

// Slične mašine: +2 ista izvedba, +2 isti pritisak, +1 isti motor; kod istog zbira bliža snaga.
// Bez slučajnosti, pa je rezultat isti pri svakom buildu.
export function similarMachines(current: Machine, count = 3) {
  if (current.similar?.length) {
    return current.similar.flatMap((slug) => getMachine(slug) ?? []).slice(0, count);
  }
  const score = (machine: Machine) =>
    (machine.series === current.series ? 2 : 0) +
    (machine.bar === current.bar ? 2 : 0) +
    (machine.engine === current.engine ? 1 : 0);
  return machines
    .filter((machine) => machine.slug !== current.slug)
    .sort(
      (a, b) =>
        score(b) - score(a) ||
        Math.abs(a.kw - current.kw) - Math.abs(b.kw - current.kw) ||
        a.name.localeCompare(b.name),
    )
    .slice(0, count);
}

// Opseg snage i pritiska jedne serije, izračunat iz podataka
export function seriesRange(series: Series) {
  const items = machines.filter((machine) => machine.series === series);
  const range = (values: number[]) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return min === max ? formatNumber(min) : `${formatNumber(min)}–${formatNumber(max)}`;
  };
  return {
    count: items.length,
    kw: range(items.map((machine) => machine.kw)),
    bar: range(items.map((machine) => machine.bar)),
  };
}
