import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Gallery from "@/components/ui/Gallery";
import Img from "@/components/ui/Img";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Steps from "@/components/ui/Steps";
import { demonstracije as content, servis } from "@/content/servis";
import { routes } from "@/content/site";
import { galleryItem } from "@/lib/gallery";

export const metadata: Metadata = {
  title: content.title,
  description: content.lead,
  alternates: { canonical: routes.demonstracije },
};

export default function DemonstracijePage() {
  const { how, test } = content;

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Početna", href: routes.home },
          { label: servis.title, href: routes.servis },
          { label: content.title },
        ]}
        title={content.title}
        lead={content.lead}
      >
        <div className="mt-10">
          <ButtonLink href={content.action.href} variant="light" arrow>
            {content.action.label}
          </ButtonLink>
        </div>
      </PageHeader>

      <Container as="section" className="py-20 lg:py-28">
        <SectionHeading eyebrow={how.eyebrow} title={how.title} lead={how.lead} />
        <Steps items={how.steps} className="mt-12 lg:mt-16" />

        {/* Prva slika je velika (2x2), ostale popunjavaju desnu stranu. */}
        <Gallery
          className="mt-8 grid grid-cols-2 gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-5"
          items={how.images.map((image, i) =>
            i === 0
              ? galleryItem(
                  image,
                  "(min-width: 1024px) 50vw, 100vw",
                  "col-span-2 aspect-[3/2] lg:row-span-2 lg:aspect-auto",
                )
              : galleryItem(
                  image,
                  "(min-width: 1024px) 25vw, 50vw",
                  i === 3 ? "col-span-2 aspect-[2/1] lg:aspect-[8/3]" : "aspect-[4/3]",
                ),
          )}
        />
      </Container>

      <section className="bg-ink bg-[radial-gradient(60%_50%_at_15%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-deep lg:col-span-6">
            <Img
              src={test.image.src}
              alt={test.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading
              stacked
              tone="dark"
              eyebrow={test.eyebrow}
              title={test.title}
              lead={test.lead}
            />
            <ul className="mt-10">
              {test.points.map((point) => (
                <li key={point.title} className="flex gap-5 border-t border-white/15 py-6 last:border-b">
                  <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold tracking-[-0.02em]">
                      {point.title}
                    </h3>
                    <p className="mt-1 leading-relaxed text-white/70">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand {...content.cta} />
    </>
  );
}
