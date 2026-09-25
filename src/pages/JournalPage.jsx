import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Card from "../components/layout/Card";
import { useRecipesContext } from "../context/RecipesContext";

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

export default function JournalPage() {
  const { recipes } = useRecipesContext();

  const entries = recipes
    .flatMap((recipe) =>
      recipe.cookLog.map((entry) => ({ ...entry, recipe })),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <PageShell title="調理ジャーナル">
      {entries.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-warm-gray">
          <span className="text-4xl">📝</span>
          <p className="text-sm">
            レシピ詳細画面から調理記録をつけると
            <br />
            ここに時系列で表示されます
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry, i) => (
            <Link key={i} to={`/recipes/${entry.recipe.id}`}>
              <Card className="p-3 active:opacity-80">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-warm-gray">{formatDate(entry.date)}</span>
                  {entry.rating > 0 && (
                    <span className="text-amber">{"★".repeat(entry.rating)}</span>
                  )}
                </div>
                <p className="font-display text-sm font-bold text-charcoal">
                  {entry.recipe.title}
                </p>
                {entry.note && (
                  <p className="mt-1 text-sm text-warm-gray">{entry.note}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
}
