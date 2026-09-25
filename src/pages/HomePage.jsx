import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import SearchBar from "../components/home/SearchBar";
import FilterChips from "../components/home/FilterChips";
import RecipeCard from "../components/home/RecipeCard";
import BadgeSummaryBar from "../components/home/BadgeSummaryBar";
import Fab from "../components/home/Fab";
import { useRecipesContext } from "../context/RecipesContext";
import { matchesFilter, matchesQuery } from "../utils/search";

export default function HomePage() {
  const { recipes } = useRecipesContext();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () =>
      recipes.filter(
        (recipe) => matchesFilter(recipe, filter) && matchesQuery(recipe, query),
      ),
    [recipes, filter, query],
  );

  return (
    <PageShell
      title="KitchDom"
      fab={<Fab />}
      action={
        <Link
          to="/shopping"
          aria-label="買い物リスト"
          className="flex h-11 w-11 items-center justify-center rounded-full text-xl active:bg-linen-edge"
        >
          🛒
        </Link>
      }
    >
      {recipes.length > 0 && <BadgeSummaryBar recipes={recipes} />}

      <div className="mb-3">
        <SearchBar value={query} onChange={setQuery} />
      </div>
      <div className="mb-3">
        <FilterChips value={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState hasRecipes={recipes.length > 0} />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

function EmptyState({ hasRecipes }) {
  return (
    <div className="mt-16 flex flex-col items-center gap-2 text-center text-warm-gray">
      <span className="text-4xl">{hasRecipes ? "🔍" : "🍳"}</span>
      <p className="text-sm">
        {hasRecipes
          ? "条件に合うレシピが見つかりません"
          : "まだレシピがありません。右下の＋から追加しましょう"}
      </p>
    </div>
  );
}
