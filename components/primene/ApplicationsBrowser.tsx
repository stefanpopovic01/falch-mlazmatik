"use client";

import { type ReactNode, useEffect, useState } from "react";

type Props = {
  groups: { slug: string; label: string; count: number }[];
  // Pločice se crtaju na serveru; ovde se samo prikazuju ili sakrivaju.
  tiles: { slug: string; groups: string[]; node: ReactNode }[];
};

const PARAM = "grupa";

export default function ApplicationsBrowser({ groups, tiles }: Props) {
  const [active, setActive] = useState<string | null>(null);

  // Izabrana grupa se čuva u adresi (?grupa=...), pa link može da se podeli.
  useEffect(() => {
    const read = () => {
      const value = new URLSearchParams(window.location.search).get(PARAM);
      setActive(groups.some((group) => group.slug === value) ? value : null);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [groups]);

  const select = (slug: string | null) => {
    setActive(slug);
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set(PARAM, slug);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(null, "", url);
  };

  const visible = tiles.filter((tile) => !active || tile.groups.includes(active));

  const chip = (selected: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] font-medium transition-colors ${
      selected
        ? "border-ink bg-ink text-white"
        : "border-line bg-white text-ink hover:border-brand hover:text-brand"
    }`;

  const count = (selected: boolean) =>
    `font-mono text-xs ${selected ? "text-white/60" : "text-muted"}`;

  return (
    <>
      <div role="group" aria-label="Filter po grupi" className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={!active}
          onClick={() => select(null)}
          className={chip(!active)}
        >
          Sve
          <span className={count(!active)}>{tiles.length}</span>
        </button>
        {groups.map((group) => (
          <button
            key={group.slug}
            type="button"
            aria-pressed={active === group.slug}
            onClick={() => select(group.slug)}
            className={chip(active === group.slug)}
          >
            {group.label}
            <span className={count(active === group.slug)}>{group.count}</span>
          </button>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted" aria-live="polite">
        Prikazano: {visible.length}
      </p>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {tiles.map((tile) => (
          <li key={tile.slug} hidden={!visible.includes(tile)}>
            {tile.node}
          </li>
        ))}
      </ul>
    </>
  );
}
