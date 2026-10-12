import Link from "next/link";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import { type LegalPage as Content, draftNotice } from "@/content/legal";
import { company, routes } from "@/content/site";

const fill = (text: string) =>
  text
    .replace("{name}", company.name)
    .replace("{address}", company.address.join(", "))
    .replace("{pib}", company.pib)
    .replace("{mb}", company.maticniBroj)
    .replace("{email}", company.email)
    .replace("{phone}", company.phone.label);

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day}. ${month}. ${year}.`;
};

// Zajednički izgled pravnih stranica: sadržaj levo, tekst desno.
export default function LegalPage({ content }: { content: Content }) {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Početna", href: routes.home }, { label: content.title }]}
        title={content.title}
        lead={content.lead}
      >
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/55 sm:text-[13px]">
          Poslednja izmena: {formatDate(content.updated)}
        </p>
      </PageHeader>

      <Container as="section" className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <nav aria-label="Sadržaj stranice" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Sadržaj</p>
              <ol className="mt-4">
                {content.sections.map((section, i) => (
                  <li key={section.id} className="border-t border-line last:border-b">
                    <a
                      href={`#${section.id}`}
                      className="flex items-baseline gap-4 py-3 font-medium transition-colors hover:text-brand"
                    >
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-7 lg:col-start-6">
            {content.draft && (
              <p
                role="note"
                className="mb-12 rounded-2xl bg-white p-5 font-medium text-brand-deep ring-1 ring-brand/35"
              >
                {draftNotice}
              </p>
            )}

            <div className="space-y-14">
              {content.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] lg:text-3xl">
                    {section.title}
                  </h2>
                  <div className="mt-5 max-w-[68ch] space-y-4 text-lg leading-relaxed text-ink/85">
                    {section.blocks.map((block, i) =>
                      typeof block === "string" ? (
                        <p key={i}>{fill(block)}</p>
                      ) : "settingsButton" in block ? (
                        <CookieSettingsButton
                          key={i}
                          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-deep"
                        >
                          {block.settingsButton}
                        </CookieSettingsButton>
                      ) : "table" in block ? (
                        <div key={i} className="overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
                          <table className="w-full min-w-[520px] table-fixed text-left text-base">
                            <colgroup>
                              <col className="w-[36%]" />
                              <col />
                              <col className="w-[24%]" />
                            </colgroup>
                            <thead>
                              <tr>
                                {block.table.head.map((cell) => (
                                  <th
                                    key={cell}
                                    className="px-5 py-3 font-mono text-xs font-normal uppercase tracking-[0.18em] text-muted"
                                  >
                                    {cell}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {block.table.rows.map((row) => (
                                <tr key={row[0]} className="border-t border-line align-top">
                                  {row.map((cell, c) => (
                                    <td
                                      key={c}
                                      className={`px-5 py-4 ${c === 0 ? "break-words font-mono text-sm text-ink" : ""}`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <ul key={i} className="space-y-2">
                          {block.list.map((item) => (
                            <li key={item} className="flex gap-4">
                              <span className="mt-3 h-px w-4 shrink-0 bg-brand" aria-hidden />
                              <span>{fill(item)}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-14 border-t border-line pt-8 text-lg text-muted">
              Pitanja o ovom tekstu:{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-brand underline underline-offset-4"
              >
                {company.email}
              </a>
              . Pogledajte i{" "}
              <Link
                href={content.title === "Kolačići" ? routes.privatnost : routes.kolacici}
                className="font-medium text-brand underline underline-offset-4"
              >
                {content.title === "Kolačići" ? "Privatnost" : "Kolačići"}
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
