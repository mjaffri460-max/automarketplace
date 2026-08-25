"use client";

import { useLanguage } from "./LanguageProvider";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";

export function LanguageSelector({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <select
      value={locale}
      onChange={(event) => setLocale(event.target.value)}
      aria-label="Language"
      className={
        className ??
        "h-9 rounded-md border border-border bg-transparent px-2 text-sm text-foreground"
      }
    >
      {SUPPORTED_LANGUAGES.map((language) => (
        <option key={language.code} value={language.code}>
          {language.nativeLabel}
        </option>
      ))}
    </select>
  );
}
