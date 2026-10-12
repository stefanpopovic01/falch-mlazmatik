"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, routes } from "@/content/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Naziv otvorenog padajućeg menija. Jedna vrednost, pa je uvek otvoren najviše jedan.
  const [menu, setMenu] = useState<string | null>(null);
  const pathname = usePathname();
  // Samo početna ima hero ispod zaglavlja, pa je samo tamo providno.
  const overHero = pathname === routes.home;

  // Posle prelaska na drugu stranicu zatvaraju se i padajući i mobilni meni.
  useEffect(() => {
    setMenu(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Klik na stavku zatvara meni i skida fokus sa linka, da ga fokus ne drži otvorenim.
  const closeMenu = () => {
    setMenu(null);
    (document.activeElement as HTMLElement | null)?.blur();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open || !overHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? "bg-ink/85 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1320px] items-center justify-between px-5 transition-[height] duration-300 sm:px-8 ${
          scrolled ? "h-16" : "h-20 lg:h-24"
        }`}
      >
        <Link href={routes.home} aria-label="Mlazmatik, početna" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo.svg"
            alt="FALCH, world of waterjetting"
            className={`w-auto transition-[height] duration-300 ${
              scrolled ? "h-9" : "h-11 lg:h-14"
            }`}
          />
        </Link>

        <nav aria-label="Glavni meni" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const expanded = menu === item.label;
            return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setMenu(item.label)}
              onMouseLeave={() => setMenu((current) => (current === item.label ? null : current))}
              onFocus={() => item.children && setMenu(item.label)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setMenu((current) => (current === item.label ? null : current));
                }
              }}
            >
              <Link
                href={item.href}
                onClick={closeMenu}
                aria-expanded={item.children ? expanded : undefined}
                className="flex items-center gap-1.5 px-4 py-3 text-[15px] font-medium text-white/85 transition-colors hover:text-white"
              >
                {item.label}
                {item.children && (
                  <svg
                    viewBox="0 0 12 12"
                    className={`size-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" />
                  </svg>
                )}
              </Link>
              {item.children && (
                <div
                  className={`absolute left-0 top-full w-72 pt-2 transition-all duration-200 ${
                    expanded
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-1 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-xl bg-white p-2 shadow-[0_24px_60px_-20px_rgba(23,19,43,0.55)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={closeMenu}
                        className="block rounded-lg px-4 py-3 transition-colors hover:bg-mist"
                      >
                        <span className="block font-display text-base font-bold text-ink">
                          {child.label}
                        </span>
                        <span className="block text-sm text-muted">{child.note}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            );
          })}
          <Link
            href={routes.kontakt}
            className="ml-4 rounded-full bg-white px-6 py-2.5 text-[15px] font-semibold text-ink transition-colors hover:bg-brand-light hover:text-white"
          >
            Kontakt
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobilni-meni"
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          className="relative -mr-2 grid size-11 place-items-center text-white lg:hidden"
        >
          <span
            className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobilni-meni"
          aria-label="Mobilni meni"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 px-5 pb-10 pt-4 sm:px-8 lg:hidden"
        >
          {nav.map((item) => (
            <div key={item.label} className="border-b border-white/10 py-4">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block font-display text-3xl font-extrabold tracking-tight text-white"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mt-3 flex gap-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/85"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href={routes.kontakt}
            onClick={() => setOpen(false)}
            className="mt-8 block rounded-full bg-white px-6 py-4 text-center text-base font-semibold text-ink"
          >
            Kontakt
          </Link>
        </nav>
      )}
    </header>
  );
}
