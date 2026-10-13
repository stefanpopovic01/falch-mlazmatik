"use client";

import { useEffect, useRef } from "react";

export type LightboxImage = { src: string; width: number; height: number; alt: string };

type Props = {
  images: LightboxImage[];
  // Indeks otvorene slike ili null kada je zatvoreno
  index: number | null;
  onChange: (index: number | null) => void;
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

// Tamna podloga sa svetlim rubom: dugmad se vide i preko bele fotografije proizvoda i preko tamne pozadine.
const control =
  "grid size-12 place-items-center rounded-full bg-ink/80 text-white shadow-[0_4px_16px_rgba(23,19,43,0.35)] ring-1 ring-white/40 backdrop-blur-sm transition-colors hover:bg-white hover:text-ink";

// Uvećani prikaz slike preko celog ekrana (strelice na tastaturi, Esc zatvara).
export default function Lightbox({ images, index, onChange }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (index !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [index]);

  const step = (delta: number) => {
    if (index !== null) onChange((index + delta + images.length) % images.length);
  };

  const current = index === null ? null : images[index];

  return (
    <dialog
      ref={dialog}
      onClose={() => onChange(null)}
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
              {index! + 1} / {images.length}
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
              key={current.src}
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              className="max-h-full w-auto max-w-full rounded-lg object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Prethodna slika"
                  className={`absolute left-1 top-1/2 -translate-y-1/2 sm:left-0 ${control}`}
                >
                  <Chevron flip />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Sledeća slika"
                  className={`absolute right-1 top-1/2 -translate-y-1/2 sm:right-0 ${control}`}
                >
                  <Chevron />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
