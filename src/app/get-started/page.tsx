"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Mail, Users, Rocket } from "lucide-react";

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stage: "",
    plan: "learner"
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to your backend API
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <main className="page-shell flex min-h-screen flex-col pt-10 pb-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 page-grid opacity-40" />

      <div className="container mx-auto px-4 mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-5xl flex-1 flex flex-col md:flex-row gap-16 items-center">
        {/* Left Side: Content */}
        <div className="flex-1 text-center md:text-left animate-fade-in-up">
          <div className="theme-kicker mb-6">
            AI placement waitlist
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold font-display mb-6 leading-tight text-ink">
            Let AI map your route <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">from student to hired.</span>
          </h1>
          <p className="text-xl text-text-muted mb-10 max-w-md mx-auto md:mx-0">
            Spots in our upcoming placement cohorts are strictly limited to ensure quality mentorship. Join the waitlist to secure your place.
          </p>

          <div className="theme-card p-6 flex items-center gap-4 max-w-sm mx-auto md:mx-0 animate-pulse-slow">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-card bg-surface flex items-center justify-center text-xs font-bold text-text-muted">
                  U{i}
                </div>
              ))}
            </div>
            <div className="text-sm font-medium">
              <span className="text-ink font-bold">500+ learners</span> <br/>
              <span className="text-text-muted">already on the waitlist</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 w-full max-w-md animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="theme-card p-8 border-secondary/30 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-lg" />
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="theme-input"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wide">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="theme-input"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="stage" className="block text-sm font-bold text-text-muted mb-2 uppercase tracking-wide">What stage are you at?</label>
                  <select 
                    id="stage" 
                    required
                    value={formData.stage}
                    onChange={(e) => setFormData({...formData, stage: e.target.value})}
                    className="theme-input appearance-none"
                  >
                    <option value="" disabled>Select your current stage</option>
                    <option value="beginner">Absolute Beginner (0-3 months)</option>
                    <option value="intermediate">Learning Basics (3-12 months)</option>
                    <option value="stuck">Stuck in Tutorial Hell</option>
                    <option value="job-hunting">Actively Job Hunting</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-text-muted mb-3 uppercase tracking-wide">Which plan interests you?</label>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.plan === 'learner' ? 'border-accent bg-accent/5' : 'border-border-subtle hover:bg-surface'}`}>
                      <input 
                        type="radio" 
                        name="plan" 
                        value="learner" 
                        checked={formData.plan === 'learner'}
                        onChange={(e) => setFormData({...formData, plan: e.target.value})}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${formData.plan === 'learner' ? 'border-accent' : 'border-text-muted'}`}>
                        {formData.plan === 'learner' && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                      </div>
                      <div>
                        <div className="font-bold text-ink">Learner Base</div>
                        <div className="text-xs text-text-muted">Self-paced tools & community</div>
                      </div>
                    </label>
                    
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.plan === 'cohort' ? 'border-accent bg-accent/5' : 'border-border-subtle hover:bg-surface'}`}>
                      <input 
                        type="radio" 
                        name="plan" 
                        value="cohort" 
                        checked={formData.plan === 'cohort'}
                        onChange={(e) => setFormData({...formData, plan: e.target.value})}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${formData.plan === 'cohort' ? 'border-accent' : 'border-text-muted'}`}>
                        {formData.plan === 'cohort' && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                      </div>
                      <div>
                        <div className="font-bold text-ink">Job-Ready Program</div>
                        <div className="text-xs text-accent">Intensive cohort + Placement</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="theme-button flex w-full items-center justify-center gap-2 py-4 text-lg"
                >
                  Join the Waitlist <ChevronRight className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <div className="text-center py-10 animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-accent/20 mx-auto flex items-center justify-center mb-6 glow-accent">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-3xl font-bold font-space mb-4">You're on the list!</h3>
                <p className="text-text-muted mb-8">
                  Keep an eye on your inbox ({formData.email}). We'll notify you the moment spots open up.
                </p>
                <button onClick={() => setSubmitted(false)} className="text-sm font-bold text-secondary hover:text-white transition-colors underline underline-offset-4">
                  Register another email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What Happens Next Timeline */}
      <div className="container mx-auto px-4 max-w-4xl mt-24 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <h3 className="text-center text-2xl font-bold font-space mb-10">What happens next?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="theme-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-surface rounded-bl-3xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <Mail className="w-6 h-6 text-text-muted group-hover:text-secondary" />
            </div>
            <div className="text-5xl font-black font-space text-surface mb-2">01</div>
            <h4 className="text-lg font-bold mb-2">You get an email</h4>
            <p className="text-sm text-text-muted">Once your number is up, we’ll send a private invite link to your inbox.</p>
          </div>
          
          <div className="theme-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-surface rounded-bl-3xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Users className="w-6 h-6 text-text-muted group-hover:text-accent" />
            </div>
            <div className="text-5xl font-black font-space text-surface mb-2">02</div>
            <h4 className="text-lg font-bold mb-2">We onboard you</h4>
            <p className="text-sm text-text-muted">You gain platform access, set up your profile, and join the main Discord community.</p>
          </div>
          
          <div className="theme-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-surface rounded-bl-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Rocket className="w-6 h-6 text-text-muted group-hover:text-white" />
            </div>
            <div className="text-5xl font-black font-space text-surface mb-2">03</div>
            <h4 className="text-lg font-bold mb-2">Your Cohort Starts</h4>
            <p className="text-sm text-text-muted">You get assigned to your 8-week mentor cohort and the real work begins.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
