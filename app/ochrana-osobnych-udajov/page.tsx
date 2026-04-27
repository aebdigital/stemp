import type { Metadata } from "next";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov",
  description:
    "Zásady spracúvania osobných údajov spoločnosti Stemp s.r.o. v zmysle GDPR.",
  alternates: { canonical: "/ochrana-osobnych-udajov" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            GDPR
          </span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Ochrana osobných údajov
          </h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-surface p-6 ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-ink">Prevádzkovateľ</h2>
            <div className="mt-3 space-y-1 text-sm text-muted">
              <div>{site.name}</div>
              <div>
                {site.address.street}, {site.address.cityZip}
              </div>
              <div>
                IČO: {site.ico}, DIČ: {site.dic}
              </div>
              <div>
                <a href={`mailto:${site.email}`} className="text-brand-blue hover:underline">
                  {site.email}
                </a>{" "}
                |{" "}
                <a
                  href={`tel:${site.phonePrimary.replace(/\s+/g, "")}`}
                  className="text-brand-blue hover:underline"
                >
                  {site.phonePrimary}
                </a>
              </div>
            </div>
          </div>

          <Reveal as="article">
            <h2 className="text-2xl font-bold text-ink">I. Kontaktný formulár</h2>
            <p className="mt-3 text-muted">
              Prevádzkujeme kontaktný formulár, prostredníctvom ktorého môžu
              návštevníci stránky <em>položiť otázku k našim produktom a
              službám</em> alebo <em>požiadať o cenovú ponuku</em>.
            </p>
            <p className="mt-3 font-semibold text-ink">Spracúvané údaje:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
              <li>Meno a priezvisko</li>
              <li>E-mailová adresa</li>
              <li>Telefónne číslo</li>
            </ul>
            <p className="mt-3 text-muted">
              <strong className="text-ink">Účel:</strong> reagovanie na otázky a
              nadviazanie kontaktu.
            </p>
            <p className="mt-2 text-muted">
              <strong className="text-ink">Právny základ:</strong> čl. 6 ods. 1
              písm. b) GDPR — predzmluvné opatrenia na žiadosť dotknutej osoby.
            </p>
            <p className="mt-2 text-muted">
              <strong className="text-ink">Doba uchovávania:</strong> najviac 10
              rokov od odpovede, pokiaľ z komunikácie nevznikne zmluvný vzťah.
            </p>
          </Reveal>

          <Reveal as="article">
            <h2 className="text-2xl font-bold text-ink">II. Súbory cookies</h2>
            <p className="mt-3 text-muted">Na stránke používame dve kategórie cookies:</p>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-muted">
              <li>Nevyhnutné cookies pre základnú funkčnosť stránky.</li>
              <li>Analytické cookies (vyžadujú váš súhlas).</li>
            </ol>
            <p className="mt-3 text-muted">
              Súhlas s analytickými cookies môžete kedykoľvek odvolať v
              nastaveniach cookies alebo v nastaveniach vášho prehliadača.
            </p>
          </Reveal>

          <Reveal as="article">
            <h2 className="text-2xl font-bold text-ink">
              III. Práva dotknutej osoby
            </h2>
            <p className="mt-3 text-muted">
              V zmysle GDPR máte právo na prístup k údajom, ich opravu, vymazanie,
              obmedzenie spracúvania, prenosnosť údajov, odvolanie súhlasu a
              právo podať sťažnosť na Úrade na ochranu osobných údajov SR
              (Hraničná 12, 820 07 Bratislava).
            </p>
            <p className="mt-3 text-muted">
              <strong className="text-ink">Kontakt pre uplatnenie práv:</strong>{" "}
              <a href={`mailto:${site.email}`} className="text-brand-blue hover:underline">
                {site.email}
              </a>{" "}
              alebo{" "}
              <a
                href={`tel:${site.phonePrimary.replace(/\s+/g, "")}`}
                className="text-brand-blue hover:underline"
              >
                {site.phonePrimary}
              </a>
              .
            </p>
          </Reveal>

          <p className="text-sm text-muted">Účinné od: 10. júna 2025</p>
        </div>
      </section>
    </>
  );
}
