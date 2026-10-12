import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

type Props = {
  // Poslednja stavka je trenutna stranica (bez href)
  items: Crumb[];
  // "dark" na tamnoj pozadini, "light" na svetloj
  tone?: "dark" | "light";
};

export default function Breadcrumbs({ items, tone = "dark" }: Props) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Staza stranica">
      <JsonLd data={breadcrumbJsonLd(items)} />
      <ol
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] sm:text-[13px] ${
          dark ? "text-white/55" : "text-muted"
        }`}
      >
        {items.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden>/</span>}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className={`transition-colors ${dark ? "hover:text-white" : "hover:text-brand"}`}
              >
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white/85" : "text-ink"}>
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
