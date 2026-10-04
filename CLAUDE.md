@AGENTS.md

# Mlazmatik site

Site for Mlazmatik, a dealer of FALCH high-pressure water jetting machines. Reference: https://www.falch.com/en/. Scope follows the client proposal (Tyne Agency PDF): Početna, Primene (up to 44 pages, 8 groups), Proizvodi (Mašine with filters, Pribor in 13 categories), Servis, Kontakt, plus Privatnost, Kolačići, thank-you page and 404. Must be professional, fast, SEO-ready and mobile-first.

## Naming

- The section the proposal calls "Usluge" is named **"Servis"** everywhere (menu, route `/servis`, copy). Never write "Usluge".
- All copy is Serbian, Latin script. `lang="sr"`.
- Routes and menu live in `lib/site.ts`. Never hardcode a path; use `routes`.

## Layout rules (keep every page consistent)

- **Content width and side margins:** always wrap content in `components/ui/Container` (`max-w-[1320px]`, `px-5`, `sm:px-8`). Never set page-level horizontal padding by hand. Full-bleed backgrounds go on the section, the Container goes inside.
- **Section spacing:** `py-20 lg:py-28`. Gap from section heading to content: `mt-12 lg:mt-16`.
- **Section heading:** use `components/ui/SectionHeading` (eyebrow + h2 + optional lead on the right). h2 is `font-display font-extrabold`, `text-[clamp(2rem,4.2vw,3.5rem)]`, `leading-[1.02]`, `tracking-[-0.03em]`, `max-w-[18ch]`. Lead is `text-lg text-muted max-w-[44ch]`.
- **Page title (h1):** `font-display font-extrabold`, `leading-[0.94]`, `tracking-[-0.035em]`. Home hero uses `clamp(2.75rem,7.4vw,6.25rem)`; inner pages use `clamp(2.5rem,6vw,5rem)`.
- **Eyebrow:** `components/ui/Eyebrow` (mono, uppercase, short line before the text). `tone="light"` on dark, `tone="brand"` on light.
- **Header** is fixed and lives in `app/layout.tsx`. It is transparent only on `/` (over the hero); elsewhere it is solid `ink`. Inner pages must start with a dark page-header section or top padding of at least `pt-32 lg:pt-40` so content clears it.

## Visual language

- **Colors** (tokens in `app/globals.css`): `brand #605497`, `brand-light #8b80c2`, `brand-deep #3b3266`, `ink #17132b` (dark surfaces, text), `mist #f4f2f9` (page background), `line #e3dfef` (borders), `muted #5d5873` (secondary text). No other accent colors.
- **Fonts:** Archivo (`font-display`, headings), IBM Plex Sans (`font-sans`, body), IBM Plex Mono (`font-mono`, eyebrows, numbers, technical data such as bar/kW/codes).
- **Buttons:** `components/ui/ButtonLink`, always `rounded-full`. `light` and `outline` on dark backgrounds, `brand` and `ghost` on light.
- **Cards:** white, `rounded-2xl`, `ring-1 ring-line`, hover lift with brand-tinted shadow, image `aspect-[4/3]`, mono pill label over the image. See `components/home/CategoryCards.tsx`.
- **Motion:** `.rise` entrance with `--i` stagger; respect `prefers-reduced-motion`.

## Images and video

- Originals go in `media-src/` (not deployed). Run `npm run images` to produce WebP in `public/media/` (max 1920px wide, same folder structure). Only reference the `.webp` files.
- Always render with `next/image` and a correct `sizes`. Above-the-fold image gets `preload`.
- Video and YouTube load on click, except the hero background video, which is skipped on slow connections, data saver and reduced motion.

## Structure

- `components/ui/` shared building blocks, `components/<page>/` sections of one page, `lib/` data and config.
- Server components by default; `"use client"` only where state or browser APIs are needed.
