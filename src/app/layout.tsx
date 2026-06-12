import type { Metadata } from "next";
import { Geist_Mono, Manrope, Sora } from "next/font/google";
import "../components/layout/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { AuthProvider } from "@/context/AuthContext";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${sora.variable} ${manrope.variable} ${geistMono.variable} antialiased bg-bg-dark text-text-primary font-body selection:bg-white/20 selection:text-white`}
      >
        <SmoothScroll />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
