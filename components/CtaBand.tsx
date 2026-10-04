import type { CSSProperties } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { company, cta, routes } from "@/content/site";

const rings = [70, 120, 170, 220, 270, 320, 370];

type Props = {
  eyebrow?: string;
  title?: string;
  text?: string;
  button?: string;
  href?: string;
};

export default function CtaBand({
  eyebrow = cta.eyebrow,
  title = cta.title,
  text = cta.text,
  button = cta.button,
  href = routes.kontakt,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      {/* Krugovi na vodi: statični prstenovi i tri koja se šire */}
      <div
        className="pointer-events-none absolute -right-[400px] top-0 -z-10 size-[800px] -translate-y-1/2 sm:-right-[260px] sm:top-1/2 lg:-right-[320px]"
        aria-hidden
      >
        <svg viewBox="0 0 800 800" className="size-full" fill="none">
          {rings.map((r, i) => (
            <circle
              key={r}
              cx="400"
              cy="400"
              r={r}
              stroke="white"
              strokeOpacity={0.22 - i * 0.027}
              strokeWidth="1.5"
            />
          ))}
          <circle cx="400" cy="400" r="14" fill="white" fillOpacity="0.5" />
        </svg>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="ripple absolute inset-0 rounded-full border border-white/60"
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand via-brand/85 to-transparent" />

      <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-24">
        <div className="lg:col-span-7">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,4.2vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            {title}
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-white/85 sm:text-xl">
            {text}
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:col-span-5 lg:flex-col lg:items-start">
          <ButtonLink href={href} variant="light" arrow>
            {button}
          </ButtonLink>
          <p>
            <span className="block font-mono text-xs uppercase tracking-[0.22em] text-white/70">
              ili pozovite
            </span>
            <a
              href={company.phone.href}
              className="mt-1 block font-mono text-2xl font-medium tracking-tight underline-offset-4 hover:underline sm:text-3xl"
            >
              {company.phone.label}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
