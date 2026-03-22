
"use client";

import Link from "next/link";
import { RippleButton } from "../ui/RippleButton";

const SocialIcon = ({ d, label }: { d: string; label: string }) => (
  <a
    href="#"
    aria-label={label}
    className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20"
  >
    <svg
      className="h-5 w-5 fill-zinc-400 text-zinc-400 transition-colors group-hover:fill-white group-hover:text-white"
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
      className="group flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
    >
      <span className="h-px w-0 bg-blue-500 transition-all group-hover:w-4" />
      {children}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black pt-24 pb-12 text-white border-t border-zinc-900">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Massive Background Text - "SKILLWYN" */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.03]">
        <h1 className="text-[20vw] font-black leading-none tracking-tighter text-white">
          SKILLWYN
        </h1>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Brand & Newsletter */}
          <div className="max-w-md">
            <Link href="/" className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg shadow-white/10">
                <span className="font-bold text-black">DP</span>
              </div>
              <span className="text-2xl font-bold tracking-wide">SkillWyn</span>
            </Link>

            <p className="mb-8 text-zinc-400 leading-relaxed font-light">
              Join 50,000+ developers mastering Data Structures, System Design, and Real-world Engineering. The last platform you'll ever need.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-[240px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-blue-500/50 focus:bg-white/10"
              />
              <RippleButton className="rounded-xl px-6 py-3 text-sm font-semibold bg-white text-black hover:bg-zinc-200">
                Subscribe
              </RippleButton>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Platform</h4>
              <ul className="space-y-4">
                <FooterLink href="#">Adaptive Roadmaps</FooterLink>
                <FooterLink href="#">Live Bootcamps</FooterLink>
                <FooterLink href="#">Practice Arena</FooterLink>
                <FooterLink href="#">Pro Membership</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Resources</h4>
              <ul className="space-y-4">
                <FooterLink href="#">Engineering Blog</FooterLink>
                <FooterLink href="#">Success Stories</FooterLink>
                <FooterLink href="#">System Design</FooterLink>
                <FooterLink href="#">Cheat Sheets</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Company</h4>
              <ul className="space-y-4">
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} SkillWyn Inc. Crafted with ❤️ for builders.
          </p>

          <div className="flex gap-4">
            <SocialIcon
              label="Twitter"
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
            />
            <SocialIcon
              label="GitHub"
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
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
