export const routes = {
  home: "/",
  primene: "/primene",
  proizvodi: "/proizvodi",
  masine: "/proizvodi/masine",
  pribor: "/proizvodi/pribor",
  servis: "/servis",
  demonstracije: "/servis/demonstracije",
  kontakt: "/kontakt",
  privatnost: "/privatnost",
  kolacici: "/kolacici",
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
  {
    label: "Servis",
    href: routes.servis,
    children: [
      { label: "Servis i delovi", note: "Popravke i rezervni delovi", href: routes.servis },
      { label: "Demonstracije", note: "Mašina u radu pre kupovine", href: routes.demonstracije },
    ],
  },
];

// Link ka kontakt formularu sa unapred izabranom temom upita (/kontakt?tema=...)
export type ContactTopic = "servis" | "rezervni-deo" | "demonstracija";
export const contactHref = (topic: ContactTopic) => `${routes.kontakt}?tema=${topic}`;

// Pritisak je potvrdio klijent. Ostale brojke su okvirne iz ponude.
export const trust = [
  { value: "3.000", unit: "bar", label: "Radni pritisak do" },
  { value: "30+", unit: "", label: "Mašina u ponudi" },
  { value: "100+", unit: "", label: "Komada pribora" },
  { value: "44", unit: "", label: "Primene" },
];

// Podaci preuzeti sa mlazmatik.co.rs (sedište i servis). Potvrditi sa klijentom.
export const company = {
  name: "Mlazmatik d.o.o.",
  description:
    "Industrijske visokopritisne mašine i pribor FALCH, uz servis, rezervne delove i demonstracije.",
  address: ["Maršala Tita 1B", "26212 Kačarevo"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Mlazmatik+Kačarevo",
  phone: { label: "+381 13 601 895", href: "tel:+38113601895" },
  mobile: { label: "+381 63 363 767", href: "tel:+38163363767" },
  email: "info@mlazmatik.co.rs",
  hours: ["Pon–pet 08:30–16:30", "Subota 08:00–15:00"],
  // Dodati kada klijent pošalje linkove: { label: "Facebook", href: "..." }
  socials: [] as { label: string; href: string }[],
};

// Podrazumevani tekst ljubičaste trake sa pozivom na akciju (components/CtaBand.tsx)
export const cta = {
  eyebrow: "Savet pri izboru",
  title: "Niste sigurni koja mašina vam treba?",
  text: "Opišite nam posao i preporučićemo vam je.",
  button: "Kontakt",
};
