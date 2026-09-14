import Accordion from "./Accordion";
import Field, { inputClass } from "./Field";
import ChipToggleGroup from "./ChipToggleGroup";
import TagEditor from "./TagEditor";
import ImagePicker from "./ImagePicker";
import IngredientGroupsEditor from "./IngredientGroupsEditor";
import StepsEditor from "./StepsEditor";
import {
  CATEGORIES,
  SOURCE_TYPES,
  DIFFICULTIES,
  COSTS,
  SEASONS,
} from "../../utils/models";

export default function RecipeForm({ recipe, onChange }) {
  function set(patch) {
    onChange({ ...recipe, ...patch });
  }

  return (
    <>
      <Accordion title="基本情報">
        <Field label="写真">
          <ImagePicker
            images={recipe.images}
            onChange={(images) => set({ images })}
          />
        </Field>
        <Field label="タイトル">
          <input
            type="text"
            value={recipe.title}
            onChange={(e) => set({ title: e.target.value })}
            placeholder="例）豚の生姜焼き"
            className={inputClass}
          />
        </Field>
        <Field label="URL">
          <input
            type="text"
            value={recipe.url}
            onChange={(e) => set({ url: e.target.value })}
            placeholder="レシピの参照元URL"
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="入手元">
            <select
              value={recipe.sourceType}
              onChange={(e) => set({ sourceType: e.target.value })}
              className={inputClass}
            >
              <option value="">選択してください</option>
              {SOURCE_TYPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="サイト名・出典">
            <input
              type="text"
              value={recipe.siteName}
              onChange={(e) => set({ siteName: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="カテゴリ">
          <select
            value={recipe.category}
            onChange={(e) => set({ category: e.target.value })}
            className={inputClass}
          >
            <option value="">選択してください</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="タグ">
          <TagEditor tags={recipe.tags} onChange={(tags) => set({ tags })} />
        </Field>
      </Accordion>

      <Accordion title="材料">
        <Field label="基準人数・分量">
          <input
            type="text"
            value={recipe.baseServings}
            onChange={(e) => set({ baseServings: e.target.value })}
            placeholder="例）2人分"
            className={inputClass}
          />
        </Field>
        <IngredientGroupsEditor
          groups={recipe.ingredientGroups}
          onChange={(ingredientGroups) => set({ ingredientGroups })}
        />
      </Accordion>

      <Accordion title="手順">
        <div className="grid grid-cols-2 gap-3">
          <Field label="下ごしらえ時間">
            <input
              type="text"
              value={recipe.prepTime}
              onChange={(e) => set({ prepTime: e.target.value })}
              placeholder="例）10分"
              className={inputClass}
            />
          </Field>
          <Field label="調理時間">
            <input
              type="text"
              value={recipe.cookTime}
              onChange={(e) => set({ cookTime: e.target.value })}
              placeholder="例）15分"
              className={inputClass}
            />
          </Field>
        </div>
        <StepsEditor steps={recipe.steps} onChange={(steps) => set({ steps })} />
      </Accordion>

      <Accordion title="管理情報" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="難易度">
            <select
              value={recipe.difficulty}
              onChange={(e) => set({ difficulty: e.target.value })}
              className={inputClass}
            >
              <option value="">選択してください</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="コスト感">
            <select
              value={recipe.cost}
              onChange={(e) => set({ cost: e.target.value })}
              className={inputClass}
            >
              <option value="">選択してください</option>
              {COSTS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="季節">
          <ChipToggleGroup
            options={SEASONS}
            value={recipe.seasons}
            onChange={(seasons) => set({ seasons })}
          />
        </Field>
        <Field label="保存方法・日持ち">
          <input
            type="text"
            value={recipe.storage}
            onChange={(e) => set({ storage: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="動画URL">
          <input
            type="text"
            value={recipe.videoUrl}
            onChange={(e) => set({ videoUrl: e.target.value })}
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="カロリー">
            <input
              type="text"
              value={recipe.calories}
              onChange={(e) => set({ calories: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="アレルゲン">
            <input
              type="text"
              value={recipe.allergens}
              onChange={(e) => set({ allergens: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="メモ">
          <textarea
            value={recipe.memo}
            onChange={(e) => set({ memo: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </Field>
      </Accordion>
    </>
  );
}
