// Adresa sajta, za canonical linkove, sitemap i deljenje. Postavlja se kroz NEXT_PUBLIC_SITE_URL;
// na Vercelu se bez nje koristi produkcioni domen projekta.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const routes = {
  home: "/",
  primene: "/primene",
  proizvodi: "/proizvodi",
  masine: "/proizvodi/masine",
  pribor: "/proizvodi/pribor",
  roboti: "/proizvodi/roboti",
  servis: "/servis",
  demonstracije: "/servis/demonstracije",
  kontakt: "/kontakt",
  hvala: "/kontakt/hvala",
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
      { label: "Roboti", note: "Poluautomatski i automatski", href: routes.roboti },
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

// Link ka kontakt formularu sa unapred upisanim proizvodom (/kontakt?proizvod=G411&varijanta=...)
export function quoteHref(itemNumber: string, variant?: string) {
  const params = new URLSearchParams({ proizvod: itemNumber });
  if (variant) params.set("varijanta", variant);
  return `${routes.kontakt}?${params}`;
}

// Pritisak je potvrdio klijent. Ostale brojke su okvirne iz ponude.
export const trust = [
  { value: "3.000", unit: "bar", label: "Radni pritisak do" },
  { value: "50+", unit: "", label: "Mašina u ponudi" },
  { value: "300+", unit: "", label: "Komada pribora" },
];

// Podaci preuzeti sa mlazmatik.co.rs (sedište i servis). Potvrditi sa klijentom.
export const company = {
  name: "Mlazmatik d.o.o.",
  pib: "101055662",
  maticniBroj: "08655693",
  description:
    "Industrijske visokopritisne mašine i pribor FALCH, uz servis, rezervne delove i demonstracije.",
  address: ["Maršala Tita 1B", "26212 Kačarevo"],
  // Isti podaci u obliku koji čitaju pretraživači
  postal: { street: "Maršala Tita 1B", postalCode: "26212", city: "Kačarevo", country: "RS" },
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "16:30" },
  ],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Mlazmatik+Kačarevo",
  phone: { label: "+381 69 1077931", href: "tel:+381691077931" },
  mobile: { label: "+381 63 363767", href: "tel:+38163363767" },
  // Redosled je redosled prikaza na sajtu
  emails: ["mlazmatik@outlook.com", "info@mlazmatik.co.rs"],
  hours: ["Pon–pet 08:30–16:30"],
  // Dodati kada klijent pošalje linkove: { label: "Facebook", href: "..." }
  socials: [] as { label: string; href: string }[],
};

// Adrese u rečenici: "a@b.rs ili c@d.rs"
export const emailText = company.emails.join(" ili ");

// Podrazumevani tekst ljubičaste trake sa pozivom na akciju (components/CtaBand.tsx)
export const cta = {
  eyebrow: "Savet pri izboru",
  title: "Niste sigurni koja mašina vam treba?",
  text: "Opišite nam posao i preporučićemo vam je.",
  button: "Kontakt",
};
