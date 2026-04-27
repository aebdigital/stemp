"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";
import RollButton from "@/components/RollButton";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
                    ? "text-brand-blue"
                    : "text-ink-soft hover:text-brand-blue"
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
            className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-blue-dark"
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

      {open && (
        <div className="border-t border-black/5 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-ink-soft hover:bg-surface hover:text-brand-blue"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phonePrimary.replace(/\s+/g, "")}`}
              className="mt-2 rounded-full bg-brand-blue px-5 py-3 text-center text-sm font-semibold text-white"
            >
              {site.phonePrimary}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
