import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-primary/15 bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-bold text-foreground">AutoMarketplace</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Order your dream car online and get it shipped to your door — plus
              warranty, maintenance, insurance, and service booking, all in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">Shop</span>
              <Link href="/cars" className="text-muted-foreground hover:text-foreground">
                Browse Cars
              </Link>
              <Link href="/powersports" className="text-muted-foreground hover:text-foreground">
                Powersports
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-foreground">
                Services
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">Company</span>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                Our Story
              </Link>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
              <Link href="/reviews" className="text-muted-foreground hover:text-foreground">
                Reviews
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">Buy & Sell</span>
              <Link href="/sell" className="text-muted-foreground hover:text-foreground">
                Sell / Trade-In
              </Link>
              <Link href="/buy-for-me" className="text-muted-foreground hover:text-foreground">
                Buy For Me
              </Link>
              <Link href="/supplier" className="text-muted-foreground hover:text-foreground">
                Supplier Portal
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">Support</span>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                Shipping & Delivery
              </Link>
              <Link href="/dealers" className="text-muted-foreground hover:text-foreground">
                Find a Dealer
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AutoMarketplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
