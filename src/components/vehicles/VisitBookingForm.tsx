"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const selectClassName =
  "h-11 rounded-lg border border-input bg-transparent px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function VisitBookingForm({ action }: { action: (formData: FormData) => void }) {
  const [wantsTravelHelp, setWantsTravelHelp] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="preferredDate">Preferred Test-Drive Date</Label>
        <Input
          id="preferredDate"
          name="preferredDate"
          type="date"
          required
          className="h-11 text-base"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="preferredTime">Preferred Time (optional)</Label>
        <select id="preferredTime" name="preferredTime" defaultValue="" className={selectClassName}>
          <option value="">No preference</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-base text-foreground/90">
        <input
          type="checkbox"
          name="wantsTravelHelp"
          checked={wantsTravelHelp}
          onChange={(event) => setWantsTravelHelp(event.target.checked)}
          className="h-4 w-4"
        />
        I&apos;d like help planning travel to come see this vehicle
      </label>

      {wantsTravelHelp && (
        <div className="flex flex-col gap-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground">
            We don&apos;t book flights directly — our concierge team coordinates flights and
            hotel options with you based on what you share here.
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="departureCity">Departure City</Label>
            <Input
              id="departureCity"
              name="departureCity"
              placeholder="e.g. Toronto, Canada"
              className="h-11 text-base"
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="travelStartDate">Travel Start Date</Label>
              <Input
                id="travelStartDate"
                name="travelStartDate"
                type="date"
                className="h-11 text-base"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="travelEndDate">Travel End Date</Label>
              <Input
                id="travelEndDate"
                name="travelEndDate"
                type="date"
                className="h-11 text-base"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="travelerCount">Number of Travelers</Label>
            <Input
              id="travelerCount"
              name="travelerCount"
              type="number"
              min={1}
              placeholder="1"
              className="h-11 text-base"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Anything else we should know?"
          className="text-base"
        />
      </div>

      <Button type="submit" size="lg" className="mt-2 text-base">
        Request Visit
      </Button>
    </form>
  );
}
