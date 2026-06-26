"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight, CheckCircle2, Star, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export function OfferPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [firedTriggers, setFiredTriggers] = useState({
    timer: false,
    homeScroll: false,
    algoScroll: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!firedTriggers.timer && !showPopup) {
      const timerId = setTimeout(() => {
        setShowPopup(true);
        setFiredTriggers(prev => ({ ...prev, timer: true }));
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [firedTriggers.timer, showPopup]);

  useEffect(() => {
    const handleScroll = () => {
      if (showPopup) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      if (docHeight <= winHeight) return;

      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      if (scrollPercent >= 0.35) {
        if (pathname === '/' && !firedTriggers.homeScroll) {
          setShowPopup(true);
          setFiredTriggers(prev => ({ ...prev, homeScroll: true }));
        } else if (pathname === '/algorithmic-vault' && !firedTriggers.algoScroll) {
          setShowPopup(true);
          setFiredTriggers(prev => ({ ...prev, algoScroll: true }));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, firedTriggers, showPopup]);

  const handleClaim = () => {
    setShowPopup(false);
    if (pathname === '/algorithmic-vault') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/algorithmic-vault#pricing');
    }
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => {
              setShowPopup(false);
            }}
          />
          
          {/* Modal */}
            <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(16,42,122,0.3)] ring-1 ring-slate-200"
          >
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => {
                setShowPopup(false);
              }}
              className="absolute z-20 right-4 top-4 sm:right-6 sm:top-6 cursor-pointer rounded-full p-2 !text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.button>

            <div className="flex flex-col sm:flex-row">
              {/* Left Side: Trust Building */}
              <div className="flex-1 p-6 sm:p-12 sm:pr-10">
                <div className="mb-5 sm:mb-8 flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {["CY", "HW", "AS"].map((initial, i) => (
                      <div key={i} className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full border-2 border-white bg-blue-100 text-[9px] sm:text-[10px] font-black text-blue-600">
                        {initial}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5">30,000+ Students</span>
                  </div>
                </div>

                <h2 className="mb-3 sm:mb-4 text-[24px] sm:text-[32px] font-black leading-[1.15] text-slate-900 tracking-tight">
                  Stop applying. Start getting <span className="text-[#2563eb]">shortlisted.</span>
                </h2>
                
                <p className="mb-5 sm:mb-8 text-[13px] sm:text-[15px] text-slate-500 font-medium leading-relaxed">
                  Join the elite developers who cracked top product companies. We give you the exact playbook they used.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    "50+ Premium DSA Patterns",
                    "Production-grade Project Blueprints",
                    "ATS-friendly Resume Templates",
                    "Live Mock Interview Frameworks"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-full bg-blue-50 p-1">
                        <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-blue-600" />
                      </div>
                      <span className="text-[13px] sm:text-[14px] font-bold text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Offer */}
              <div className="flex-1 bg-[#102a7a] p-6 sm:p-12 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-4 sm:mb-6 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest !text-white ring-1 ring-inset ring-white/20">
                    <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 !text-white" />
                    <span className="!text-white">Special Offer Unlocked</span>
                  </div>

                  <h3 className="mb-1 sm:mb-2 text-[20px] sm:text-[26px] font-black leading-tight !text-white tracking-tight">
                    The Algorithmic Vault
                  </h3>
                  
                  <div className="my-3 sm:my-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-2xl sm:text-3xl font-semibold !text-white opacity-80">₹</span>
                    <span className="text-[56px] sm:text-[72px] font-black tracking-tighter leading-none !text-white">159</span>
                    <span className="ml-2 text-xl sm:text-2xl font-bold !text-white opacity-50 line-through decoration-white/40 decoration-2">₹1500</span>
                  </div>
                  
                  <p className="mb-5 sm:mb-8 px-2 sm:px-4 text-[13px] sm:text-[14px] font-medium leading-relaxed !text-[#bfdbfe]">
                    Only <span className="font-bold !text-white">30 spots</span> available at this price. Claim now before the price increases.
                  </p>

                  <button
                    onClick={handleClaim}
                    className="group cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-4 text-[16px] font-black !text-[#102a7a] shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    <span className="!text-[#102a7a]">Claim ₹159 Offer Now</span>
                    <ArrowRight className="h-5 w-5 !text-[#102a7a] transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-4 text-[11px] font-semibold text-blue-200/60 uppercase tracking-widest">Limited Time Offer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
