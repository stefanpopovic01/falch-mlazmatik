"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cookieBanner as text } from "@/content/legal";
import { routes } from "@/content/site";
import { OPEN_SETTINGS, readConsent, saveConsent } from "@/lib/consent";

type Choice = { analytics: boolean; marketing: boolean };

const button =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold transition-colors";
// Prihvatanje i odbijanje imaju istu veličinu i istu težinu: odbiti je jednako lako kao prihvatiti.
const solid = `${button} bg-white text-ink hover:bg-brand-light hover:text-white`;
const outline = `${button} border border-white/45 text-white hover:border-white hover:bg-white/10`;

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        checked ? "bg-brand-light" : "bg-white/20"
      }`}
    >
      <span
        className={`absolute left-1 top-1 size-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choice, setChoice] = useState<Choice>({ analytics: false, marketing: false });
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = readConsent();
    if (stored) setChoice(stored);
    else setVisible(true);

    // Link u podnožju i dugme na stranici Kolačići otvaraju podešavanja
    const open = () => {
      const current = readConsent();
      setChoice(current ?? { analytics: false, marketing: false });
      setSettings(true);
      setVisible(true);
      requestAnimationFrame(() => panel.current?.focus());
    };
    window.addEventListener(OPEN_SETTINGS, open);
    return () => window.removeEventListener(OPEN_SETTINGS, open);
  }, []);

  if (!visible) return null;

  const finish = (next: Choice) => {
    saveConsent(next);
    setChoice(next);
    setVisible(false);
    setSettings(false);
  };

  const categories = [
    { key: "analytics" as const, ...text.categories.analytics },
    { key: "marketing" as const, ...text.categories.marketing },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[55] p-3 sm:p-5">
      <div
        ref={panel}
        role="dialog"
        aria-label={text.label}
        tabIndex={-1}
        className="pointer-events-auto mx-auto max-h-[calc(100dvh-1.5rem)] max-w-[1320px] overflow-y-auto rounded-2xl bg-ink p-6 text-white shadow-[0_24px_80px_-20px_rgba(23,19,43,0.8)] ring-1 ring-white/15 focus:outline-none sm:p-8"
      >
        {settings ? (
          <>
            <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">
              {text.settingsTitle}
            </p>

            <ul className="mt-6 grid gap-x-8 lg:grid-cols-3">
              <li className="border-t border-white/15 py-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">{text.categories.necessary.title}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                    {text.alwaysOn}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                  {text.categories.necessary.text}
                </p>
              </li>
              {categories.map((category) => (
                <li key={category.key} className="border-t border-white/15 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{category.title}</span>
                    <Switch
                      label={category.title}
                      checked={choice[category.key]}
                      onChange={() =>
                        setChoice((current) => ({
                          ...current,
                          [category.key]: !current[category.key],
                        }))
                      }
                    />
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/70">{category.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className={outline}
                onClick={() => finish({ analytics: false, marketing: false })}
              >
                {text.reject}
              </button>
              <button type="button" className={solid} onClick={() => finish(choice)}>
                {text.save}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div>
              <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">
                {text.title}
              </p>
              <p className="mt-2 max-w-[70ch] leading-relaxed text-white/75">
                {text.description}{" "}
                <Link
                  href={routes.kolacici}
                  className="font-medium text-white underline underline-offset-4"
                >
                  {text.more}
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className={`${button} text-white/80 underline-offset-4 hover:text-white hover:underline`}
                onClick={() => setSettings(true)}
              >
                {text.customize}
              </button>
              <button
                type="button"
                className={outline}
                onClick={() => finish({ analytics: false, marketing: false })}
              >
                {text.reject}
              </button>
              <button
                type="button"
                className={solid}
                onClick={() => finish({ analytics: true, marketing: true })}
              >
                {text.accept}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
