import Link from "next/link";
import type { CarCategory } from "@/types";

const categories: { value: CarCategory; label: string; icon: string }[] = [
  { value: "sedan", label: "Sedans", icon: "M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2a2 2 0 0 1 1.9 1.5L21 13v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6zM5.5 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" },
  { value: "suv", label: "SUVs", icon: "M3 13.5l1.3-5.5A2 2 0 0 1 6.2 6.5h9.6a2 2 0 0 1 1.9 1.5l1.3 5.5H3z" },
  { value: "sports-car", label: "Sports Cars", icon: "M2 14l2-4.5A2 2 0 0 1 5.8 8.2h12.4a2 2 0 0 1 1.8 1.3L22 14" },
  { value: "luxury", label: "Luxury", icon: "M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z" },
  { value: "truck", label: "Trucks", icon: "M2 8h10v8H2zM12 11h5l3 3v2h-8z" },
  { value: "electric", label: "Electric", icon: "M13 2 4 14h6l-1 8 9-12h-6z" },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.value}
          href={`/cars?category=${category.value}`}
          className="group flex flex-col items-center gap-3 rounded-xl border bg-white p-6 text-center transition hover:border-slate-300 hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition group-hover:bg-slate-900 group-hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d={category.icon} />
            </svg>
          </span>
          <span className="text-sm font-semibold text-slate-900">{category.label}</span>
        </Link>
      ))}
    </div>
  );
}
