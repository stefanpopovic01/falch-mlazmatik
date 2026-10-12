"use client";

import type { ReactNode } from "react";
import { openCookieSettings } from "@/lib/consent";

// Dugme koje ponovo otvara baner sa podešavanjima kolačića
export default function CookieSettingsButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  );
}
