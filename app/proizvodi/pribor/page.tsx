import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Container from "@/components/ui/Container";
import Img from "@/components/ui/Img";
import PageHeader from "@/components/ui/PageHeader";
import { routes } from "@/content/site";
import {
  accessories,
  accessoriesIn,
  accessoryCategories,
  categoryHref,
  getAccessory,
} from "@/lib/accessories";

const lead = `${accessories.length} artikala u ${accessoryCategories.length} kategorija. Izaberite kategoriju, pa tražite po nazivu ili šifri.`;

export const metadata: Metadata = {
  title: "Pribor",
  description: lead,
  alternates: { canonical: routes.pribor },
};

export default function PriborPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Početna", href: routes.home },
          { label: "Proizvodi", href: routes.proizvodi },
          { label: "Pribor" },
        ]}
        title="Pribor"
        lead={lead}
      />

      <Container as="section" className="py-14 lg:py-20">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {accessoryCategories.map((category) => {
            const items = accessoriesIn(category.slug);
            const image = getAccessory(category.cover)?.images[0];
            return (
              <li key={category.slug}>
                <Link
                  href={categoryHref(category.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(96,84,151,0.55)]"
                >
                  <div className="relative aspect-[8/5] bg-white">
                    {image && (
                      <Img
                        src={image.src}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-contain p-5 transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                      {items.length}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col border-t border-line p-5 lg:p-6">
                    <h2 className="font-display text-xl font-extrabold leading-tight tracking-[-0.02em] lg:text-2xl">
                      {category.label}
                    </h2>
                    <p className="mb-5 mt-2 hidden leading-relaxed text-muted sm:block">
                      {category.intro}
                    </p>
                    <span className="mt-auto grid size-10 place-items-center self-end rounded-full bg-mist text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>

      <CtaBand
        eyebrow="Pribor"
        title="Ne znate koji pribor ide uz vašu mašinu?"
        text="Javite nam model mašine i posao, a mi predlažemo pribor."
      />
    </>
  );
}
