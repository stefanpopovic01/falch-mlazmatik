// Provera sadržaja pre builda. Pokretanje: npm run validate (automatski pre npm run build).
// Build pada ako nešto nedostaje, uz spisak grešaka.
import { readFile } from "node:fs/promises";

const read = async (file) => JSON.parse(await readFile(file, "utf8"));

const images = await read("lib/images.json");
const groups = await read("content/application-groups.json");
const applications = await read("content/applications.json");

const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

const groupSlugs = new Set(groups.map((group) => group.slug));
const seen = new Set();

for (const [i, item] of applications.entries()) {
  const where = `applications.json [${item.slug ?? `#${i}`}]`;

  for (const field of ["slug", "title", "intro"]) {
    if (typeof item[field] !== "string" || !item[field].trim()) fail(where, `nedostaje polje "${field}"`);
  }
  if (typeof item.published !== "boolean") fail(where, 'polje "published" mora biti true ili false');
  if (seen.has(item.slug)) fail(where, "slug se ponavlja");
  seen.add(item.slug);

  if (!Array.isArray(item.groups) || item.groups.length === 0) fail(where, "mora imati bar jednu grupu");
  for (const group of item.groups ?? []) {
    if (!groupSlugs.has(group)) fail(where, `nepoznata grupa "${group}"`);
  }

  if (!Array.isArray(item.images) || item.images.length === 0) fail(where, "mora imati bar jednu sliku");
  if ((item.images ?? []).length > 5) fail(where, "najviše 5 slika");
  for (const image of item.images ?? []) {
    if (!images[image.src]) fail(where, `slika "${image.src}" ne postoji (npm run images)`);
    if (typeof image.alt !== "string" || !image.alt.trim()) fail(where, `slika "${image.src}" nema alt`);
  }

  if (item.video && !images[`primene/${item.slug}/video`]) {
    fail(where, `nedostaje poster videa "primene/${item.slug}/video"`);
  }
}

if (errors.length) {
  console.error(`Sadržaj nije ispravan (${errors.length}):\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  process.exit(1);
}

console.log(`Sadržaj je ispravan: ${applications.length} primena, ${Object.keys(images).length} slika.`);
