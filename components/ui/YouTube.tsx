"use client";

import { type ReactNode, useState } from "react";

type Props = {
  id: string;
  title: string;
  // Poster slika sa našeg servera, nacrtana na serveru
  poster: ReactNode;
};

// YouTube se učitava tek na klik i preko youtube-nocookie.com,
// pa pre klika nema zahteva ka YouTube-u ni kolačića.
export default function YouTube({ id, title, poster }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Pusti video: ${title}`}
          className="group absolute inset-0 size-full"
        >
          {poster}
          <span className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover:bg-ink/20" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-110 lg:size-24">
            <svg viewBox="0 0 24 24" className="ml-1 size-8" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
