import { Link } from "react-router-dom";
import { getTopBadgeSummary } from "../../utils/badges";

export default function BadgeSummaryBar({ recipes }) {
  const { totalRecipes, totalCooks, topText } = getTopBadgeSummary(recipes);
  const text =
    topText ?? `📖 ${totalRecipes}レシピ・${totalCooks}回調理`;

  return (
    <Link
      to="/settings/badges"
      className="mb-3 flex items-center justify-between rounded-btn bg-amber-light px-3 py-2 text-sm font-medium text-charcoal active:opacity-80"
    >
      <span className="truncate">{text}</span>
      <span className="ml-2 shrink-0 text-warm-gray">›</span>
    </Link>
  );
}
