import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Img from "@/components/ui/Img";
import { type Application, applicationHref, groupLabel } from "@/lib/applications";

type Props = {
  application: Application;
  sizes: string;
  // Velika pločica (početna strana)
  big?: boolean;
  heading?: "h2" | "h3";
  className?: string;
};

export default function ApplicationTile({
  application,
  sizes,
  big = false,
  heading: Heading = "h3",
  className = "",
}: Props) {
  return (
    <Link
      href={applicationHref(application.slug)}
      className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-brand-deep p-5 text-white lg:p-6 ${className}`}
    >
      <Img
        src={application.images[0].src}
        alt=""
        fill
        sizes={sizes}
        className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-0 -z-10 bg-brand/30 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100" />

      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] backdrop-blur-sm lg:left-5 lg:top-5">
        {groupLabel(application.groups[0])}
      </span>

      <div className="flex items-end justify-between gap-4">
        <Heading
          className={`font-display font-extrabold leading-[1.05] tracking-[-0.02em] ${
            big ? "text-3xl lg:text-5xl" : "text-2xl"
          }`}
        >
          {application.title}
        </Heading>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
          <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
