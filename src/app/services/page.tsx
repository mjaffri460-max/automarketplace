import { getServices } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { BookingForm } from "@/components/services/BookingForm";

interface ServicesPageProps {
  searchParams: Promise<{ serviceId?: string }>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const { serviceId } = await searchParams;
  const services = await getServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Warranty, Maintenance, Insurance &amp; More</h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600">
        Keep your car protected and running smoothly. Book any of these services in a
        few simple steps — no account needed.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-12 max-w-2xl">
        <BookingForm services={services} defaultServiceId={serviceId} />
      </div>
    </div>
  );
}
