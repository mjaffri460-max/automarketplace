"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { mapPowersportRow, type PowersportRow } from "@/lib/mappers/car";
import { PowersportCard } from "@/components/powersports/PowersportCard";
import type { Powersport } from "@/types";

export function PowersportGrid({ items: initialItems }: { items: Powersport[] }) {
  const [items, setItems] = useState(initialItems);
  const [prevInitialItems, setPrevInitialItems] = useState(initialItems);
  const [isLive, setIsLive] = useState(false);

  if (initialItems !== prevInitialItems) {
    setPrevInitialItems(initialItems);
    setItems(initialItems);
  }

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("powersports-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "powersports" },
        (payload) => {
          setItems((current) => {
            if (payload.eventType === "DELETE") {
              const oldId = (payload.old as { id: string }).id;
              return current.filter((item) => item.id !== oldId);
            }

            const updated = mapPowersportRow(payload.new as PowersportRow);
            const exists = current.some((item) => item.id === updated.id);

            if (exists) {
              return current.map((item) => (item.id === updated.id ? updated : item));
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

      {items.length === 0 ? (
        <p className="py-12 text-center text-base text-muted-foreground">
          No listings match your search. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <PowersportCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
