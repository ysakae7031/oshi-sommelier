import { Link } from "react-router-dom";
import { useRecipesContext } from "../../context/RecipesContext";
import { findRecipeByUrl } from "../../utils/duplicates";

export default function DuplicateUrlWarning({ url, excludeId }) {
  const { recipes } = useRecipesContext();
  const duplicate = findRecipeByUrl(recipes, url, excludeId);
  if (!duplicate) return null;

  return (
    <div className="mb-4 rounded-btn bg-amber-light p-3 text-sm text-charcoal">
      ⚠️ 同じURLのレシピが既にあります:{" "}
      <Link to={`/recipes/${duplicate.id}`} className="font-bold text-terracotta underline">
        {duplicate.title || "無題のレシピ"}
      </Link>
    </div>
  );
}
