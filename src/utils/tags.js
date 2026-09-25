// 既存レシピで使われているタグを使用頻度順に返す（タグ候補用）。
export function getTagSuggestions(recipes, limit = 12) {
  const counts = new Map();
  for (const recipe of recipes) {
    for (const tag of recipe.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
