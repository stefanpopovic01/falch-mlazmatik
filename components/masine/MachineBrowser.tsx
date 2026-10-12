"use client";

import { useSearchParams } from "next/navigation";
import { type ReactNode, Suspense, useRef } from "react";

type Group = { key: string; label: string; options: { value: string; label: string }[] };
type Item = { slug: string; values: Record<string, string>; node: ReactNode };
type Selected = Record<string, string[]>;

type Props = {
  groups: Group[];
  // Kartice se crtaju na serveru; ovde se samo prikazuju ili sakrivaju.
  items: Item[];
};

// Unutar grupe važi ILI, između grupa I.
const matches = (item: Item, selected: Selected, except?: string) =>
  Object.entries(selected).every(
    ([key, values]) => key === except || values.length === 0 || values.includes(item.values[key]),
  );

function View({ groups, items, selected }: Props & { selected: Selected }) {
  const drawer = useRef<HTMLDialogElement>(null);

  // Stanje filtera živi u adresi (?snaga=30&pritisak=500,1000), pa link može da se podeli.
  const write = (next: Selected) => {
    const url = new URL(window.location.href);
    for (const group of groups) {
      if (next[group.key]?.length) url.searchParams.set(group.key, next[group.key].join(","));
      else url.searchParams.delete(group.key);
    }
    window.history.replaceState(null, "", url);
  };

  const toggle = (key: string, value: string) => {
    const current = selected[key] ?? [];
    write({
      ...selected,
      [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    });
  };

  const visible = items.filter((item) => matches(item, selected));
  const active = Object.values(selected).reduce((sum, values) => sum + values.length, 0);

  const filters = (
    <div className="space-y-8">
      {groups.map((group) => (
        <fieldset key={group.key}>
          <legend className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
            {group.label}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.options.map((option) => {
              const on = (selected[group.key] ?? []).includes(option.value);
              // Koliko mašina ostaje ako se ova opcija uključi, uz ostale grupe
              const count = items.filter(
                (item) =>
                  item.values[group.key] === option.value && matches(item, selected, group.key),
              ).length;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={on}
                  disabled={count === 0 && !on}
                  onClick={() => toggle(group.key, option.value)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                    on
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-white text-ink enabled:hover:border-brand enabled:hover:text-brand"
                  }`}
                >
                  {option.label}
                  <span className={`font-mono text-xs ${on ? "text-white/60" : "text-muted"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );

  const clear = (
    <button
      type="button"
      onClick={() => write({})}
      className="text-[15px] font-semibold text-brand underline-offset-4 hover:underline"
    >
      Obriši filtere
    </button>
  );

  return (
    <div id="lista" className="scroll-mt-28 lg:grid lg:grid-cols-12 lg:gap-8">
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold tracking-[-0.02em]">Filteri</h2>
            {active > 0 && clear}
          </div>
          {filters}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted" aria-live="polite">
            Prikazano: {visible.length} od {items.length}
          </p>
          <button
            type="button"
            onClick={() => drawer.current?.showModal()}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white lg:hidden"
          >
            Filteri
            {active > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-white font-mono text-xs text-ink">
                {active}
              </span>
            )}
          </button>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug} hidden={!visible.includes(item)}>
              {item.node}
            </li>
          ))}
        </ul>

        {visible.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-line">
            <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">
              Nema mašina za izabrane filtere.
            </p>
            <p className="mt-2 text-muted">Uklonite neki filter ili počnite iznova.</p>
            <div className="mt-6">{clear}</div>
          </div>
        )}
      </div>

      {/* Filteri na telefonu: panel koji se otvara odozdo */}
      <dialog
        ref={drawer}
        onClick={(event) => event.target === drawer.current && drawer.current?.close()}
        aria-label="Filteri"
        className="m-0 mt-auto max-h-[85dvh] w-screen max-w-none rounded-t-3xl bg-mist p-0 backdrop:bg-ink/60 lg:hidden"
      >
        <div className="flex max-h-[85dvh] flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-xl font-extrabold tracking-[-0.02em]">Filteri</h2>
            {active > 0 && clear}
          </div>
          <div className="overflow-y-auto px-5 py-6">{filters}</div>
          <div className="border-t border-line p-5">
            <button
              type="button"
              onClick={() => drawer.current?.close()}
              className="w-full rounded-full bg-brand px-6 py-4 text-base font-semibold text-white"
            >
              Prikaži {visible.length}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function FromUrl(props: Props) {
  const params = useSearchParams();
  const selected: Selected = {};
  for (const group of props.groups) {
    const allowed = new Set(group.options.map((option) => option.value));
    selected[group.key] = (params.get(group.key) ?? "").split(",").filter((v) => allowed.has(v));
  }
  return <View {...props} selected={selected} />;
}

// Statički HTML sadrži sve mašine (bez filtera); filteri iz adrese se primenjuju u pregledaču.
export default function MachineBrowser(props: Props) {
  return (
    <Suspense fallback={<View {...props} selected={{}} />}>
      <FromUrl {...props} />
    </Suspense>
  );
}
