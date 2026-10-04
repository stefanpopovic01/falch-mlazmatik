import type { CSSProperties, ReactNode } from "react";

const tones = {
  light: { text: "text-white/80", line: "bg-white/60" },
  brand: { text: "text-brand", line: "bg-brand" },
};

type Props = {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  style?: CSSProperties;
};

export default function Eyebrow({
  children,
  tone = "brand",
  className = "",
  style,
}: Props) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] sm:text-[13px] ${tones[tone].text} ${className}`}
      style={style}
    >
      <span className={`h-px w-10 ${tones[tone].line}`} />
      {children}
    </p>
  );
}
