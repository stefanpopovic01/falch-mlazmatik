import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./Container";

type Crumb = { label: string; href?: string };

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
        <nav aria-label="Staza stranica">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-white/55 sm:text-[13px]">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/85">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

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
