import Link from "next/link";
import type { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";

const variants = {
  // Na tamnoj pozadini (hero, tamne sekcije)
  light: "bg-white text-ink hover:bg-ink hover:text-white",
  outline:
    "border border-white/45 text-white backdrop-blur-sm hover:border-white hover:bg-white/10",
  // Na svetloj pozadini
  brand: "bg-brand text-white hover:bg-brand-deep",
  ghost: "border border-line text-ink hover:border-brand hover:text-brand",
};

const sizes = {
  md: "px-6 py-2.5 text-[15px]",
  lg: "px-8 py-4 text-base",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "brand",
  size = "lg",
  arrow = false,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
