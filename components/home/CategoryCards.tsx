import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { routes } from "@/lib/site";

const cards = [
  {
    title: "Primene",
    meta: "8 grupa · 44 primene",
    text: "Od čišćenja fasada i oplata do uklanjanja premaza i hidrodemolicije. Pronađite rešenje za svoj posao.",
    cta: "Pogledaj primene",
    href: routes.primene,
    image: "/media/primene.webp",
  },
  {
    title: "Proizvodi",
    meta: "Mašine · Pribor",
    text: "Visokopritisne mašine sa električnim, benzinskim i dizel motorom, uz pribor za svaku od njih.",
    cta: "Pogledaj proizvode",
    href: routes.proizvodi,
    image: "/media/proizvodi.webp",
  },
  {
    title: "Servis",
    meta: "Popravke · Delovi · Demonstracije",
    text: "Popravke i rezervni delovi, kao i demonstracija sa probnim čišćenjem pre kupovine.",
    cta: "Pogledaj servis",
    href: routes.servis,
    image: "/media/servis.webp",
  },
];

export default function CategoryCards() {
  return (
    <Container as="section" className="py-20 lg:py-28">
      <SectionHeading
        eyebrow="Ponuda"
        title="Sve za rad pod visokim pritiskom."
        lead="Krenite od posla koji treba da uradite, od mašine koju tražite ili od podrške koja vam je potrebna."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(96,84,151,0.55)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-deep">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
              <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                {card.meta}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7 lg:p-8">
              <h3 className="font-display text-3xl font-extrabold tracking-[-0.02em]">
                {card.title}
              </h3>
              <p className="mb-8 mt-3 leading-relaxed text-muted">{card.text}</p>
              <span className="mt-auto flex items-center justify-between border-t border-line pt-5 font-semibold text-brand">
                {card.cta}
                <span className="grid size-10 place-items-center rounded-full bg-mist transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
