"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { mapCarRow, type CarRow } from "@/lib/mappers/car";
import { CarCard } from "@/components/cars/CarCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Car } from "@/types";

export function CarGrid({ cars: initialCars }: { cars: Car[] }) {
  const [cars, setCars] = useState(initialCars);
  const [prevInitialCars, setPrevInitialCars] = useState(initialCars);
  const [isLive, setIsLive] = useState(false);

  if (initialCars !== prevInitialCars) {
    setPrevInitialCars(initialCars);
    setCars(initialCars);
  }

  useEffect(() => {
    const supabase = createClient();
    const channelName = `cars-live-${Math.random().toString(36).slice(2)}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cars" },
        (payload) => {
          setCars((current) => {
            if (payload.eventType === "DELETE") {
              const oldId = (payload.old as { id: string }).id;
              return current.filter((car) => car.id !== oldId);
            }

            const updated = mapCarRow(payload.new as CarRow);
            const exists = current.some((car) => car.id === updated.id);

            if (exists) {
              return current.map((car) => (car.id === updated.id ? updated : car));
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

      {cars.length === 0 ? (
        <p className="py-12 text-center text-base text-muted-foreground">
          No cars match your search. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car, index) => (
            <Reveal key={car.id} index={index}>
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
