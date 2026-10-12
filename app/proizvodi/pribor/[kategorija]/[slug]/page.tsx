import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import AccessoryCard from "@/components/pribor/AccessoryCard";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/ui/Container";
import ProductGallery from "@/components/ui/ProductGallery";
import SectionHeading from "@/components/ui/SectionHeading";
import { quoteHref, routes } from "@/content/site";
import {
  accessories,
  accessoryHref,
  categoryHref,
  getAccessory,
  getAccessoryBySlug,
  getCategory,
  moreInCategory,
} from "@/lib/accessories";
import { getImage, resolveImage } from "@/lib/images";
import { machineHref, machines } from "@/lib/machines";
import { JsonLd, pageMetadata, productJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return accessories.map((accessory) => ({
    kategorija: accessory.category,
    slug: accessory.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proizvodi/pribor/[kategorija]/[slug]">): Promise<Metadata> {
  const { kategorija, slug } = await params;
  const accessory = getAccessoryBySlug(kategorija, slug);
  if (!accessory) return {};
  const specs = accessory.specs
    .slice(0, 3)
    .map((spec) => `${spec.label}: ${spec.value}`)
    .join(", ");
  return pageMetadata({
    title: `${accessory.name} (${accessory.code})`,
    description: `${accessory.name}, šifra ${accessory.code}.${specs ? ` ${specs}.` : ""}`,
    path: accessoryHref(accessory),
    image: accessory.images[0] ? getImage(accessory.images[0].src).largest : undefined,
  });
}

export default async function ArtikalPage({
  params,
}: PageProps<"/proizvodi/pribor/[kategorija]/[slug]">) {
  const { kategorija, slug } = await params;
  const accessory = getAccessoryBySlug(kategorija, slug);
  const category = getCategory(kategorija);
  if (!accessory || !category) notFound();

  const standard = (accessory.standard ?? []).flatMap((code) => getAccessory(code) ?? []);
  const usedWith = machines.filter(
    (machine) =>
      machine.standard.includes(accessory.code) || machine.recommended.includes(accessory.code),
  );
  const quote = quoteHref(accessory.code);

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: accessory.name,
          sku: accessory.code,
          path: accessoryHref(accessory),
          description: `${accessory.name}, šifra ${accessory.code}.`,
          category: `${category.label}, pribor`,
          images: accessory.images.map((image) => getImage(image.src).largest),
          properties: accessory.specs.map((spec) => ({ name: spec.label, value: spec.value })),
        })}
      />
      <Container as="section" className="pb-16 pt-28 lg:pb-24 lg:pt-36">
        <Breadcrumbs
          tone="light"
          items={[
            { label: "Proizvodi", href: routes.proizvodi },
            { label: "Pribor", href: routes.pribor },
            { label: category.label, href: categoryHref(category.slug) },
            { label: accessory.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            {accessory.images.length > 0 && (
              <ProductGallery
                images={accessory.images.map(resolveImage)}
                aspect="aspect-[8/5]"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            )}
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand sm:text-[13px]">
              {category.label}
            </p>
            <h1 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              {accessory.name}
            </h1>
            <p className="mt-4 text-lg text-muted">
              Šifra <span className="font-mono font-medium text-ink">{accessory.code}</span>
            </p>

            {accessory.specs.length > 0 && (
              <dl className="mt-8">
                {accessory.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid gap-1 border-t border-line py-3.5 last:border-b sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-6"
                  >
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <Link
              href={quote}
              className="group mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-deep sm:w-auto"
            >
              Zatraži cenu
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>

      {standard.length > 0 && (
        <section className="bg-ink bg-[radial-gradient(60%_50%_at_85%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
          <Container>
            <SectionHeading
              tone="dark"
              eyebrow="U kompletu"
              title="Standardni pribor."
              lead="Isporučuje se uz ovaj artikal."
            />
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4 xl:grid-cols-5">
              {standard.map((item) => (
                <li key={item.code}>
                  <AccessoryCard accessory={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {usedWith.length > 0 && (
        <section className="bg-white py-20 lg:py-24">
          <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeading stacked eyebrow="Mašine" title="Odgovara mašinama." />
            </div>
            <ul className="flex flex-wrap content-start gap-2 lg:col-span-7 lg:col-start-6">
              {usedWith.map((machine) => (
                <li key={machine.slug}>
                  <Link
                    href={machineHref(machine.slug)}
                    className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-[15px] font-medium ring-1 ring-line transition-colors hover:text-brand hover:ring-brand"
                  >
                    {machine.name}
                    <span className="font-mono text-xs text-muted">{machine.itemNumber}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <Container as="section" className="py-20 lg:py-28">
        <SectionHeading
          eyebrow={category.label}
          title="Još iz ove kategorije."
          action={
            <Link
              href={categoryHref(category.slug)}
              className="group inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
            >
              Cela kategorija
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4">
          {moreInCategory(accessory).map((item) => (
            <li key={item.code}>
              <AccessoryCard
                accessory={item}
                showSpec
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </Container>

      <CtaBand
        eyebrow="Cena"
        title={`Zatražite cenu za ${accessory.code}.`}
        text="Šifra se upisuje u upit sama. Dodajte količinu i model mašine."
        button="Zatraži cenu"
        href={quote}
      />
    </>
  );
}
