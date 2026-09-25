import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import RecipeForm from "../components/recipe/RecipeForm";
import EatLogForm from "../components/recipe/EatLogForm";
import DuplicateUrlWarning from "../components/recipe/DuplicateUrlWarning";
import { useRecipesContext } from "../context/RecipesContext";

export default function RecipeEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipe, updateRecipe } = useRecipesContext();
  const original = getRecipe(id);
  const [recipe, setRecipe] = useState(original);

  if (!original) {
    return (
      <PageShell title="レシピが見つかりません" onBack={true}>
        <p className="text-sm text-warm-gray">このレシピは削除されたか、存在しません。</p>
      </PageShell>
    );
  }

  function handleSave() {
    updateRecipe(id, recipe);
    navigate(`/recipes/${id}`, { replace: true });
  }

  return (
    <PageShell
      title="レシピを編集"
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
      {recipe.type !== "eat" && <DuplicateUrlWarning url={recipe.url} excludeId={id} />}

      {recipe.type === "eat" ? (
        <EatLogForm recipe={recipe} onChange={setRecipe} />
      ) : (
        <RecipeForm recipe={recipe} onChange={setRecipe} />
      )}
    </PageShell>
  );
}
