import Field, { inputClass } from "./Field";
import ImagePicker from "./ImagePicker";
import StarRatingInput from "./StarRatingInput";
import { CATEGORIES } from "../../utils/models";

export default function EatLogForm({ recipe, onChange }) {
  function set(patch) {
    onChange({ ...recipe, ...patch });
  }

  return (
    <>
      <Field label="写真">
        <ImagePicker images={recipe.images} onChange={(images) => set({ images })} />
      </Field>
      <Field label="料理名">
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="例）麻婆豆腐"
          className={inputClass}
        />
      </Field>
      <Field label="お店の名前">
        <input
          type="text"
          value={recipe.restaurant}
          onChange={(e) => set({ restaurant: e.target.value })}
          className={inputClass}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="エリア">
          <input
            type="text"
            value={recipe.area}
            onChange={(e) => set({ area: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="食べた日付">
          <input
            type="date"
            value={recipe.visitDate}
            onChange={(e) => set({ visitDate: e.target.value })}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="評価">
        <StarRatingInput value={recipe.rating} onChange={(rating) => set({ rating })} />
      </Field>
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
      <Field label="味の印象・再現ポイント">
        <textarea
          value={recipe.tasteNote}
          onChange={(e) => set({ tasteNote: e.target.value })}
          rows={4}
          placeholder="例）にんにくが効いてて、山椒がピリッと効いている"
          className={inputClass}
        />
      </Field>
    </>
  );
}
