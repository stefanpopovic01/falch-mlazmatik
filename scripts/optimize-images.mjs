// Pretvara originale iz media-src/ u WebP u public/media/, svaku sliku u više širina,
// i upisuje lib/images.json (dimenzije i širine) koji čita komponenta <Img>.
// Pokretanje:
//   npm run images               nove i izmenjene slike
//   npm run images -- --force    ponovna konverzija svega
//   npm run images -- --prune    briše WebP i unose u manifestu čiji original više ne postoji
// media-src/ nije u gitu, pa se bez --prune ništa ne briše: slike bez originala ostaju netaknute.
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "media-src";
const OUT = "public/media";
const MANIFEST = "lib/images.json";
// Širine po vrsti slike. Samo naslovna slika (01) ima više veličina, da repozitorijum ostane lak.
const PROFILES = [
  // Poster video snimka: prikazuje se samo kao pločica
  { test: /\/video$/, steps: [480, 960] },
  // Slike galerije (02, 03, ...): samo jedna veličina, i za stranicu i za uvećani prikaz
  { test: /\/(0[2-9]|[1-9]\d)$/, steps: [960] },
  // Sve ostalo, uključujući naslovnu sliku (01): kartice, pločice i veliki prikaz
  { test: /./, steps: [480, 960, 1600] },
];
const QUALITY = 75;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);

const force = process.argv.includes("--force");
const prune = process.argv.includes("--prune");

async function* walk(dir, extensions) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full, extensions);
    else if (extensions.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

// Širine iz profila manje od originala, plus sam original (do najveće širine profila).
function widthsFor(key, originalWidth) {
  const { steps } = PROFILES.find((profile) => profile.test.test(key));
  const top = Math.min(originalWidth, steps.at(-1));
  return [...steps.filter((step) => step < top * 0.9), top];
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`;
const toPosix = (p) => p.split(path.sep).join("/");

if (!(await stat(SRC).catch(() => null))) {
  console.error(`Folder ${SRC}/ ne postoji. Dodajte originale slika u njega.`);
  process.exit(1);
}

const previous = JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}"));
const manifest = {};
const expected = new Set();
let converted = 0;
let skipped = 0;

for await (const file of walk(SRC, EXTENSIONS)) {
  const key = toPosix(path.relative(SRC, file)).replace(/\.[^.]+$/, "");
  if (manifest[key]) {
    throw new Error(`Dve slike imaju isto ime bez ekstenzije: ${key}`);
  }

  const source = await stat(file);
  const meta = await sharp(file).metadata();
  const rotated = (meta.orientation ?? 1) >= 5;
  const width = rotated ? meta.height : meta.width;
  const height = rotated ? meta.width : meta.height;
  const widths = widthsFor(key, width);
  const top = widths.at(-1);

  manifest[key] = {
    width: top,
    height: Math.round((height * top) / width),
    widths,
  };

  const sizes = [];
  for (const w of widths) {
    const out = path.join(OUT, `${key}-${w}.webp`);
    expected.add(path.normalize(out));
    const existing = await stat(out).catch(() => null);
    if (!force && existing && existing.mtimeMs >= source.mtimeMs) continue;

    await mkdir(path.dirname(out), { recursive: true });
    const info = await sharp(file)
      .rotate()
      .resize({ width: w })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(out);
    sizes.push(`${w}: ${kb(info.size)}`);
  }

  if (sizes.length) {
    converted++;
    console.log(`${key}  (${kb(source.size)})  ->  ${sizes.join(", ")}`);
  } else {
    skipped++;
  }
}

let removed = 0;
let kept = 0;
if (prune) {
  for await (const file of walk(OUT, new Set([".webp"]))) {
    if (!expected.has(path.normalize(file))) {
      await rm(file);
      removed++;
    }
  }
} else {
  for (const [key, entry] of Object.entries(previous)) {
    if (!manifest[key]) {
      manifest[key] = entry;
      kept++;
    }
  }
}

const sorted = Object.fromEntries(
  Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
);
await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);

console.log(
  `Gotovo: ${converted} konvertovano, ${skipped} preskočeno, ${removed} obrisano, ${kept} bez originala zadržano. Manifest: ${MANIFEST}`,
);
