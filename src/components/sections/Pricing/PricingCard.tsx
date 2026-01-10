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
}: Props) => {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-black/60 p-8 shadow-lg backdrop-blur transition
        ${highlighted ? "ring-2 ring-indigo-500 bg-gradient-to-b from-indigo-900/20 to-black" : ""}`}
    >
      {badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
          {badge}
        </span>
      )}

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        {period && <span className="text-gray-400">{period}</span>}
      </div>

      <p className="mt-2 text-sm text-gray-400">{description}</p>

      <ul className="mt-6 space-y-3 text-sm text-gray-300">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-indigo-400">✔</span>
            {f.text}
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold transition
          ${highlighted ? "bg-indigo-600 text-white hover:bg-indigo-500" : "border border-white/20 text-white hover:bg-white/5"}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
