import LegalPage from "@/components/LegalPage";
import { privatnost } from "@/content/legal";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: privatnost.title,
  description: privatnost.lead,
  path: routes.privatnost,
});

export default function PrivatnostPage() {
  return <LegalPage content={privatnost} />;
}
