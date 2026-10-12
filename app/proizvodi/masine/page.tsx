import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import MachineBrowser from "@/components/masine/MachineBrowser";
import MachineCard from "@/components/masine/MachineCard";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import { guide, listing } from "@/content/machines-info";
import { routes } from "@/content/site";
import {
  type Series,
  filterGroups,
  filterValues,
  machines,
  seriesLabels,
  seriesRange,
} from "@/lib/machines";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: listing.title,
  description: listing.lead,
  path: routes.masine,
});

const filtered = (key: string, values: (string | number)[]) =>
  `${routes.masine}?${key}=${values.join(",")}#lista`;

export default function MasinePage() {
  const bars = new Set(machines.map((machine) => machine.bar));
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Početna", href: routes.home },
          { label: "Proizvodi", href: routes.proizvodi },
          { label: listing.title },
        ]}
        title={listing.title}
        lead={listing.lead}
      />

      <Container as="section" className="py-14 lg:py-20">
        <MachineBrowser
          groups={filterGroups()}
          items={machines.map((machine) => ({
            slug: machine.slug,
            values: filterValues(machine),
            node: (
              <MachineCard
                machine={machine}
                heading="h2"
                sizes="(min-width: 1280px) 24vw, (min-width: 640px) 50vw, 100vw"
              />
            ),
          }))}
        />
      </Container>

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading stacked eyebrow={guide.eyebrow} title={guide.title} />
            <h3 className="mt-10 font-display text-2xl font-extrabold tracking-[-0.02em]">
              {guide.what.title}
            </h3>
            {guide.what.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em]">
              {guide.classes.title}
            </h3>
            <p className="mt-2 text-muted">{guide.classes.lead}</p>
            <ul className="mt-6">
              {guide.classes.rows.map((row) => {
                const available = row.bars.filter((bar) => bars.has(bar));
                return (
                  <li key={row.label} className="border-t border-line last:border-b">
                    <Link
                      href={filtered("pritisak", available)}
                      className="group flex items-center justify-between gap-6 py-6"
                    >
                      <span>
                        <span className="block font-mono text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-brand lg:text-3xl">
                          {row.label}
                        </span>
                        <span className="mt-1 block text-muted">{row.use}</span>
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-ink bg-[radial-gradient(60%_50%_at_85%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
        <Container>
          <SectionHeading tone="dark" eyebrow="Serije" title={`${guide.series.title}.`} />
          <ul className="mt-12 grid gap-x-8 md:grid-cols-3 lg:mt-16">
            {guide.series.items.map((item) => {
              const series = item.series as Series;
              const range = seriesRange(series);
              return (
                <li key={series} className="flex flex-col border-t border-white/15 py-8 lg:py-10">
                  <h3 className="font-display text-3xl font-extrabold tracking-[-0.02em] lg:text-4xl">
                    {seriesLabels[series]}
                  </h3>
                  <p className="mt-3 font-mono text-sm tracking-tight text-brand-light">
                    {range.kw} kW · {range.bar} bar · {range.count} mašina
                  </p>
                  <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-white/70">
                    {item.text}
                  </p>
                  <Link
                    href={filtered("izvedba", [series])}
                    className="group mt-6 inline-flex items-center gap-2 font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Prikaži {seriesLabels[series]}
                    <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <Container as="section" className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading stacked eyebrow="Izbor" title={`${guide.choose.title}.`} />
            </div>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {guide.choose.items.map((item) => (
              <li key={item.title} className="border-t border-line py-8 last:border-b">
                <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[52ch] text-lg leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading stacked eyebrow="Pitanja" title={`${guide.faq.title}.`} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {guide.faq.items.map((item) => (
              <details key={item.q} className="group border-t border-line last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-extrabold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-brand ring-1 ring-line transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M10 4v12M4 10h12" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[58ch] pb-6 text-lg leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>

      <JsonLd data={faqJsonLd} />

      <CtaBand />
    </>
  );
}
