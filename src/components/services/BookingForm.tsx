import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Service } from "@/types";
import { submitBooking } from "@/app/services/actions";

interface BookingFormProps {
  services: Service[];
  defaultServiceId?: string;
}

export function BookingForm({ services, defaultServiceId }: BookingFormProps) {
  return (
    <form
      id="booking-form"
      action={submitBooking}
      className="flex flex-col gap-5 rounded-xl border bg-card p-6"
    >
      <h2 className="text-2xl font-bold text-foreground">Book a Service</h2>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="serviceId">Service</Label>
        <select
          id="serviceId"
          name="serviceId"
          required
          defaultValue={defaultServiceId ?? ""}
          className="h-11 rounded-md border border-border px-3 text-base"
        >
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" required placeholder="Jordan Smith" className="h-11 text-base" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" className="h-11 text-base" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" className="h-11 text-base" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="preferredDate">Preferred Date</Label>
        <Input id="preferredDate" name="preferredDate" type="date" required className="h-11 text-base" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" name="notes" placeholder="Anything we should know?" className="text-base" />
      </div>

      <Button type="submit" size="lg" className="mt-2 text-base">
        Request Booking
      </Button>
    </form>
  );
}
