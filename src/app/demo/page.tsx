import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { StatCounter } from "@/components/motion/StatCounter";
import { ReducedMotionBadge } from "@/components/motion/ReducedMotionBadge";

const demoCards = [
  { id: "a", title: "Aurora GT" },
  { id: "b", title: "Zenith SUV" },
  { id: "c", title: "Nova Coupe" },
  { id: "d", title: "Vector Truck" },
];

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">Motion Demo Room</h1>
      <p className="mt-2 text-base text-muted-foreground">
        18 effects, each in its own numbered box. Scroll slowly and watch each one as it enters —
        that&apos;s the whole test. Tell me the number of any box that doesn&apos;t animate.
      </p>

      <div className="mt-6">
        <ReducedMotionBadge />
      </div>

      <DemoSection n={1} title="Fade up on scroll">
        <Reveal>
          <DemoBox>This box fades in and slides up when it enters the screen.</DemoBox>
        </Reveal>
      </DemoSection>

      <DemoSection n={2} title="Slide in from the left">
        <Reveal direction="left">
          <DemoBox>This one slides in from the left.</DemoBox>
        </Reveal>
      </DemoSection>

      <DemoSection n={3} title="Slide in from the right">
        <Reveal direction="right">
          <DemoBox>This one slides in from the right.</DemoBox>
        </Reveal>
      </DemoSection>

      <DemoSection n={4} title="Staggered grid (4 cards, one after another)">
        <div className="grid grid-cols-2 gap-4">
          {demoCards.map((card, index) => (
            <Reveal key={card.id} index={index}>
              <DemoBox small>{card.title}</DemoBox>
            </Reveal>
          ))}
        </div>
      </DemoSection>

      <DemoSection n={5} title="Animated count-up numbers">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-mono text-3xl font-bold text-primary">
              <StatCounter value={210} suffix="+" />
            </p>
            <p className="text-sm text-muted-foreground">vehicles</p>
          </div>
          <div>
            <p className="font-mono text-3xl font-bold text-primary">
              <StatCounter value={10} />
            </p>
            <p className="text-sm text-muted-foreground">countries</p>
          </div>
          <div>
            <p className="font-mono text-3xl font-bold text-primary">
              <StatCounter value={4.8} decimals={1} suffix="/5" />
            </p>
            <p className="text-sm text-muted-foreground">rating</p>
          </div>
        </div>
      </DemoSection>

      <DemoSection n={6} title="Button hover glow + lift">
        <p className="mb-3 text-sm text-muted-foreground">Hover your mouse over this button.</p>
        <Button size="lg" className="text-base">
          Hover Me
        </Button>
      </DemoSection>

      <DemoSection n={7} title="Card hover lift + border glow">
        <p className="mb-3 text-sm text-muted-foreground">
          Hover over this card — it lifts slightly and its border glows gold (same effect as car
          listing cards).
        </p>
        <div className="w-fit rounded-xl border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
          Hover this card
        </div>
      </DemoSection>

      <DemoSection n={8} title="Live pulsing badge">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live &middot; pulsing dot
        </span>
      </DemoSection>

      <DemoSection n={9} title="Glowing ambient background">
        <p className="mb-3 text-sm text-muted-foreground">
          A soft gold/silver glow should be slowly drifting behind this box.
        </p>
        <div className="relative h-40 overflow-hidden rounded-xl border">
          <div className="glow-field" />
          <div className="relative z-10 flex h-full items-center justify-center text-sm text-muted-foreground">
            Glow drifts behind this box
          </div>
        </div>
      </DemoSection>

      <DemoSection n={10} title="Faint circuit grid overlay">
        <div className="relative h-32 overflow-hidden rounded-xl border bg-background">
          <div className="grid-overlay" />
          <div className="relative z-10 flex h-full items-center justify-center text-sm text-muted-foreground">
            Grid lines fading toward the top
          </div>
        </div>
      </DemoSection>

      <DemoSection n={11} title="Gold scroll progress bar (top of screen)">
        <p className="text-sm text-muted-foreground">
          Look at the very top edge of the browser window right now — a thin gold line should be
          partially filled, and it grows as you scroll down this page.
        </p>
      </DemoSection>

      <DemoSection n={12} title="Page transition (fade between pages)">
        <p className="mb-3 text-sm text-muted-foreground">
          Click below — the whole page should fade out and the new one should fade in, instead of
          a hard jump. Then use your browser&apos;s back button to come back.
        </p>
        <Button render={<Link href="/cars" />} size="lg" variant="outline" className="text-base">
          Go to Cars page
        </Button>
      </DemoSection>

      <DemoSection n={13} title="Image hover zoom">
        <p className="mb-3 text-sm text-muted-foreground">
          Hover the box below — it should zoom in slightly (same effect used on car photos).
        </p>
        <div className="group relative h-32 w-48 overflow-hidden rounded-lg border bg-muted">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 to-primary/5 text-sm text-muted-foreground transition duration-500 group-hover:scale-110">
            Hover to zoom
          </div>
        </div>
      </DemoSection>

      <DemoSection n={14} title="No-direction fade (used for the world map)">
        <Reveal direction="none">
          <DemoBox>This one only fades in — no sliding, just opacity.</DemoBox>
        </Reveal>
      </DemoSection>

      <DemoSection n={15} title="Delayed reveal (0.3s pause first)">
        <Reveal delay={0.3}>
          <DemoBox>This one waits an extra beat before it starts animating in.</DemoBox>
        </Reveal>
      </DemoSection>

      <DemoSection n={16} title="Underline link hover">
        <p className="text-sm text-muted-foreground">
          Hover this link:{" "}
          <Link href="/cars" className="font-semibold text-primary underline-offset-4 hover:underline">
            Browse Cars
          </Link>
        </p>
      </DemoSection>

      <DemoSection n={17} title="Six-item stagger (longer sequence)">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Reveal key={index} index={index}>
              <DemoBox small>#{index + 1}</DemoBox>
            </Reveal>
          ))}
        </div>
      </DemoSection>

      <DemoSection n={18} title="Everything at once (stress test)">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Reveal direction="left">
            <DemoBox small>Left</DemoBox>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <DemoBox small>Right</DemoBox>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <DemoBox small>Up</DemoBox>
          </Reveal>
          <Reveal direction="none" delay={0.3}>
            <DemoBox small>Fade</DemoBox>
          </Reveal>
        </div>
      </DemoSection>

      <div className="mt-16 rounded-xl border border-primary/20 bg-card p-6 text-center">
        <p className="text-base text-muted-foreground">
          If every numbered box above animated as described, everything is working — the issue
          was your browser session, not the code. If some are still static, tell me the exact
          numbers.
        </p>
      </div>
    </div>
  );
}

function DemoSection({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 border-t border-border pt-8">
      <p className="font-mono text-sm text-primary">#{n}</p>
      <h2 className="mt-1 text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function DemoBox({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-primary/20 bg-card text-foreground ${
        small ? "px-4 py-6 text-center text-sm" : "px-6 py-8 text-base"
      }`}
    >
      {children}
    </div>
  );
}
