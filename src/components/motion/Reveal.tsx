"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  index?: number;
  as?: "div" | "li";
}

const distanceFor: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  index = 0,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const distance = distanceFor[direction];
  const staggerDelay = delay + Math.min(index, 8) * 0.06;

  const variants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: distance.x, y: distance.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, delay: staggerDelay, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
