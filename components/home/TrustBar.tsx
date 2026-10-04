import type { CSSProperties } from "react";
import Container from "@/components/ui/Container";
import { trust } from "@/lib/site";

export default function TrustBar() {
  return (
    <div
      className="rise border-t border-white/15 bg-ink/35 backdrop-blur-md"
      style={{ "--i": 5 } as CSSProperties}
    >
      <Container as="dl" className="grid grid-cols-2 lg:grid-cols-4">
        {trust.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col-reverse gap-1.5 py-6 lg:py-8 ${
              i % 2 ? "border-l border-white/15 pl-5 sm:pl-8" : ""
            } ${i > 1 ? "border-t border-white/15 lg:border-t-0" : ""} ${
              i === 2 ? "lg:border-l lg:pl-8" : ""
            }`}
          >
            <dt className="text-sm text-white/70">{item.label}</dt>
            <dd className="font-mono text-3xl font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {item.value}
              {item.unit && (
                <span className="ml-2 text-base text-brand-light sm:text-lg">
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
