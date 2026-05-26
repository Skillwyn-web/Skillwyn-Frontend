import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import { 
  Compass, Swords, UserCheck, Bot, BarChart4, BookOpen, 
  FileText, Briefcase, Medal, Users, MessageSquareQuote, BadgeCheck 
} from "lucide-react";

const features = [
  {
    category: "AI Tools",
    icon: <Compass className="w-8 h-8 text-accent" />,
    title: "AI Career GPS",
    description: "Personalised, goal-based skill track selector. No more guessing what to learn.",
    problem: "Confusion & Overwhelm",
    for: "Beginners unsure where to start",
  },
  {
    category: "Learning Tools",
    icon: <Swords className="w-8 h-8 text-accent" />,
    title: "Live Coding Battles",
    description: "Compete with peers in real-time coding challenges. Rank up. Stay sharp.",
    problem: "Boring solo learning",
    for: "Competitive coders & peers",
  },
  {
    category: "Placement Tools",
    icon: <UserCheck className="w-8 h-8 text-accent" />,
    title: "Real Interview Simulation",
    description: "Face simulated company interviews before the real thing.",
    problem: "Failing real interviews",
    for: "Job-ready candidates",
  },
  {
    category: "AI Tools",
    icon: <Bot className="w-8 h-8 text-accent" />,
    title: "AI Mock Interview",
    description: "Practice interviews at 2am. AI gives brutal, honest feedback.",
    problem: "No interview practice",
    for: "Anyone prepping for technical rounds",
  },
  {
    category: "Placement Tools",
    icon: <BarChart4 className="w-8 h-8 text-accent" />,
    title: "Placement Probability Meter",
    description: "A live score showing how hireable you are right now.",
    problem: "Not knowing if you're ready",
    for: "Job seekers tracking progress",
  },
  {
    category: "Portfolio Tools",
    icon: <BookOpen className="w-8 h-8 text-accent" />,
    title: "Industry Projects Library",
    description: "Real briefs from real companies. Build what matters.",
    problem: "Tutorial clones",
    for: "Developers building portfolios",
  },
  {
    category: "AI Tools",
    icon: <FileText className="w-8 h-8 text-accent" />,
    title: "AI Resume Reviewer",
    description: "Instant AI feedback on your resume before you send it.",
    problem: "Resume getting rejected",
    for: "Active job applicants",
  },
  {
    category: "Learning Tools",
    icon: <Briefcase className="w-8 h-8 text-accent" />,
    title: "Company-Specific Prep Packs",
    description: "Curated prep material for Infosys, TCS, startups, and more.",
    problem: "Generic prep material",
    for: "Targeting specific companies",
  },
  {
    category: "Portfolio Tools",
    icon: <Medal className="w-8 h-8 text-accent" />,
    title: "SkillWyn Rank + Leaderboard",
    description: "A public rank that actually means something to employers.",
    problem: "No credibility signal",
    for: "All platform users",
  },
  {
    category: "Placement Tools",
    icon: <Users className="w-8 h-8 text-accent" />,
    title: "SkillWyn Talent Pool",
    description: "Companies hire directly from our vetted learner pool.",
    problem: "No company access",
    for: "Top percentiles",
  },
  {
    category: "AI Tools",
    icon: <MessageSquareQuote className="w-8 h-8 text-accent" />,
    title: "AI Doubt Solver 24/7",
    description: "Instant answers to coding doubts. No 2-day forum wait.",
    problem: "Stuck on errors for hours",
    for: "Active learners",
  },
  {
    category: "Portfolio Tools",
    icon: <BadgeCheck className="w-8 h-8 text-accent" />,
    title: "SkillWyn Profile",
    description: "Your verified skill identity. Better than a LinkedIn cert.",
    problem: "Fake or meaningless certs",
    for: "Graduates",
  }
];

export default function FeaturesPage() {
  return (
    <main className="page-shell min-h-screen pt-24 pb-16">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 page-grid opacity-30" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="theme-kicker mb-4">AI learning features</span>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 text-ink">Everything a student needs to become hire-ready</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Stop collecting tutorials. Start building an arsenal. Our AI-native tools are designed to get you from beginner to hired.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {features.map((feature, idx) => (
            <div key={idx} className="theme-card p-6 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 rounded-lg bg-surface border border-border-subtle flex items-center justify-center mb-6 group-hover:glow-accent transition-all">
                {feature.icon}
              </div>
              <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded mb-3">
                {feature.category}
              </div>
              <h3 className="text-xl font-bold font-display mb-3 text-ink">{feature.title}</h3>
              <p className="text-text-muted text-sm mb-4">{feature.description}</p>
              
              <div className="mt-auto pt-4 border-t border-border-subtle">
                <div className="text-xs mb-1"><span className="text-text-muted">Solves:</span> <span className="text-ink font-medium">{feature.problem}</span></div>
                <div className="text-xs"><span className="text-text-muted">For:</span> <span className="text-ink font-medium">{feature.for}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
