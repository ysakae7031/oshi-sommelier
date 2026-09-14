import { createId } from "./id";

export const RECIPE_TYPES = {
  HOME: "home",
  EAT: "eat",
};

export const CATEGORIES = [
  "和食",
  "洋食",
  "中華",
  "韓国",
  "イタリアン",
  "エスニック",
  "お菓子",
  "パン",
  "麺",
  "肉料理",
  "魚料理",
  "野菜料理",
  "その他",
];

export const SOURCE_TYPES = ["Webサイト", "料理本", "テレビ", "人から聞いた", "オリジナル"];
export const DIFFICULTIES = ["かんたん", "ふつう", "手間かかる"];
export const COSTS = ["安い", "ふつう", "ちょっと贅沢"];
export const SEASONS = ["春", "夏", "秋", "冬", "通年"];
export const HEAT_LEVELS = ["弱火", "中弱火", "中火", "中強火", "強火"];

export function createIngredient(partial = {}) {
  return {
    name: "",
    amount: "",
    checked: false,
    ...partial,
  };
}

export function createIngredientGroup(partial = {}) {
  return {
    label: "",
    items: [],
    ...partial,
  };
}

export function createStep(partial = {}) {
  return {
    text: "",
    heat: "",
    minutes: "",
    cue: "",
    ...partial,
  };
}

export function createCookLogEntry(partial = {}) {
  return {
    date: new Date().toISOString(),
    rating: 0,
    note: "",
    ...partial,
  };
}

export function createRevision(summary) {
  return {
    date: new Date().toISOString(),
    summary,
  };
}

export function createRecipe(partial = {}) {
  const now = new Date().toISOString();
  return {
    id: createId("recipe"),
    type: RECIPE_TYPES.HOME,

    title: "",
    images: [],
    category: "",
    tags: [],
    createdAt: now,
    updatedAt: now,

    url: "",
    sourceType: "",
    siteName: "",
    baseServings: "",
    prepTime: "",
    cookTime: "",
    genre: "",
    difficulty: "",
    cost: "",
    seasons: [],
    ingredientGroups: [],
    steps: [],
    memo: "",
    storage: "",
    videoUrl: "",
    calories: "",
    allergens: "",
    rawText: "",

    wantToMake: false,
    favorite: false,
    pinned: false,

    cookLog: [],
    revisions: [],

    restaurant: "",
    area: "",
    visitDate: "",
    tasteNote: "",
    rating: 0,

    reproduceId: "",

    ...partial,
  };
}

export function createInitialState() {
  return {
    recipes: [],
    weekPins: [],
    shopChecks: {},
  };
}
