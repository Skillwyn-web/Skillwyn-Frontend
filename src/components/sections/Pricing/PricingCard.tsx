
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
      className={`group relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
        ${highlighted
          ? "border-blue-500/50 bg-gradient-to-b from-blue-900/20 to-black hover:shadow-blue-500/20"
          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50 hover:shadow-zinc-500/10"
        }
        backdrop-blur-xl animate-fade-in-up
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glossy sheen effect on hover */}
      <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[150%]" />

      {badge && (
        <div className="absolute top-0 right-0 overflow-hidden rounded-bl-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
          {badge}
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-lg font-medium tracking-wide ${highlighted ? "text-blue-400" : "text-zinc-400"}`}>
          {title}
        </h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-5xl font-bold text-white tracking-tight">{price}</span>
          {period && <span className="text-zinc-500 font-medium">{period}</span>}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>

      <div className="flex-1">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent w-full mb-6" />
        <ul className="space-y-4">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${highlighted ? "bg-blue-500/20 text-blue-400" : "bg-zinc-800 text-zinc-400"}`}>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="group-hover:text-white transition-colors">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <RippleButton
          className={`w-full rounded-xl py-4 font-semibold text-sm transition-all duration-300 transform active:scale-95
            ${highlighted
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
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

