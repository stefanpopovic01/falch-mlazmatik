import groupsData from "@/content/application-groups.json";
import applicationsData from "@/content/applications.json";
import { routes } from "@/content/site";

export type ApplicationGroup = { slug: string; label: string };

export type Application = {
  slug: string;
  // false sakriva primenu sa sajta bez brisanja
  published: boolean;
  groups: string[];
  title: string;
  intro: string;
  // YouTube ID. Poster je slika "primene/<slug>/video".
  video?: string;
  // Prva slika je naslovna. Najviše 5.
  images: { src: string; alt: string }[];
};

export const groups: ApplicationGroup[] = groupsData;

export const applications: Application[] = (applicationsData as Application[]).filter(
  (application) => application.published,
);

export const groupLabel = (slug: string) =>
  groups.find((group) => group.slug === slug)?.label ?? slug;

export const applicationHref = (slug: string) => `${routes.primene}/${slug}`;

export const getApplication = (slug: string) =>
  applications.find((application) => application.slug === slug);

// Tri primene iz iste glavne grupe, redom iz liste (isti rezultat pri svakom buildu).
export function relatedApplications(current: Application, count = 3) {
  const start = applications.indexOf(current);
  const rotated = [...applications.slice(start + 1), ...applications.slice(0, start)];
  const sameGroup = rotated.filter((item) => item.groups.includes(current.groups[0]));
  const others = rotated.filter((item) => !sameGroup.includes(item));
  return [...sameGroup, ...others].slice(0, count);
}
