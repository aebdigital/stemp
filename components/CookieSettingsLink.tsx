"use client";

import { OPEN_COOKIE_SETTINGS } from "@/components/CookieBanner";

export default function CookieSettingsLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS))
      }
      className={className}
    >
      {children}
    </button>
  );
}
