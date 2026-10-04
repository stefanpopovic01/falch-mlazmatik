import type { CSSProperties } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Img from "@/components/ui/Img";
import { hero } from "@/content/home";
import HeroVideo from "./HeroVideo";
import TrustBar from "./TrustBar";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(100svh,1100px)] flex-col overflow-hidden bg-ink text-white">
      {/* Poster je mnogo širi od ekrana (isečen po visini), zato uvek najveća verzija. */}
      <Img
        src="hero-poster"
        alt=""
        fill
        priority
        sizes="1920px"
        className="-z-20 object-cover"
      />
      <HeroVideo />
      <div className="hero-wash absolute inset-0 -z-10" />

      <Container className="flex flex-1 flex-col justify-center pb-14 pt-32 lg:pt-40">
        <Eyebrow tone="light" className="rise" style={step(0)}>
          {hero.eyebrow}
        </Eyebrow>

        <h1
          className="rise mt-6 max-w-[14ch] font-display text-[clamp(2.75rem,7.4vw,6.25rem)] font-extrabold leading-[0.94] tracking-[-0.035em]"
          style={step(1)}
        >
          {hero.title}
        </h1>

        <p
          className="rise mt-7 max-w-[52ch] text-lg leading-relaxed text-white/85 sm:text-xl"
          style={step(2)}
        >
          {hero.text}
        </p>

        <div
          className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={step(3)}
        >
          <ButtonLink href={hero.primary.href} variant="light" arrow>
            {hero.primary.label}
          </ButtonLink>
          <ButtonLink href={hero.secondary.href} variant="outline">
            {hero.secondary.label}
          </ButtonLink>
        </div>
      </Container>

      <TrustBar />
    </section>
  );
}
