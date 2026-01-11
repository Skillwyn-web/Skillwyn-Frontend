import { HeroSection } from "@/components/sections/HeroSection";
import { Navbar } from "@/components/layout/Navbar";
import PricingSection from "@/components/sections/Pricing/PricingSection";
import CuratedSheetsSection from "@/components/sections/DsaSheets/CuratedSheetsSection";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <CuratedSheetsSection />
      <PricingSection />
      <Footer />
    </main>


  )
}
