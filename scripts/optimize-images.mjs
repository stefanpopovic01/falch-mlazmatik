// Pretvara originale iz media-src/ u WebP u public/media/ (ista struktura foldera).
// Pokretanje: npm run images
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "media-src";
const OUT = "public/media";
const MAX_WIDTH = 1920;
const QUALITY = 78;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);

const force = process.argv.includes("--force");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

let converted = 0;
let skipped = 0;

for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const out = path.join(OUT, rel.replace(/\.[^.]+$/, ".webp"));
  const source = await stat(file);
  const existing = await stat(out).catch(() => null);

  if (!force && existing && existing.mtimeMs >= source.mtimeMs) {
    skipped++;
    continue;
  }

  await mkdir(path.dirname(out), { recursive: true });
  const info = await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out);

  converted++;
  console.log(
    `${rel} -> ${path.relative(OUT, out)}  ${info.width}x${info.height}  ${kb(source.size)} -> ${kb(info.size)}`,
  );
}

console.log(`Gotovo: ${converted} konvertovano, ${skipped} preskočeno.`);
