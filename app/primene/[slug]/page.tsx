import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ApplicationTile from "@/components/primene/ApplicationTile";
import Container from "@/components/ui/Container";
import Gallery from "@/components/ui/Gallery";
import Img from "@/components/ui/Img";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import YouTube from "@/components/ui/YouTube";
import { routes } from "@/content/site";
import {
  applicationHref,
  applications,
  getApplication,
  groupLabel,
  relatedApplications,
} from "@/lib/applications";
import { getImage } from "@/lib/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return applications.map((application) => ({ slug: application.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/primene/[slug]">): Promise<Metadata> {
  const application = getApplication((await params).slug);
  if (!application) return {};
  return {
    title: application.title,
    description: application.intro,
    alternates: { canonical: applicationHref(application.slug) },
    openGraph: { images: [getImage(application.images[0].src).largest] },
  };
}

export default async function PrimenaPage({ params }: PageProps<"/primene/[slug]">) {
  const application = getApplication((await params).slug);
  if (!application) notFound();

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Početna", href: routes.home },
          { label: "Primene", href: routes.primene },
          { label: application.title },
        ]}
        title={application.title}
        lead={application.intro}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {application.groups.map((group) => (
            <li key={group}>
              <a
                href={`${routes.primene}?grupa=${group}`}
                className="inline-block rounded-full border border-white/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 transition-colors hover:border-white hover:text-white"
              >
                {groupLabel(group)}
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      <Container as="section" className="py-14 lg:py-20" aria-label="Galerija">
        {/* Naslovna slika je velika (2x2), ostale popunjavaju desnu stranu. */}
        <Gallery
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
          items={application.images.map((image, i) => {
            const cover = i === 0;
            const full = getImage(image.src);
            return {
              className: cover ? "col-span-2 aspect-[3/2] lg:row-span-2 lg:aspect-auto" : "aspect-[4/3]",
              full: { src: full.largest, width: full.width, height: full.height, alt: image.alt },
              thumb: (
                <Img
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={cover}
                  sizes={
                    cover
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) 25vw, 50vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ),
            };
          })}
        />
      </Container>

      {application.video && (
        <section className="bg-ink bg-[radial-gradient(60%_50%_at_15%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeading
                stacked
                tone="dark"
                eyebrow="Video"
                title="Pogledajte kako to izgleda u radu."
              />
            </div>
            <div className="lg:col-span-8">
              <YouTube
                id={application.video}
                title={application.title}
                poster={
                  <Img
                    src={`primene/${application.slug}/video`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                }
              />
            </div>
          </Container>
        </section>
      )}

      <Container as="section" className="py-20 lg:py-28">
        <SectionHeading eyebrow="Primene" title="Slični poslovi." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {relatedApplications(application).map((related) => (
            <li key={related.slug}>
              <ApplicationTile
                application={related}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3]"
              />
            </li>
          ))}
        </ul>
      </Container>

      <CtaBand
        eyebrow="Upit"
        title="Imate ovakav posao?"
        text="Opišite nam ga i poslaćemo vam ponudu."
        button="Zatraži ponudu"
      />
    </>
  );
}
