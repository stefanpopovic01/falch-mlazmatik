// Saglasnost za kolačiće i Google Consent Mode v2.
//
// Izbor se čuva u localStorage. Dok posetilac ne odluči, sve osim neophodnog je odbijeno.
// Analitika i oglašavanje idu preko Google Tag Manager-a (NEXT_PUBLIC_GTM_ID), koji se
// učitava tek kada posetilac prihvati bar jednu kategoriju.

export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  // Kada je izbor sačuvan (ISO datum)
  timestamp: string;
};

export const CONSENT_KEY = "mlazmatik_cookie_consent";
export const CONSENT_CHANGED = "cookie-consent-changed";
export const OPEN_SETTINGS = "open-cookie-settings";

// Posle ovoliko dana ponovo pitamo posetioca
const MAX_AGE_DAYS = 365;

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Consent;
    const age = Date.now() - new Date(stored.timestamp).getTime();
    if (!(age < MAX_AGE_DAYS * 24 * 60 * 60 * 1000)) return null;
    return { necessary: true, analytics: !!stored.analytics, marketing: !!stored.marketing, timestamp: stored.timestamp };
  } catch {
    return null;
  }
}

// Javlja izbor Google oznakama (Consent Mode v2: četiri signala)
export function updateGoogleConsent(consent: Pick<Consent, "analytics" | "marketing">) {
  const w = window as GtagWindow;
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): Consent {
  const consent: Consent = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // Privatni režim ili isključeno skladište: izbor važi samo za ovu stranicu
  }
  updateGoogleConsent(consent);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: consent }));
  return consent;
}

// Otvara baner sa podešavanjima (link u podnožju i dugme na stranici Kolačići)
export const openCookieSettings = () => window.dispatchEvent(new CustomEvent(OPEN_SETTINGS));

// Podrazumevano stanje za Consent Mode v2. Ide u <head>, pre bilo koje Google skripte.
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`;

let gtmLoaded = false;

// Učitava Google Tag Manager jednom, i to tek posle saglasnosti.
export function loadGtm(id: string) {
  if (gtmLoaded || !id) return;
  gtmLoaded = true;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}
