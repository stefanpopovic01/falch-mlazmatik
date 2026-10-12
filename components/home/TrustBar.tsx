import type { CSSProperties } from "react";
import Container from "@/components/ui/Container";
import { trust } from "@/content/site";

export default function TrustBar() {
  return (
    <div
      className="rise border-t border-white/15 bg-ink/35 backdrop-blur-md"
      style={{ "--i": 5 } as CSSProperties}
    >
      {/* Jedan red, jednake kolone, sadržaj centriran. Broj kolona prati broj stavki. */}
      <Container
        as="dl"
        className="grid"
        style={{ gridTemplateColumns: `repeat(${trust.length}, minmax(0, 1fr))` }}
      >
        {trust.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col-reverse items-center gap-1.5 px-2 py-6 text-center lg:py-8 ${
              i > 0 ? "border-l border-white/15" : ""
            }`}
          >
            <dt className="text-xs text-white/70 sm:text-sm">{item.label}</dt>
            <dd className="font-mono text-2xl font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {item.value}
              {item.unit && (
                <span className="ml-1.5 text-sm text-brand-light sm:ml-2 sm:text-lg">
                  {item.unit}
                </span>
              )}
            </dd>
          </div>
        ))}
      </Container>
    </div>
  );
}
