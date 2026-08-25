"use client";

import { Reveal } from "@/components/motion/Reveal";
import { StatCounter } from "@/components/motion/StatCounter";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function TrustBar() {
  const { messages } = useLanguage();

  const items = [
    { value: 215, suffix: "+", label: messages.trustBar.vehiclesLive },
    { value: 10, suffix: "", label: messages.trustBar.countriesShip },
    { value: 4.8, decimals: 1, suffix: "/5", label: messages.trustBar.customerRating },
    { value: 24, suffix: "/7", label: messages.trustBar.aiAssistant },
  ];

  return (
    <section className="border-b border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.label} index={index}>
            <p className="font-mono text-3xl font-bold text-primary sm:text-4xl">
              <StatCounter value={item.value} suffix={item.suffix} decimals={item.decimals ?? 0} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
