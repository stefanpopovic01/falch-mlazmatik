import Link from "next/link";
import Img from "@/components/ui/Img";
import { driveLabels, typeLabels } from "@/content/robots-info";
import { type Robot, robotHref, robotPressure, robotText } from "@/lib/robots";

type Props = {
  robot: Robot;
  sizes?: string;
  heading?: "h2" | "h3";
};

export default function RobotCard({
  robot,
  sizes = "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw",
  heading: Heading = "h3",
}: Props) {
  const pressure = robotPressure(robot);

  return (
    <Link
      href={robotHref(robot.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(96,84,151,0.55)]"
    >
      <div className="relative aspect-[4/3] bg-white">
        <Img
          src={robot.images[0].src}
          alt=""
          fill
          sizes={sizes}
          className="object-contain p-5 transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
          {robot.itemNumber}
        </span>
      </div>

      <div className="flex flex-1 flex-col border-t border-line p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
          {typeLabels[robot.type]} · {driveLabels[robot.drive]}
        </p>
        <Heading className="mt-2 font-display text-xl font-extrabold leading-tight tracking-[-0.02em]">
          {robot.name}
        </Heading>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{robotText(robot)}</p>

        {pressure && (
          <dl className="mt-auto pt-6">
            <div className="flex flex-col-reverse border-t border-line pt-3">
              <dt className="text-xs text-muted">Radni pritisak</dt>
              <dd className="font-mono text-lg font-medium tracking-tight">{pressure}</dd>
            </div>
          </dl>
        )}
      </div>
    </Link>
  );
}
