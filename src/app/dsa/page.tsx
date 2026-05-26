import DsaPrepHub from "@/components/dsa/DsaPrepHub";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";

export default function DsaPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <DsaPrepHub />
      <Footer />
    </main>
  );
}
