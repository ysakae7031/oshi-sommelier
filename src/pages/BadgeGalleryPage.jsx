import PageShell from "../components/layout/PageShell";
import Card from "../components/layout/Card";
import { useRecipesContext } from "../context/RecipesContext";
import { CATEGORIES } from "../utils/models";
import { RANKS, computeCategoryCookCounts, getRankForCount } from "../utils/badges";

export default function BadgeGalleryPage() {
  const { recipes } = useRecipesContext();
  const counts = computeCategoryCookCounts(recipes);

  return (
    <PageShell title="バッジギャラリー" onBack={true}>
      <div className="flex flex-col gap-3">
        {CATEGORIES.map((category) => {
          const count = counts[category] || 0;
          const rank = getRankForCount(count);
          const nextRank = [...RANKS].reverse().find((r) => r.min > count);
          return (
            <Card key={category} className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display font-bold text-charcoal">
                  {category}
                </span>
                <span className="text-2xl">{rank ? rank.icon : "🔒"}</span>
              </div>
              <p className="mb-2 text-sm text-warm-gray">
                調理{count}回
                {rank && ` ・ ${category}の${rank.title}`}
              </p>
              <div className="flex gap-1.5">
                {RANKS.slice()
                  .reverse()
                  .map((r) => (
                    <span
                      key={r.id}
                      className={`text-lg ${count >= r.min ? "" : "opacity-25"}`}
                      title={`${r.title}（${r.min}回〜）`}
                    >
                      {r.icon}
                    </span>
                  ))}
              </div>
              {nextRank && (
                <p className="mt-2 text-xs text-warm-gray">
                  次の{nextRank.title}まで あと{nextRank.min - count}回
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
