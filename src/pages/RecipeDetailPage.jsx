import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Section from "../components/layout/Section";
import IngredientGroupsView from "../components/recipe/IngredientGroupsView";
import ServingsScaler from "../components/recipe/ServingsScaler";
import CookLogSection from "../components/recipe/CookLogSection";
import RevisionTimeline from "../components/recipe/RevisionTimeline";
import StarRatingInput from "../components/recipe/StarRatingInput";
import { useRecipesContext } from "../context/RecipesContext";
import { scaleIngredientGroups } from "../utils/scaler";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipe, deleteRecipe, toggleFavorite, toggleWantToMake, togglePin, addCookLog } =
    useRecipesContext();
  const recipe = getRecipe(id);
  const [multiplier, setMultiplier] = useState(1);

  if (!recipe) {
    return (
      <PageShell title="レシピが見つかりません" onBack={true}>
        <p className="text-sm text-warm-gray">
          このレシピは削除されたか、存在しません。
        </p>
      </PageShell>
    );
  }

  function handleDelete() {
    if (window.confirm(`「${recipe.title}」を削除しますか？`)) {
      deleteRecipe(recipe.id);
      navigate("/", { replace: true });
    }
  }

  function handleReproduce() {
    navigate("/recipes/new/home", {
      state: {
        prefill: {
          title: recipe.restaurant ? `${recipe.restaurant}風 ${recipe.title}` : recipe.title,
          memo: recipe.tasteNote,
          category: recipe.category,
          reproduceId: recipe.id,
        },
      },
    });
  }

  const isEat = recipe.type === "eat";
  const scaledGroups = scaleIngredientGroups(recipe.ingredientGroups, multiplier);

  return (
    <PageShell
      title={recipe.title || "無題のレシピ"}
      onBack={true}
      action={
        <div className="flex items-center gap-3 text-sm">
          <button type="button" onClick={() => navigate(`/recipes/${id}/edit`)} className="font-bold text-sage">
            編集
          </button>
          <button type="button" onClick={handleDelete} className="text-terracotta">
            削除
          </button>
        </div>
      }
    >
      {recipe.images.length > 0 && (
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {recipe.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-40 w-40 shrink-0 rounded-card object-cover"
            />
          ))}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {recipe.category && (
          <span className="rounded-pill bg-sage-light px-3 py-1 text-xs font-medium text-sage">
            {recipe.category}
          </span>
        )}
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill bg-linen-edge px-3 py-1 text-xs text-charcoal"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mb-4 flex gap-2">
        <ToggleButton active={recipe.favorite} onClick={() => toggleFavorite(id)} icon="❤️" label="お気に入り" />
        <ToggleButton active={recipe.wantToMake} onClick={() => toggleWantToMake(id)} icon="📝" label="作りたい" />
        {!isEat && (
          <ToggleButton active={recipe.pinned} onClick={() => togglePin(id)} icon="📌" label="今週の献立" />
        )}
      </div>

      {isEat ? (
        <EatLogDetail recipe={recipe} onReproduce={handleReproduce} />
      ) : (
        <>
          {recipe.steps.length > 0 && (
            <button
              type="button"
              onClick={() => navigate(`/kitchen/${id}/cook`)}
              className="mb-5 w-full rounded-btn bg-terracotta py-3 text-sm font-bold text-white"
            >
              🍳 キッチンモードで作る
            </button>
          )}

          <Section title="材料" className="mb-5">
            <div className="mb-3">
              <ServingsScaler
                multiplier={multiplier}
                onChange={setMultiplier}
                baseServings={recipe.baseServings}
              />
            </div>
            <IngredientGroupsView groups={scaledGroups} />
          </Section>

          <Section title="手順" className="mb-5">
            {recipe.steps.length === 0 ? (
              <p className="text-sm text-warm-gray">手順が登録されていません</p>
            ) : (
              <ol className="flex flex-col gap-3">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="flex-1 text-sm">
                      <p className="text-charcoal">{step.text}</p>
                      <p className="mt-0.5 text-xs text-warm-gray">
                        {[step.heat, step.minutes, step.cue].filter(Boolean).join(" ・ ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </Section>

          {recipe.memo && (
            <Section title="メモ" className="mb-5">
              <p className="whitespace-pre-wrap text-sm text-charcoal">{recipe.memo}</p>
            </Section>
          )}

          {recipe.rawText && recipe.steps.length === 0 && (
            <Section title="ベタ貼りメモ（未整理）" className="mb-5">
              <p className="whitespace-pre-wrap text-sm text-charcoal">{recipe.rawText}</p>
            </Section>
          )}

          <Section title="調理記録" className="mb-5">
            <CookLogSection
              cookLog={recipe.cookLog}
              onAdd={(entry) => addCookLog(id, entry)}
            />
          </Section>

          <Section title="レシピの変遷">
            <RevisionTimeline revisions={recipe.revisions} />
          </Section>
        </>
      )}
    </PageShell>
  );
}

function ToggleButton({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 rounded-pill px-3 py-1.5 text-xs font-medium transition-colors ${
        active ? "bg-terracotta text-white" : "border border-linen-edge bg-card text-charcoal"
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

function EatLogDetail({ recipe, onReproduce }) {
  return (
    <>
      <Section title="お店の情報" className="mb-5">
        <dl className="flex flex-col gap-2 text-sm">
          {recipe.restaurant && (
            <Row label="お店" value={recipe.restaurant} />
          )}
          {recipe.area && <Row label="エリア" value={recipe.area} />}
          {recipe.visitDate && <Row label="食べた日" value={formatDate(recipe.visitDate)} />}
          {recipe.rating > 0 && (
            <div className="flex items-center justify-between">
              <dt className="text-warm-gray">評価</dt>
              <dd>
                <StarRatingInput value={recipe.rating} onChange={() => {}} />
              </dd>
            </div>
          )}
        </dl>
      </Section>

      {recipe.tasteNote && (
        <Section title="味の印象・再現ポイント" className="mb-5">
          <p className="whitespace-pre-wrap rounded-btn bg-amber-light p-3 text-sm text-charcoal">
            {recipe.tasteNote}
          </p>
        </Section>
      )}

      <button
        type="button"
        onClick={onReproduce}
        className="w-full rounded-btn bg-sage py-3 text-sm font-bold text-white"
      >
        🍳 家で再現レシピを作る
      </button>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-warm-gray">{label}</dt>
      <dd className="text-charcoal">{value}</dd>
    </div>
  );
}
