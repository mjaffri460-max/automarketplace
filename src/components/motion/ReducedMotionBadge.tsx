"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getClientSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function ReducedMotionBadge() {
  const prefersReducedMotion = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (prefersReducedMotion) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        <strong>Reduce Motion: ON.</strong> Your browser or OS is telling every site to skip
        animations. This page is built to respect that automatically — every effect below will
        appear instantly with no motion, on purpose. Turn it off in your system settings and
        reload this page to see the animations.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
      <strong>Reduce Motion: OFF.</strong> Animations should be fully visible below. If any
      section still looks static, that one has a real bug — tell me which numbered section.
    </div>
  );
}
