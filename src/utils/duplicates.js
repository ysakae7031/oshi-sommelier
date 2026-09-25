// 同じURLを持つ既存レシピ（自分自身は除く）を探す。
export function findRecipeByUrl(recipes, url, excludeId) {
  const trimmed = url.trim();
  if (!trimmed) return null;
  return recipes.find((r) => r.id !== excludeId && r.url.trim() === trimmed) ?? null;
}
