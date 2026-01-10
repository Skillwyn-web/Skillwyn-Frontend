import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import PricingSection from "@/components/sections/Pricing/PricingSection";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <PricingSection />
      <Footer />
    </main>


  )
}
