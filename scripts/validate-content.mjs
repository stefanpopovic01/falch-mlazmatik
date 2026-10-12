// Provera sadržaja pre builda. Pokretanje: npm run validate (automatski pre npm run build).
// Build pada ako nešto nedostaje, uz spisak grešaka.
import { readFile } from "node:fs/promises";

const read = async (file) => JSON.parse(await readFile(file, "utf8"));

const images = await read("lib/images.json");
const groups = await read("content/application-groups.json");
const applications = await read("content/applications.json");

const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

function checkImage(where, image) {
  if (!images[image.src]) fail(where, `slika "${image.src}" ne postoji (npm run images)`);
  if (typeof image.alt !== "string" || !image.alt.trim()) fail(where, `slika "${image.src}" nema alt`);
}

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

// ---------- pribor ----------
const categories = await read("content/accessory-categories.json");
const accessories = await read("content/accessories.json");
const categorySlugs = new Set(categories.map((category) => category.slug));
const accessoryCodes = new Set();
const accessorySlugs = new Set();

for (const [i, item] of accessories.entries()) {
  const where = `accessories.json [${item.code ?? `#${i}`}]`;
  for (const field of ["code", "slug", "name", "category"]) {
    if (typeof item[field] !== "string" || !item[field].trim()) fail(where, `nedostaje polje "${field}"`);
  }
  if (accessoryCodes.has(item.code)) fail(where, "šifra se ponavlja");
  if (accessorySlugs.has(item.slug)) fail(where, "slug se ponavlja");
  accessoryCodes.add(item.code);
  accessorySlugs.add(item.slug);
  if (!categorySlugs.has(item.category)) fail(where, `nepoznata kategorija "${item.category}"`);
  for (const image of item.images ?? []) checkImage(where, image);
}

// ---------- mašine ----------
const machines = await read("content/machines.json");
const machineSlugs = new Set();
const machineNumbers = new Set();

for (const [i, item] of machines.entries()) {
  const where = `machines.json [${item.itemNumber ?? item.slug ?? `#${i}`}]`;
  for (const field of ["slug", "name", "itemNumber"]) {
    if (typeof item[field] !== "string" || !item[field].trim()) fail(where, `nedostaje polje "${field}"`);
  }
  for (const field of ["kw", "bar", "lpm"]) {
    if (typeof item[field] !== "number") fail(where, `polje "${field}" mora biti broj`);
  }
  if (!["wheel-jet", "base-jet", "trail-jet"].includes(item.series)) fail(where, `nepoznata izvedba "${item.series}"`);
  if (!["electric", "petrol", "diesel"].includes(item.engine)) fail(where, `nepoznat motor "${item.engine}"`);
  if (machineSlugs.has(item.slug)) fail(where, "slug se ponavlja");
  if (machineNumbers.has(item.itemNumber)) fail(where, "šifra se ponavlja");
  machineSlugs.add(item.slug);
  machineNumbers.add(item.itemNumber);

  if (!Array.isArray(item.images) || item.images.length === 0) fail(where, "mora imati bar jednu sliku");
  for (const image of [...(item.images ?? []), ...(item.applicationImages ?? [])]) checkImage(where, image);
  for (const spec of item.specs ?? []) {
    if (!spec.group || !spec.label || !spec.value) fail(where, `nepotpun red specifikacije "${spec.label ?? "?"}"`);
  }
  for (const code of [...(item.standard ?? []), ...(item.recommended ?? [])]) {
    if (!accessoryCodes.has(code)) fail(where, `pribor "${code}" ne postoji u accessories.json`);
  }
  if (item.video && !images[`masine/${item.slug}/video`]) fail(where, `nedostaje poster videa "masine/${item.slug}/video"`);
  for (const variant of item.variants ?? []) {
    if (typeof variant.label !== "string" || !variant.label.trim()) fail(where, "varijanta nema naziv (label)");
    for (const image of variant.images ?? []) checkImage(`${where} varijanta "${variant.label}"`, image);
  }
}
for (const item of machines) {
  for (const slug of item.similar ?? []) {
    if (!machineSlugs.has(slug)) fail(`machines.json [${item.itemNumber}]`, `slična mašina "${slug}" ne postoji`);
  }
}

if (errors.length) {
  console.error(`Sadržaj nije ispravan (${errors.length}):\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  process.exit(1);
}

console.log(
  `Sadržaj je ispravan: ${applications.length} primena, ${machines.length} mašina, ${accessories.length} artikala pribora, ${Object.keys(images).length} slika.`,
);
