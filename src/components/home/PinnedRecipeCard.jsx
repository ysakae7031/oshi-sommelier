import { Link } from "react-router-dom";
import Card from "../layout/Card";

export default function PinnedRecipeCard({ recipe }) {
  const thumbnail = recipe.images?.[0];

  return (
    <Link to={`/kitchen/${recipe.id}/cook`}>
      <Card className="flex items-center gap-3 p-3 active:opacity-80">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-btn text-2xl"
          style={{ backgroundColor: "#E8EDE8" }}
        >
          {thumbnail ? (
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          ) : (
            <span>🍳</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-base font-bold text-charcoal">
            {recipe.title || "無題のレシピ"}
          </h3>
          {recipe.category && (
            <span className="mt-1 inline-block rounded-pill bg-sage-light px-2 py-0.5 text-xs text-sage">
              {recipe.category}
            </span>
          )}
        </div>
        <span className="shrink-0 rounded-btn bg-terracotta px-3 py-2 text-xs font-bold text-white">
          🍳 作る
        </span>
      </Card>
    </Link>
  );
}
