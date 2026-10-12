import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import AccessoryCard from "@/components/pribor/AccessoryCard";
import AccessorySearch from "@/components/pribor/AccessorySearch";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { routes } from "@/content/site";
import { accessoriesIn, accessoryCategories, categoryHref, getCategory } from "@/lib/accessories";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return accessoryCategories.map((category) => ({ kategorija: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proizvodi/pribor/[kategorija]">): Promise<Metadata> {
  const category = getCategory((await params).kategorija);
  if (!category) return {};
  return pageMetadata({
    title: `${category.label} | Pribor`,
    description: category.intro,
    path: categoryHref(category.slug),
  });
}

export default async function KategorijaPage({
  params,
}: PageProps<"/proizvodi/pribor/[kategorija]">) {
  const category = getCategory((await params).kategorija);
  if (!category) notFound();
  const items = accessoriesIn(category.slug);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Proizvodi", href: routes.proizvodi },
          { label: "Pribor", href: routes.pribor },
          { label: category.label },
        ]}
        title={category.label}
        lead={category.intro}
      >
        <nav aria-label="Kategorije pribora" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {accessoryCategories.map((other) => (
              <li key={other.slug}>
                <Link
                  href={categoryHref(other.slug)}
                  aria-current={other.slug === category.slug ? "page" : undefined}
                  className={`inline-block rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    other.slug === category.slug
                      ? "border-white bg-white text-ink"
                      : "border-white/25 text-white/80 hover:border-white hover:text-white"
                  }`}
                >
                  {other.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <Container as="section" className="py-14 lg:py-20">
        <AccessorySearch
          items={items.map((accessory) => ({
            key: accessory.code,
            text: `${accessory.name} ${accessory.code} ${accessory.nameEn}`,
            node: (
              <AccessoryCard
                accessory={accessory}
                showSpec
                heading="h2"
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              />
            ),
          }))}
        />
      </Container>

      <CtaBand
        eyebrow="Cena"
        title="Treba vam cena ili rok isporuke?"
        text="Pošaljite šifru artikla i količinu."
        button="Zatraži cenu"
      />
    </>
  );
}
