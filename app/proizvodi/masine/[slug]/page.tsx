import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import MachineCard from "@/components/masine/MachineCard";
import MachineHero from "@/components/masine/MachineHero";
import AccessoryCard from "@/components/pribor/AccessoryCard";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/ui/Container";
import Gallery from "@/components/ui/Gallery";
import Img from "@/components/ui/Img";
import SectionHeading from "@/components/ui/SectionHeading";
import YouTube from "@/components/ui/YouTube";
import { company, quoteHref, routes } from "@/content/site";
import { categoryHref, getAccessory, groupByCategory } from "@/lib/accessories";
import { galleryItem } from "@/lib/gallery";
import { getImage, resolveImage } from "@/lib/images";
import {
  engineLabels,
  formatNumber,
  getMachine,
  machineHref,
  machines,
  seriesLabels,
  similarMachines,
} from "@/lib/machines";

export const dynamicParams = false;

export function generateStaticParams() {
  return machines.map((machine) => ({ slug: machine.slug }));
}

const describe = (machine: NonNullable<ReturnType<typeof getMachine>>) =>
  `${machine.name} (${machine.itemNumber}): ${seriesLabels[machine.series]}, ${engineLabels[
    machine.engine
  ].toLowerCase()} pogon, ${formatNumber(machine.kw)} kW, do ${machine.bar} bar, do ${formatNumber(
    machine.lpm,
  )} l/min.`;

export async function generateMetadata({
  params,
}: PageProps<"/proizvodi/masine/[slug]">): Promise<Metadata> {
  const machine = getMachine((await params).slug);
  if (!machine) return {};
  return {
    title: `${machine.name} (${machine.itemNumber})`,
    description: describe(machine),
    // Varijante (?varijanta=...) upućuju na osnovnu stranicu mašine
    alternates: { canonical: machineHref(machine.slug) },
    openGraph: { images: [getImage(machine.images[0].src).largest] },
  };
}

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default async function MasinaPage({ params }: PageProps<"/proizvodi/masine/[slug]">) {
  const machine = getMachine((await params).slug);
  if (!machine) notFound();

  const baseImages = machine.images.map(resolveImage);
  const variants = [
    { id: "standard", label: "Standard", itemNumber: machine.itemNumber, images: baseImages },
    ...(machine.variants ?? []).map((variant) => ({
      id: slugify(variant.label),
      label: variant.label,
      itemNumber: variant.itemNumber ?? machine.itemNumber,
      // Varijanta bez svojih slika koristi slike osnovne mašine
      images: variant.images?.length ? variant.images.map(resolveImage) : baseImages,
    })),
  ];

  const chips = [
    { label: "Pritisak", value: `do ${machine.bar} bar` },
    { label: "Protok", value: `do ${formatNumber(machine.lpm)} l/min` },
    { label: "Snaga", value: `${formatNumber(machine.kw)} kW` },
    { label: "Pogon", value: engineLabels[machine.engine] },
    ...(machine.hotWater ? [{ label: "Voda", value: "Topla" }] : []),
  ];

  const specGroups = [...new Set(machine.specs.map((spec) => spec.group))];
  const standard = machine.standard.flatMap((code) => getAccessory(code) ?? []);
  const recommended = groupByCategory(machine.recommended);

  return (
    <>
      <Container as="section" className="pb-16 pt-28 lg:pb-24 lg:pt-36">
        <Breadcrumbs
          tone="light"
          items={[
            { label: "Proizvodi", href: routes.proizvodi },
            { label: "Mašine", href: routes.masine },
            { label: machine.name },
          ]}
        />
        <MachineHero
          name={machine.name}
          kicker={`${seriesLabels[machine.series]} · ${engineLabels[machine.engine]}`}
          variants={variants}
          brochure={machine.brochure}
          chips={
            <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {chips.map((chip) => (
                <div key={chip.label} className="flex flex-col-reverse border-t border-line py-4">
                  <dt className="text-sm text-muted">{chip.label}</dt>
                  <dd className="font-mono text-xl font-medium tracking-tight">{chip.value}</dd>
                </div>
              ))}
            </dl>
          }
        />
      </Container>

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading stacked eyebrow="Specifikacija" title="Tehnički podaci." />
            </div>
          </div>
          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            {specGroups.map((group) => (
              <div key={group}>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-brand sm:text-[13px]">
                  {group}
                </h3>
                <dl className="mt-4">
                  {machine.specs
                    .filter((spec) => spec.group === group)
                    .map((spec) => (
                      <div
                        key={spec.label}
                        className="grid gap-1 border-t border-line py-4 last:border-b sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-6"
                      >
                        <dt className="text-muted">{spec.label}</dt>
                        <dd className="font-medium">{spec.value}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {standard.length > 0 && (
        <section className="bg-ink bg-[radial-gradient(60%_50%_at_85%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
          <Container>
            <SectionHeading
              tone="dark"
              eyebrow="U kompletu"
              title="Standardni pribor."
              lead="Isporučuje se uz mašinu."
            />
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4 xl:grid-cols-6">
              {standard.map((accessory) => (
                <li key={accessory.code}>
                  <AccessoryCard accessory={accessory} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {recommended.length > 0 && (
        <Container as="section" className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="Dodatno"
            title="Preporučeni pribor."
            lead="Pribor koji odgovara ovoj mašini, po kategorijama."
          />
          <div className="mt-12 lg:mt-16">
            {recommended.map((group, i) => (
              <details
                key={group.category.slug}
                open={i === 0}
                className="group border-t border-line last:border-b"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-2xl font-extrabold tracking-[-0.02em]">
                      {group.category.label}
                    </span>
                    <span className="font-mono text-sm text-muted">{group.items.length}</span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-brand ring-1 ring-line transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M10 4v12M4 10h12" />
                    </svg>
                  </span>
                </summary>
                <ul className="grid grid-cols-2 gap-4 pb-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {group.items.map((accessory) => (
                    <li key={accessory.code}>
                      <AccessoryCard accessory={accessory} />
                    </li>
                  ))}
                </ul>
                <Link
                  href={categoryHref(group.category.slug)}
                  className="group/link mb-8 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
                >
                  Sve u kategoriji {group.category.label}
                  <ArrowIcon className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </details>
            ))}
          </div>
        </Container>
      )}

      {machine.video && (
        <section className="bg-ink bg-[radial-gradient(60%_50%_at_15%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeading stacked tone="dark" eyebrow="Video" title="Mašina u radu." />
            </div>
            <div className="lg:col-span-8">
              <YouTube
                id={machine.video}
                title={machine.name}
                poster={
                  <Img
                    src={`masine/${machine.slug}/video`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                }
              />
            </div>
          </Container>
        </section>
      )}

      {machine.applicationImages.length > 0 && (
        <Container as="section" className="py-20 lg:py-28">
          <SectionHeading eyebrow="Na terenu" title="U primeni." />
          <Gallery
            className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5"
            items={machine.applicationImages.map((image) =>
              galleryItem(image, "(min-width: 1024px) 25vw, 50vw", "aspect-[4/3]"),
            )}
          />
        </Container>
      )}

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Mašine" title="Slične mašine." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {similarMachines(machine).map((similar) => (
              <li key={similar.slug}>
                <MachineCard
                  machine={similar}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Na telefonu ostavlja mesta za dugme pri dnu ekrana */}
      <div className="pb-[76px] lg:pb-0">
        <CtaBand
          eyebrow="Ponuda"
          title={`Zatražite ponudu za ${machine.name}.`}
          text={`Šifra ${machine.itemNumber} se upisuje u upit sama. Možete i da pišete na ${company.email}.`}
          button="Zatraži ponudu"
          href={quoteHref(machine.itemNumber)}
        />
      </div>
    </>
  );
}
