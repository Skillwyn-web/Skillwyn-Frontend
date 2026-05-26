import PricingCard from "./PricingCard";

const PricingSection = () => {
  return (
    <section id="pricing" className="relative overflow-hidden border-t border-border-subtle bg-bg-dark py-32 text-text-primary transition-colors duration-300">
      
      <div
        className="absolute inset-0 z-0 opacity-[0.2] [.light-theme_&]:opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          color: '#66e3ff'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20 animate-fade-in-up">
          <h2 className="mb-2 text-[10px] font-bold uppercase leading-7 text-primary">Simple, transparent pricing</h2>
          <p className="mt-2 text-4xl font-semibold text-ink sm:text-6xl">
            Accelerate with <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">AI bootcamps</span>
          </p>
          <p className="mt-6 text-lg leading-8 text-text-muted font-medium">
            Intensive, cohort-based learning with placement support. Choose the plan that fits your ambition.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 items-start">
          <PricingCard
            title="Self-Paced"
            price="$0"
            period="/mo"
            description="For disciplined learners who want to explore at their own speed."
            features={[
              { text: "Access to all free roadmaps" },
              { text: "Basic practice questions" },
              { text: "Community forum access" },
              { text: "Weekly coding challenges" },
            ]}
            buttonText="Start Free"
            delay={0}
          />

          <PricingCard
            title="Pro Subscription"
            price="$29"
            period="/mo"
            badge="MOST POPULAR"
            description="Unlock the full potential with premium content and AI tools."
            highlighted
            features={[
              { text: "Everything in Self-Paced" },
              { text: "All Premium Courses & Projects" },
              { text: "Company-wise question filters" },
              { text: "Video solutions for Top 150 DSA" },
              { text: "AI Resume & Portfolio Review" },
            ]}
            buttonText="Get Pro"
            delay={100}
          />

          <PricingCard
            title="Live Bootcamp"
            price="$499"
            period="/cohort"
            description="90 Days to Job Ready with dedicated mentorship."
            features={[
              { text: "Everything in Pro" },
              { text: "Live weekend masterclasses" },
              { text: "1:1 Mentorship calls" },
              { text: "Mock Interviews (Google/Amazon)" },
              { text: "Dedicated Placement Assistance" },
            ]}
            buttonText="Apply Now"
            delay={200}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
