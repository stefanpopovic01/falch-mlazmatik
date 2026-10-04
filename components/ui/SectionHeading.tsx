import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
};

export default function SectionHeading({ eyebrow, title, lead }: Props) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.2vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          {title}
        </h2>
      </div>
      {lead && (
        <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{lead}</p>
      )}
    </div>
  );
}
