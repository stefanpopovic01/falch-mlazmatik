@AGENTS.md

# Mlazmatik site

Site for Mlazmatik, a dealer of FALCH high-pressure water jetting machines. Reference: https://www.falch.com/en/. Scope follows the client proposal (Tyne Agency PDF): Početna, Primene (up to 44 pages, 8 groups), Proizvodi (Mašine with filters, Pribor in 13 categories), Servis, Kontakt, plus Privatnost, Kolačići, thank-you page and 404. Must be professional, fast, SEO-ready and mobile-first.

## Naming

- The section the proposal calls "Usluge" is named **"Servis"** everywhere (menu, route `/servis`, copy). Never write "Usluge".
- All copy is Serbian, Latin script. `lang="sr"`.
- Routes are Serbian (`/primene`, `/proizvodi/masine`, `/proizvodi/pribor`, `/servis`, `/kontakt`), decided 2026-10-04.
- Servis has no hub page: `/servis` is one page (repairs, spare parts), demonstrations are at `/servis/demonstracije`.
- Routes and menu live in `content/site.ts`. Never hardcode a path; use `routes`.

## Content sources

- The developer has permission from Falch and Mlazmatik to take texts, images and data from falch.com and mlazmatik.co.rs. Rewrite texts (no word-for-word copies), replace Falch contact details with Mlazmatik's, never invent technical specs.
- Fonts (Archivo, IBM Plex Sans, IBM Plex Mono) and the 25 s hero video are approved as they are.

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
- **Dark sections:** alternate light (`mist`) and dark (`bg-ink text-white`) sections for rhythm; on dark use `SectionHeading tone="dark"` and `ButtonLink` `light`/`outline`.
- **Image tiles:** full-bleed photo, `rounded-2xl`, ink gradient from the bottom, mono pill top-left, title bottom-left, round arrow bottom-right. See `components/home/FeaturedPrimene.tsx`.
- **Brand band:** `components/CtaBand.tsx` is the only full `bg-brand` surface (water-ripple rings, headline, Kontakt button, phone). Reuse it at the end of inner pages instead of inventing new CTAs.
- **Editorial list:** heading in a sticky left column, hairline-divided rows with an icon tile on the right. See `components/home/WhyUs.tsx`.
- **Motion:** `.rise` entrance with `--i` stagger; respect `prefers-reduced-motion`.

## Images and video

- Originals go in `media-src/` (git-ignored, not deployed). `npm run images` writes WebP to `public/media/<path>-<width>.webp` and the manifest `lib/images.json`. Both are committed. Nothing is deleted unless you pass `-- --prune`.
- Sizes depend on the file name (profiles at the top of `scripts/optimize-images.mjs`): `01` and any other name get 480/960/1600 (cover: cards, tiles, large view); `02`, `03`, ... get a single 960 px file used for both the thumbnail and the lightbox (decided 2026-10-04 to keep the repo small enough for Vercel Hobby limits); `video` or `video-<name>` gets 480/960 (YouTube poster); everything under `pribor/` gets 480/960 (small product shots). So in every gallery folder the cover is `01` and the rest are numbered. The largest size is about two thirds of the weight, so do not add sizes casually.
- Always render images with `components/ui/Img` (`src` is the path in `media-src/` without extension, e.g. `"primene/hidrodemolicija"`), with a required `alt` and a correct `sizes`. First-screen images get `priority`. Never use `next/image`: it would bill Vercel image optimization to the client.
- Video and YouTube load on click, except the hero background video, which is skipped on slow connections, data saver and reduced motion.

## Home page order

Hero (with trust bar), category cards, Izdvojene mašine (machines with `featured: true`), Primene, Zašto mi, CTA band, footer.

## Structure

- `content/` holds all text and data; components contain no copy. `site.ts` (routes, menu, company contact data, trust numbers, default CTA text), `home.ts` (home page texts), `servis.ts` (texts of `/servis` and `/servis/demonstracije`), `applications.json`, `application-groups.json`, `machines.json`, `machines-info.ts` (listing intro, power buckets for the filter, guide and FAQ), `accessories.json`, `accessory-categories.json`.
- `lib/` holds code that reads content (`applications.ts`, `images.ts`) and the generated `images.json`.
- `npm run validate` checks content against the image manifest and runs automatically before `npm run build`. Extend `scripts/validate-content.mjs` with every new content file.
- `components/ui/` shared building blocks (`Container`, `SectionHeading`, `PageHeader`, `Img`, `Gallery` with lightbox, `YouTube` click-to-load, `Steps` numbered columns for real sequences, `ButtonLink`), `components/<page>/` sections of one page.
- Inner pages start with `PageHeader` (dark, breadcrumb, h1, lead) and end with `CtaBand`.
- Contact: `/kontakt` has one form (`components/kontakt/ContactForm.tsx`, texts in `content/kontakt.ts`) that reads `tema`, `proizvod` and `varijanta` from the URL. It posts JSON to `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree or Web3Forms; see `.env.example`), then sets a sessionStorage flag and goes to `/kontakt/hvala`, which is `noindex`. Without the endpoint the form shows a clear message instead of pretending to send. `lib/analytics.ts` holds the conversion hook.
- Legal pages: texts in `content/legal.ts`, rendered by `components/LegalPage.tsx` (contents list on the left, text on the right). `/privatnost` is a draft written to match what the site does; while `draft: true` it shows a notice, and bracketed `[...]` placeholders mark what the client or their lawyer must fill in. Update the text whenever the site starts using a new service (form provider, analytics).
- Cookies and consent: `lib/consent.ts` (stored choice in localStorage for 12 months, Google Consent Mode v2 signals, GTM loader), `components/consent/CookieBanner.tsx` (Prilagodi, Odbij sve, Prihvati sve; reject and accept have equal weight), `ConsentManager` and `CookieSettingsButton`, all mounted in `app/layout.tsx`. The consent default (everything denied) is an inline script in `<head>`. Google Tag Manager (`NEXT_PUBLIC_GTM_ID`) is injected only after the visitor accepts analytics or marketing; never add a tracking script any other way. `trackEnquiry()` pushes `upit_poslat` to `dataLayer` only with consent. `/kolacici` lists every cookie and storage key: update the tables in `content/legal.ts` when a tool is added.
- SEO: every page builds its metadata with `pageMetadata({ title, description, path, image? })` from `lib/seo.tsx` (canonical, Open Graph, Twitter card; pages without an image use `app/opengraph-image.jpg`). `siteUrl` in `content/site.ts` comes from `NEXT_PUBLIC_SITE_URL`. Structured data: `organizationJsonLd()` on Početna and Kontakt, `productJsonLd()` on machine and accessory pages, breadcrumbs automatically from `Breadcrumbs`, FAQ on the machines listing. `app/sitemap.ts` and `app/robots.ts` are generated from content; add new routes to the sitemap. `/kontakt/hvala` is `noindex` and not in the sitemap.
- `error` (`#b3261e`) is the only extra color and is used solely for form error messages.
- Links to the contact form carry the enquiry topic: use `contactHref("servis" | "rezervni-deo" | "demonstracija")` from `content/site.ts` (`/kontakt?tema=...`). The contact page must read `tema`.
- Galleries: build items with `galleryItem()` from `lib/gallery.tsx` and lay them out with grid classes on `Gallery`.
- Do not copy Falch's service guarantees (response, repair and delivery times, 25-year parts availability) unless Mlazmatik confirms them.
- Machine images live in `media-src/masine/<slug>/`: `01`-`05` gallery, `11`-`14` photos in use, `21`+, `31`+ ... images of the 1st, 2nd ... variant, `video` poster. Accessory images: `media-src/pribor/<code lowercase>/01`.
- Machine data was imported from falch.com on 2026-10-12. `kw` is pump power, `bar` and `lpm` are the maximums; never derive them from the name. Each machine may carry a `review` array of spec values that looked wrong on Falch's site; it is not rendered. Rows whose Falch value contained a template placeholder were dropped. Never render a "rent" row.
- Brochures are linked to Falch's hosted PDF (`brochure` is a URL), not stored in the repo: 26 files at about 1.9 MB each would add roughly 50 MB.
- Accessories: `/proizvodi/pribor` (13 category tiles, cover photo set by `cover` code in `accessory-categories.json`), `/proizvodi/pribor/<kategorija>` (search by name or code, no filters), `/proizvodi/pribor/<kategorija>/<slug>`. Build links with `accessoryHref()` and `categoryHref()`; `AccessoryCard` is always a link.
- Accessory names were translated from a term list in the import; `nameEn` keeps Falch's original and `details` the rest of its title. `specs` come from Falch's structured attributes for 72 items; for the rest they were derived by pattern from the title (labels such as Priključak, Temperatura, Ostalo), so treat them as unverified. 45 items have no specs. Falch has no descriptions for these items.
- `components/ui/ProductGallery` is the product gallery (main image, thumbnails, lightbox) used by machines and accessories.
- Quote links: `quoteHref(itemNumber, variantLabel?)` from `content/site.ts` (`/kontakt?proizvod=G411&varijanta=...`).
- Product pages have no `PageHeader`: they start on the light background with `Breadcrumbs tone="light"` and `pt-28 lg:pt-36`.
- Filters keep their state in the URL with Serbian parameter names (`/primene?grupa=brodovi`).
- Server components by default; `"use client"` only where state or browser APIs are needed. Pass server-rendered `Img` elements into client components as props instead of importing the manifest on the client.
- Footer is in `app/layout.tsx`.
