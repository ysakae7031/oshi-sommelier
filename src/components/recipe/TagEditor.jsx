import { useState } from "react";
import { inputClass } from "./Field";

export default function TagEditor({ tags, onChange }) {
  const [draft, setDraft] = useState("");

  function commit() {
    const value = draft.trim();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }
    setDraft("");
  }

  function remove(tag) {
    onChange(tags.filter((t) => t !== tag));
  }

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
    </div>
  );
}
