import LegalPage from "@/components/LegalPage";
import { kolacici } from "@/content/legal";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: kolacici.title,
  description: kolacici.lead,
  path: routes.kolacici,
});

export default function KolaciciPage() {
  return <LegalPage content={kolacici} />;
}
