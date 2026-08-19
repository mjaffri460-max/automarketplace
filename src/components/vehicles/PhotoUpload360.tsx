"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { VEHICLE_PHOTO_SLOTS } from "@/lib/vehiclePhotoSlots";

export function PhotoUpload360() {
  const [previews, setPreviews] = useState<Record<string, string>>({});

  function handleChange(key: string, file: File | null) {
    setPreviews((prev) => {
      const next = { ...prev };
      if (file) {
        next[key] = URL.createObjectURL(file);
      } else {
        delete next[key];
      }
      return next;
    });
  }

  return (
    <div>
      <p className="text-base text-muted-foreground">
        Add a photo for each angle below. Covering all 12 gives us (and buyers) a full 360°
        view of the vehicle.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {VEHICLE_PHOTO_SLOTS.map((slot) => (
          <div key={slot.key} className="flex flex-col gap-1.5">
            <Label htmlFor={`photo_${slot.key}`} className="text-sm">
              {slot.label}
            </Label>
            <label
              htmlFor={`photo_${slot.key}`}
              className="flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/40 text-center text-xs text-muted-foreground hover:border-foreground/40"
            >
              {previews[slot.key] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previews[slot.key]}
                  alt={slot.label}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="px-2">Tap to add photo</span>
              )}
            </label>
            <input
              id={`photo_${slot.key}`}
              name={`photo_${slot.key}`}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(e) => handleChange(slot.key, e.target.files?.[0] ?? null)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
