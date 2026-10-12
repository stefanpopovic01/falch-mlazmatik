import type { Metadata } from "next";
import { company, routes, siteUrl } from "@/content/site";

const DEFAULT_SHARE_IMAGE = "/opengraph-image.jpg";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

type PageMeta = {
  title: string;
  description?: string;
  // Putanja stranice, npr. "/primene". Postaje canonical adresa.
  path: string;
  // Slika za deljenje na društvenim mrežama (putanja u /media). Bez nje ide podrazumevana.
  image?: string;
  // Stranica se ne prikazuje u pretrazi
  noindex?: boolean;
};

// Naslov, opis, canonical i podaci za deljenje linka, isti oblik na svakoj stranici.
export function pageMetadata({ title, description, path, image, noindex }: PageMeta): Metadata {
  // Stranice bez svoje slike koriste zajedničku (app/opengraph-image.jpg)
  const shareImage = image ?? DEFAULT_SHARE_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Mlazmatik",
      locale: "sr_RS",
      type: "website",
      images: [{ url: shareImage }],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}

// Strukturirani podaci (JSON-LD) koje čitaju pretraživači
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": absoluteUrl("/#firma"),
  name: company.name,
  description: company.description,
  url: absoluteUrl(routes.home),
  image: absoluteUrl(DEFAULT_SHARE_IMAGE),
  telephone: company.phone.href.replace("tel:", ""),
  email: company.email,
  taxID: company.pib,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.postal.street,
    postalCode: company.postal.postalCode,
    addressLocality: company.postal.city,
    addressCountry: company.postal.country,
  },
  openingHoursSpecification: company.openingHours.map((item) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: item.days,
    opens: item.opens,
    closes: item.closes,
  })),
  ...(company.socials.length ? { sameAs: company.socials.map((social) => social.href) } : {}),
});

export const breadcrumbJsonLd = (items: { label: string; href?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    ...(item.href ? { item: absoluteUrl(item.href) } : {}),
  })),
});

type ProductData = {
  name: string;
  sku: string;
  path: string;
  description: string;
  category: string;
  images: string[];
  properties?: { name: string; value: string }[];
};

// Bez cene: proizvodi se prodaju na upit, pa nema polja "offers".
export const productJsonLd = (product: ProductData) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  sku: product.sku,
  mpn: product.sku,
  description: product.description,
  category: product.category,
  url: absoluteUrl(product.path),
  image: product.images.map(absoluteUrl),
  brand: { "@type": "Brand", name: "FALCH" },
  ...(product.properties?.length
    ? {
        additionalProperty: product.properties.map((property) => ({
          "@type": "PropertyValue",
          name: property.name,
          value: property.value,
        })),
      }
    : {}),
});
