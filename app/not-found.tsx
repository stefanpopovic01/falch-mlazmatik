import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { routes } from "@/lib/site";

export const metadata: Metadata = { title: "Stranica nije pronađena" };

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center bg-ink text-white">
      <Container className="py-32">
        <Eyebrow tone="light">Greška 404</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.96] tracking-[-0.035em]">
          Ova stranica ne postoji.
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-white/80">
          Adresa je pogrešna ili je stranica premeštena. Nastavite odavde:
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={routes.home} variant="light" arrow>
            Početna
          </ButtonLink>
          <ButtonLink href={routes.masine} variant="outline">
            Mašine
          </ButtonLink>
          <ButtonLink href={routes.pribor} variant="outline">
            Pribor
          </ButtonLink>
          <ButtonLink href={routes.kontakt} variant="outline">
            Kontakt
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
