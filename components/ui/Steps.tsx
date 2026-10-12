type Props = {
  items: { title: string; text: string }[];
  tone?: "light" | "dark";
  className?: string;
};

// Numerisani koraci u tri kolone. Samo za stvarni redosled (prvo, zatim, na kraju).
export default function Steps({ items, tone = "light", className = "" }: Props) {
  const dark = tone === "dark";
  return (
    <ol className={`grid gap-x-8 md:grid-cols-3 ${className}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`border-t py-8 lg:py-10 ${dark ? "border-white/15" : "border-line"}`}
        >
          <span
            className={`font-mono text-5xl font-medium tracking-tight lg:text-6xl ${
              dark ? "text-brand-light" : "text-brand"
            }`}
            aria-hidden
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-6 font-display text-2xl font-extrabold tracking-[-0.02em] lg:text-[1.75rem]">
            {item.title}
          </h3>
          <p
            className={`mt-2 max-w-[38ch] text-lg leading-relaxed ${
              dark ? "text-white/70" : "text-muted"
            }`}
          >
            {item.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
