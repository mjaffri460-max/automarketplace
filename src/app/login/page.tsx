import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; message?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, message } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">Sign In</h1>
      <p className="mt-2 text-base text-muted-foreground">
        Sign in to track orders, bookings, trade-ins, and requests.
      </p>

      {error && (
        <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-base text-destructive">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-foreground">
          {message}
        </div>
      )}

      <form action={login} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" className="h-11 text-base" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required className="h-11 text-base" />
        </div>

        <Button type="submit" size="lg" className="mt-2 text-base">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-base text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-foreground underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
