"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const ENDPOINT = "/.netlify/functions/contact";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""), // honeypot
    };

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Odoslanie zlyhalo. Skúste znova.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nastala chyba.");
      setStatus("error");
    }
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
      {/* honeypot — bots fill it, humans don't see it */}
      <div aria-hidden className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label>
          Nevypĺňajte
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Meno a priezvisko" required disabled={loading} />
        <Field name="email" label="E-mail" type="email" required disabled={loading} />
      </div>
      <Field name="phone" label="Telefón" type="tel" disabled={loading} />
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Správa
          <span className="ml-1 text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={loading}
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-roll w-full rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black hover:text-white disabled:opacity-70 sm:w-auto"
      >
        <span className="btn-roll-inner">
          <span className="btn-roll-text btn-roll-text--main">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Spinner /> Odosielam…
              </span>
            ) : (
              "Odoslať"
            )}
          </span>
          <span className="btn-roll-text btn-roll-text--ghost" aria-hidden>
            Pošli správu →
          </span>
        </span>
      </button>

      {status === "success" && (
        <p
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"
        >
          Ďakujeme — vaša správa bola odoslaná. Ozveme sa vám čo najskôr.
        </p>
      )}
      {status === "error" && error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}
    </form>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      className="animate-spin"
      aria-hidden
    >
      <path d="M21 12a9 9 0 1 1-6.2-8.55" strokeLinecap="round" />
    </svg>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  disabled = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-wide text-muted"
      >
        {label}
        {required && <span className="ml-1 text-brand-red">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        autoComplete={
          name === "email" ? "email" : name === "phone" ? "tel" : name === "name" ? "name" : undefined
        }
        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 disabled:opacity-60"
      />
    </div>
  );
}
