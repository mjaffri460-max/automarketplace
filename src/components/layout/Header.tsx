import Link from "next/link";

const navLinks = [
  { href: "/cars", label: "Cars" },
  { href: "/powersports", label: "Powersports" },
  { href: "/services", label: "Services" },
  { href: "/dealers", label: "Find a Dealer" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          AutoMarketplace
        </Link>
        <nav className="hidden gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/cars"
          className="hidden rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 lg:inline-flex"
        >
          Browse Cars
        </Link>
        <Link
          href="/cars"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 lg:hidden"
        >
          Browse
        </Link>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t px-4 py-2 lg:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap text-sm font-medium text-slate-700"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
