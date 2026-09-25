const PRESETS = [1, 1.5, 2, 3];

export default function KitchenIngredientsList({ groups, multiplier, onMultiplierChange, baseServings }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {baseServings && (
          <span className="text-sm text-white/60">基準: {baseServings}</span>
        )}
        <div className="flex gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onMultiplierChange(preset)}
              className={`min-h-[44px] rounded-pill px-4 text-base font-bold transition-colors ${
                multiplier === preset ? "bg-terracotta text-white" : "bg-white/10 text-white"
              }`}
            >
              ×{preset}
            </button>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <p className="text-lg text-white/60">材料が登録されていません</p>
      ) : (
        <div className="flex flex-col gap-5">
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="mb-2 text-lg font-bold text-terracotta">{group.label}</p>
              )}
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item, ii) => (
                  <li
                    key={ii}
                    className="flex items-center justify-between border-b border-white/15 pb-2.5 text-lg text-white last:border-0"
                  >
                    <span>{item.name}</span>
                    <span className="text-white/70">{item.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
