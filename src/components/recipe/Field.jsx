export const inputClass =
  "w-full rounded-input border border-linen-edge bg-card px-3 py-2 text-sm text-charcoal placeholder:text-warm-gray focus:border-sage focus:outline-none";

export default function Field({ label, children, hint }) {
  return (
    <label className="mb-3 block last:mb-0">
      {label && (
        <span className="mb-1 block text-xs font-medium text-warm-gray">
          {label}
        </span>
      )}
      {children}
      {hint && <span className="mt-1 block text-xs text-warm-gray">{hint}</span>}
    </label>
  );
}
