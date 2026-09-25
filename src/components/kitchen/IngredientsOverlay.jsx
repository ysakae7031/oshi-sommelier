import KitchenIngredientsList from "./KitchenIngredientsList";

export default function IngredientsOverlay({ open, onClose, groups, multiplier, onMultiplierChange, baseServings }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <button
        type="button"
        aria-label="閉じる"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className="relative max-h-[80vh] w-full overflow-y-auto rounded-t-card bg-charcoal p-5 pb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">🥘 材料</h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-btn bg-white/10 px-4 text-base font-bold text-white"
          >
            閉じる
          </button>
        </div>
        <KitchenIngredientsList
          groups={groups}
          multiplier={multiplier}
          onMultiplierChange={onMultiplierChange}
          baseServings={baseServings}
        />
      </div>
    </div>
  );
}
