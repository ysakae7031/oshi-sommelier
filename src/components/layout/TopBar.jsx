import { useNavigate } from "react-router-dom";

export default function TopBar({ title, onBack, action }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-20 border-b border-linen-edge bg-linen/95 backdrop-blur">
      <div className="mx-auto flex max-w-[720px] items-center gap-2 px-4 py-3">
        {onBack !== undefined && (
          <button
            type="button"
            onClick={onBack === true ? () => navigate(-1) : onBack}
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal active:bg-linen-edge"
            aria-label="戻る"
          >
            ←
          </button>
        )}
        <h1 className="font-display flex-1 truncate text-lg font-bold text-charcoal">
          {title}
        </h1>
        {action}
      </div>
    </header>
  );
}
