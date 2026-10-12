import { contactHref, routes } from "./site";

// Tekstovi stranica /servis i /servis/demonstracije.
// Izvor: falch.com (servis, rezervni delovi, demonstracije), skraćeno i prepisano.
// Falch-ove garancije rokova (odziv, popravka, isporuka delova) namerno NISU preuzete:
// dodati ih samo ako ih Mlazmatik potvrdi.

export const servis = {
  title: "Servis",
  lead: "Popravke, rezervni delovi i podrška za FALCH mašine. Jedan poziv ili jedan upit je dovoljan.",
  actions: [
    { label: "Prijavi kvar", href: contactHref("servis") },
    { label: "Zatraži rezervni deo", href: contactHref("rezervni-deo") },
  ],

  repairs: {
    eyebrow: "Popravke",
    title: "Od motora do pumpe, sve na jednom mestu.",
    lead: "Održavanje i popravke radi stručno osoblje, brzo i bez komplikacija. Uz to dobijate i savet za svako tehničko pitanje.",
    listTitle: "Šta popravljamo",
    list: [
      "Elektromotori",
      "Benzinski motori",
      "Dizel motori",
      "Pumpe visokog pritiska",
      "Pumpe ultra visokog pritiska",
      "Komore za sagorevanje",
      "Upravljačke jedinice",
      "Pribor",
    ],
    images: [
      { src: "servis/popravke/01", alt: "Serviser radi na otvorenoj FALCH mašini na prikolici" },
      { src: "servis/popravke/02", alt: "Servis FALCH mašine na terenu" },
      { src: "servis/popravke/03", alt: "FALCH mašine na prikolici pripremljene za transport" },
      { src: "servis/popravke/04", alt: "FALCH mašina na gradilištu u planini" },
    ],
  },

  parts: {
    eyebrow: "Rezervni delovi",
    title: "Deo naručujete jednim upitom.",
    lead: "Na sajtu nema kataloga delova. Pošaljite nam podatke, a mi vam javljamo cenu i rok isporuke.",
    button: { label: "Zatraži rezervni deo", href: contactHref("rezervni-deo") },
    steps: [
      {
        title: "Model mašine",
        text: "Navedite naziv i šifru mašine, na primer Wheel Jet 30, G411.",
      },
      {
        title: "Šifra dela",
        text: "Upišite šifru dela ako je znate. Ako je nemate, opišite deo ili pošaljite fotografiju.",
      },
      {
        title: "Pošaljite upit",
        text: "Upit stiže direktno servisu, bez posrednika.",
      },
    ],
  },

  videos: {
    eyebrow: "Video",
    title: "Uputstva za popravke.",
    lead: "Snimci proizvođača prikazuju popravke i održavanje korak po korak.",
    // id je YouTube ID, poster je slika u media-src/servis/
    items: [
      { id: "QL32lHG__NM", title: "Pištolj 30", poster: "servis/video-pistolj-30" },
      { id: "-LdgxAKEYjc", title: "Pumpa 500 bar: zaptivke i klipovi", poster: "servis/video-pumpa-500-bar-zaptivke" },
      { id: "0pLgkoEiJVk", title: "Pumpa 500 bar: ventili", poster: "servis/video-pumpa-500-bar-ventili" },
      { id: "o2ixZNzlSk4", title: "Pumpa 1000 i 2000 bar", poster: "servis/video-pumpa-1000-2000-bar" },
      { id: "-VzCt0EYPX8", title: "Pumpa 125 kW: servis i održavanje", poster: "servis/video-pumpa-125-kw" },
      { id: "qe82P5bicbQ", title: "Prekidački ventil 2500 bar", poster: "servis/video-prekidacki-ventil-2500-bar" },
    ],
  },

  demoTeaser: {
    label: "Demonstracije",
    title: "Vidite mašinu u radu pre kupovine.",
    href: routes.demonstracije,
    image: "servis/demonstracije/01",
  },

  cta: {
    eyebrow: "Servis",
    title: "Mašina stoji?",
    text: "Pozovite servis ili pošaljite upit sa opisom kvara.",
    button: "Prijavi kvar",
    href: contactHref("servis"),
  },
};

export const demonstracije = {
  title: "Demonstracije",
  lead: "Razlika između obične visokopritisne mašine i FALCH mašine najbolje se vidi uživo. Pokazaćemo vam mašinu u radu, sa priborom i mlaznicama za vaš posao.",
  action: { label: "Zatraži demonstraciju", href: contactHref("demonstracija") },

  how: {
    eyebrow: "Kako izgleda",
    title: "Tri koraka do mašine u radu.",
    lead: "Demonstraciju pripremamo prema vašoj primeni, da vidite ono što je važno za vaš posao.",
    steps: [
      {
        title: "Opišete posao",
        text: "Šta se čisti ili uklanja, sa koje podloge i na kolikoj površini.",
      },
      {
        title: "Biramo opremu",
        text: "Pripremamo mašinu, pribor i mlaznice koje odgovaraju toj primeni.",
      },
      {
        title: "Mašina u radu",
        text: "Naši tehničari pokazuju rad uživo, a vi sami isprobate mlaz.",
      },
    ],
    images: [
      { src: "servis/demonstracije/01", alt: "Tehničar pokazuje rad visokopritisnim pištoljem" },
      { src: "servis/demonstracije/02", alt: "Demonstracija čišćenja oplate" },
      { src: "servis/demonstracije/03", alt: "Demonstracija čišćenja kontejnera" },
      { src: "servis/demonstracije/04", alt: "Demonstracija rada na brodu" },
    ],
  },

  test: {
    eyebrow: "Probno čišćenje",
    title: "Znate rezultat pre nego što kupite.",
    lead: "Probno čišćenje pokazuje šta mašina može na vašem zadatku, pa odluku donosite na osnovu onoga što ste videli.",
    image: { src: "servis/demonstracije/05", alt: "Podešavanje mlaznica pre probnog čišćenja" },
    points: [
      {
        title: "Sigurnija kalkulacija",
        text: "Vidite stvarni učinak, pa posao možete da izračunate unapred.",
      },
      {
        title: "Pravi izbor pribora i mlaznica",
        text: "Podešavanja se probaju na licu mesta, dok ne daju najbolji rezultat.",
      },
      {
        title: "Bez iznenađenja na terenu",
        text: "Kada posao počne, oprema i postupak su već provereni.",
      },
    ],
  },

  cta: {
    eyebrow: "Demonstracija",
    title: "Želite da vidite mašinu u radu?",
    text: "Opišite nam posao i dogovorićemo termin.",
    button: "Zatraži demonstraciju",
    href: contactHref("demonstracija"),
  },
};
