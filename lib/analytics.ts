// Mesto za praćenje konverzija. Analitika i baner za kolačiće još nisu ugrađeni,
// pa ova funkcija za sada ne radi ništa.
//
// Kada se ugrade: događaj se šalje samo ako je posetilac dao saglasnost za analitiku.
// Stranica /kontakt/hvala poziva ovu funkciju samo posle stvarno poslatog upita
// (oznaka u sessionStorage), pa otvaranje te adrese ručno ne broji konverziju.
export function trackEnquiry(_details: { topic: string; product?: string }) {
  // TODO: poslati događaj izabranom alatu za analitiku, uz proveru saglasnosti.
}

// Oznaka u sessionStorage koju formular postavlja posle uspešnog slanja
export const ENQUIRY_FLAG = "mlazmatik:upit-poslat";
