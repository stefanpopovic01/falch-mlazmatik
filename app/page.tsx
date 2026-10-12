import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedMachines from "@/components/home/FeaturedMachines";
import FeaturedPrimene from "@/components/home/FeaturedPrimene";
import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";
import { routes } from "@/content/site";
import { JsonLd, organizationJsonLd } from "@/lib/seo";

// Naslov i opis dolaze iz app/layout.tsx
export const metadata: Metadata = { alternates: { canonical: routes.home } };

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <CategoryCards />
      <FeaturedMachines />
      <FeaturedPrimene />
      <WhyUs />
      <CtaBand />
    </>
  );
}
