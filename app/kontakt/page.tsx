import type { Metadata } from "next";
import { site } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt na Stemp s.r.o. — adresa, telefón, e-mail a kontaktný formulár.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            Spojte sa s nami
          </Reveal>
          <Reveal as="h1" delay={80} className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Kontakt
          </Reveal>
          <Reveal as="p" delay={140} className="mt-4 max-w-2xl text-white/70">
            Sme tu, aby sme vám poradili pri vašom stavebnom zámere. Napíšte
            nám alebo zavolajte — ozveme sa obratom.
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink">Fakturačné údaje</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Spoločnosť" value={site.name} />
              <Row
                label="Adresa"
                value={
                  <>
                    {site.address.street}
                    <br />
                    {site.address.cityZip}
                  </>
                }
              />
              <Row label="IČO" value={site.ico} />
              <Row label="DIČ" value={site.dic} />
              <Row label="IČ DPH" value={site.icDph} />
              <Row
                label="E-mail"
                value={
                  <a
                    href={`mailto:${site.email}`}
                    className="text-brand-blue hover:underline"
                  >
                    {site.email}
                  </a>
                }
              />
              <Row
                label="Telefón"
                last
                value={
                  <a
                    href={`tel:${site.phonePrimary.replace(/\s+/g, "")}`}
                    className="text-brand-blue hover:underline"
                  >
                    {site.phonePrimary}
                  </a>
                }
              />
            </dl>

            <h2 className="mt-12 text-2xl font-bold text-ink">Vedenie spoločnosti</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {site.people.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl border border-black/5 bg-surface p-5"
                >
                  <div className="text-xs font-medium uppercase tracking-wide text-muted">
                    {p.role}
                  </div>
                  <div className="mt-2 text-base font-semibold text-ink">
                    {p.name}
                  </div>
                  <a
                    href={`tel:${p.phone.replace(/\s+/g, "")}`}
                    className="mt-1 inline-block text-sm text-brand-blue hover:underline"
                  >
                    Mobil: {p.phone}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold text-ink">Formulár</h2>
            <p className="mt-2 text-sm text-muted">
              Jednoducho napíšte krátku správu s čím by ste potrebovali poradiť
              a my sa Vám za okamih ozveme.
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-surface pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
            <iframe
              title="Mapa — Stemp s.r.o."
              src="https://www.google.com/maps?q=Stemp%20s.r.o.%2C%20Hod%C5%BEova%2014%2F5048%2C%20058%2001%20Poprad&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-6 ${
        last ? "" : "border-b border-black/5 pb-3"
      }`}
    >
      <dt className="font-medium text-muted">{label}</dt>
      <dd className="text-right text-ink-soft">{value}</dd>
    </div>
  );
}
