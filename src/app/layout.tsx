import type { Metadata } from "next";
import { Open_Sans, Geist_Mono } from "next/font/google";
import "../components/layout/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { AuthProvider } from "@/context/AuthContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { OfferPopup } from "@/components/ui/OfferPopup";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillWyn | AI-powered learning for job-ready developers",
  description: "SkillWyn blends AI-guided learning, real projects, interview practice, and placement support for ambitious developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light-theme scroll-smooth">
      <body
        className={`${openSans.variable} ${geistMono.variable} font-sans light-theme antialiased bg-[#f8f8f5] text-[#111111] selection:bg-[#2563eb]/20 selection:text-[#102a7a]`}
      >
        <SmoothScroll />
        <AuthProvider>
          <AnnouncementBar />
          {children}
          <OfferPopup />
        </AuthProvider>
      </body>
    </html>
  );
}
