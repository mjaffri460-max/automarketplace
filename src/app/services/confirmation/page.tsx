import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ServiceConfirmationPageProps {
  searchParams: Promise<{ bookingId?: string; serviceName?: string; date?: string }>;
}

export default async function ServiceConfirmationPage({ searchParams }: ServiceConfirmationPageProps) {
  const { bookingId, serviceName, date } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
        Booking Requested
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">You&apos;re all set!</h1>
      <p className="mt-3 text-base text-slate-600">
        {serviceName ? (
          <>
            Your request for <span className="font-semibold text-slate-900">{serviceName}</span>
            {date ? <> on {date}</> : null} has been received
            {bookingId ? <> (confirmation {bookingId})</> : null}. We&apos;ll reach out shortly to
            confirm the details.
          </>
        ) : (
          "Your booking request has been received. We'll reach out shortly to confirm the details."
        )}
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button render={<Link href="/cars" />} size="lg" className="text-base">
          Browse Cars
        </Button>
        <Button render={<Link href="/services" />} size="lg" variant="outline" className="text-base">
          Book Another Service
        </Button>
      </div>
    </div>
  );
}
