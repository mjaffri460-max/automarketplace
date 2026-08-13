import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-bold text-slate-900">AutoMarketplace</p>
            <p className="mt-1 text-sm text-slate-600">
              Order your dream car online and get it shipped to your door — plus
              warranty, maintenance, insurance, and service booking, all in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-slate-900">Shop</span>
              <Link href="/cars" className="text-slate-600 hover:text-slate-900">
                Browse Cars
              </Link>
              <Link href="/powersports" className="text-slate-600 hover:text-slate-900">
                Powersports
              </Link>
              <Link href="/services" className="text-slate-600 hover:text-slate-900">
                Services
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-slate-900">Company</span>
              <Link href="/about" className="text-slate-600 hover:text-slate-900">
                Our Story
              </Link>
              <Link href="/careers" className="text-slate-600 hover:text-slate-900">
                Careers
              </Link>
              <Link href="/reviews" className="text-slate-600 hover:text-slate-900">
                Reviews
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-slate-900">Support</span>
              <Link href="/dealers" className="text-slate-600 hover:text-slate-900">
                Find a Dealer
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} AutoMarketplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
