import type { Metadata } from "next";
import type { ReactNode } from "react";
import ContactForm from "@/components/kontakt/ContactForm";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import PageHeader from "@/components/ui/PageHeader";
import { kontakt as content } from "@/content/kontakt";
import { company, routes } from "@/content/site";
import { accessories } from "@/lib/accessories";
import { machines } from "@/lib/machines";

export const metadata: Metadata = {
  title: content.title,
  description: content.lead,
  alternates: { canonical: routes.kontakt },
};

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-line py-6 last:border-b">
      <dt className="font-mono text-xs uppercase tracking-[0.22em] text-muted">{label}</dt>
      <dd className="mt-3 text-lg leading-relaxed">{children}</dd>
    </div>
  );
}

const link = "transition-colors hover:text-brand";

export default function KontaktPage() {
  // Šifre mašina, njihovih varijanti i pribora, da formular uz šifru prikaže naziv
  const products = Object.fromEntries([
    ...accessories.map((item) => [item.code, item.name]),
    ...machines.flatMap((machine) => [
      [machine.itemNumber, machine.name],
      ...(machine.variants ?? []).flatMap((variant) =>
        variant.itemNumber ? [[variant.itemNumber, `${machine.name}, ${variant.label}`]] : [],
      ),
    ]),
  ]);
  const { details } = content;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Početna", href: routes.home }, { label: content.title }]}
        title={content.title}
        lead={content.lead}
      />

      <Container as="section" className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ContactForm products={products} />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{details.eyebrow}</Eyebrow>
              <p className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em]">
                {company.name}
              </p>
              <dl className="mt-8">
                <Detail label={details.address}>
                  <address className="not-italic">
                    {company.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  {/* Link umesto ugrađene mape: mapa bi postavila kolačiće pre saglasnosti */}
                  <a
                    href={company.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-base font-semibold text-brand underline-offset-4 hover:underline"
                  >
                    {details.map}
                  </a>
                </Detail>
                <Detail label={details.phone}>
                  <a href={company.phone.href} className={`block font-mono ${link}`}>
                    {company.phone.label}
                  </a>
                  <a href={company.mobile.href} className={`block font-mono ${link}`}>
                    {company.mobile.label}
                  </a>
                </Detail>
                <Detail label={details.email}>
                  <a href={`mailto:${company.email}`} className={link}>
                    {company.email}
                  </a>
                </Detail>
                <Detail label={details.hours}>
                  {company.hours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Detail>
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
