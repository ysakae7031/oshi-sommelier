import { useCallback, useMemo } from "react";
import { useStorage, exportStateJson } from "./useStorage";
import {
  createInitialState,
  createRecipe,
  createRevision,
  createCookLogEntry,
} from "../utils/models";

const REVISION_FIELD_LABELS = [
  { field: "title", label: "タイトル" },
  { field: "ingredientGroups", label: "材料" },
  { field: "steps", label: "手順" },
  { field: "memo", label: "メモ" },
  { field: "category", label: "カテゴリ" },
  { field: "baseServings", label: "分量" },
];

function buildRevisionSummary(before, after) {
  const changed = REVISION_FIELD_LABELS.filter(
    ({ field }) => JSON.stringify(before[field]) !== JSON.stringify(after[field]),
  ).map(({ label }) => label);
  if (changed.length === 0) return null;
  return changed.map((label) => `${label}を変更`).join("、");
}

export function useRecipes() {
  const [state, setState, replaceState, saveError] = useStorage(createInitialState());

  const addRecipe = useCallback(
    (partial) => {
      const recipe = createRecipe(partial);
      setState((prev) => ({ ...prev, recipes: [recipe, ...prev.recipes] }));
      return recipe;
    },
    [setState],
  );

  const updateRecipe = useCallback(
    (id, updates, { recordRevision = true } = {}) => {
      setState((prev) => ({
        ...prev,
        recipes: prev.recipes.map((recipe) => {
          if (recipe.id !== id) return recipe;
          const updated = {
            ...recipe,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          if (recordRevision) {
            const summary = buildRevisionSummary(recipe, updated);
            if (summary) {
              updated.revisions = [
                ...recipe.revisions,
                createRevision(summary),
              ];
            }
          }
          return updated;
        }),
      }));
    },
    [setState],
  );

  const deleteRecipe = useCallback(
    (id) => {
      setState((prev) => ({
        ...prev,
        recipes: prev.recipes.filter((recipe) => recipe.id !== id),
        weekPins: prev.weekPins.filter((pinId) => pinId !== id),
      }));
    },
    [setState],
  );

  const togglePin = useCallback(
    (id) => {
      setState((prev) => {
        const recipe = prev.recipes.find((r) => r.id === id);
        if (!recipe) return prev;
        const pinned = !recipe.pinned;
        return {
          ...prev,
          recipes: prev.recipes.map((r) => (r.id === id ? { ...r, pinned } : r)),
          weekPins: pinned
            ? [...prev.weekPins, id]
            : prev.weekPins.filter((pinId) => pinId !== id),
        };
      });
    },
    [setState],
  );

  const toggleFavorite = useCallback(
    (id) => {
      setState((prev) => ({
        ...prev,
        recipes: prev.recipes.map((r) =>
          r.id === id ? { ...r, favorite: !r.favorite } : r,
        ),
      }));
    },
    [setState],
  );

  const toggleWantToMake = useCallback(
    (id) => {
      setState((prev) => ({
        ...prev,
        recipes: prev.recipes.map((r) =>
          r.id === id ? { ...r, wantToMake: !r.wantToMake } : r,
        ),
      }));
    },
    [setState],
  );

  const addCookLog = useCallback(
    (id, entryPartial) => {
      setState((prev) => ({
        ...prev,
        recipes: prev.recipes.map((r) =>
          r.id === id
            ? { ...r, cookLog: [createCookLogEntry(entryPartial), ...r.cookLog] }
            : r,
        ),
      }));
    },
    [setState],
  );

  const setIngredientChecked = useCallback(
    (id, groupIndex, itemIndex, checked) => {
      setState((prev) => ({
        ...prev,
        recipes: prev.recipes.map((r) => {
          if (r.id !== id) return r;
          const ingredientGroups = r.ingredientGroups.map((group, gi) => {
            if (gi !== groupIndex) return group;
            return {
              ...group,
              items: group.items.map((item, ii) =>
                ii === itemIndex ? { ...item, checked } : item,
              ),
            };
          });
          return { ...r, ingredientGroups };
        }),
      }));
    },
    [setState],
  );

  const getRecipe = useCallback(
    (id) => state.recipes.find((r) => r.id === id),
    [state.recipes],
  );

  const setShopCheck = useCallback(
    (key, checked) => {
      setState((prev) => ({
        ...prev,
        shopChecks: { ...prev.shopChecks, [key]: checked },
      }));
    },
    [setState],
  );

  const clearShopChecks = useCallback(() => {
    setState((prev) => ({ ...prev, shopChecks: {} }));
  }, [setState]);

  const exportJson = useCallback(() => exportStateJson(state), [state]);

  const importJson = useCallback(
    (json) => {
      const parsed = JSON.parse(json);
      replaceState({ ...createInitialState(), ...parsed });
    },
    [replaceState],
  );

  const pinnedRecipes = useMemo(
    () => state.recipes.filter((r) => r.pinned),
    [state.recipes],
  );

  return {
    state,
    saveError,
    recipes: state.recipes,
    pinnedRecipes,
    weekPins: state.weekPins,
    shopChecks: state.shopChecks,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    togglePin,
    toggleFavorite,
    toggleWantToMake,
    addCookLog,
    setIngredientChecked,
    getRecipe,
    setShopCheck,
    clearShopChecks,
    exportJson,
    importJson,
  };
}
