"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ProjectGallery({
  title,
  images,
}: {
  title: string;
  images: readonly string[];
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActive((i) =>
          i === null ? null : (i - 1 + images.length) % images.length,
        );
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-surface ring-1 ring-black/5"
            aria-label={`${title} – fotka ${i + 1}`}
          >
            <Image
              src={`/images/${src}`}
              alt={`${title} – fotka ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setActive(null);
              }}
              aria-label="Zavrieť"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setActive(
                  (i) => (i === null ? 0 : (i - 1 + images.length) % images.length),
                );
              }}
              aria-label="Predchádzajúca"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? 0 : (i + 1) % images.length));
              }}
              aria-label="Ďalšia"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
            </button>
            <div
              className="relative h-[80vh] w-[90vw] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/images/${images[active]}`}
                alt={`${title} – fotka ${active + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
