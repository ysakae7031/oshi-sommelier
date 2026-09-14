export default function ChipToggleGroup({ options, value, onChange }) {
  function toggle(option) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`rounded-pill px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-sage text-white"
                : "border border-linen-edge bg-card text-charcoal"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
