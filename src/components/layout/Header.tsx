import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const navLinks = [
  { href: "/cars", label: "Cars" },
  { href: "/powersports", label: "Powersports" },
  { href: "/sell", label: "Sell / Trade-In" },
  { href: "/buy-for-me", label: "Buy For Me" },
  { href: "/services", label: "Services" },
  { href: "/dealers", label: "Find a Dealer" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isSignedIn = Boolean(data.user);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_2px_oklch(0.8_0.15_84/0.6)]" />
          Auto<span className="text-primary">Marketplace</span>
        </Link>
        <nav className="hidden gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-foreground/90 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={isSignedIn ? "/account" : "/login"}
            className="whitespace-nowrap rounded-md border border-primary/30 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-primary/10"
          >
            {isSignedIn ? "My Account" : "Sign In"}
          </Link>
          <Link
            href="/cars"
            className="whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Browse Cars
          </Link>
        </div>
        <Link
          href={isSignedIn ? "/account" : "/login"}
          className="whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 lg:hidden"
        >
          {isSignedIn ? "Account" : "Sign In"}
        </Link>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t px-4 py-2 lg:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap text-sm font-medium text-foreground/90"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
