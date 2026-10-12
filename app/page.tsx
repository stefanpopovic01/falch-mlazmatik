import CtaBand from "@/components/CtaBand";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedMachines from "@/components/home/FeaturedMachines";
import FeaturedPrimene from "@/components/home/FeaturedPrimene";
import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedMachines />
      <FeaturedPrimene />
      <WhyUs />
      <CtaBand />
    </>
  );
}
