import CtaBand from "@/components/CtaBand";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedPrimene from "@/components/home/FeaturedPrimene";
import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      {/* Ovde dolazi sekcija "Izdvojene mašine" kada stignu podaci o mašinama. */}
      <FeaturedPrimene />
      <WhyUs />
      <CtaBand />
    </>
  );
}
