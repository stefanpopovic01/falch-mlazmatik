import type { MetadataRoute } from "next";
import { routes } from "@/content/site";
import { accessories, accessoryCategories, accessoryHref, categoryHref } from "@/lib/accessories";
import { applicationHref, applications } from "@/lib/applications";
import { machineHref, machines } from "@/lib/machines";
import { absoluteUrl } from "@/lib/seo";

// Sitemap se gradi iz sadržaja. Stranica /kontakt/hvala namerno nije u njemu.
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    priority,
  });

  return [
    entry(routes.home, 1),
    entry(routes.masine, 0.9),
    entry(routes.proizvodi, 0.8),
    entry(routes.pribor, 0.8),
    entry(routes.primene, 0.8),
    entry(routes.servis, 0.7),
    entry(routes.demonstracije, 0.7),
    entry(routes.kontakt, 0.7),
    ...machines.map((machine) => entry(machineHref(machine.slug), 0.8)),
    ...applications.map((application) => entry(applicationHref(application.slug), 0.6)),
    ...accessoryCategories.map((category) => entry(categoryHref(category.slug), 0.6)),
    ...accessories.map((accessory) => entry(accessoryHref(accessory), 0.5)),
    entry(routes.privatnost, 0.2),
    entry(routes.kolacici, 0.2),
  ];
}
