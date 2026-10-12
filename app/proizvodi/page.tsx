import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Container from "@/components/ui/Container";
import Img from "@/components/ui/Img";
import PageHeader from "@/components/ui/PageHeader";
import { routes } from "@/content/site";
import { accessories, accessoryCategories } from "@/lib/accessories";
import { machines } from "@/lib/machines";
import { pageMetadata } from "@/lib/seo";

const lead = "Visokopritisne mašine i pribor koji ide uz njih.";

export const metadata = pageMetadata({
  title: "Proizvodi",
  description: lead,
  path: routes.proizvodi,
});

const sections = [
  {
    title: "Mašine",
    meta: `${machines.length} mašina`,
    text: "Wheel Jet, Base Jet i Trail Jet, sa električnim, benzinskim i dizel pogonom.",
    href: routes.masine,
    image: machines.find((machine) => machine.featured)?.images[0].src ?? machines[0].images[0].src,
  },
  {
    title: "Pribor",
    meta: `${accessories.length} artikala · ${accessoryCategories.length} kategorija`,
    text: "Creva, pištolji, koplja, mlaznice, spojnice i zaštitna odeća.",
    href: routes.pribor,
    image: "pribor/s003/01",
  },
];

export default function ProizvodiPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Početna", href: routes.home }, { label: "Proizvodi" }]}
        title="Proizvodi"
        lead={lead}
      />

      <Container as="section" className="py-14 lg:py-20">
        <ul className="grid gap-5 md:grid-cols-2 lg:gap-8">
          {sections.map((section) => (
            <li key={section.title}>
              <Link
                href={section.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(96,84,151,0.55)]"
              >
                <div className="relative aspect-[16/10] bg-white">
                  <Img
                    src={section.image}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                    {section.meta}
                  </span>
                </div>
                <div className="flex flex-1 items-end justify-between gap-6 border-t border-line p-7 lg:p-9">
                  <div>
                    <h2 className="font-display text-4xl font-extrabold tracking-[-0.03em] lg:text-5xl">
                      {section.title}
                    </h2>
                    <p className="mt-3 max-w-[40ch] text-lg leading-relaxed text-muted">
                      {section.text}
                    </p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-mist text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <CtaBand />
    </>
  );
}
