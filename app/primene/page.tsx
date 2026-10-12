import CtaBand from "@/components/CtaBand";
import ApplicationTile from "@/components/primene/ApplicationTile";
import ApplicationsBrowser from "@/components/primene/ApplicationsBrowser";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { routes } from "@/content/site";
import { applications, groups } from "@/lib/applications";
import { pageMetadata } from "@/lib/seo";

const lead =
  "Voda pod visokim pritiskom čisti, skida premaze i uklanja beton. Izaberite grupu i pronađite posao koji radite.";

export const metadata = pageMetadata({
  title: "Primene",
  description: lead,
  path: routes.primene,
});

export default function PrimenePage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Početna", href: routes.home }, { label: "Primene" }]} title="Primene" lead={lead} />

      <Container as="section" className="py-14 lg:py-20">
        <ApplicationsBrowser
          groups={groups.map((group) => ({
            ...group,
            count: applications.filter((item) => item.groups.includes(group.slug)).length,
          }))}
          tiles={applications.map((application) => ({
            slug: application.slug,
            groups: application.groups,
            node: (
              <ApplicationTile
                application={application}
                heading="h2"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3]"
              />
            ),
          }))}
        />
      </Container>

      <CtaBand
        eyebrow="Savet"
        title="Niste sigurni koja primena odgovara vašem poslu?"
        text="Pozovite nas ili nam opišite posao."
      />
    </>
  );
}
