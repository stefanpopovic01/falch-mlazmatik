import categoriesData from "@/content/accessory-categories.json";
import accessoriesData from "@/content/accessories.json";

export type AccessoryCategory = { slug: string; label: string };

export type Accessory = {
  // Šifra artikla, npr. "S003"
  code: string;
  slug: string;
  category: string;
  name: string;
  // Originalni naziv sa falch.com (za proveru prevoda)
  nameEn: string;
  // Ostatak originalnog naziva razdvojen po zarezima (pritisak, navoj, dužina...)
  details: string[];
  images: { src: string; alt: string }[];
};

export const accessoryCategories: AccessoryCategory[] = categoriesData;

export const accessories: Accessory[] = accessoriesData;

const byCode = new Map(accessories.map((item) => [item.code, item]));

export const getAccessory = (code: string) => byCode.get(code);

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
