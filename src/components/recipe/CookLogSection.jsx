import { useState } from "react";
import StarRatingInput from "./StarRatingInput";
import { inputClass } from "./Field";

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

export default function CookLogSection({ cookLog, onAdd }) {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");

  function handleAdd() {
    onAdd({ rating, note });
    setRating(0);
    setNote("");
  }

  return (
    <div>
      <div className="mb-4 rounded-btn bg-sage-light p-3">
        <p className="mb-2 text-sm font-bold text-sage">今日作った記録をつける</p>
        <div className="mb-2">
          <StarRatingInput value={rating} onChange={setRating} />
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="次回のためのメモ（例: 醤油を少し減らす）"
          rows={2}
          className={`${inputClass} mb-2`}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-btn bg-sage px-4 py-1.5 text-sm font-bold text-white"
        >
          記録する
        </button>
      </div>

      {cookLog.length === 0 ? (
        <p className="text-sm text-warm-gray">まだ調理記録がありません</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {cookLog.map((entry, i) => (
            <li key={i} className="rounded-btn border border-linen-edge p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-warm-gray">
                  {formatDate(entry.date)}
                </span>
                {entry.rating > 0 && (
                  <span className="text-amber">{"★".repeat(entry.rating)}</span>
                )}
              </div>
              {entry.note && <p className="text-sm text-charcoal">{entry.note}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
