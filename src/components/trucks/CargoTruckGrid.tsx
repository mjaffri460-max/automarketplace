"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { mapCargoTruckRow, type CargoTruckRow } from "@/lib/mappers/car";
import { CargoTruckCard } from "@/components/trucks/CargoTruckCard";
import { Reveal } from "@/components/motion/Reveal";
import type { CargoTruck } from "@/types";

export function CargoTruckGrid({ trucks: initialTrucks }: { trucks: CargoTruck[] }) {
  const [trucks, setTrucks] = useState(initialTrucks);
  const [prevInitialTrucks, setPrevInitialTrucks] = useState(initialTrucks);
  const [isLive, setIsLive] = useState(false);

  if (initialTrucks !== prevInitialTrucks) {
    setPrevInitialTrucks(initialTrucks);
    setTrucks(initialTrucks);
  }

  useEffect(() => {
    const supabase = createClient();
    const channelName = `cargo-trucks-live-${Math.random().toString(36).slice(2)}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cargo_trucks" },
        (payload) => {
          setTrucks((current) => {
            if (payload.eventType === "DELETE") {
              const oldId = (payload.old as { id: string }).id;
              return current.filter((truck) => truck.id !== oldId);
            }

            const updated = mapCargoTruckRow(payload.new as CargoTruckRow);
            const exists = current.some((truck) => truck.id === updated.id);

            if (exists) {
              return current.map((truck) => (truck.id === updated.id ? updated : truck));
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

      {trucks.length === 0 ? (
        <p className="py-12 text-center text-base text-muted-foreground">
          No trucks match your search. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trucks.map((truck, index) => (
            <Reveal key={truck.id} index={index}>
              <CargoTruckCard truck={truck} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
