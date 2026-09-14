export default function StarRatingInput({ value, onChange, max = 5 }) {
  return (
    <div className="flex gap-1 text-2xl">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n === value ? 0 : n)}
          aria-label={`${n}つ星`}
          className={n <= value ? "text-amber" : "text-linen-edge"}
        >
          ★
        </button>
      ))}
    </div>
  );
}
