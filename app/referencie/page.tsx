import type { Metadata } from "next";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referencie",
  description:
    "Vybrané projekty Stemp s.r.o. — rekonštrukcie, novostavby, fasády a ďalšie realizácie z východného Slovenska.",
  alternates: { canonical: "/referencie" },
};

export default function ReferenciePage() {
  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Naša práca
          </Reveal>
          <Reveal as="h1" delay={80} className="mt-3 text-4xl font-bold sm:text-5xl">
            Referencie
          </Reveal>
          <Reveal as="p" delay={140} className="mt-4 max-w-2xl text-white/70">
            Výber projektov, ktoré sme realizovali pre súkromných investorov,
            firmy a samosprávy v regióne.
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6 lg:px-8">
          {projects.map((p) => (
            <Reveal as="article" key={p.slug}>
              <header className="mb-8 flex items-end justify-between gap-6 border-b border-black/5 pb-4">
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                  {p.title}
                </h2>
                <span className="text-sm text-muted">
                  {p.images.length} fotografií
                </span>
              </header>
              <ProjectGallery title={p.title} images={p.images} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
