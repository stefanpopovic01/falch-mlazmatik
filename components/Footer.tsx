import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { company, routes } from "@/content/site";

const links = [
  { label: "Primene", href: routes.primene },
  { label: "Mašine", href: routes.masine },
  { label: "Pribor", href: routes.pribor },
  { label: "Servis", href: routes.servis },
  { label: "Kontakt", href: routes.kontakt },
];

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">
      {children}
    </h2>
  );
}

const linkClass = "text-white/80 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-white">
      <Container className="pt-16 lg:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href={routes.home} aria-label="Mlazmatik, početna" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/logo.svg"
                alt="FALCH, world of waterjetting"
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-white/65">
              {company.description}
            </p>
            {company.socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {company.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white hover:text-white"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Brzi linkovi" className="lg:col-span-3">
            <ColumnTitle>Brzi linkovi</ColumnTitle>
            <ul className="mt-6 space-y-3 text-lg">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <ColumnTitle>Kontakt</ColumnTitle>
            <address className="mt-6 space-y-5 text-lg not-italic">
              <p>
                <a
                  href={company.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {company.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </p>
              <p className="font-mono">
                <a href={company.phone.href} className={`block ${linkClass}`}>
                  {company.phone.label}
                </a>
                <a href={company.mobile.href} className={`block ${linkClass}`}>
                  {company.mobile.label}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className={linkClass}>
                  {company.email}
                </a>
              </p>
              <p className="text-base text-white/50">
                {company.hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
          </div>
        </div>

        <p
          className="mt-14 select-none whitespace-nowrap bg-gradient-to-b from-white/[0.16] to-white/0 bg-clip-text font-display text-[clamp(3.5rem,17vw,15.5rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-transparent lg:mt-20"
          aria-hidden
        >
          Mlazmatik
        </p>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href={routes.privatnost} className="transition-colors hover:text-white">
                Privatnost
              </Link>
            </li>
            <li>
              <Link href={routes.kolacici} className="transition-colors hover:text-white">
                Kolačići
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
