function collectSearchText(recipe) {
  const ingredientNames = recipe.ingredientGroups.flatMap((group) =>
    group.items.map((item) => item.name),
  );
  return [
    recipe.title,
    recipe.category,
    recipe.restaurant,
    recipe.tasteNote,
    ...recipe.tags,
    ...ingredientNames,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function matchesQuery(recipe, query) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = collectSearchText(recipe);
  return tokens.every((token) => haystack.includes(token));
}

export const FILTERS = [
  { id: "all", label: "すべて" },
  { id: "home", label: "家レシピ" },
  { id: "eat", label: "外食ログ" },
  { id: "reproducing", label: "再現挑戦中" },
];

export function matchesFilter(recipe, filterId) {
  switch (filterId) {
    case "home":
      return recipe.type === "home" && !recipe.reproduceId;
    case "eat":
      return recipe.type === "eat";
    case "reproducing":
      return recipe.type === "home" && !!recipe.reproduceId;
    default:
      return true;
  }
}
