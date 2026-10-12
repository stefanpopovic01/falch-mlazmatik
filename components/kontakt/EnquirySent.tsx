"use client";

import { useEffect, useState } from "react";
import { hvala } from "@/content/kontakt";
import { ENQUIRY_FLAG, trackEnquiry } from "@/lib/analytics";

// Prikazuje na koji se proizvod upit odnosi i beleži konverziju,
// ali samo ako je upit stvarno poslat u ovoj poseti.
export default function EnquirySent() {
  const [product, setProduct] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = (params.get("proizvod") ?? "").replace(/[^\w.-]/g, "").slice(0, 20);
    setProduct(code);

    if (sessionStorage.getItem(ENQUIRY_FLAG)) {
      sessionStorage.removeItem(ENQUIRY_FLAG);
      trackEnquiry({ topic: params.get("tema") ?? "opsti", product: code || undefined });
    }
  }, []);

  if (!product) return null;
  const [before, after] = hvala.product.split("{proizvod}");
  return (
    <p className="mt-4 text-lg text-white/80">
      {before}
      <span className="font-mono font-medium text-white">{product}</span>
      {after}
    </p>
  );
}
