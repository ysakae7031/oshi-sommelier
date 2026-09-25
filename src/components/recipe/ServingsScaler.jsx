const PRESETS = [1, 1.5, 2, 3];

export default function ServingsScaler({ multiplier, onChange, baseServings }) {
  return (
    <div className="flex items-center gap-2">
      {baseServings && (
        <span className="text-xs text-warm-gray">基準: {baseServings}</span>
      )}
      <div className="flex gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`min-h-[44px] rounded-pill px-2.5 py-1 text-xs font-bold transition-colors ${
              multiplier === preset
                ? "bg-terracotta text-white"
                : "border border-linen-edge bg-card text-charcoal"
            }`}
          >
            ×{preset}
          </button>
        ))}
      </div>
    </div>
  );
}
