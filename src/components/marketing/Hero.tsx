"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { messages, locale } = useLanguage();
  const headlineWords = locale === "en" ? messages.hero.headline.split(" ") : null;

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="glow-field" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-24 sm:px-6 sm:py-32">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {messages.hero.badge}
        </motion.div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          {headlineWords ? (
            <>
              {headlineWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + headlineWords.length * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-primary"
              >
                {messages.hero.headlineAccent}
              </motion.span>
            </>
          ) : (
            <>
              <motion.span
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {messages.hero.headline}
              </motion.span>{" "}
              <motion.span
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-primary"
              >
                {messages.hero.headlineAccent}
              </motion.span>
            </>
          )}
        </h1>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-xl text-lg text-muted-foreground"
        >
          {messages.hero.subtext}
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button render={<Link href="/cars" />} size="lg" className="text-base">
            {messages.hero.browseCars}
          </Button>
          <Button render={<Link href="/powersports" />} size="lg" variant="outline" className="text-base">
            {messages.hero.explorePowersports}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
