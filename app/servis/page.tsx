import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ArrowIcon from "@/components/ui/ArrowIcon";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Gallery from "@/components/ui/Gallery";
import Img from "@/components/ui/Img";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Steps from "@/components/ui/Steps";
import YouTube from "@/components/ui/YouTube";
import { servis as content } from "@/content/servis";
import { routes } from "@/content/site";
import { galleryItem } from "@/lib/gallery";

export const metadata: Metadata = {
  title: content.title,
  description: content.lead,
  alternates: { canonical: routes.servis },
};

export default function ServisPage() {
  const { repairs, parts, videos, demoTeaser } = content;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Početna", href: routes.home }, { label: content.title }]}
        title={content.title}
        lead={content.lead}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={content.actions[0].href} variant="light" arrow>
            {content.actions[0].label}
          </ButtonLink>
          <ButtonLink href={content.actions[1].href} variant="outline">
            {content.actions[1].label}
          </ButtonLink>
        </div>
      </PageHeader>

      <Container as="section" className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading
              stacked
              eyebrow={repairs.eyebrow}
              title={repairs.title}
              lead={repairs.lead}
            />
            <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              {repairs.listTitle}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {repairs.list.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-white px-4 py-2 text-[15px] font-medium ring-1 ring-line"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Gallery
              className="grid grid-cols-3 gap-4 lg:gap-5"
              items={repairs.images.map((image, i) =>
                i === 0
                  ? galleryItem(image, "(min-width: 1024px) 50vw, 100vw", "col-span-3 aspect-[16/10]")
                  : galleryItem(image, "(min-width: 1024px) 17vw, 33vw", "aspect-[4/3]"),
              )}
            />
          </div>
        </div>
      </Container>

      <section className="bg-ink bg-[radial-gradient(60%_50%_at_85%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow={parts.eyebrow}
            title={parts.title}
            lead={parts.lead}
            action={
              <ButtonLink href={parts.button.href} variant="light" size="md" arrow>
                {parts.button.label}
              </ButtonLink>
            }
          />
          <Steps tone="dark" items={parts.steps} className="mt-12 lg:mt-16" />
        </Container>
      </section>

      <Container as="section" className="py-20 lg:py-28">
        <SectionHeading eyebrow={videos.eyebrow} title={videos.title} lead={videos.lead} />
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {videos.items.map((video) => (
            <li key={video.id}>
              <YouTube
                id={video.id}
                title={video.title}
                poster={
                  <Img
                    src={video.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                }
              />
              <h3 className="mt-4 font-display text-xl font-extrabold tracking-[-0.02em]">
                {video.title}
              </h3>
            </li>
          ))}
        </ul>

        <Link
          href={demoTeaser.href}
          className="group relative isolate mt-20 flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl bg-brand-deep p-6 text-white lg:mt-28 lg:min-h-[420px] lg:p-10"
        >
          <Img
            src={demoTeaser.image}
            alt=""
            fill
            sizes="(min-width: 1320px) 1256px, 100vw"
            className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-brand/30 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] backdrop-blur-sm lg:left-10 lg:top-10">
            {demoTeaser.label}
          </span>
          <div className="flex items-end justify-between gap-6">
            <h2 className="max-w-[16ch] font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] lg:text-5xl">
              {demoTeaser.title}
            </h2>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </Container>

      <CtaBand {...content.cta} />
    </>
  );
}
