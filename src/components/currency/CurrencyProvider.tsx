"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";

interface CurrencyContextValue {
  currency: string;
  setCurrency: (code: string) => void;
  rates: Record<string, number>;
  asOf: string | null;
  isLoaded: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
  rates: {},
  asOf: null,
  isLoaded: false,
});

const STORAGE_KEY = "automarketplace-currency";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && SUPPORTED_CURRENCIES.some((c) => c.code === stored) ? stored : "USD";
}

function getServerSnapshot() {
  return "USD";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [asOf, setAsOf] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/exchange-rates")
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates ?? {});
        setAsOf(data.asOf ?? null);
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  }, []);

  function setCurrency(code: string) {
    window.localStorage.setItem(STORAGE_KEY, code);
    listeners.forEach((listener) => listener());
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, asOf, isLoaded }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
