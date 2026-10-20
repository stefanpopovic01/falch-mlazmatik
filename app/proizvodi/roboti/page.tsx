import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import MachineBrowser from "@/components/masine/MachineBrowser";
import RobotCard from "@/components/roboti/RobotCard";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Container from "@/components/ui/Container";
import Img from "@/components/ui/Img";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import YouTube from "@/components/ui/YouTube";
import { groupsSection, intro, listing } from "@/content/robots-info";
import { routes } from "@/content/site";
import { filterGroups, filterValues, robotGroups, robots, robotsHref } from "@/lib/robots";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: listing.title,
  description: listing.lead,
  path: routes.roboti,
});

export default function RobotiPage() {
  const videoGroups = robotGroups.filter((group) => group.video);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Početna", href: routes.home },
          { label: "Proizvodi", href: routes.proizvodi },
          { label: listing.title },
        ]}
        title={listing.title}
        lead={listing.lead}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading stacked eyebrow={intro.eyebrow} title={intro.title} />
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em]">
              {intro.advantagesTitle}
            </h3>
            <ul className="mt-6 grid sm:grid-cols-2 sm:gap-x-8">
              {intro.advantages.map((advantage, i) => (
                <li key={advantage} className="flex gap-4 border-t border-line py-5">
                  <span className="font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg leading-snug">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Container as="section" className="py-14 lg:py-20">
        <MachineBrowser
          groups={filterGroups()}
          empty="Nema robota za izabrane filtere."
          items={robots.map((robot) => ({
            slug: robot.slug,
            values: filterValues(robot),
            node: (
              <RobotCard
                robot={robot}
                heading="h2"
                sizes="(min-width: 1280px) 24vw, (min-width: 640px) 50vw, 100vw"
              />
            ),
          }))}
        />
      </Container>

      {videoGroups.length > 0 && (
        <section className="bg-ink bg-[radial-gradient(60%_50%_at_85%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
          <Container>
            <SectionHeading
              tone="dark"
              eyebrow={groupsSection.eyebrow}
              title={groupsSection.title}
              lead={groupsSection.lead}
            />
            <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {videoGroups.map((group) => (
                <li key={group.slug}>
                  <YouTube
                    id={group.video!}
                    title={group.label}
                    poster={
                      <Img
                        src={`roboti/video-${group.slug}`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    }
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-extrabold tracking-[-0.02em]">
                      {group.label}
                    </h3>
                    <Link
                      href={robotsHref(group.slug)}
                      className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
                    >
                      Roboti
                      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaBand
        eyebrow="Savet pri izboru"
        title="Niste sigurni koji robot vam treba?"
        text="Opišite nam posao i površinu, pa ćemo vam predložiti robota."
      />
    </>
  );
}
