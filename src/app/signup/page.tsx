import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion/Reveal";
import { signup } from "./actions";

interface SignupPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Create an account to buy, sell, trade in, or request a car we source for you.
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-base text-destructive">
            {error}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1} as="div">
      <form action={signup} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required placeholder="Jordan Smith" className="h-11 text-base" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" className="h-11 text-base" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={10}
            className="h-11 text-base"
          />
          <p className="text-sm text-muted-foreground">At least 10 characters.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={10}
            className="h-11 text-base"
          />
        </div>

        <label className="flex items-start gap-2 text-base text-foreground/90">
          <input type="checkbox" name="wantsSupplier" value="1" className="mt-1 h-4 w-4" />
          I want to apply as a supplier (submit cars for import/export). Subject to review.
        </label>

        <Button type="submit" size="lg" className="mt-2 text-base">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-base text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-foreground underline">
          Sign in
        </Link>
      </p>
      </Reveal>
    </div>
  );
}
