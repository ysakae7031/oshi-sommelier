import { inputClass } from "./Field";
import { createStep, HEAT_LEVELS } from "../../utils/models";
import { preventFocusSteal, deferListMutation } from "../../utils/preventFocusSteal";

export default function StepsEditor({ steps, onChange }) {
  function updateStep(index, updates) {
    onChange(steps.map((step, i) => (i === index ? { ...step, ...updates } : step)));
  }

  function removeStep(index) {
    deferListMutation(() => onChange(steps.filter((_, i) => i !== index)));
  }

  function addStep() {
    deferListMutation(() => onChange([...steps, createStep()]));
  }

  return (
    <div>
      {steps.map((step, i) => (
        <div key={i} className="mb-3 rounded-btn border border-linen-edge p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-sm font-bold text-terracotta">
              手順 {i + 1}
            </span>
            <button
              type="button"
              onMouseDown={preventFocusSteal}
              onClick={() => removeStep(i)}
              className="flex min-h-[44px] items-center text-sm text-warm-gray"
            >
              削除
            </button>
          </div>
          <textarea
            value={step.text}
            onChange={(e) => updateStep(i, { text: e.target.value })}
            placeholder="手順の内容"
            rows={2}
            className={`${inputClass} mb-2`}
          />
          <div className="flex gap-2">
            <select
              value={step.heat}
              onChange={(e) => updateStep(i, { heat: e.target.value })}
              className={`${inputClass} flex-1`}
            >
              <option value="">火加減</option>
              {HEAT_LEVELS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={step.minutes}
              onChange={(e) => updateStep(i, { minutes: e.target.value })}
              placeholder="時間（例: 5分）"
              className={`${inputClass} flex-1`}
            />
          </div>
          <input
            type="text"
            value={step.cue}
            onChange={(e) => updateStep(i, { cue: e.target.value })}
            placeholder="判断の目安（例: 透き通ったら）"
            className={`${inputClass} mt-2`}
          />
        </div>
      ))}
      <button
        type="button"
        onMouseDown={preventFocusSteal}
        onClick={addStep}
        className="flex min-h-[44px] items-center text-sm font-medium text-sage"
      >
        ＋ 手順を追加
      </button>
    </div>
  );
}
