// Tekstovi pravnih stranica (/privatnost, /kolacici) i banera za kolačiće.
//
// NACRT: tekst je napisan prema tome šta sajt stvarno radi, ali ga pre objave
// mora pregledati pravnik klijenta. 
// Kada tekst bude potvrđen, postavite draft na false i poruka o nacrtu nestaje sa stranice.
//
// U tekstu se zamenjuju: {name}, {address}, {pib}, {mb}, {email}, {phone} (podaci iz content/site.ts).

export type LegalBlock =
  | string
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } }
  // Dugme koje otvara podešavanja kolačića
  | { settingsButton: string };

export type LegalPage = {
  title: string;
  lead: string;
  // Datum poslednje izmene, GGGG-MM-DD
  updated: string;
  draft: boolean;
  sections: { id: string; title: string; blocks: LegalBlock[] }[];
};

export const draftNotice =
  "Nacrt. Ovaj tekst čeka pravnu proveru i podatke označene uglastim zagradama.";

export const privatnost: LegalPage = {
  title: "Privatnost",
  lead: "Koje podatke prikupljamo preko ovog sajta, zašto, koliko ih čuvamo i koja su vaša prava.",
  updated: "2026-10-12",
  draft: false,
  sections: [
    {
      id: "rukovalac",
      title: "Ko obrađuje vaše podatke",
      blocks: [
        "Rukovalac podacima je {name}, {address}. PIB: {pib}, matični broj: {mb}.",
        "Za sva pitanja o podacima o ličnosti pišite na {email} ili pozovite {phone}.",
        "Podatke obrađujemo u skladu sa Zakonom o zaštiti podataka o ličnosti („Službeni glasnik RS“, br. 87/2018).",
      ],
    },
    {
      id: "podaci",
      title: "Koje podatke prikupljamo",
      blocks: [
        "Podatke koje nam sami pošaljete preko kontakt formulara:",
        {
          list: [
            "ime i prezime",
            "naziv firme, ako ga upišete",
            "mejl adresu",
            "broj telefona, ako ga upišete",
            "sadržaj poruke, kao i šifru proizvoda, model mašine ili šifru dela na koje se upit odnosi",
          ],
        },
        "Tehničke podatke koji nastaju pri svakoj poseti sajtu: IP adresu, vrstu pregledača i uređaja i vreme pristupa. Njih beleži server na kome se sajt nalazi.",
        "Podatke o tome kako koristite sajt (posećene stranice, uređaj, pregledač) i podatke za merenje oglasa, preko Google alata. Njih prikupljamo samo ako u baneru za kolačiće date saglasnost za analitičke, odnosno marketinške kolačiće.",
        "Ne tražimo i ne obrađujemo posebne vrste podataka (zdravstveno stanje, politička ili verska uverenja i slično). Molimo vas da ih ne upisujete u poruku.",
      ],
    },
    {
      id: "svrha",
      title: "Zašto ih obrađujemo i po kom osnovu",
      blocks: [
        {
          list: [
            "Da odgovorimo na vaš upit, pripremimo ponudu, organizujemo servis ili demonstraciju. Osnov je vaš pristanak, koji dajete potvrdom u formularu, odnosno preduzimanje radnji na vaš zahtev pre zaključenja ugovora.",
            "Da sajt radi bezbedno i bez prekida (tehnički podaci o poseti). Osnov je naš legitimni interes da zaštitimo sajt od zloupotrebe.",
            "Da razumemo kako se sajt koristi i da merimo učinak oglasa. Osnov je vaša saglasnost, koju dajete u baneru za kolačiće i možete da je povučete u svakom trenutku.",
          ],
        },
        "Podatke ne koristimo za automatsko donošenje odluka. Ne prodajemo ih.",
      ],
    },
    {
      id: "primaoci",
      title: "Ko još ima pristup podacima",
      blocks: [
        "Podatke vide zaposleni kojima su potrebni da bi odgovorili na upit. Pored njih, u naše ime ih obrađuju pružaoci usluga:",
        {
          list: [
            "Vercel Inc. (SAD), na čijim serverima se sajt nalazi",
            "Web3Forms, servis koji upit sa formulara prosleđuje na naš mejl",
            "Google, čiju mejl uslugu koristimo, a uz vašu saglasnost i alate za analitiku i oglašavanje (Google Tag Manager, Google Analytics, Google Ads)",
          ],
        },
        "Neki od ovih pružalaca imaju sedište van Republike Srbije, pa se podaci mogu preneti u druge države.",
      ],
    },
    {
      id: "video-i-mape",
      title: "Video snimci i mape",
      blocks: [
        "Video snimci na sajtu nalaze se na YouTube-u. Ne učitavaju se sami: tek kada kliknete na snimak, vaš pregledač se povezuje sa servisom youtube-nocookie.com kompanije Google i tada Google dobija vašu IP adresu.",
        "Mapa na stranici Kontakt je običan link ka Google mapama. Podaci se Google-u šalju tek kada otvorite taj link.",
      ],
    },
    {
      id: "rok",
      title: "Koliko dugo čuvamo podatke",
      blocks: [
        "Upite čuvamo onoliko koliko je potrebno da na njih odgovorimo i vodimo poslovnu prepisku, a najduže 90 dana od poslednjeg kontakta. Ako iz upita nastane ugovor, podatke čuvamo u rokovima koje propisuju zakoni o računovodstvu i porezima.",
        "Tehničke podatke o posetama pružalac hostinga čuva u skladu sa svojim pravilima.",
      ],
    },
    {
      id: "prava",
      title: "Vaša prava",
      blocks: [
        "U svakom trenutku možete da tražite:",
        {
          list: [
            "informaciju o tome da li obrađujemo vaše podatke i kopiju tih podataka",
            "ispravku netačnih i dopunu nepotpunih podataka",
            "brisanje podataka",
            "ograničenje obrade",
            "prenos podataka vama ili drugom rukovaocu",
          ],
        },
        "Možete i da opozovete pristanak ili da podnesete prigovor na obradu. Opoziv ne utiče na obradu koja je obavljena pre njega.",
        "Zahtev pošaljite na {email}. Odgovaramo u roku od 30 dana.",
        "Ako smatrate da vaše podatke ne obrađujemo zakonito, možete podneti pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti, Bulevar kralja Aleksandra 15, 11120 Beograd, www.poverenik.rs.",
      ],
    },
    {
      id: "kolacici",
      title: "Kolačići",
      blocks: [
        "Kako sajt koristi kolačiće i slične tehnologije i kako da promenite izbor, opisano je na stranici Kolačići.",
      ],
    },
    {
      id: "izmene",
      title: "Izmene ovog teksta",
      blocks: [
        "Tekst menjamo kada se promeni način na koji sajt radi ili propisi. Datum poslednje izmene je na vrhu stranice.",
      ],
    },
  ],
};

export const cookieBanner = {
  label: "Podešavanja kolačića",
  title: "Poštujemo vašu privatnost",
  description:
    "Koristimo kolačiće neophodne za rad sajta, a uz vašu saglasnost i kolačiće za analitiku posećenosti i oglašavanje. Prihvatite sve, odbijte sve što nije neophodno ili izaberite po kategorijama.",
  more: "Više o kolačićima",
  customize: "Prilagodi",
  reject: "Odbij sve",
  accept: "Prihvati sve",
  save: "Sačuvaj izbor",
  settingsTitle: "Prilagodite kolačiće",
  alwaysOn: "Uvek uključeno",
  categories: {
    necessary: {
      title: "Neophodni",
      text: "Potrebni su da sajt radi i da zapamti vaš izbor o kolačićima. Ne mogu se isključiti.",
    },
    analytics: {
      title: "Analitički",
      text: "Google Analytics. Pomažu nam da razumemo kako posetioci koriste sajt, da bismo ga poboljšali.",
    },
    marketing: {
      title: "Marketinški",
      text: "Google Ads. Služe za merenje učinka oglasa i prikaz relevantnih oglasa na drugim sajtovima.",
    },
  },
};

export const kolacici: LegalPage = {
  title: "Kolačići",
  lead: "Koje kolačiće i slične tehnologije ovaj sajt koristi, čemu služe i kako da promenite svoj izbor.",
  updated: "2026-10-12",
  draft: false,
  sections: [
    {
      id: "sta-su",
      title: "Šta su kolačići",
      blocks: [
        "Kolačići su male tekstualne datoteke koje sajt čuva u vašem pregledaču. Slično rade i lokalno skladište i skladište sesije pregledača, pa ovaj tekst važi i za njih.",
        "Neki su neophodni da sajt radi. Ostale koristimo samo ako nam to dozvolite.",
      ],
    },
    {
      id: "izbor",
      title: "Vaš izbor",
      blocks: [
        "Pri prvoj poseti pitamo vas koje kategorije prihvatate. Dok ne odlučite, analitički i marketinški kolačići su isključeni, a alati koji ih postavljaju se ne učitavaju.",
        "Izbor možete da promenite ili povučete u svakom trenutku, ovde ili preko linka „Podešavanja kolačića“ u dnu svake stranice. Izbor pamtimo 12 meseci, a zatim pitamo ponovo.",
        { settingsButton: "Otvori podešavanja kolačića" },
      ],
    },
    {
      id: "spisak",
      title: "Spisak kolačića",
      blocks: [
        "Neophodni. Uvek su uključeni i ne služe za praćenje.",
        {
          table: {
            head: ["Naziv", "Čemu služi", "Trajanje"],
            rows: [
              ["mlazmatik_cookie_consent", "Pamti vaš izbor o kolačićima (lokalno skladište pregledača).", "12 meseci"],
              ["mlazmatik:upit-poslat", "Označava da je upit sa formulara upravo poslat (skladište sesije).", "Do zatvaranja kartice"],
            ],
          },
        },
        "Analitički. Postavlja ih Google Analytics, samo uz vašu saglasnost.",
        {
          table: {
            head: ["Naziv", "Čemu služi", "Trajanje"],
            rows: [
              ["_ga", "Razlikuje posetioce radi statistike poseta.", "2 godine"],
              ["_ga_<oznaka>", "Čuva stanje posete za Google Analytics.", "2 godine"],
            ],
          },
        },
        "Marketinški. Postavlja ih Google Ads, samo uz vašu saglasnost.",
        {
          table: {
            head: ["Naziv", "Čemu služi", "Trajanje"],
            rows: [["_gcl_au", "Meri da li je poseta posle oglasa dovela do upita.", "90 dana"]],
          },
        },
      ],
    },
    {
      id: "google",
      title: "Google Consent Mode",
      blocks: [
        "Vaš izbor prosleđujemo Google alatima preko mehanizma Consent Mode v2. Ako odbijete, ti alati ne dobijaju dozvolu da čuvaju kolačiće za analitiku i oglašavanje, niti da koriste vaše podatke za personalizovane oglase.",
      ],
    },
    {
      id: "trece-strane",
      title: "Sadržaj sa drugih servisa",
      blocks: [
        "Video snimci se učitavaju tek na vaš klik, sa servisa youtube-nocookie.com. Mapa je link ka Google mapama. Do klika ti servisi ne postavljaju kolačiće preko našeg sajta.",
      ],
    },
    {
      id: "pregledac",
      title: "Podešavanja u pregledaču",
      blocks: [
        "Kolačiće možete da obrišete ili blokirate i u podešavanjima svog pregledača. Ako blokirate neophodne, sajt će svaki put ponovo pitati za izbor.",
      ],
    },
    {
      id: "odgovornost",
      title: "Ko je odgovoran",
      blocks: [
        "Za kolačiće na ovom sajtu odgovara {name}, {address}. Pitanja pošaljite na {email}.",
      ],
    },
  ],
};
