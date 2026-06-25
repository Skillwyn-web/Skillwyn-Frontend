"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export function OfferPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (popupDismissed || showPopup) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      if (docHeight <= winHeight) return;

      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      // Show popup when scrolled 35% down the page
      if (scrollPercent >= 0.35) {
        setShowPopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initially in case they refresh halfway down

    return () => window.removeEventListener("scroll", handleScroll);
  }, [popupDismissed, showPopup]);

  const handleClaim = () => {
    setShowPopup(false);
    setPopupDismissed(true);
    if (pathname === '/algorithmic-vault') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/algorithmic-vault#pricing');
    }
  };

  return (
    <AnimatePresence>
      {showPopup && !popupDismissed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => {
              setShowPopup(false);
              setPopupDismissed(true);
            }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] bg-[#102a7a] p-8 shadow-[0_24px_80px_rgba(16,42,122,0.5)] ring-1 ring-white/10"
          >
            <button
              onClick={() => {
                setShowPopup(false);
                setPopupDismissed(true);
              }}
              className="absolute cursor-pointer right-5 top-5 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-2 flex flex-col items-center text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest !text-white ring-1 ring-inset ring-white/20">
                <Sparkles className="h-4 w-4 !text-white" />
                <span className="!text-white">Special Offer Unlocked</span>
              </div>

              <h3 className="mb-2 text-2xl font-bold leading-tight !text-white">
                Unlock The Algorithmic Vault
              </h3>
              
              <div className="my-5 flex items-baseline justify-center gap-x-2">
                <span className="text-3xl font-semibold !text-white opacity-80">₹</span>
                <span className="text-6xl font-black tracking-tight !text-white">159</span>
                <span className="ml-2 text-2xl font-bold !text-white opacity-50 line-through decoration-white/40 decoration-2">₹1500</span>
              </div>
              
              <p className="mb-8 px-2 text-[14px] font-medium leading-relaxed !text-[#bfdbfe]">
                Only 30 spots available at this price. Includes 50+ Premium DSA questions & Enterprise Project Blueprints.
              </p>

              <button
                onClick={handleClaim}
                className="group cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-4 text-[16px] font-bold !text-[#102a7a] shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <span className="!text-[#102a7a]">Claim ₹159 Offer Now</span>
                <ArrowRight className="h-5 w-5 !text-[#102a7a] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
