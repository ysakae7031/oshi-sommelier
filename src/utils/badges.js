export const RANKS = [
  { min: 20, id: "crown", icon: "👑", title: "皇帝" },
  { min: 10, id: "gold", icon: "🥇", title: "国王" },
  { min: 5, id: "silver", icon: "🥈", title: "伯爵" },
  { min: 1, id: "bronze", icon: "🥉", title: "開拓者" },
];

export function getRankForCount(count) {
  return RANKS.find((rank) => count >= rank.min) || null;
}

export function computeCategoryCookCounts(recipes) {
  const counts = {};
  for (const recipe of recipes) {
    if (!recipe.category) continue;
    counts[recipe.category] = (counts[recipe.category] || 0) + recipe.cookLog.length;
  }
  return counts;
}

// ホーム画面用の1行サマリー（例: "👑 42レシピ・128回調理・イタリアンの国王"）
export function getTopBadgeSummary(recipes) {
  const totalRecipes = recipes.length;
  const totalCooks = recipes.reduce((sum, r) => sum + r.cookLog.length, 0);
  const counts = computeCategoryCookCounts(recipes);
  const topEntry = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

  if (!topEntry) {
    return { totalRecipes, totalCooks, topText: null };
  }
  const [category, count] = topEntry;
  const rank = getRankForCount(count);
  if (!rank) {
    return { totalRecipes, totalCooks, topText: null };
  }
  return {
    totalRecipes,
    totalCooks,
    topText: `${rank.icon} ${totalRecipes}レシピ・${totalCooks}回調理・${category}の${rank.title}`,
  };
}
