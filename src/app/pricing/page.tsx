"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { CheckCircle2, ChevronDown } from "lucide-react";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What happens after I join a cohort?",
      a: "You'll be added to a dedicated Discord group with your mentor and peers. Day 1 starts with a kickoff call to map out your 8-week journey. Weekly sprints, code reviews, and mock interviews follow."
    },
    {
      q: "Is there a free trial?",
      a: "We offer a 7-day money-back guarantee for the Learner tier. However, for the Job-Ready Program, spots are extremely limited per cohort, so we don't offer free trials, but you get full transparent access to what exactly you will build before paying."
    },
    {
      q: "How does the Talent Pool work?",
      a: "Once you graduate from the Job-Ready program and hit the required 'Placement Probability' score via mock interviews, your verified profile becomes active in our exclusive portal. Startups and enterprise partners hiring freshers directly access this pool."
    },
    {
      q: "What is SkillWyn Rank?",
      a: "It's a dynamic score calculated across your coding battle performance, AI mock interview results, and project completion. High rank puts you at the top of the talent pool searches."
    },
    {
      q: "Do companies actually hire from SkillWyn?",
      a: "Yes. They prefer SkillWyn candidates because verifying skills takes time. With our Talent Pool, they see your real industry projects and recorded mock interviews before even talking to you."
    },
    {
      q: "What's the refund policy?",
      a: "For the Job-Ready Program, you get a full refund if you drop out within the first 7 days of the cohort starting. No questions asked."
    }
  ];

  return (
    <main className="page-shell min-h-screen pt-24 pb-16">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 page-grid opacity-30" />

      {/* Pricing Header */}
      <div className="container relative z-10 mx-auto px-4 mt-16 mb-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="theme-kicker mb-4">Plans</span>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 text-ink">Choose your AI learning path.</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Choose the path that fits your current stage. From self-paced learning to our intensive placement cohort.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {/* Tier 1 */}
          <div className="theme-card p-10 h-full flex flex-col">
            <h3 className="text-2xl font-bold font-space mb-2">Learner</h3>
            <div className="inline-block self-start px-3 py-1 bg-surface rounded-full text-xs font-semibold text-text-muted mb-6">Most Popular</div>
            <div className="text-5xl font-bold mb-6 font-space">₹1,499<span className="text-xl text-text-muted font-normal">/mo</span></div>
            <p className="text-text-muted mb-8">Perfect for early students building foundational skills.</p>
            <ul className="space-y-4 mb-10 flex-grow text-text-muted">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> Full platform access</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> Unlimited AI tools (Doubt Solver & Code Review)</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> Coding battles + leaderboard access</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> SkillWyn public profile + rank</li>
            </ul>
            <Link href="/get-started" className="block w-full text-center py-4 rounded-lg border border-border-subtle hover:bg-surface transition-colors font-bold text-lg">Get Started</Link>
          </div>
          
          {/* Tier 2 */}
          <div className="theme-card p-10 border-primary relative transform md:-translate-y-6 glow-accent h-full flex flex-col z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-primary text-bg-dark text-sm font-black rounded-lg uppercase whitespace-nowrap">
              Best Value
            </div>
            <h3 className="text-2xl font-bold font-space mb-2 mt-2">Job-Ready Program</h3>
            <div className="inline-block self-start px-3 py-1 bg-secondary/20 rounded-full text-xs font-semibold text-secondary mb-6">Cohort-Based</div>
            <div className="text-5xl font-bold mb-2 font-space">₹4,999<span className="text-xl text-text-muted font-normal">/cohort</span></div>
            <p className="text-sm font-medium text-accent mb-6">Founding Member Pricing (Usually ₹9,999)</p>
            <p className="text-text-muted mb-8">An intensive 8-12 week program designed to get you hired.</p>
            
            <ul className="space-y-4 mb-10 flex-grow text-ink font-medium">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> Everything in Learner tier</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" /> Live mentor cohort + 1:1 check-ins</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" /> Build a real industry project portfolio</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" /> Live Mock interviews (Human + AI)</li>
              <li className="flex items-start gap-3 text-accent"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> Exclusive Talent pool listing</li>
            </ul>
            <Link href="/get-started" className="theme-button block w-full text-center py-4 text-lg">Join Next Cohort</Link>
          </div>
          
          {/* Tier 3 */}
          <div className="theme-card p-10 h-full flex flex-col">
            <h3 className="text-2xl font-bold font-space mb-2">Enterprise</h3>
            <div className="inline-block self-start px-3 py-1 bg-surface rounded-full text-xs font-semibold text-text-muted mb-6">For B2B / Colleges</div>
            <div className="text-5xl font-bold mb-6 font-space">Custom</div>
            <p className="text-text-muted mb-8">Access our vetted talent pool or power your college placements.</p>
            <ul className="space-y-4 mb-10 flex-grow text-text-muted">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> Direct Talent pool access</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> Campus hiring drives setup</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> Custom skill tracks for freshers</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> White-label bootcamps</li>
            </ul>
            <Link href="/get-started" className="block w-full text-center py-4 rounded-lg border border-border-subtle hover:bg-surface transition-colors font-bold text-lg">Book a Call</Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-y border-border-subtle bg-surface/30 py-8 mb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-ink font-display mb-1">35K+</div>
              <div className="text-sm font-medium tracking-widest text-text-muted uppercase">Community</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-accent font-space mb-1">AI-Powered</div>
              <div className="text-sm font-medium tracking-widest text-text-muted uppercase">Mentorship</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-ink font-display mb-1">Placement</div>
              <div className="text-sm font-medium tracking-widest text-text-muted uppercase">Focused Engine</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 max-w-3xl mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-space">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="theme-card overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-surface/50 hover:bg-surface transition-colors"
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-40 py-5 opacity-100" : "max-h-0 py-0 opacity-0"}`}
              >
                <p className="text-text-muted">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
