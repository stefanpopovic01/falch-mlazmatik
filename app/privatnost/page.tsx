import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privatnost } from "@/content/legal";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: privatnost.title,
  description: privatnost.lead,
  alternates: { canonical: routes.privatnost },
};

export default function PrivatnostPage() {
  return <LegalPage content={privatnost} />;
}
