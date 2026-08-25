import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PromoBanner } from "@/components/marketing/PromoBanner";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { PageTransition } from "@/components/motion/PageTransition";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoMarketplace — Order Your Dream Car, Shipped to You",
  description:
    "Browse cars from anywhere, order online, and get your dream car shipped — with warranty, maintenance, insurance, and service booking all in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <CurrencyProvider>
            <ScrollProgress />
            <PromoBanner />
            <Header />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <ChatWidget />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
