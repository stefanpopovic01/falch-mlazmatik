import { routes } from "./site";

// Tekstovi početne strane. Izmena ovde menja sajt; komponente ne sadrže tekst.

export const hero = {
  eyebrow: "FALCH visokopritisna tehnika",
  title: "Snaga vode za najteže poslove.",
  text: "Industrijske visokopritisne mašine i pribor za čišćenje, uklanjanje premaza i hidrodemoliciju. Uz servis i demonstraciju pre kupovine.",
  primary: { label: "Pogledaj mašine", href: routes.masine },
  secondary: { label: "Zatraži ponudu", href: routes.kontakt },
};

export const cards = {
  eyebrow: "Ponuda",
  title: "Sve za rad pod visokim pritiskom.",
  lead: "Krenite od posla koji treba da uradite, od mašine koju tražite ili od podrške koja vam je potrebna.",
  items: [
    {
      title: "Primene",
      meta: "8 grupa · 42 primene",
      text: "Od čišćenja fasada i oplata do uklanjanja premaza i hidrodemolicije. Pronađite rešenje za svoj posao.",
      cta: "Pogledaj primene",
      href: routes.primene,
      image: "application_renovation_monument_03",
      // Isecanje s leve strane sklanja vodeni žig iz donjeg desnog ugla.
      imageClass: "object-left",
    },
    {
      title: "Proizvodi",
      meta: "Mašine · Pribor",
      text: "Visokopritisne mašine sa električnim, benzinskim i dizel motorom, uz pribor za svaku od njih.",
      cta: "Pogledaj proizvode",
      href: routes.proizvodi,
      image: "high-tech-water-filtration-at-sunrise",
      imageClass: "",
    },
    {
      title: "Servis",
      meta: "Popravke · Delovi · Demonstracije",
      text: "Popravke i rezervni delovi, kao i demonstracija sa probnim čišćenjem pre kupovine.",
      cta: "Pogledaj servis",
      href: routes.servis,
      image: "servis",
      imageClass: "",
    },
  ],
};

export const featuredApplications = {
  eyebrow: "Primene",
  title: "Jedan mlaz vode, desetine poslova.",
  lead: "Od gradilišta do brodogradilišta. Izaberite primenu i pogledajte kako se posao radi, na slikama i snimku.",
  button: "Sve primene",
  // Prva je velika pločica. Slugovi iz content/applications.json.
  slugs: [
    "hidrodemolicija",
    "ciscenje-fasada",
    "ciscenje-oplata",
    "ciscenje-brodova",
    "uklanjanje-oznaka-na-putu",
  ],
};

// Samo prednosti koje klijent može da potvrdi. icon: "wrench" | "drop" | "chat"
export const whyUs = {
  eyebrow: "Zašto mi",
  title: "Mašina je pola posla. Druga polovina smo mi.",
  lead: "Visokopritisna mašina se kupuje na duge staze. Zato uz nju dobijate i ljude koji je poznaju.",
  items: [
    {
      icon: "wrench",
      title: "Servis i rezervni delovi",
      text: "Popravke radimo mi. Rezervni deo tražite jednim upitom, uz model mašine i šifru dela.",
    },
    {
      icon: "drop",
      title: "Demonstracija pre kupovine",
      text: "Mašinu vidite u radu pre nego što odlučite, uz probno čišćenje.",
    },
    {
      icon: "chat",
      title: "Pomoć pri izboru",
      text: "Opišete posao, a mi preporučimo mašinu i pribor koji mu odgovaraju.",
    },
  ],
} as const;
