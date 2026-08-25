import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhotoUpload360 } from "@/components/vehicles/PhotoUpload360";
import { Reveal } from "@/components/motion/Reveal";
import { submitTradeInRequest } from "./actions";

interface TradeInPageProps {
  searchParams: Promise<{ submitted?: string }>;
}

interface Question {
  name: string;
  label: string;
  options: string[];
}

interface Section {
  title: string;
  description: string;
  questions: Question[];
}

const SECTIONS: Section[] = [
  {
    title: "Exterior",
    description: "The outside of the vehicle — body, glass, tires, and lights.",
    questions: [
      { name: "paint", label: "Body Paint & Panels", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "glass", label: "Windshield & Windows", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "tires", label: "Tire Tread", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "wheels", label: "Wheels & Rims", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "lights", label: "Head / Tail / Signal Lights", options: ["All Working", "Some Not Working", "Not Working"] },
    ],
  },
  {
    title: "Interior",
    description: "Seats, dashboard, climate control, and cabin condition.",
    questions: [
      { name: "seats", label: "Seats & Upholstery", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "dashboard", label: "Dashboard & Electronics", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "climate", label: "Air Conditioning & Heat", options: ["Working", "Partially Working", "Not Working"] },
      { name: "odor", label: "Interior Odor", options: ["None", "Mild", "Strong"] },
      { name: "infotainment", label: "Infotainment & Audio", options: ["Working", "Partially Working", "Not Working"] },
    ],
  },
  {
    title: "Mechanical",
    description: "Engine, transmission, brakes, and suspension.",
    questions: [
      { name: "engine", label: "Engine Performance", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "transmission", label: "Transmission / Shifting", options: ["Smooth", "Occasional Issues", "Frequent Issues"] },
      { name: "brakes", label: "Brakes", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "suspension", label: "Suspension & Steering", options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "warningLights", label: "Dashboard Warning Lights", options: ["None On", "One or More On"] },
    ],
  },
  {
    title: "History",
    description: "Ownership, accident, and maintenance history.",
    questions: [
      { name: "accidents", label: "Any Accidents?", options: ["No", "Yes"] },
      { name: "frameDamage", label: "Any Frame or Structural Damage?", options: ["No", "Yes"] },
      { name: "owners", label: "Number of Previous Owners", options: ["1", "2", "3+", "Unknown"] },
      { name: "title", label: "Title Status", options: ["Clean", "Salvage", "Rebuilt", "Unknown"] },
      { name: "maintenanceRecords", label: "Maintenance Records Available?", options: ["Yes, Full", "Partial", "None"] },
    ],
  },
];

export default async function TradeInPage({ searchParams }: TradeInPageProps) {
  const { submitted } = await searchParams;

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Inspection Submitted
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">
            Thanks — your 360° inspection is in
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Our team will review your answers and photos and follow up with a real offer within
            1-2 business days. You can track its status from your account.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button render={<Link href="/sell" />} size="lg" className="text-base">
              Back to Sell / Trade-In
            </Button>
            <Button render={<Link href="/cars" />} size="lg" variant="outline" className="text-base">
              Browse Cars
            </Button>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/sell" className="text-base font-medium text-muted-foreground hover:text-foreground">
        &larr; Back
      </Link>
      <Reveal>
        <h1 className="mt-4 text-3xl font-bold text-foreground">360° Trade-In Inspection</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Answer a short condition checklist and add photos from every angle. Our team reviews
          it and sends you a real offer — we never show a made-up number here.
        </p>
      </Reveal>

      <form action={submitTradeInRequest} className="mt-8 flex flex-col gap-8">
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="make">Make</Label>
              <Input id="make" name="make" required placeholder="Toyota" className="h-11 text-base" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model">Model</Label>
              <Input id="model" name="model" required placeholder="Camry" className="h-11 text-base" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                required
                min={1980}
                max={2027}
                placeholder="2020"
                className="h-11 text-base"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                required
                min={0}
                placeholder="45000"
                className="h-11 text-base"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vin">VIN (optional)</Label>
              <Input id="vin" name="vin" placeholder="1HGCM82633A004352" className="h-11 text-base" />
            </div>
          </div>
        </Reveal>

        {SECTIONS.map((section, index) => (
          <Reveal key={section.title} index={index}>
            <div className="rounded-xl border bg-card p-5">
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {section.questions.map((question) => (
                  <div key={question.name} className="flex flex-col gap-1.5">
                    <Label htmlFor={question.name}>{question.label}</Label>
                    <select
                      id={question.name}
                      name={question.name}
                      required
                      defaultValue=""
                      className="h-11 rounded-md border border-border px-3 text-base"
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {question.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold text-foreground">360° Photos</h2>
            <div className="mt-3">
              <PhotoUpload360 />
            </div>
          </div>
        </Reveal>

        <Button type="submit" size="lg" className="mt-2 text-base">
          Submit Inspection
        </Button>
      </form>
    </div>
  );
}
