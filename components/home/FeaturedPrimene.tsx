import ApplicationTile from "@/components/primene/ApplicationTile";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredApplications as content } from "@/content/home";
import { routes } from "@/content/site";
import { getApplication } from "@/lib/applications";

export default function FeaturedPrimene() {
  const featured = content.slugs.flatMap((slug) => getApplication(slug) ?? []);

  return (
    <section className="bg-ink bg-[radial-gradient(60%_50%_at_85%_0%,rgba(96,84,151,0.45),transparent)] py-20 text-white lg:py-28">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
          action={
            <ButtonLink href={routes.primene} variant="outline" size="md" arrow>
              {content.button}
            </ButtonLink>
          }
        />

        {/* Prva pločica je velika (2x2), ostale četiri popunjavaju desnu stranu. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          {featured.map((application, i) => {
            const big = i === 0;
            return (
              <ApplicationTile
                key={application.slug}
                application={application}
                big={big}
                sizes={
                  big
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                }
                className={`aspect-[4/3] ${
                  big
                    ? "sm:col-span-2 sm:aspect-[2/1] lg:row-span-2 lg:aspect-auto lg:p-8"
                    : "lg:aspect-[5/4]"
                }`}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
