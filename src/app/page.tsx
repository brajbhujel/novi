import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { Features } from "@/components/sections/Features";
import { Integrations } from "@/components/sections/Integrations";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BlurStatement } from "@/components/sections/BlurStatement";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="bg-background">
        <Hero />
        <LogoCloud />
        <Features />
        <Integrations />
        <BlurStatement />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
