"use client";

import Link from "next/link";
import { Bot } from "lucide-react";

const SocialIcon = ({ d, label }: { d: string; label: string }) => (
  <a
    href="#"
    aria-label={label}
    className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface transition-all hover:bg-surface/80 hover:border-primary/50"
  >
    <svg
      className="h-5 w-5 fill-text-muted transition-colors group-hover:fill-primary"
      viewBox="0 0 24 24"
    >
      <path d={d} />
    </svg>
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="group flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
    >
      <span className="h-px w-0 bg-primary transition-all group-hover:w-4" />
      {children}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-bg-dark pt-24 pb-12 text-ink border-t border-border-subtle">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.02] -z-10">
        <h1 className="text-[20vw] font-black leading-none tracking-tighter text-white font-space">
          SKILLWYN
        </h1>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="max-w-md">
            <Link href="/" className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/25 shadow-[0_0_15px_rgba(102,227,255,0.1)]">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-bold text-ink font-display">SkillWyn</span>
            </Link>

            <p className="mb-8 text-text-muted leading-relaxed font-medium">
              AI-powered education that helps students find their roadmap, build proof projects, sharpen resumes, and land jobs.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="theme-input max-w-[240px] text-sm placeholder:text-text-muted"
              />
              <button className="theme-button px-6 py-3 text-sm">
                Subscribe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase text-primary">Features</h4>
              <ul className="space-y-4">
                <FooterLink href="/features">AI Career GPS</FooterLink>
                <FooterLink href="/features">Live Coding Battles</FooterLink>
                <FooterLink href="/features">Mock Interviews</FooterLink>
                <FooterLink href="/features">Talent Pool</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase text-primary">Company</h4>
              <ul className="space-y-4">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/pricing">Pricing Plans</FooterLink>
                <FooterLink href="/features">All Features</FooterLink>
                <FooterLink href="/get-started">Waitlist</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase text-primary">Legal</h4>
              <ul className="space-y-4">
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Refund Policy</FooterLink>
                <FooterLink href="#">Contact Us</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-medium text-text-muted">
            &copy; {new Date().getFullYear()} SkillWyn. All rights reserved.
          </p>

          <div className="flex gap-4">
            <SocialIcon
              label="Twitter"
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
            />
            <SocialIcon
              label="Instagram"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
            <SocialIcon
              label="YouTube"
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />
            <SocialIcon
              label="LinkedIn"
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
