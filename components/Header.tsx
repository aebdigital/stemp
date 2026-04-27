"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks, site } from "@/lib/site";
import RollButton from "@/components/RollButton";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Domov">
          <Image
            src="/logo.png"
            alt="Stemp s.r.o."
            width={160}
            height={46}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Hlavné menu">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wide transition ${
                  active
                    ? "text-brand-red"
                    : "text-ink hover:text-brand-red"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <RollButton
            href={`tel:${site.phonePrimary.replace(/\s+/g, "")}`}
            external
            ghost="Zavolajte nám"
            className="rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black hover:text-white"
          >
            {site.phonePrimary}
          </RollButton>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-soft md:hidden"
          aria-label="Otvoriť menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {mounted && createPortal(
        <div 
          className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop / Top 30vh blurred */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          
          {/* Bottom Sheet 70vh */}
          <div 
            className={`absolute bottom-0 left-0 right-0 h-[70vh] bg-white rounded-t-[2.5rem] p-10 shadow-2xl transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${
              open ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="mx-auto max-w-lg">
              <div className="mb-10 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-soft">Navigácia</span>
                <button 
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-surface p-2 text-ink"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-4xl font-bold text-black text-left hover:text-brand-red transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="mt-8 border-t border-black/5 pt-8">
                  <a
                    href={`tel:${site.phonePrimary.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-3 text-xl font-bold text-brand-red"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    {site.phonePrimary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
