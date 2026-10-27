import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import MachineHero from "@/components/masine/MachineHero";
import RobotCard from "@/components/roboti/RobotCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Container from "@/components/ui/Container";
import Gallery from "@/components/ui/Gallery";
import Img from "@/components/ui/Img";
import SectionHeading from "@/components/ui/SectionHeading";
import YouTube from "@/components/ui/YouTube";
import { driveLabels, typeLabels } from "@/content/robots-info";
import { company, emailText, quoteHref, routes } from "@/content/site";
import { applicationHref, getApplication } from "@/lib/applications";
import { galleryItem } from "@/lib/gallery";
import { getImage, resolveImage } from "@/lib/images";
import {
  type Robot,
  getRobot,
  robotGroups,
  robotHref,
  robotPressure,
  robotText,
  robots,
  similarRobots,
} from "@/lib/robots";
import { JsonLd, pageMetadata, productJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return robots.map((robot) => ({ slug: robot.slug }));
}

const describe = (robot: Robot) =>
  `${robot.name} (${robot.itemNumber}): ${typeLabels[robot.type].toLowerCase()} uređaj, ${driveLabels[
    robot.drive
  ].toLowerCase()} pogon. ${robotText(robot)}`;

export async function generateMetadata({
  params,
}: PageProps<"/proizvodi/roboti/[slug]">): Promise<Metadata> {
  const robot = getRobot((await params).slug);
  if (!robot) return {};
  return pageMetadata({
    title: `${robot.name} (${robot.itemNumber})`,
    description: describe(robot),
    path: robotHref(robot.slug),
    image: getImage(robot.images[0].src).largest,
  });
}

export default async function RobotPage({ params }: PageProps<"/proizvodi/roboti/[slug]">) {
  const robot = getRobot((await params).slug);
  if (!robot) notFound();

  const pressure = robotPressure(robot);
  const chips = [
    { label: "Način rada", value: typeLabels[robot.type] },
    { label: "Pogon", value: driveLabels[robot.drive] },
    ...(pressure ? [{ label: "Radni pritisak", value: pressure }] : []),
  ];

  // Primene sajta koje pokrivaju grupe ovog robota
  const applications = [
    ...new Set(
      robotGroups
        .filter((group) => robot.groups.includes(group.slug))
        .flatMap((group) => group.applications),
    ),
  ].flatMap((slug) => getApplication(slug) ?? []);

  const specGroups = [...new Set(robot.specs.map((spec) => spec.group))];

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: robot.name,
          sku: robot.itemNumber,
          path: robotHref(robot.slug),
          description: describe(robot),
          category: "Roboti za rad vodenim mlazom",
          images: robot.images.map((image) => getImage(image.src).largest),
          properties: chips.map((chip) => ({ name: chip.label, value: chip.value })),
        })}
      />
      <Container as="section" className="pb-16 pt-28 lg:pb-24 lg:pt-36">
        <Breadcrumbs
          tone="light"
          items={[
            { label: "Proizvodi", href: routes.proizvodi },
            { label: "Roboti", href: routes.roboti },
            { label: robot.name },
          ]}
        />
        <MachineHero
          name={robot.name}
          kicker={`${robot.family} · ${typeLabels[robot.type]}`}
          variants={[
            {
              id: "standard",
              label: "Standard",
              itemNumber: robot.itemNumber,
              images: robot.images.map(resolveImage),
            },
          ]}
          brochure={robot.brochure}
          chips={
            <>
              <p className="max-w-[48ch] text-lg leading-relaxed text-muted">{robotText(robot)}</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6">
                {chips.map((chip) => (
                  <div key={chip.label} className="flex flex-col-reverse border-t border-line py-4">
                    <dt className="text-sm text-muted">{chip.label}</dt>
                    <dd className="font-mono text-xl font-medium tracking-tight">{chip.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          }
        />
      </Container>

      {/* Video odmah posle slika, pre tehničkih podataka */}
      {robot.video && (
        <section className="bg-ink bg-[radial-gradient(60%_50%_at_15%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeading stacked tone="dark" eyebrow="Video" title="Robot u radu." />
            </div>
            <div className="lg:col-span-8">
              <YouTube
                id={robot.video}
                title={robot.name}
                poster={
                  <Img
                    src={`roboti/${robot.slug}/video`}
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

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading stacked eyebrow="Specifikacija" title="Tehnički podaci." />
            </div>
          </div>
          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            {specGroups.length === 0 && (
              <p className="max-w-[52ch] text-lg leading-relaxed text-muted">
                Za tehničke podatke ovog modela pošaljite upit ili pišite na{" "}
                {company.emails.map((email, i) => (
                  <span key={email}>
                    {i > 0 && " ili "}
                    <a href={`mailto:${email}`} className="font-semibold text-brand hover:underline">
                      {email}
                    </a>
                  </span>
                ))}
                {robot.brochure ? " ili preuzmite brošuru." : "."}
              </p>
            )}
            {specGroups.map((group) => (
              <div key={group}>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-brand sm:text-[13px]">
                  {group}
                </h3>
                <dl className="mt-4">
                  {robot.specs
                    .filter((spec) => spec.group === group)
                    .map((spec) => (
                      <div
                        key={spec.label}
                        className="grid gap-1 border-t border-line py-4 last:border-b sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-6"
                      >
                        <dt className="text-muted">{spec.label}</dt>
                        <dd className="font-medium">{spec.value}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            ))}

            {applications.length > 0 && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-brand sm:text-[13px]">
                  Primene
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {applications.map((application) => (
                    <li key={application.slug}>
                      <Link
                        href={applicationHref(application.slug)}
                        className="inline-block rounded-full border border-line bg-white px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                      >
                        {application.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>

      {robot.applicationImages.length > 0 && (
        <Container as="section" className="py-20 lg:py-28">
          <SectionHeading eyebrow="Na terenu" title="U primeni." />
          <Gallery
            className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5"
            items={robot.applicationImages.map((image) =>
              galleryItem(image, "(min-width: 1024px) 25vw, 50vw", "aspect-[4/3]"),
            )}
          />
        </Container>
      )}

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Roboti" title="Slični roboti." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {similarRobots(robot).map((similar) => (
              <li key={similar.slug}>
                <RobotCard
                  robot={similar}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Na telefonu ostavlja mesta za dugme pri dnu ekrana */}
      <div className="pb-[76px] lg:pb-0">
        <CtaBand
          eyebrow="Ponuda"
          title={`Zatražite ponudu za ${robot.name}.`}
          text={`Šifra ${robot.itemNumber} se upisuje u upit sama. Možete i da pišete na ${emailText}.`}
          button="Zatraži ponudu"
          href={quoteHref(robot.itemNumber)}
        />
      </div>
    </>
  );
}
