import Link from "next/link";
import Image from "next/image";
import { navLinks, site } from "@/lib/site";
import CookieSettingsLink from "@/components/CookieSettingsLink";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Image
            src="/logo.png"
            alt="Stemp s.r.o."
            width={180}
            height={52}
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            {site.tagline}. Komplexné stavebné, rekonštrukčné a inžinierske
            služby na východnom Slovensku.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-brand-blue"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5C13 6.5 13.5 6 14.5 6H17V2h-3c-3 0-5 2-5 5v3H6v4h3v8h4z"/></svg>
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-brand-blue"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Navigácia
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/ochrana-osobnych-udajov"
                className="transition hover:text-white"
              >
                Ochrana osobných údajov
              </Link>
            </li>
            <li>
              <CookieSettingsLink className="transition hover:text-white">
                Cookies
              </CookieSettingsLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Kontakt
          </h3>
          <address className="mt-4 space-y-2 text-sm not-italic text-white/70">
            <div>{site.name}</div>
            <div>
              {site.address.street}
              <br />
              {site.address.cityZip}
            </div>
            <div>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </div>
            <div>
              <a
                href={`tel:${site.phonePrimary.replace(/\s+/g, "")}`}
                className="hover:text-white"
              >
                {site.phonePrimary}
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>Copyright © {year} Stemp s.r.o. All Rights Reserved.</p>
          <p>Tvorba stránky – AEB Digital</p>
        </div>
      </div>
    </footer>
  );
}
