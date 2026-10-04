"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type Item = {
  // Umanjena slika, nacrtana na serveru
  thumb: ReactNode;
  // Velika slika za uvećani prikaz
  full: { src: string; width: number; height: number; alt: string };
  // Klase pločice u mreži (raspored određuje stranica)
  className?: string;
};

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`size-5 ${flip ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  );
}

const control =
  "grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink";

// Mreža slika; klik otvara uvećani prikaz (strelice na tastaturi, Esc zatvara).
export default function Gallery({ items, className = "" }: { items: Item[]; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [index]);

  const step = (delta: number) =>
    setIndex((current) =>
      current === null ? current : (current + delta + items.length) % items.length,
    );

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className={className}>
        {items.map((item, i) => (
          <li key={item.full.src} className={item.className}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Uvećaj sliku ${i + 1} od ${items.length}`}
              className="group relative block size-full cursor-zoom-in overflow-hidden rounded-2xl bg-brand-deep"
            >
              {item.thumb}
              <span className="absolute inset-0 bg-brand/30 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(event) => event.target === dialog.current && dialog.current?.close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        aria-label="Uvećana slika"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 backdrop:bg-ink/80"
      >
        {current && (
          <div className="flex h-full flex-col p-4 sm:p-6">
            <div className="flex items-center justify-between text-white">
              <p className="font-mono text-sm tracking-[0.14em] text-white/70">
                {index! + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Zatvori"
                className={control}
                autoFocus
              >
                <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="m5 5 10 10M15 5 5 15" />
                </svg>
              </button>
            </div>

            <div className="relative mt-4 flex min-h-0 flex-1 items-center justify-center">
              <img
                key={current.full.src}
                src={current.full.src}
                width={current.full.width}
                height={current.full.height}
                alt={current.full.alt}
                className="max-h-full w-auto max-w-full rounded-lg object-contain"
              />
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Prethodna slika"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 ${control}`}
                  >
                    <Chevron flip />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Sledeća slika"
                    className={`absolute right-0 top-1/2 -translate-y-1/2 ${control}`}
                  >
                    <Chevron />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
