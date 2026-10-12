import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Container from "./Container";

type Props = {
  // Staza stranica. Poslednja stavka je trenutna stranica (bez href).
  crumbs: Crumb[];
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
};

// Tamno zaglavlje unutrašnjih stranica. Ostavlja mesta za fiksni Header.
export default function PageHeader({ crumbs, title, lead, children }: Props) {
  return (
    <section className="bg-ink bg-[radial-gradient(60%_70%_at_85%_0%,rgba(96,84,151,0.5),transparent)] pb-14 pt-32 text-white lg:pb-20 lg:pt-44">
      <Container>
        <Breadcrumbs items={crumbs} />

        <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.96] tracking-[-0.035em]">
          {title}
        </h1>

        {lead && (
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-white/80 sm:text-xl">
            {lead}
          </p>
        )}

        {children}
      </Container>
    </section>
  );
}
