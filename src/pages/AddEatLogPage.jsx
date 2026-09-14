import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import EatLogForm from "../components/recipe/EatLogForm";
import { useRecipesContext } from "../context/RecipesContext";
import { createRecipe, RECIPE_TYPES } from "../utils/models";

export default function AddEatLogPage() {
  const { addRecipe } = useRecipesContext();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(() =>
    createRecipe({ type: RECIPE_TYPES.EAT }),
  );

  function handleSave() {
    if (!recipe.title.trim() && !recipe.restaurant.trim()) {
      window.alert("料理名またはお店の名前を入力してください");
      return;
    }
    const saved = addRecipe(recipe);
    navigate(`/recipes/${saved.id}`, { replace: true });
  }

  return (
    <PageShell
      title="外食ログを追加"
      onBack={true}
      action={
        <button
          type="button"
          onClick={handleSave}
          className="rounded-btn bg-terracotta px-4 py-1.5 text-sm font-bold text-white"
        >
          保存
        </button>
      }
    >
      <EatLogForm recipe={recipe} onChange={setRecipe} />
    </PageShell>
  );
}
