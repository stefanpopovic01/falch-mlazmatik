"use client";

import { type ReactNode, useState } from "react";

type Props = {
  // Kartice se crtaju na serveru; text je naziv i šifra za pretragu.
  items: { key: string; text: string; node: ReactNode }[];
};

// Bez kvačica i velikih slova, da "crevo" nađe i "Crevo", a "pistolj" i "Pištolj"
const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export default function AccessorySearch({ items }: Props) {
  const [query, setQuery] = useState("");
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const visible = items.filter((item) => {
    const text = normalize(item.text);
    return words.every((word) => text.includes(word));
  });

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-md">
          <span className="sr-only">Pretraga po nazivu ili šifri</span>
          <svg
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <circle cx="9" cy="9" r="5.5" />
            <path d="m13.5 13.5 4 4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Naziv ili šifra"
            className="w-full rounded-full bg-white py-3.5 pl-13 pr-5 text-base ring-1 ring-line placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted" aria-live="polite">
          Prikazano: {visible.length} od {items.length}
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <li key={item.key} hidden={!visible.includes(item)}>
            {item.node}
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-line">
          <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">
            Nema artikala za „{query}".
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 text-[15px] font-semibold text-brand underline-offset-4 hover:underline"
          >
            Obriši pretragu
          </button>
        </div>
      )}
    </>
  );
}
