import Image from "next/image";
import ParallaxHero from "@/components/ParallaxHero";
import Reveal from "@/components/Reveal";
import RollButton from "@/components/RollButton";
import { heroImages, services, site, stats } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <ParallaxHero
        images={[
          "20230525_065027-scaled.jpg",
          "received_759620131569861.jpeg",
        ]}
      />

      {/* Stats */}
      <section className="relative z-10 -mt-10 bg-white pb-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid grid-cols-1 gap-6 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:grid-cols-3 sm:p-8">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface px-6 py-8 text-center">
                <div className="text-4xl font-bold text-brand-blue sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="relative h-80 overflow-hidden rounded-3xl shadow-xl lg:h-full">
            <Image
              src={`/images/${heroImages[1]}`}
              alt="Stavba Stemp"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <Reveal as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              O spoločnosti
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Tridsať rokov na stavebnom trhu
            </Reveal>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <Reveal as="p" delay={140}>
                Spoločnosť STEMP bola založená v roku 1991 a v roku 1993 sa
                transformovala na spoločnosť s ručením obmedzeným. Za tri
                desaťročia sme realizovali stovky projektov pre súkromných
                investorov, firmy aj samosprávy.
              </Reveal>
              <Reveal as="p" delay={220}>
                Našou víziou je byť stabilným a najžiadanejším dodávateľom
                stavebných prác na východnom Slovensku — s dôrazom na kvalitu,
                spoľahlivosť a férový prístup ku každému klientovi.
              </Reveal>
            </div>
            <Reveal delay={300} className="mt-8">
              <RollButton
                href="/kontakt"
                ghost="Spojte sa →"
                className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white hover:bg-brand-blue"
              >
                Spojte sa s nami
              </RollButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="sluzby" className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              Naše služby
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Čo pre vás dokážeme zrealizovať
            </Reveal>
            <Reveal as="p" delay={140} className="mt-4 text-muted">
              Od základov rodinných domov po rozsiahle rekonštrukcie verejných
              budov — pokrývame celý životný cyklus stavby.
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                as="article"
                delay={i * 60}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute right-4 top-4 text-xs font-semibold text-muted-soft">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg>
                </div>
                <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-10 text-white sm:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <Reveal as="h2" className="text-3xl font-bold text-white sm:text-4xl">
              Plánujete stavbu alebo rekonštrukciu?
            </Reveal>
            <Reveal as="p" delay={80} className="mt-3 max-w-xl text-white/70">
              Napíšte nám alebo zavolajte — pripravíme nezáväznú cenovú ponuku
              šitú na mieru vášmu projektu.
            </Reveal>
          </div>
          <Reveal delay={140} className="flex flex-wrap gap-3">
            <RollButton
              href={`mailto:${site.email}`}
              external
              ghost="Napíšte nám"
              className="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              {site.email}
            </RollButton>
            <RollButton
              href={`tel:${site.phonePrimary.replace(/\s+/g, "")}`}
              external
              ghost="Zavolajte"
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white hover:text-ink"
            >
              {site.phonePrimary}
            </RollButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
