"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/lib/i18n/languages";
import { MESSAGES, type Messages } from "@/lib/i18n/messages";

interface LanguageContextValue {
  locale: string;
  setLocale: (code: string) => void;
  messages: Messages;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LANGUAGE,
  setLocale: () => {},
  messages: MESSAGES[DEFAULT_LANGUAGE],
  dir: "ltr",
});

const STORAGE_KEY = "automarketplace-locale";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored) ? stored : DEFAULT_LANGUAGE;
}

function getServerSnapshot() {
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const language = SUPPORTED_LANGUAGES.find((l) => l.code === locale) ?? SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    document.documentElement.dir = language.dir;
    document.documentElement.lang = locale;
  }, [language.dir, locale]);

  function setLocale(code: string) {
    window.localStorage.setItem(STORAGE_KEY, code);
    listeners.forEach((listener) => listener());
  }

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, messages: MESSAGES[locale] ?? MESSAGES[DEFAULT_LANGUAGE], dir: language.dir }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
