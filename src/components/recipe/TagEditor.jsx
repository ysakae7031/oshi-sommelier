import { useState } from "react";
import { inputClass } from "./Field";
import { preventFocusSteal, deferListMutation } from "../../utils/preventFocusSteal";

export default function TagEditor({ tags, onChange, suggestions = [] }) {
  const [draft, setDraft] = useState("");

  function add(value) {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      deferListMutation(() => onChange([...tags, trimmed]));
    }
  }

  function commit() {
    add(draft);
    setDraft("");
  }

  function remove(tag) {
    deferListMutation(() => onChange(tags.filter((t) => t !== tag)));
  }

  const availableSuggestions = suggestions.filter((tag) => !tags.includes(tag));

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-pill bg-sage-light px-3 py-1 text-sm text-sage"
          >
            {tag}
            <button
              type="button"
              onMouseDown={preventFocusSteal}
              onClick={() => remove(tag)}
              aria-label={`${tag}を削除`}
              className="text-sage"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
        }}
        onBlur={commit}
        placeholder="タグを入力してEnter"
        className={inputClass}
      />
      {availableSuggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {availableSuggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onMouseDown={preventFocusSteal}
              onClick={() => add(tag)}
              className="rounded-pill border border-linen-edge bg-card px-3 py-1 text-sm text-warm-gray"
            >
              + {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
