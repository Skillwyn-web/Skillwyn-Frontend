import { RippleButton } from "@/components/ui/RippleButton";

type Feature = {
  text: string;
};

type Props = {
  title: string;
  price: string;
  period?: string;
  badge?: string;
  description: string;
  features: Feature[];
  buttonText: string;
  highlighted?: boolean;
  delay?: number;
};

const PricingCard = ({
  title,
  price,
  period,
  badge,
  description,
  features,
  buttonText,
  highlighted,
  delay = 0,
}: Props) => {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-lg border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
        ${highlighted
          ? "border-primary/50 bg-gradient-to-b from-primary/15 to-bg-card hover:shadow-primary/20"
          : "border-border-subtle bg-bg-card/70 hover:border-primary/35 hover:bg-surface/70 hover:shadow-primary/10"
        }
        backdrop-blur-xl animate-fade-in-up transition-colors duration-300
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[150%]" />

      {badge && (
        <div className="absolute top-0 right-0 overflow-hidden rounded-bl-lg bg-gradient-to-r from-primary to-secondary px-4 py-1.5 text-[10px] font-bold text-bg-dark shadow-lg uppercase">
          {badge}
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-lg font-bold ${highlighted ? "text-primary" : "text-text-muted"}`}>
          {title}
        </h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-5xl font-black text-ink">{price}</span>
          {period && <span className="text-text-muted font-bold text-xs uppercase ml-1">{period}</span>}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-text-muted font-medium">{description}</p>
      </div>

      <div className="flex-1">
        <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent w-full mb-8" />
        <ul className="space-y-4">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${highlighted ? "bg-primary/20 text-primary" : "bg-surface text-text-muted"}`}>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="transition-colors group-hover:text-ink uppercase font-bold text-[10px]">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <RippleButton
          className={`w-full rounded-lg py-4 font-bold text-sm transition-all duration-300 transform active:scale-95 shadow-md
            ${highlighted
              ? "bg-gradient-to-r from-primary to-secondary text-bg-dark shadow-primary/25 hover:shadow-primary/40"
              : "bg-surface text-ink hover:bg-bg-card border border-border-subtle"
            }`}
          rippleColor={highlighted ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"}
        >
          {buttonText}
        </RippleButton>
      </div>
    </div>
  );
};

export default PricingCard;
