// Tekstovi stranice /proizvodi/roboti i kratki opisi robota.
// Izvor: falch.com (robots, robotics by application), skraćeno i prepisano.

export const listing = {
  title: "Roboti",
  lead: "Poluautomatski i automatski uređaji FALCH koji preuzimaju mlaznicu umesto rukovaoca. Filtrirajte po načinu rada, pogonu i primeni.",
};

export const intro = {
  eyebrow: "Automatizacija",
  title: "Teži posao radi robot.",
  paragraphs: [
    "Rad vodenim mlazom pod visokim pritiskom fizički je težak, često u lošim uslovima, a iskusnih rukovalaca je sve manje. Zato FALCH ima posebno odeljenje za robotiku koje razvija standardne uređaje i rešenja po meri projekta.",
    "Poluautomatski uređaji (worker) nose alat i preuzimaju povratnu silu mlaza, a rukovalac upravlja radom. Automatski roboti (rob) sami vode mlaznicu po zadatoj površini.",
  ],
  advantagesTitle: "Šta dobijate",
  advantages: [
    "Znatno veći učinak mlaza po danu",
    "Ujednačeniji rezultat i površina",
    "Manje troškova skela",
    "Kraći rokovi projekata",
    "Veća bezbednost na radu",
    "Manje buke i vodene pare uz zaštitne kape mlaza",
    "Skoro suve površine uz Vacu Press sistem",
    "Rukovaoci bez teškog fizičkog rada",
  ],
};

export const typeLabels = {
  worker: "Poluautomatski",
  robot: "Automatski",
} as const;

export const driveLabels = {
  "električni": "Električni",
  pneumatski: "Pneumatski",
  dizel: "Dizel",
} as const;

// Kratak opis po porodici, za karticu i vrh stranice robota. Bez brojki koje nisu u specifikaciji.
export const familyText: Record<string, string> = {
  "Drain Worker": "Poluautomatski uređaj za rad u cevima i kanalima velikog prečnika.",
  "Lift Worker": "Nosač alata sa podizanjem: drži alat i preuzima povratnu silu mlaza, a rukovalac upravlja radom.",
  "Line Worker": "Poluautomatski uređaj koji vodi alat pravolinijski, za ravnomerno čišćenje traka i linija.",
  "Multi Worker": "Višenamenski nosač alata sa pogonom po dve ose.",
  "Pipe Worker": "Poluautomatski uređaj za čišćenje cevi.",
  "Surface Worker": "Poluautomatski uređaj za obradu površina.",
  "Beam Rob": "Automatski robot sa gredom po kojoj se kreće mlazna jedinica.",
  "Bundle Rob": "Automatski robot za čišćenje snopova cevi.",
  "Climb Rob": "Automatski robot koji se kreće po vertikalnim površinama.",
  "Frame Rob": "Automatski robot na ramu.",
  "Surface Rob": "Automatski robot za obradu velikih površina, sa pogonom po tri ose.",
  "Crawl Rob": "Robot na gusenicama za hidrodemoliciju betona, iz programa Conjet.",
  "Drum Rob": "Automatski robot za mobilni ili stacionarni rad.",
};

export const groupsSection = {
  eyebrow: "Po primeni",
  title: "Roboti u radu.",
  lead: "Snimci rada po vrsti posla. Ispod svakog je link na robote za tu primenu.",
};

// Red na stranici primene (/primene/<slug>)
export const applicationRow = {
  eyebrow: "Roboti",
  title: "Roboti za ovaj posao.",
  all: "Svi roboti za ovu primenu",
};
