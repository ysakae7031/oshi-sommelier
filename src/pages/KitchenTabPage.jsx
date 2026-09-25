import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import PinnedRecipeCard from "../components/home/PinnedRecipeCard";
import { useRecipesContext } from "../context/RecipesContext";

export default function KitchenTabPage() {
  const { pinnedRecipes } = useRecipesContext();

  return (
    <PageShell
      title="今週の献立"
      action={
        <Link
          to="/shopping"
          aria-label="買い物リスト"
          className="flex h-9 w-9 items-center justify-center rounded-full text-xl active:bg-linen-edge"
        >
          🛒
        </Link>
      }
    >
      {pinnedRecipes.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-warm-gray">
          <span className="text-4xl">📌</span>
          <p className="text-sm">
            レシピ詳細画面の「今週の献立」で
            <br />
            ピン留めすると、ここに表示されます
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {pinnedRecipes.map((recipe) => (
            <PinnedRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
