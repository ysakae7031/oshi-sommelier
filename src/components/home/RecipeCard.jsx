import { Link } from "react-router-dom";
import Card from "../layout/Card";

export default function RecipeCard({ recipe }) {
  const isEat = recipe.type === "eat";
  const thumbnail = recipe.images?.[0];

  return (
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="flex gap-3 p-3 active:opacity-80">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-btn text-2xl"
          style={{ backgroundColor: isEat ? "#FDF0ED" : "#E8EDE8" }}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{isEat ? "🍽️" : "🍳"}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            {recipe.pinned && <span className="text-xs">📌</span>}
            <h3 className="truncate font-display text-base font-bold text-charcoal">
              {recipe.title || "無題のレシピ"}
            </h3>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-warm-gray">
            {recipe.category && (
              <span className="rounded-pill bg-sage-light px-2 py-0.5 text-sage">
                {recipe.category}
              </span>
            )}
            {isEat && recipe.restaurant && (
              <span className="truncate">{recipe.restaurant}</span>
            )}
            {isEat && recipe.rating > 0 && (
              <span className="text-amber">{"★".repeat(recipe.rating)}</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-warm-gray">
            {recipe.favorite && <span>❤️</span>}
            {recipe.wantToMake && <span>📝 作りたい</span>}
            {recipe.reproduceId && <span>🍳 再現挑戦中</span>}
            {recipe.cookLog.length > 0 && (
              <span>調理{recipe.cookLog.length}回</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
