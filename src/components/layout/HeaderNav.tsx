"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CurrencySelector } from "@/components/currency/CurrencySelector";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";

export function HeaderNav() {
  const { messages } = useLanguage();

  const navLinks = [
    { href: "/cars", label: messages.nav.cars },
    { href: "/powersports", label: messages.nav.powersports },
    { href: "/cargo-trucks", label: messages.nav.cargoTrucks },
    { href: "/yachts", label: messages.nav.yachts },
    { href: "/find-my-car", label: messages.nav.findMyCar },
    { href: "/sell", label: messages.nav.sellTradeIn },
    { href: "/buy-for-me", label: messages.nav.buyForMe },
    { href: "/services", label: messages.nav.services },
    { href: "/dealers", label: messages.nav.findDealer },
    { href: "/reviews", label: messages.nav.reviews },
    { href: "/contact", label: messages.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_2px_oklch(0.8_0.15_84/0.6)]" />
          Auto<span className="text-primary">Marketplace</span>
        </Link>
        <nav className="hidden gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-foreground/90 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSelector />
          <CurrencySelector />
          <Link
            href="/cars"
            className="whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {messages.header.browseCars}
          </Link>
        </div>
        <Link
          href="/cars"
          className="whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 lg:hidden"
        >
          {messages.header.browseCars}
        </Link>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t px-4 py-2 lg:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap text-sm font-medium text-foreground/90"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
