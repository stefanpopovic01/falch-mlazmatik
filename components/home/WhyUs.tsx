import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyUs } from "@/content/home";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const icons = {
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  drop: (
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  ),
  chat: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
};

export default function WhyUs() {
  return (
    <Container as="section" className="py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              stacked
              eyebrow={whyUs.eyebrow}
              title={whyUs.title}
              lead={whyUs.lead}
            />
          </div>
        </div>

        <ul className="lg:col-span-6 lg:col-start-7">
          {whyUs.items.map((reason) => (
            <li
              key={reason.title}
              className="group flex gap-5 border-t border-line py-8 last:border-b sm:gap-7 lg:py-10"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-brand ring-1 ring-line transition-colors duration-300 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                <Icon>{icons[reason.icon]}</Icon>
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] lg:text-[1.75rem]">
                  {reason.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-lg leading-relaxed text-muted">
                  {reason.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
