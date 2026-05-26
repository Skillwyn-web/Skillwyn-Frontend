import type { Metadata } from "next";
import { Instrument_Sans, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "../components/layout/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { AuthProvider } from "@/context/AuthContext";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${instrumentSans.variable} ${plusJakarta.variable} ${geistMono.variable} antialiased bg-bg-dark text-text-primary font-body selection:bg-white/20 selection:text-white`}
      >
        <SmoothScroll />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
