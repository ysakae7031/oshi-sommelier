import { FILTERS } from "../../utils/search";

export default function FilterChips({ value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {FILTERS.map((filter) => {
        const active = filter.id === value;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={`min-h-[44px] shrink-0 rounded-pill px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-terracotta text-white"
                : "bg-card text-charcoal border border-linen-edge"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
