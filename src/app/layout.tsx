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
  metadataBase: new URL("https://skillwyn.com"),
  title: {
    default: "SkillWyn - Stop Learning, Start Getting Placed",
    template: "%s | SkillWyn",
  },
  description:
    "SkillWyn blends AI-guided learning, real projects, interview practice, and placement support for ambitious developers.",
  keywords: [
    "SkillWyn",
    "SkillWyn platform",
    "codewithyash",
    "DSA preparation",
    "developer placement",
    "software engineering courses",
    "tech interview prep",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skillwyn.com",
    siteName: "SkillWyn",
    title: "SkillWyn - Stop Learning, Start Getting Placed",
    description:
      "SkillWyn blends AI-guided learning, real projects, interview practice, and placement support for ambitious developers.",
    images: [
      {
        url: "/images/og-image.jpg", // You can add an actual image here later
        width: 1200,
        height: 630,
        alt: "SkillWyn - Stop Learning, Start Getting Placed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillWyn - Stop Learning, Start Getting Placed",
    description:
      "SkillWyn blends AI-guided learning, real projects, interview practice, and placement support for ambitious developers.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/skillwyn-logo.png",
    apple: "/skillwyn-logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "SkillWyn",
  url: "https://skillwyn.com",
  logo: "https://skillwyn.com/skillwyn-logo.png",
  sameAs: ["https://www.instagram.com/codewithyash3/"],
  description:
    "SkillWyn blends AI-guided learning, real projects, interview practice, and placement support for ambitious developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light-theme scroll-smooth overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${openSans.variable} ${geistMono.variable} font-sans light-theme antialiased bg-[#f8f8f5] text-[#111111] selection:bg-[#2563eb]/20 selection:text-[#102a7a] overflow-x-hidden w-full relative`}
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
