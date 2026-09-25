import { useMemo, useState } from "react";
import PageShell from "../components/layout/PageShell";
import Section from "../components/layout/Section";
import Card from "../components/layout/Card";
import { useRecipesContext } from "../context/RecipesContext";
import { buildMergedShoppingList } from "../utils/shoppingList";

export default function ShoppingListPage() {
  const { recipes, shopChecks, setShopCheck, clearShopChecks } = useRecipesContext();
  const homeRecipes = useMemo(() => recipes.filter((r) => r.type === "home"), [recipes]);

  const [selectedIds, setSelectedIds] = useState(() =>
    homeRecipes.filter((r) => r.pinned).map((r) => r.id),
  );

  const mergedList = useMemo(
    () => buildMergedShoppingList(homeRecipes, selectedIds),
    [homeRecipes, selectedIds],
  );

  function toggleSelected(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  return (
    <PageShell title="買い物リスト">
      <Section title="レシピを選択" className="mb-5">
        {homeRecipes.length === 0 ? (
          <p className="text-sm text-warm-gray">家レシピがまだありません</p>
        ) : (
          <Card className="divide-y divide-linen-edge">
            {homeRecipes.map((recipe) => (
              <label
                key={recipe.id}
                className="flex min-h-[44px] items-center gap-3 p-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(recipe.id)}
                  onChange={() => toggleSelected(recipe.id)}
                  className="h-5 w-5 shrink-0"
                />
                <span className="flex-1 text-charcoal">{recipe.title || "無題のレシピ"}</span>
                {recipe.pinned && <span className="text-xs">📌</span>}
              </label>
            ))}
          </Card>
        )}
      </Section>

      <Section
        title="買い物リスト"
        action={
          mergedList.length > 0 && (
            <button
              type="button"
              onClick={clearShopChecks}
              className="text-sm font-medium text-warm-gray"
            >
              チェックをクリア
            </button>
          )
        }
      >
        {selectedIds.length === 0 ? (
          <p className="text-sm text-warm-gray">レシピを選択してください</p>
        ) : mergedList.length === 0 ? (
          <p className="text-sm text-warm-gray">選択したレシピに材料が登録されていません</p>
        ) : (
          <Card className="divide-y divide-linen-edge">
            {mergedList.map((item) => {
              const checked = !!shopChecks[item.key];
              return (
                <label
                  key={item.key}
                  className="flex min-h-[44px] items-start gap-3 p-3"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setShopCheck(item.key, e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0"
                  />
                  <div className={`flex-1 ${checked ? "opacity-50" : ""}`}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`text-sm text-charcoal ${checked ? "line-through" : ""}`}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`shrink-0 text-sm text-warm-gray ${checked ? "line-through" : ""}`}
                      >
                        {item.amountLabel}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-warm-gray">
                      {item.sources.join("・")}
                    </p>
                  </div>
                </label>
              );
            })}
          </Card>
        )}
      </Section>
    </PageShell>
  );
}
