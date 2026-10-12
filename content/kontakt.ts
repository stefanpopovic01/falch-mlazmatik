// Tekstovi stranica /kontakt i /kontakt/hvala.

export const kontakt = {
  title: "Kontakt",
  lead: "Pošaljite upit za ponudu, servis, rezervni deo ili demonstraciju. Jedan formular za sve.",

  // Teme upita. id je vrednost parametra ?tema= u adresi.
  // heading je naslov iznad formulara; {proizvod} se zamenjuje šifrom.
  topics: [
    { id: "opsti", label: "Opšti upit", heading: "Pošaljite upit." },
    { id: "ponuda", label: "Ponuda za proizvod", heading: "Zatražite ponudu za {proizvod}." },
    { id: "servis", label: "Servis", heading: "Prijavite kvar." },
    { id: "rezervni-deo", label: "Rezervni deo", heading: "Zatražite rezervni deo." },
    { id: "demonstracija", label: "Demonstracija", heading: "Zatražite demonstraciju." },
  ],

  fields: {
    name: "Ime i prezime",
    company: "Firma",
    email: "Mejl",
    phone: "Telefon",
    topic: "Tema",
    product: "Proizvod (šifra)",
    productHint: "Na primer G411 ili S003. Šifra je na stranici proizvoda.",
    machineModel: "Model mašine",
    partNumber: "Šifra dela",
    partNumberHint: "Ako je nemate, opišite deo u poruci.",
    message: "Poruka",
    optional: "nije obavezno",
    consent: "Saglasan sam da Mlazmatik koristi ove podatke da odgovori na moj upit.",
    consentLink: "Politika privatnosti",
    submit: "Pošalji upit",
    sending: "Šaljem…",
  },

  errors: {
    name: "Upišite ime i prezime.",
    email: "Upišite ispravnu mejl adresu.",
    message: "Napišite poruku.",
    consent: "Potrebna je saglasnost da bismo mogli da odgovorimo.",
    // {email} i {phone} se zamenjuju podacima firme
    send: "Upit nije poslat. Pokušajte ponovo ili pišite na {email}.",
    notConfigured:
      "Formular još nije povezan sa servisom za slanje. Do tada pišite na {email} ili pozovite {phone}.",
  },

  details: {
    eyebrow: "Podaci",
    address: "Adresa",
    map: "Otvori u Google mapama",
    phone: "Telefon",
    email: "Mejl",
    hours: "Radno vreme",
  },
};

export const hvala = {
  title: "Hvala. Upit je poslat.",
  lead: "Javićemo vam se na mejl ili telefon koji ste ostavili.",
  // {proizvod} se zamenjuje šifrom iz upita
  product: "Upit se odnosi na {proizvod}.",
  links: "U međuvremenu:",
};
