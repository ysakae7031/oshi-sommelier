// 選択されたレシピの材料を材料名でまとめ、分量は「大さじ2 + 大さじ1」のように連結する。
export function buildMergedShoppingList(recipes, selectedIds) {
  const selected = recipes.filter((r) => selectedIds.includes(r.id));
  const byName = new Map();

  for (const recipe of selected) {
    for (const group of recipe.ingredientGroups) {
      for (const item of group.items) {
        if (!item.name.trim()) continue;
        const entry = byName.get(item.name) ?? { name: item.name, amounts: [], sources: [] };
        if (item.amount.trim()) entry.amounts.push(item.amount.trim());
        if (!entry.sources.includes(recipe.title)) entry.sources.push(recipe.title);
        byName.set(item.name, entry);
      }
    }
  }

  return Array.from(byName.values()).map((entry) => ({
    key: entry.name,
    name: entry.name,
    amountLabel: entry.amounts.join(" + "),
    sources: entry.sources,
  }));
}
