"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { mapYachtRow, type YachtRow } from "@/lib/mappers/car";
import { YachtCard } from "@/components/yachts/YachtCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Yacht } from "@/types";

export function YachtGrid({ yachts: initialYachts }: { yachts: Yacht[] }) {
  const [yachts, setYachts] = useState(initialYachts);
  const [prevInitialYachts, setPrevInitialYachts] = useState(initialYachts);
  const [isLive, setIsLive] = useState(false);

  if (initialYachts !== prevInitialYachts) {
    setPrevInitialYachts(initialYachts);
    setYachts(initialYachts);
  }

  useEffect(() => {
    const supabase = createClient();
    const channelName = `yachts-live-${Math.random().toString(36).slice(2)}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "yachts" },
        (payload) => {
          setYachts((current) => {
            if (payload.eventType === "DELETE") {
              const oldId = (payload.old as { id: string }).id;
              return current.filter((yacht) => yacht.id !== oldId);
            }

            const updated = mapYachtRow(payload.new as YachtRow);
            const exists = current.some((yacht) => yacht.id === updated.id);

            if (exists) {
              return current.map((yacht) => (yacht.id === updated.id ? updated : yacht));
            }

            return payload.eventType === "INSERT" ? [updated, ...current] : current;
          });
        }
      )
      .subscribe((status) => setIsLive(status === "SUBSCRIBED"));

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <span
          className={`h-2 w-2 rounded-full ${isLive ? "bg-emerald-500" : "bg-muted-foreground/40"}`}
        />
        {isLive ? "Live pricing & availability" : "Connecting to live updates…"}
      </div>

      {yachts.length === 0 ? (
        <p className="py-12 text-center text-base text-muted-foreground">
          No yachts match your search. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {yachts.map((yacht, index) => (
            <Reveal key={yacht.id} index={index}>
              <YachtCard yacht={yacht} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
