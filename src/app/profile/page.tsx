import { Navbar } from "@/components/layout/Navbar";
import SkillWynProfile from "@/components/profile/SkillWynProfile";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <SkillWynProfile />
    </main>
  );
}
