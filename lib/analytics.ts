import { readConsent } from "./consent";

// Oznaka u sessionStorage koju formular postavlja posle uspešnog slanja
export const ENQUIRY_FLAG = "mlazmatik:upit-poslat";

// Beleži poslat upit kao događaj "upit_poslat" u dataLayer, odakle ga Google Tag Manager
// prosleđuje analitici i oglasima. Šalje se samo ako je posetilac dao saglasnost.
//
// Stranica /kontakt/hvala poziva ovu funkciju samo posle stvarno poslatog upita
// (oznaka u sessionStorage), pa otvaranje te adrese ručno ne broji konverziju.
export function trackEnquiry(details: { topic: string; product?: string }) {
  const consent = readConsent();
  if (!consent?.analytics && !consent?.marketing) return;
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "upit_poslat", tema: details.topic, proizvod: details.product ?? "" });
}
