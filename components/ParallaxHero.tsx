"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RollButton from "@/components/RollButton";
import Reveal from "@/components/Reveal";

export default function ParallaxHero({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const bg = bgRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(
          -1,
          Math.min(1, -rect.top / Math.max(1, rect.height)),
        );
        // bg moves slower than scroll → classic parallax
        bg.style.transform = `translate3d(0, ${progress * 30}%, 0) scale(1.12)`;
        pending = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-ink text-white"
      style={{ minHeight: "min(100svh, 880px)" }}
    >
      <div
        ref={bgRef}
        className="parallax-bg absolute inset-0 -z-10"
        aria-hidden
      >
        {images.map((img, i) => (
          <Image
            key={img}
            src={`/images/${img}`}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${
              i === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/95 via-ink/75 to-ink/30"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-white/0"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-center gap-7 px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
        <Reveal
          as="span"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80"
        >
          STEMP s.r.o. — Poprad
        </Reveal>

        <Reveal
          as="h1"
          delay={80}
          className="max-w-3xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-7xl"
        >
          Staviame s istotou.
          <br />
          <span className="text-white underline decoration-brand-red decoration-2 underline-offset-4">30 rokov</span> v praxi.
        </Reveal>

        <Reveal
          as="p"
          delay={180}
          className="max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          Komplexné stavebné, rekonštrukčné a inžinierske služby na východnom
          Slovensku. Naším cieľom je byť stabilným a najžiadanejším
          dodávateľom v regióne.
        </Reveal>

        <Reveal
          delay={280}
          className="flex flex-wrap items-center gap-4"
        >
          <RollButton
            href="/referencie"
            className="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-red/30 hover:bg-black hover:text-white"
            ghost="Pozrieť práce"
          >
            Pozrieť referencie
          </RollButton>
          <RollButton
            href="/kontakt"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white hover:text-ink"
            ghost="Napíšte nám"
          >
            Kontaktujte nás
          </RollButton>
        </Reveal>

        <Reveal
          delay={420}
          className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60"
        >
          <span className="h-px w-10 bg-white/40" />
          <Link href="#sluzby" className="hover:text-white">
            Naše služby
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
