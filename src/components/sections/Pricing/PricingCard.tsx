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
          ? "border-blue-500/50 [.light-theme_&]:border-blue-200 bg-gradient-to-b from-blue-900/20 to-black [.light-theme_&]:from-blue-50/80 [.light-theme_&]:to-white hover:shadow-blue-500/20 [.light-theme_&]:hover:shadow-blue-200/50"
          : "border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-900/30 [.light-theme_&]:bg-white hover:border-zinc-700 [.light-theme_&]:hover:border-black/10 hover:bg-zinc-900/50 [.light-theme_&]:hover:bg-white hover:shadow-zinc-500/10 [.light-theme_&]:hover:shadow-black/5"
        }
        backdrop-blur-xl animate-fade-in-up transition-colors duration-300
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/10 [.light-theme_&]:via-blue-500/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[150%]" />

      {badge && (
        <div className="absolute top-0 right-0 overflow-hidden rounded-bl-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-[10px] font-bold text-white shadow-lg uppercase tracking-wider">
          {badge}
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-lg font-bold tracking-tight ${highlighted ? "text-blue-400 [.light-theme_&]:text-blue-600" : "text-zinc-500 [.light-theme_&]:text-zinc-400"}`}>
          {title}
        </h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-5xl font-black text-white [.light-theme_&]:text-zinc-900 tracking-tight">{price}</span>
          {period && <span className="text-zinc-500 [.light-theme_&]:text-zinc-400 font-bold text-xs uppercase ml-1">{period}</span>}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 [.light-theme_&]:text-zinc-600 font-medium">{description}</p>
      </div>

      <div className="flex-1">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 [.light-theme_&]:via-zinc-200 to-transparent w-full mb-8" />
        <ul className="space-y-4">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 [.light-theme_&]:text-zinc-600">
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${highlighted ? "bg-blue-500/20 [.light-theme_&]:bg-blue-100 text-blue-400 [.light-theme_&]:text-blue-600" : "bg-zinc-800 [.light-theme_&]:bg-zinc-100 text-zinc-400 [.light-theme_&]:text-zinc-500"}`}>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="group-hover:text-white [.light-theme_&]:group-hover:text-zinc-900 transition-colors uppercase font-bold tracking-wider text-[10px]">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <RippleButton
          className={`w-full rounded-xl py-4 font-bold text-sm transition-all duration-300 transform active:scale-95 shadow-md
            ${highlighted
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40"
              : "bg-zinc-800 [.light-theme_&]:bg-zinc-900 text-white hover:bg-zinc-700 [.light-theme_&]:hover:bg-black border border-zinc-700 [.light-theme_&]:border-black/5"
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
