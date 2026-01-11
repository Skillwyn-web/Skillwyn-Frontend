
import PricingCard from "./PricingCard";

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-900/20 blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-y-1/2 rounded-full bg-purple-900/20 blur-[128px]" />
      <div
        className="absolute inset-0 z-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(#333 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20 animate-fade-in-up">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Simple, transparent pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Accelerate with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Bootcamps</span>
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
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

