import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  // Dugme ili link ispod uvodnog teksta
  action?: ReactNode;
  // "dark" za sekcije na tamnoj (ink) pozadini
  tone?: "light" | "dark";
  // Uvodni tekst ispod naslova umesto desno (za uske kolone)
  stacked?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  tone = "light",
  stacked = false,
}: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-6 ${
        stacked ? "" : "lg:flex-row lg:items-end lg:justify-between"
      }`}
    >
      <div>
        <Eyebrow tone={dark ? "light" : "brand"}>{eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.2vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          {title}
        </h2>
      </div>
      {(lead || action) && (
        <div className="max-w-[44ch]">
          {lead && (
            <p
              className={`text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}
            >
              {lead}
            </p>
          )}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  );
}
