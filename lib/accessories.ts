import categoriesData from "@/content/accessory-categories.json";
import accessoriesData from "@/content/accessories.json";
import { routes } from "@/content/site";

export type AccessoryCategory = {
  slug: string;
  label: string;
  intro: string;
  // Šifra artikla čija se fotografija prikazuje na pločici kategorije
  cover: string;
};

export type Accessory = {
  // Šifra artikla, npr. "S003"
  code: string;
  slug: string;
  category: string;
  name: string;
  // Originalni naziv sa falch.com (za proveru prevoda)
  nameEn: string;
  // Ostatak originalnog naziva razdvojen po zarezima (izvor za specs)
  details: string[];
  // Prva slika je naslovna. Najviše 3.
  images: { src: string; alt: string }[];
  specs: { label: string; value: string }[];
  // Šifre pribora koji se isporučuje uz artikal
  standard?: string[];
};

export const accessoryCategories: AccessoryCategory[] = categoriesData;

export const accessories = accessoriesData as Accessory[];

const byCode = new Map(accessories.map((item) => [item.code, item]));

export const getAccessory = (code: string) => byCode.get(code);

export const getCategory = (slug: string) =>
  accessoryCategories.find((category) => category.slug === slug);

export const categoryHref = (slug: string) => `${routes.pribor}/${slug}`;

export const accessoryHref = (accessory: Accessory) =>
  `${routes.pribor}/${accessory.category}/${accessory.slug}`;

export const accessoriesIn = (category: string) =>
  accessories.filter((item) => item.category === category);

export const getAccessoryBySlug = (category: string, slug: string) =>
  accessories.find((item) => item.category === category && item.slug === slug);

// Podatak koji se ističe na kartici: pritisak ako postoji, inače prvi red specifikacije
export function mainSpec(accessory: Accessory) {
  const spec =
    accessory.specs.find((item) => item.label === "Radni pritisak") ?? accessory.specs[0];
  return spec?.value;
}

// Sledeći artikli iz iste kategorije, redom iz liste (isti rezultat pri svakom buildu)
export function moreInCategory(current: Accessory, count = 4) {
  const items = accessoriesIn(current.category);
  const start = items.indexOf(current);
  return [...items.slice(start + 1), ...items.slice(0, start)].slice(0, count);
}

// Šifre pribora grupisane po kategoriji, redom kategorija iz accessory-categories.json
export function groupByCategory(codes: string[]) {
  const items = codes.flatMap((code) => getAccessory(code) ?? []);
  return accessoryCategories
    .map((category) => ({
      category,
      items: items.filter((item) => item.category === category.slug),
    }))
    .filter((group) => group.items.length > 0);
}
