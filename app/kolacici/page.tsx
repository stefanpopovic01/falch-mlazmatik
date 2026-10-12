import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { kolacici } from "@/content/legal";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: kolacici.title,
  description: kolacici.lead,
  alternates: { canonical: routes.kolacici },
};

export default function KolaciciPage() {
  return <LegalPage content={kolacici} />;
}
