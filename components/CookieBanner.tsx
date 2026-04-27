"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "stemp.cookie-consent.v1";
export const OPEN_COOKIE_SETTINGS = "stemp:open-cookie-settings";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
};

const DEFAULT: Consent = {
  necessary: true,
  analytics: false,
  marketing: false,
  decided: false,
};

function read(): Consent {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      decided: !!parsed.decided,
    };
  } catch {
    return DEFAULT;
  }
}

function write(c: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    // ignore
  }
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(DEFAULT);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const c = read();
    setConsent(c);
    setShowBanner(!c.decided);
  }, []);

  useEffect(() => {
    function open() {
      setShowModal(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  if (!mounted) return null;

  function acceptAll() {
    const next: Consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      decided: true,
    };
    setConsent(next);
    write(next);
    setShowBanner(false);
    setShowModal(false);
  }

  function rejectAll() {
    const next: Consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      decided: true,
    };
    setConsent(next);
    write(next);
    setShowBanner(false);
    setShowModal(false);
  }

  function saveSettings() {
    const next: Consent = { ...consent, decided: true };
    setConsent(next);
    write(next);
    setShowBanner(false);
    setShowModal(false);
  }

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Súhlas s cookies"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-5 shadow-2xl sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <h2 className="text-base font-semibold text-ink">
                Používame cookies
              </h2>
              <p className="mt-1 text-sm text-muted">
                Používame nevyhnutné cookies pre fungovanie stránky a — s vaším
                súhlasom — analytické a marketingové cookies. Detaily nájdete
                v{" "}
                <a
                  href="/ochrana-osobnych-udajov"
                  className="text-brand-blue underline"
                >
                  zásadách ochrany údajov
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink underline-offset-4 hover:underline"
              >
                Nastavenia
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-ink hover:bg-surface"
              >
                Odmietnuť
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark"
              >
                Prijať všetko
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="cookie-settings-title" className="text-xl font-bold text-ink">
                Nastavenia cookies
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Zavrieť"
                className="rounded-full p-1 text-muted hover:bg-surface"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              Vyberte si, ktoré kategórie cookies môžeme používať.
            </p>

            <div className="mt-6 space-y-3">
              <Toggle
                label="Nevyhnutné cookies"
                description="Potrebné pre základné fungovanie stránky. Nemožno vypnúť."
                checked
                disabled
              />
              <Toggle
                label="Analytické cookies"
                description="Pomáhajú nám pochopiť, ako návštevníci používajú stránku."
                checked={consent.analytics}
                onChange={(v) =>
                  setConsent((c) => ({ ...c, analytics: v }))
                }
              />
              <Toggle
                label="Marketingové cookies"
                description="Používajú sa na zobrazenie relevantnejších reklám."
                checked={consent.marketing}
                onChange={(v) =>
                  setConsent((c) => ({ ...c, marketing: v }))
                }
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-ink hover:bg-surface"
              >
                Odmietnuť všetko
              </button>
              <button
                type="button"
                onClick={saveSettings}
                className="rounded-full border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10"
              >
                Uložiť výber
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark"
              >
                Prijať všetko
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-black/5 bg-surface p-4">
      <div>
        <div className="text-sm font-semibold text-ink">{label}</div>
        <div className="mt-1 text-xs text-muted">{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition ${
          checked ? "bg-brand-blue" : "bg-muted-soft"
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
