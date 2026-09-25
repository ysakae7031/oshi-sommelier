import { useEffect, useState } from "react";
import KitchenIngredientsList from "./KitchenIngredientsList";

export default function IngredientsOverlay({ open, onClose, groups, multiplier, onMultiplierChange, baseServings }) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timeout = setTimeout(() => setMounted(false), 200);
    return () => clearTimeout(timeout);
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <button
        type="button"
        aria-label="閉じる"
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative max-h-[80vh] w-full overflow-y-auto rounded-t-card bg-charcoal p-5 pb-8 transition-transform duration-200 ease-out ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
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
