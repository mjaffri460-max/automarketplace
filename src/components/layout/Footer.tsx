"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function Footer() {
  const { messages } = useLanguage();

  return (
    <footer className="mt-auto border-t border-primary/15 bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-bold text-foreground">AutoMarketplace</p>
            <p className="mt-1 text-sm text-muted-foreground">{messages.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">{messages.footer.shop}</span>
              <Link href="/cars" className="text-muted-foreground hover:text-foreground">
                {messages.footer.browseCars}
              </Link>
              <Link href="/powersports" className="text-muted-foreground hover:text-foreground">
                {messages.footer.powersports}
              </Link>
              <Link href="/cargo-trucks" className="text-muted-foreground hover:text-foreground">
                {messages.nav.cargoTrucks}
              </Link>
              <Link href="/yachts" className="text-muted-foreground hover:text-foreground">
                {messages.nav.yachts}
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-foreground">
                {messages.footer.services}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">{messages.footer.company}</span>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                {messages.footer.ourStory}
              </Link>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                {messages.footer.careers}
              </Link>
              <Link href="/reviews" className="text-muted-foreground hover:text-foreground">
                {messages.footer.reviews}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">{messages.footer.buyAndSell}</span>
              <Link href="/sell" className="text-muted-foreground hover:text-foreground">
                {messages.footer.sellTradeIn}
              </Link>
              <Link href="/buy-for-me" className="text-muted-foreground hover:text-foreground">
                {messages.footer.buyForMe}
              </Link>
              <Link href="/supplier" className="text-muted-foreground hover:text-foreground">
                {messages.footer.supplierPortal}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">{messages.footer.support}</span>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                {messages.footer.shipping}
              </Link>
              <Link href="/dealers" className="text-muted-foreground hover:text-foreground">
                {messages.footer.findDealer}
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                {messages.footer.contactUs}
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AutoMarketplace. {messages.footer.rights}
        </p>
      </div>
    </footer>
  );
}
