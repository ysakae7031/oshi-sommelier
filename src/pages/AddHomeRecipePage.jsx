import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import RecipeForm from "../components/recipe/RecipeForm";
import Field, { inputClass } from "../components/recipe/Field";
import DuplicateUrlWarning from "../components/recipe/DuplicateUrlWarning";
import { useRecipesContext } from "../context/RecipesContext";
import { createRecipe, RECIPE_TYPES } from "../utils/models";

export default function AddHomeRecipePage() {
  const { addRecipe } = useRecipesContext();
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = location.state?.prefill ?? {};

  const [mode, setMode] = useState(prefill.reproduceId ? "detailed" : "quick");
  const [recipe, setRecipe] = useState(() =>
    createRecipe({ type: RECIPE_TYPES.HOME, ...prefill }),
  );

  function handleSave() {
    if (!recipe.title.trim()) {
      window.alert("タイトルを入力してください");
      return;
    }
    const saved = addRecipe(recipe);
    navigate(`/recipes/${saved.id}`, { replace: true });
  }

  return (
    <PageShell
      title="家レシピを追加"
      onBack={true}
      action={
        <button
          type="button"
          onClick={handleSave}
          className="flex min-h-[44px] items-center rounded-btn bg-terracotta px-4 text-sm font-bold text-white"
        >
          保存
        </button>
      }
    >
      <div className="mb-4 flex rounded-btn border border-linen-edge bg-card p-1">
        <button
          type="button"
          onClick={() => setMode("quick")}
          className={`flex-1 rounded-btn py-1.5 text-sm font-bold transition-colors ${
            mode === "quick" ? "bg-terracotta text-white" : "text-charcoal"
          }`}
        >
          すぐ保存
        </button>
        <button
          type="button"
          onClick={() => setMode("detailed")}
          className={`flex-1 rounded-btn py-1.5 text-sm font-bold transition-colors ${
            mode === "detailed" ? "bg-terracotta text-white" : "text-charcoal"
          }`}
        >
          詳しく記録
        </button>
      </div>

      <DuplicateUrlWarning url={recipe.url} excludeId={recipe.id} />

      {mode === "quick" ? (
        <div>
          <Field label="タイトル">
            <input
              type="text"
              value={recipe.title}
              onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
              placeholder="例）豚の生姜焼き"
              className={inputClass}
            />
          </Field>
          <Field label="URL">
            <input
              type="text"
              value={recipe.url}
              onChange={(e) => setRecipe({ ...recipe, url: e.target.value })}
              placeholder="レシピの参照元URL"
              className={inputClass}
            />
          </Field>
          <Field
            label="メモ・材料のベタ貼り"
            hint="後から「編集」で材料・手順に自動分解できます"
          >
            <textarea
              value={recipe.rawText}
              onChange={(e) => setRecipe({ ...recipe, rawText: e.target.value })}
              rows={6}
              placeholder="レシピの全文をそのまま貼り付けてOK"
              className={inputClass}
            />
          </Field>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={recipe.wantToMake}
                onChange={(e) =>
                  setRecipe({ ...recipe, wantToMake: e.target.checked })
                }
              />
              作りたい
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={recipe.favorite}
                onChange={(e) =>
                  setRecipe({ ...recipe, favorite: e.target.checked })
                }
              />
              お気に入り
            </label>
          </div>
        </div>
      ) : (
        <RecipeForm recipe={recipe} onChange={setRecipe} />
      )}
    </PageShell>
  );
}
