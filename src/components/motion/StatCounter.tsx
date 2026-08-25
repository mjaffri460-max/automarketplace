"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

function formatValue(value: number, decimals: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

export function StatCounter({ value, suffix = "", prefix = "", decimals = 0, className = "" }: StatCounterProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {prefix}
        {formatValue(value, decimals)}
        {suffix}
      </span>
    );
  }

  return (
    <AnimatedCount value={value} suffix={suffix} prefix={prefix} decimals={decimals} className={className} />
  );
}

function AnimatedCount({ value, suffix, prefix, decimals, className }: Required<StatCounterProps>) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {formatValue(display, decimals)}
      {suffix}
    </motion.span>
  );
}
