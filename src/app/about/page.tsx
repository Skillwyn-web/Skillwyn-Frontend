import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import { Navigation, Code, Shield, Link as LinkIcon, Users as UsersIcon, Target, Bot } from "lucide-react";

export default function AboutPage() {
  const team = [
    { name: "Yash", role: "Founder & CEO", av: "Y", bio: "Former developer, created codewithyash community of 30K+." },
    { name: "Priya", role: "Lead Product Architect", av: "P", bio: "Ex-FAANG engineer, built scalable ed-tech platforms." },
    { name: "Rahul", role: "Head of Placement Strategy", av: "R", bio: "10 years in technical recruitment. Knows what HRs want." },
    { name: "Ananya", role: "AI Systems Engineering Lead", av: "A", bio: "Built the AI mock interview engine and Career GPS." },
    { name: "Vikram", role: "Community Director", av: "V", bio: "Scaled the codewithyash discord from 0 to 10K active members." }
  ];

  return (
    <main className="page-shell min-h-screen pt-24 pb-16">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 page-grid opacity-30" />

      {/* Mission Section */}
      <div className="container relative z-10 mx-auto px-4 mt-16 mb-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="theme-kicker mb-4">Our Mission</span>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 max-w-4xl mx-auto text-ink">
            Not another course platform. <br/><span className="text-primary text-glow">An AI placement system.</span>
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            We saw brilliant students failing interviews because they were stuck in tutorial hell. We built SkillWyn because the world doesn&apos;t need another 200-hour video course. It needs a bridge between learning syntax and signing offer letters.
          </p>
        </div>
      </div>

      {/* Origin Story */}
      <section className="bg-surface/30 border-y border-border-subtle py-24 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="theme-kicker mb-4">Origin Story</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-ink">Born from a community of 30,000+ coders</h2>
              <div className="space-y-4 text-text-muted text-lg">
                <p>SkillWyn started on YouTube as <strong className="text-ink">codewithyash</strong>. We grew to a family of over 30,000 developers learning to code together.</p>
                <p>But soon, a massive pattern emerged in our Discord. People were finishing 3 bootcamps, building YouTube clones, but struggling to clear a single coding round or interview.</p>
                <p>We realized the education system was broken. Nobody was teaching how to build real industry confidence. So we built the LBP framework.</p>
              </div>
            </div>
            <div className="relative">
              <div className="theme-card aspect-square border-secondary/30 p-8 flex flex-col items-center justify-center glow-accent relative overflow-hidden group">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">👑</span>
                </div>
                <div className="text-5xl font-black font-space mb-2 group-hover:text-accent transition-colors">30K+</div>
                <div className="text-xl text-text-muted font-bold tracking-wider uppercase">Members Strong</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The LBP Framework */}
      <section className="py-24 container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-bold tracking-[0.15em] mb-4 block uppercase">The Pedagogy</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6">The LBP Framework</h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">Learn. Build. Place. We don&apos;t deviate from this proven path.</p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-1/2 md:before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-subtle before:to-transparent">
          {/* Learn */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-dark bg-secondary group-hover:bg-accent text-white group-hover:text-black transition-colors shadow-[0_0_15px_rgba(79,70,229,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Navigation className="w-4 h-4" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] theme-card p-6 md:p-8 hover:border-primary/50 transition-colors">
              <h3 className="font-space text-2xl font-bold mb-3 text-secondary">01. Learn</h3>
              <p className="text-text-muted leading-relaxed">We use the <strong>AI Career GPS</strong> to map out exactly what you need to learn. No wasting 3 weeks on technologies no company in your target market demands. Targeted, fast, deep learning.</p>
            </div>
          </div>
          
          {/* Build */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-dark bg-secondary group-hover:bg-accent text-white group-hover:text-black transition-colors shadow-[0_0_15px_rgba(79,70,229,0.5)] shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <Code className="w-4 h-4" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] theme-card p-6 md:p-8 hover:border-primary/50 transition-colors">
              <h3 className="font-space text-2xl font-bold mb-3 text-accent">02. Build</h3>
              <p className="text-text-muted leading-relaxed">Say goodbye to To-Do apps. Our <strong>Industry Projects Library</strong> gives you real feature briefs. You build them. You push to GitHub. We review the PR. That&apos;s a real portfolio.</p>
            </div>
          </div>

          {/* Place */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg-dark bg-secondary group-hover:bg-accent text-white group-hover:text-black transition-colors shadow-[0_0_15px_rgba(79,70,229,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Shield className="w-4 h-4" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] theme-card p-6 md:p-8 hover:border-primary/50 transition-colors">
              <h3 className="font-display text-2xl font-bold mb-3 text-ink">03. Place</h3>
              <p className="text-text-muted leading-relaxed">Once your <strong>Placement Probability Meter</strong> hits 85%, you unlock the <strong>SkillWyn Talent Pool</strong>. We conduct AI mock interviews, refine your resume, and put your profile directly in front of hiring managers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface/30 border-y border-border-subtle py-24 mb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-bold tracking-[0.15em] mb-4 block uppercase">Core Values</span>
            <h2 className="text-3xl md:text-5xl font-bold font-space">What we stand for</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="theme-card p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6"><Target className="w-6 h-6 text-accent" /></div>
              <h3 className="text-xl font-bold mb-4 font-space">Placement-First</h3>
              <p className="text-text-muted text-sm">Every tutorial, feature, and project is optimized for exactly one metric: getting you hired.</p>
            </div>
            <div className="theme-card p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6"><UsersIcon className="w-6 h-6 text-accent" /></div>
              <h3 className="text-xl font-bold mb-4 font-space">Community-Driven</h3>
              <p className="text-text-muted text-sm">Nobody learns in isolation here. We rank up together. If you fall behind, the cohort lifts you up.</p>
            </div>
            <div className="theme-card p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6"><Bot className="w-6 h-6 text-accent" /></div>
              <h3 className="text-xl font-bold mb-4 font-space">AI-Native</h3>
              <p className="text-text-muted text-sm">We don&apos;t use AI as a gimmick. We use it to provide you with a 24/7 personal tutor and brutal interview feedback.</p>
            </div>
            <div className="theme-card p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6"><LinkIcon className="w-6 h-6 text-accent" /></div>
              <h3 className="text-xl font-bold mb-4 font-space">Aligned Incentives</h3>
              <p className="text-text-muted text-sm">YouTube earns when you watch. Udemy earns when you buy. We earn when companies hire from us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-bold tracking-[0.15em] mb-4 block uppercase">The Architects</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space">Meet the team</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {team.map((member, idx) => (
            <div key={idx} className="theme-card p-6 text-center group hover:border-primary/35 hover:bg-surface/50 transition-colors">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                {member.av}
              </div>
              <h3 className="text-2xl font-bold font-space mb-1">{member.name}</h3>
              <p className="text-accent text-sm font-bold mb-4 uppercase tracking-wider">{member.role}</p>
              <p className="text-text-muted text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
