import groupsData from "@/content/robot-groups.json";
import { driveLabels, familyText, typeLabels } from "@/content/robots-info";
import robotsData from "@/content/robots.json";
import { routes } from "@/content/site";
import type { MachineImage } from "@/lib/machines";

export type RobotType = keyof typeof typeLabels;
export type Drive = keyof typeof driveLabels;

export type Robot = {
  slug: string;
  name: string;
  itemNumber: string;
  // Porodica, npr. "Lift Worker"; ključ za kratak opis u robots-info.ts
  family: string;
  type: RobotType;
  drive: Drive;
  // Slugovi grupa iz robot-groups.json
  groups: string[];
  images: MachineImage[];
  applicationImages: MachineImage[];
  specs: { group: string; label: string; value: string }[];
  // YouTube ID. Poster je slika "roboti/<slug>/video".
  video?: string;
  brochure?: string;
  // Napomene za proveru podataka. Ne prikazuju se na sajtu.
  review?: string[];
};

// Grupa primena sa Falchove stranice "robotics by application", povezana sa našim primenama
export type RobotGroup = {
  slug: string;
  label: string;
  applications: string[];
  // YouTube ID. Poster je slika "roboti/video-<slug>".
  video?: string;
};

export const robots = robotsData as Robot[];
export const robotGroups = groupsData as RobotGroup[];

export const robotHref = (slug: string) => `${routes.roboti}/${slug}`;
export const robotsHref = (group?: string) =>
  group ? `${routes.roboti}?primena=${group}#lista` : routes.roboti;

export const getRobot = (slug: string) => robots.find((robot) => robot.slug === slug);

export const robotText = (robot: Robot) => familyText[robot.family];

// "500 – 3000 bar (7252 – 43511 psi)" -> "500–3000 bar"
export function robotPressure(robot: Robot) {
  const value = robot.specs.find((spec) => spec.label === "Radni pritisak")?.value;
  return value?.replace(/\s*\(.*\)$/, "").replace(/\s*–\s*/g, "–");
}

export const filterValues = (robot: Robot) => ({
  tip: robot.type,
  pogon: robot.drive,
  primena: robot.groups,
});

export function filterGroups() {
  const used = (pick: (robot: Robot) => string[]) => new Set(robots.flatMap(pick));
  const types = used((robot) => [robot.type]);
  const drives = used((robot) => [robot.drive]);
  const groups = used((robot) => robot.groups);
  return [
    {
      key: "tip",
      label: "Način rada",
      options: (Object.keys(typeLabels) as RobotType[])
        .filter((type) => types.has(type))
        .map((type) => ({ value: type, label: typeLabels[type] })),
    },
    {
      key: "pogon",
      label: "Pogon",
      options: (Object.keys(driveLabels) as Drive[])
        .filter((drive) => drives.has(drive))
        .map((drive) => ({ value: drive, label: driveLabels[drive] })),
    },
    {
      key: "primena",
      label: "Primena",
      options: robotGroups
        .filter((group) => groups.has(group.slug))
        .map((group) => ({ value: group.slug, label: group.label })),
    },
  ];
}

// Roboti za stranicu primene: grupe koje pokrivaju tu primenu, prvo roboti sa najviše slika
export function robotsForApplication(applicationSlug: string, count = 4) {
  const groups = robotGroups.filter((group) => group.applications.includes(applicationSlug));
  const items = robots
    .filter((robot) => robot.groups.some((slug) => groups.some((group) => group.slug === slug)))
    .sort((a, b) => b.images.length - a.images.length || a.name.localeCompare(b.name));
  return { group: groups[0], total: items.length, items: items.slice(0, count) };
}

// Slični roboti: ista porodica, pa zajedničke primene, pa isti način rada
export function similarRobots(current: Robot, count = 3) {
  const score = (robot: Robot) =>
    (robot.family === current.family ? 4 : 0) +
    robot.groups.filter((group) => current.groups.includes(group)).length +
    (robot.type === current.type ? 1 : 0);
  return robots
    .filter((robot) => robot.slug !== current.slug)
    .sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name))
    .slice(0, count);
}
