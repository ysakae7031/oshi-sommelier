export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="レシピ名・材料名で検索（スペース区切りでAND検索）"
        className="w-full rounded-input border border-linen-edge bg-card py-2.5 pl-9 pr-3 text-sm text-charcoal placeholder:text-warm-gray focus:border-sage focus:outline-none"
      />
    </div>
  );
}
