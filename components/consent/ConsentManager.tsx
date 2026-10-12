"use client";

import { useEffect } from "react";
import { CONSENT_CHANGED, type Consent, loadGtm, readConsent, updateGoogleConsent } from "@/lib/consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

// Primenjuje sačuvani izbor pri svakom učitavanju i učitava Google Tag Manager
// tek kada je prihvaćena analitika ili marketing.
export default function ConsentManager() {
  useEffect(() => {
    const apply = (consent: Consent | null) => {
      if (!consent) return;
      updateGoogleConsent(consent);
      if (consent.analytics || consent.marketing) loadGtm(GTM_ID);
    };
    apply(readConsent());

    const onChange = (event: Event) => apply((event as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_CHANGED, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED, onChange);
  }, []);

  return null;
}
