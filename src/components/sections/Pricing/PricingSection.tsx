import PricingCard from "./PricingCard";

const PricingSection = () => {
  return (
    <section className="bg-black py-32 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold">Accelerate with Bootcamps</h2>
        <p className="mt-2 text-gray-400">
          Intensive, cohort-based learning with placement support.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <PricingCard
            title="Self-Paced"
            price="$0"
            period="/mo"
            description="For disciplined learners."
            features={[
              { text: "Access to all roadmaps" },
              { text: "Basic practice questions" },
              { text: "Community forum access" },
            ]}
            buttonText="Start Free"
          />

          <PricingCard
            title="Pro Subscription"
            price="$29"
            period="/mo"
            badge="MOST POPULAR"
            description="Unlock everything."
            highlighted
            features={[
              { text: "All Premium Courses" },
              { text: "Company-wise question filters" },
              { text: "Video solutions for DSA" },
              { text: "AI Resume Review" },
            ]}
            buttonText="Get Pro"
          />

          <PricingCard
            title="Live Bootcamp"
            price="$499"
            period="/cohort"
            description="90 Days to Job Ready."
            features={[
              { text: "Live weekend classes" },
              { text: "1:1 Mentorship calls" },
              { text: "Mock Interviews (Google/Amazon)" },
              { text: "Placement Assistance" },
            ]}
            buttonText="Apply Now"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
