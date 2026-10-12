// Tekstovi stranice /proizvodi/masine: uvod, klase snage za filter i vodič ispod liste.
// Izvor: falch.com (machines), skraćeno i prepisano. Bez robota i bez tabele "key benefits".

export const listing = {
  title: "Mašine",
  lead: "Industrijske visokopritisne mašine od 100 do 3.000 bara, sa električnim, benzinskim i dizel pogonom. Filtrirajte po snazi, izvedbi, motoru i pritisku.",
};

// Klase snage za filter. Mašina ulazi u prvu klasu čiji je max veći ili jednak njenoj snazi (kW).
export const powerBuckets = [
  { id: "do-6", label: "do 6 kW", max: 6 },
  { id: "11-18", label: "11–18 kW", max: 25 },
  { id: "30", label: "30 kW", max: 50 },
  { id: "110-125", label: "110–125 kW", max: Infinity },
];

export const guide = {
  eyebrow: "Vodič",
  title: "Kako izabrati visokopritisnu mašinu.",

  what: {
    title: "Šta je industrijska visokopritisna mašina",
    paragraphs: [
      "Industrijska visokopritisna mašina je uređaj za čišćenje predviđen za neprekidan rad u zahtevnim uslovima. Kućni perači rade na pritisku ispod 150 bara i služe za povremenu upotrebu, dok industrijske mašine rade na 200 do 3.000 bara i imaju robusne komponente za svakodnevni profesionalni rad.",
      "Na najvišim pritiscima sama voda zamenjuje abraziv ili hemiju: priprema površine, skida premaze, čisti cevi i uklanja beton.",
    ],
  },

  classes: {
    title: "Klase pritiska",
    lead: "Kliknite na klasu da vidite mašine u njoj.",
    // bars: vrednosti filtera "pritisak" koje red otvara
    rows: [
      { label: "do 300 bar", use: "Industrijsko čišćenje, pranje vozila", bars: [100, 190, 200, 300] },
      { label: "500–1.000 bar", use: "Priprema površina, čišćenje cevi", bars: [500, 1000] },
      { label: "1.500–2.000 bar", use: "Uklanjanje premaza", bars: [1500, 2000] },
      { label: "2.500–3.000 bar", use: "Hidrodemolicija, rad ultra visokim pritiskom", bars: [2500, 3000] },
    ],
  },

  series: {
    title: "Tri serije",
    // Opseg snage i pritiska dopisuje se automatski iz podataka o mašinama
    items: [
      {
        series: "wheel-jet",
        text: "Kompaktne mašine na točkovima. Lako se premeštaju, pa odgovaraju radionicama, održavanju i poslovima na više mesta.",
      },
      {
        series: "base-jet",
        text: "Stacionarne mašine na ramu, za intenzivan industrijski rad i najviše pritiske.",
      },
      {
        series: "trail-jet",
        text: "Mašine na prikolici. Spajaju pokretljivost i veliki učinak, za gradilišta i velike površine.",
      },
    ],
  },

  choose: {
    title: "Na šta obratiti pažnju",
    items: [
      {
        title: "Pritisak",
        text: "Bira se prema podlozi i vrsti naslaga. Opšte industrijsko čišćenje traži 200 do 500 bara, priprema površina i uklanjanje premaza 500 do 1.500 bara, a hidrodemolicija 2.500 do 3.000 bara.",
      },
      {
        title: "Protok",
        text: "Protok određuje brzinu rada i površinu koju pokrivate. Za velike površine i duboko uklanjanje važan je koliko i pritisak.",
      },
      {
        title: "Pogon",
        text: "Električni pogon je za zatvoren prostor i mesta bez izduvnih gasova. Dizel i benzinski motor rade tamo gde nema priključka na struju.",
      },
      {
        title: "Pokretljivost",
        text: "Mašine na točkovima odgovaraju skučenom prostoru i radionicama. Za više lokacija i velike projekte bira se mašina na prikolici.",
      },
    ],
  },

  faq: {
    title: "Najčešća pitanja",
    items: [
      {
        q: "Po čemu se industrijska mašina razlikuje od običnog perača pod pritiskom?",
        a: "Običan perač je predviđen za povremenu upotrebu na pritisku ispod 150 bara. Industrijska mašina radi na znatno višem pritisku, ima jaču pumpu i ram i predviđena je za neprekidan profesionalni rad.",
      },
      {
        q: "Za šta se koristi visokopritisna mašina?",
        a: "Za pripremu površina pre farbanja, čišćenje cevi i kanalizacije, sanaciju betona i hidrodemoliciju, uklanjanje premaza i boja i održavanje brodova. Na 2.500 do 3.000 bara voda u mnogim poslovima zamenjuje abraziv i hemiju.",
      },
      {
        q: "Koji pritisak mi je potreban?",
        a: "Zavisi od podloge, vrste naslaga i dubine uklanjanja. Za intenzivno industrijsko čišćenje i pripremu površina uobičajeno je 500 do 1.500 bara, a za hidrodemoliciju do 3.000 bara.",
      },
      {
        q: "Električni, benzinski ili dizel pogon?",
        a: "Električni pogon je izbor za zatvoren prostor i mesta sa priključkom na struju. Benzinski i dizel motor daju nezavisnost od priključka, a dizel se koristi za najveće snage.",
      },
      {
        q: "Mogu li da vidim mašinu u radu pre kupovine?",
        a: "Da. Organizujemo demonstraciju sa probnim čišćenjem, prema vašoj primeni.",
      },
    ],
  },
};
