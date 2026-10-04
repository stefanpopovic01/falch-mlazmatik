export const routes = {
  home: "/",
  primene: "/primene",
  proizvodi: "/proizvodi",
  masine: "/proizvodi/masine",
  pribor: "/proizvodi/pribor",
  servis: "/servis",
  kontakt: "/kontakt",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; note: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Primene", href: routes.primene },
  {
    label: "Proizvodi",
    href: routes.proizvodi,
    children: [
      { label: "Mašine", note: "Wheel jet, base jet, trail jet", href: routes.masine },
      { label: "Pribor", note: "13 kategorija pribora", href: routes.pribor },
    ],
  },
  { label: "Servis", href: routes.servis },
];

// Okvirne brojke iz ponude. Zameniti potvrđenim podacima klijenta.
export const trust = [
  { value: "3.000", unit: "bar", label: "Radni pritisak do" },
  { value: "30+", unit: "", label: "Mašina u ponudi" },
  { value: "100+", unit: "", label: "Komada pribora" },
  { value: "44", unit: "", label: "Primene" },
];
