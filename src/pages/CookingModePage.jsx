import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipesContext } from "../context/RecipesContext";
import { useWakeLock } from "../hooks/useWakeLock";
import { useStepTimers } from "../hooks/useStepTimers";
import { scaleIngredientGroups } from "../utils/scaler";
import KitchenIngredientsList from "../components/kitchen/KitchenIngredientsList";
import IngredientsOverlay from "../components/kitchen/IngredientsOverlay";
import StepTimer from "../components/kitchen/StepTimer";

export default function CookingModePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipe } = useRecipesContext();
  const recipe = getRecipe(id);

  const [phase, setPhase] = useState("intro");
  const [multiplier, setMultiplier] = useState(1);
  const [stepIndex, setStepIndex] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useWakeLock(true);
  const { timers, start, pause, addSeconds, reset } = useStepTimers(recipe?.steps ?? []);

  if (!recipe) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal p-6 text-center text-white">
        <div>
          <p className="mb-4 text-lg">このレシピは見つかりませんでした</p>
          <button
            type="button"
            onClick={() => navigate("/", { replace: true })}
            className="min-h-[44px] rounded-btn bg-terracotta px-5 text-base font-bold"
          >
            ホームへ戻る
          </button>
        </div>
      </div>
    );
  }

  const scaledGroups = scaleIngredientGroups(recipe.ingredientGroups, multiplier);
  const lastNote = recipe.cookLog[0]?.note;
  const steps = recipe.steps;

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function goPrev() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-charcoal p-5 text-white">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="min-h-[44px] rounded-btn bg-white/10 px-4 text-base font-bold"
          >
            ← 戻る
          </button>
        </div>
        <h1 className="font-display mb-4 text-2xl font-bold">{recipe.title}</h1>

        {lastNote && (
          <div className="mb-4 rounded-btn bg-amber-light/90 p-3 text-base font-medium text-charcoal">
            💡 前回のメモ: {lastNote}
          </div>
        )}

        <KitchenIngredientsList
          groups={scaledGroups}
          multiplier={multiplier}
          onMultiplierChange={setMultiplier}
          baseServings={recipe.baseServings}
        />

        <button
          type="button"
          onClick={() => setPhase("cooking")}
          disabled={steps.length === 0}
          className="mt-6 min-h-[60px] w-full rounded-btn bg-terracotta text-lg font-bold text-white disabled:opacity-40"
        >
          {steps.length === 0 ? "手順が登録されていません" : "🍳 調理を始める"}
        </button>
      </div>
    );
  }

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const isFirst = stepIndex === 0;
  const progress = ((stepIndex + 1) / steps.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-charcoal text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="min-h-[44px] rounded-btn bg-white/10 px-4 text-base font-bold"
        >
          ✕ 終了
        </button>
        <span className="text-base text-white/70">
          手順 {stepIndex + 1} / {steps.length}
        </span>
        <button
          type="button"
          onClick={() => setOverlayOpen(true)}
          className="min-h-[44px] rounded-btn bg-white/10 px-4 text-base font-bold"
        >
          🥘 材料
        </button>
      </div>

      <div
        className="flex flex-1 cursor-pointer flex-col justify-center gap-5 px-6 py-4"
        onClick={goNext}
      >
        <p className="font-display text-3xl font-bold leading-snug">{step.text}</p>
        {(step.heat || step.minutes || step.cue) && (
          <p className="text-xl text-white/80">
            {[step.heat, step.minutes, step.cue].filter(Boolean).join(" ・ ")}
          </p>
        )}
        {timers[stepIndex] && (
          <StepTimer
            timer={timers[stepIndex]}
            onStart={() => start(stepIndex)}
            onPause={() => pause(stepIndex)}
            onAddSeconds={(s) => addSeconds(stepIndex, s)}
            onReset={() => reset(stepIndex)}
          />
        )}
      </div>

      <div className="h-1.5 w-full bg-white/10">
        <div
          className="h-full bg-terracotta transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex gap-3 p-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className="min-h-[60px] flex-1 rounded-btn bg-white/10 text-lg font-bold disabled:opacity-30"
        >
          ← 前へ
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          className="min-h-[60px] flex-1 rounded-btn bg-terracotta text-lg font-bold disabled:opacity-30"
        >
          次へ →
        </button>
      </div>

      <IngredientsOverlay
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        groups={scaledGroups}
        multiplier={multiplier}
        onMultiplierChange={setMultiplier}
        baseServings={recipe.baseServings}
      />
    </div>
  );
}
