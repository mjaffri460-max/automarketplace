import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "./actions";

interface ContactPageProps {
  searchParams: Promise<{ sent?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { sent } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
      <p className="mt-2 text-base text-muted-foreground">
        Questions about a car, an order, or a service booking? Send us a message and
        we&apos;ll get back to you.
      </p>

      {sent && (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-base text-emerald-800">
          Thanks for reaching out! We&apos;ve received your message and will respond soon.
        </div>
      )}

      <form action={sendContactMessage} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Jordan Smith" className="h-11 text-base" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" className="h-11 text-base" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" required placeholder="Question about an order" className="h-11 text-base" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required rows={6} placeholder="How can we help?" className="text-base" />
        </div>

        <Button type="submit" size="lg" className="mt-2 text-base">
          Send Message
        </Button>
      </form>
    </div>
  );
}
