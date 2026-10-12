import MachineCard from "@/components/masine/MachineCard";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredMachines as content } from "@/content/home";
import { routes } from "@/content/site";
import { featuredMachines } from "@/lib/machines";

// Mašine sa "featured": true u content/machines.json. Bez njih se sekcija ne prikazuje.
export default function FeaturedMachines() {
  if (featuredMachines.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
          action={
            <ButtonLink href={routes.masine} variant="brand" size="md" arrow>
              {content.button}
            </ButtonLink>
          }
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {featuredMachines.map((machine) => (
            <li key={machine.slug}>
              <MachineCard
                machine={machine}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
