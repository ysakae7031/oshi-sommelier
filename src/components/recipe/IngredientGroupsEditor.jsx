import { useState } from "react";
import { inputClass } from "./Field";
import { parseIngredientText } from "../../utils/parser";
import { createIngredient, createIngredientGroup } from "../../utils/models";

export default function IngredientGroupsEditor({ groups, onChange }) {
  const [pasteText, setPasteText] = useState("");

  function updateGroup(index, updates) {
    onChange(
      groups.map((group, i) => (i === index ? { ...group, ...updates } : group)),
    );
  }

  function removeGroup(index) {
    onChange(groups.filter((_, i) => i !== index));
  }

  function addGroup() {
    onChange([...groups, createIngredientGroup()]);
  }

  function updateItem(groupIndex, itemIndex, updates) {
    const group = groups[groupIndex];
    const items = group.items.map((item, i) =>
      i === itemIndex ? { ...item, ...updates } : item,
    );
    updateGroup(groupIndex, { items });
  }

  function removeItem(groupIndex, itemIndex) {
    const group = groups[groupIndex];
    updateGroup(groupIndex, {
      items: group.items.filter((_, i) => i !== itemIndex),
    });
  }

  function addItem(groupIndex) {
    const group = groups[groupIndex];
    updateGroup(groupIndex, { items: [...group.items, createIngredient()] });
  }

  function importParsed() {
    const parsed = parseIngredientText(pasteText);
    if (parsed.length === 0) return;
    if (groups.length === 0) {
      onChange([createIngredientGroup({ items: parsed })]);
    } else {
      updateGroup(0, { items: [...groups[0].items, ...parsed] });
    }
    setPasteText("");
  }

  return (
    <div>
      <div className="mb-4 rounded-btn bg-amber-light p-3">
        <textarea
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          placeholder={"材料をベタ貼り\n例）\n豚ひき肉 100g\n醤油 大さじ2"}
          rows={4}
          className={`${inputClass} mb-2 bg-card`}
        />
        <button
          type="button"
          onClick={importParsed}
          disabled={!pasteText.trim()}
          className="w-full rounded-btn bg-terracotta py-2 text-sm font-bold text-white disabled:opacity-40"
        >
          ⚡ 自動分解して取り込み
        </button>
      </div>

      {groups.map((group, gi) => (
        <div key={gi} className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <input
              type="text"
              value={group.label}
              onChange={(e) => updateGroup(gi, { label: e.target.value })}
              placeholder="グループ名（例: (A) 合わせ調味料）省略可"
              className={`${inputClass} flex-1`}
            />
            <button
              type="button"
              onClick={() => removeGroup(gi)}
              className="shrink-0 text-sm text-terracotta"
            >
              グループ削除
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {group.items.map((item, ii) => (
              <div key={ii} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(gi, ii, { name: e.target.value })}
                  placeholder="材料名"
                  className={`${inputClass} flex-[2]`}
                />
                <input
                  type="text"
                  value={item.amount}
                  onChange={(e) => updateItem(gi, ii, { amount: e.target.value })}
                  placeholder="分量"
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => removeItem(gi, ii)}
                  aria-label="材料を削除"
                  className="shrink-0 px-1 text-warm-gray"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addItem(gi)}
            className="mt-2 text-sm font-medium text-sage"
          >
            ＋ 材料を追加
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addGroup}
        className="text-sm font-medium text-sage"
      >
        ＋ グループを追加
      </button>
    </div>
  );
}
