import type { Metadata } from "next";
import EnquirySent from "@/components/kontakt/EnquirySent";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { hvala as content } from "@/content/kontakt";
import { company, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Upit je poslat",
  // Stranica se ne prikazuje u pretrazi i ne ulazi u sitemap
  robots: { index: false, follow: false },
};

export default function HvalaPage() {
  return (
    <section className="flex min-h-svh items-center bg-ink bg-[radial-gradient(60%_60%_at_85%_0%,rgba(96,84,151,0.5),transparent)] text-white">
      <Container className="py-32">
        <Eyebrow tone="light">Upit</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.96] tracking-[-0.035em]">
          {content.title}
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-white/80 sm:text-xl">
          {content.lead}
        </p>
        <EnquirySent />

        <dl className="mt-10 flex flex-col gap-x-12 gap-y-4 border-t border-white/15 pt-8 sm:flex-row">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">Telefon</dt>
            <dd className="mt-1">
              <a href={company.phone.href} className="font-mono text-xl hover:underline">
                {company.phone.label}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              Radno vreme
            </dt>
            <dd className="mt-1 text-lg text-white/85">{company.hours.join(" · ")}</dd>
          </div>
        </dl>

        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
          {content.links}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={routes.masine} variant="light" arrow>
            Mašine
          </ButtonLink>
          <ButtonLink href={routes.pribor} variant="outline">
            Pribor
          </ButtonLink>
          <ButtonLink href={routes.home} variant="outline">
            Početna
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
