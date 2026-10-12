"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useId, useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { kontakt } from "@/content/kontakt";
import { company, routes } from "@/content/site";
import { ENQUIRY_FLAG } from "@/lib/analytics";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;

const { fields, errors: messages, topics } = kontakt;

type Props = {
  // Šifra -> naziv, za mašine i pribor, da se uz šifru prikaže o čemu je reč
  products: Record<string, string>;
};

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  product: string;
  variant: string;
  machineModel: string;
  partNumber: string;
  message: string;
  consent: boolean;
  // Polje koje ljudi ne vide. Ako je popunjeno, upit je poslao robot.
  trap: string;
};

const empty: Values = {
  name: "",
  company: "",
  email: "",
  phone: "",
  topic: "opsti",
  product: "",
  variant: "",
  machineModel: "",
  partNumber: "",
  message: "",
  consent: false,
  trap: "",
};

const fill = (text: string) =>
  text.replace("{email}", company.email).replace("{phone}", company.phone.label);

const input =
  "w-full rounded-xl bg-mist/60 px-4 py-3.5 text-base text-ink ring-1 ring-line transition-shadow placeholder:text-muted focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-error";

export default function ContactForm({ products }: Props) {
  const router = useRouter();
  const id = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [failure, setFailure] = useState("");

  // Dugmad na sajtu otvaraju formular sa već upisanom temom ili proizvodom:
  // /kontakt?tema=servis, /kontakt?proizvod=G411&varijanta=Overpack%20S
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = (params.get("proizvod") ?? "").trim();
    const topic = params.get("tema") ?? "";
    setValues((current) => ({
      ...current,
      product,
      variant: (params.get("varijanta") ?? "").trim(),
      topic: topics.some((item) => item.id === topic) ? topic : product ? "ponuda" : "opsti",
    }));
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const topic = topics.find((item) => item.id === values.topic) ?? topics[0];
  const productCode = values.product.trim().toUpperCase();
  const productName = products[productCode];
  const heading =
    topic.id === "ponuda" && !productCode
      ? "Zatražite ponudu."
      : topic.heading.replace("{proizvod}", productCode);

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const found: typeof errors = {};
    if (!values.name.trim()) found.name = messages.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) found.email = messages.email;
    if (!values.message.trim()) found.message = messages.message;
    if (!values.consent) found.consent = messages.consent;
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`${id}-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    const done = () => {
      sessionStorage.setItem(ENQUIRY_FLAG, "1");
      const params = new URLSearchParams({ tema: topic.id });
      if (productCode) params.set("proizvod", productCode);
      router.push(`${routes.hvala}?${params}`);
    };

    // Robot je popunio skriveno polje: ponašamo se kao da je poslato, a ne šaljemo ništa.
    if (values.trap) return done();

    if (!ENDPOINT) {
      setStatus("failed");
      setFailure(fill(messages.notConfigured));
      return;
    }

    setStatus("sending");
    const subject = `Upit sa sajta: ${topic.label}${productCode ? ` (${productCode})` : ""}`;
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          // Nazivi polja su ono što stiže u mejlu
          Tema: topic.label,
          Proizvod: productCode ? `${productCode}${productName ? ` · ${productName}` : ""}` : "",
          Varijanta: values.variant,
          "Model mašine": values.machineModel.trim(),
          "Šifra dela": values.partNumber.trim(),
          Ime: values.name.trim(),
          Firma: values.company.trim(),
          Telefon: values.phone.trim(),
          Poruka: values.message.trim(),
          // Polja koja servisi prepoznaju: adresa za odgovor i naslov mejla
          email: values.email.trim(),
          _subject: subject,
          subject,
          ...(ACCESS_KEY ? { access_key: ACCESS_KEY, from_name: "Sajt Mlazmatik" } : {}),
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      done();
    } catch {
      setStatus("failed");
      setFailure(fill(messages.send));
    }
  };

  const label = (key: keyof Values, text: string, required = false) => (
    <label htmlFor={`${id}-${key}`} className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-[15px] font-medium text-ink">{text}</span>
      {!required && <span className="text-xs text-muted">{fields.optional}</span>}
    </label>
  );

  const error = (key: keyof Values) =>
    errors[key] && (
      <p id={`${id}-${key}-error`} className="mt-2 text-sm font-medium text-error">
        {errors[key]}
      </p>
    );

  const invalid = (key: keyof Values) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
  });

  const needsMachine = topic.id === "servis" || topic.id === "rezervni-deo";

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8 lg:p-10">
      <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-4xl">
        {heading}
      </h2>
      {productName && (
        <p className="mt-3 text-lg text-muted">
          {productName}
          {values.variant && !productName.includes(values.variant) && `, ${values.variant}`}
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          {label("name", fields.name, true)}
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
            className={input}
            required
            {...invalid("name")}
          />
          {error("name")}
        </div>
        <div>
          {label("company", fields.company)}
          <input
            id={`${id}-company`}
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => set("company", event.target.value)}
            className={input}
          />
        </div>
        <div>
          {label("email", fields.email, true)}
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
            className={input}
            required
            {...invalid("email")}
          />
          {error("email")}
        </div>
        <div>
          {label("phone", fields.phone)}
          <input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => set("phone", event.target.value)}
            className={input}
          />
        </div>

        <div>
          {label("topic", fields.topic, true)}
          <select
            id={`${id}-topic`}
            value={values.topic}
            onChange={(event) => set("topic", event.target.value)}
            className={`${input} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%235d5873' stroke-width='1.6'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5'/%3E%3C/svg%3E")] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-11`}
          >
            {topics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          {label("product", fields.product)}
          <input
            id={`${id}-product`}
            type="text"
            value={values.product}
            onChange={(event) => set("product", event.target.value)}
            className={`${input} font-mono uppercase placeholder:normal-case`}
            aria-describedby={`${id}-product-hint`}
          />
          <p id={`${id}-product-hint`} className="mt-2 text-sm text-muted">
            {fields.productHint}
          </p>
        </div>

        {needsMachine && (
          <div className={topic.id === "servis" ? "sm:col-span-2" : ""}>
            {label("machineModel", fields.machineModel)}
            <input
              id={`${id}-machineModel`}
              type="text"
              value={values.machineModel}
              onChange={(event) => set("machineModel", event.target.value)}
              className={input}
            />
          </div>
        )}
        {topic.id === "rezervni-deo" && (
          <div>
            {label("partNumber", fields.partNumber)}
            <input
              id={`${id}-partNumber`}
              type="text"
              value={values.partNumber}
              onChange={(event) => set("partNumber", event.target.value)}
              className={`${input} font-mono`}
              aria-describedby={`${id}-partNumber-hint`}
            />
            <p id={`${id}-partNumber-hint`} className="mt-2 text-sm text-muted">
              {fields.partNumberHint}
            </p>
          </div>
        )}

        <div className="sm:col-span-2">
          {label("message", fields.message, true)}
          <textarea
            id={`${id}-message`}
            rows={6}
            value={values.message}
            onChange={(event) => set("message", event.target.value)}
            className={`${input} resize-y`}
            required
            {...invalid("message")}
          />
          {error("message")}
        </div>
      </div>

      {/* Zamka za robote: polje je van ekrana i nije dostupno tastaturom ni čitačima ekrana */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Ne popunjavajte ovo polje
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.trap}
            onChange={(event) => set("trap", event.target.value)}
          />
        </label>
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id={`${id}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(event) => set("consent", event.target.checked)}
            className="mt-1 size-5 shrink-0 rounded accent-brand"
            required
            {...invalid("consent")}
          />
          <span className="leading-relaxed text-muted">
            {fields.consent}{" "}
            <Link
              href={routes.privatnost}
              className="font-medium text-brand underline underline-offset-4"
            >
              {fields.consentLink}
            </Link>
          </span>
        </label>
        {error("consent")}
      </div>

      {status === "failed" && (
        <p role="alert" className="mt-6 rounded-xl bg-error/8 p-4 font-medium text-error ring-1 ring-error/25">
          {failure}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-deep disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? fields.sending : fields.submit}
        <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
