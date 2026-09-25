import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Card from "../components/layout/Card";

export default function AddChooserPage() {
  return (
    <PageShell title="レシピを追加" onBack={true}>
      <div className="flex flex-col gap-3">
        <Link to="/recipes/new/home">
          <Card className="flex items-center gap-3 p-4 active:opacity-80">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-btn text-2xl"
              style={{ backgroundColor: "#E8EDE8" }}
            >
              🍳
            </span>
            <div>
              <p className="font-display font-bold text-charcoal">家レシピ</p>
              <p className="text-xs text-warm-gray">
                自分で作るレシピを記録・育てる
              </p>
            </div>
          </Card>
        </Link>
        <Link to="/recipes/new/eat">
          <Card className="flex items-center gap-3 p-4 active:opacity-80">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-btn text-2xl"
              style={{ backgroundColor: "#FDF0ED" }}
            >
              🍽️
            </span>
            <div>
              <p className="font-display font-bold text-charcoal">外食ログ</p>
              <p className="text-xs text-warm-gray">
                お店で食べた味を記録し、再現に挑戦
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </PageShell>
  );
}
