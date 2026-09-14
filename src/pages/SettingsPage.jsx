import { useRef } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Card from "../components/layout/Card";
import { useRecipesContext } from "../context/RecipesContext";

export default function SettingsPage() {
  const { recipes, exportJson, importJson } = useRecipesContext();
  const fileInputRef = useRef(null);

  function handleExport() {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `kitchdom-backup-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importJson(reader.result);
        window.alert("データを復元しました");
      } catch (err) {
        window.alert("読み込みに失敗しました。ファイルの形式を確認してください");
        console.error(err);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <PageShell title="設定">
      <p className="mb-2 text-xs font-medium text-warm-gray">データ</p>
      <Card className="mb-5 divide-y divide-linen-edge">
        <Link to="/settings/badges" className="flex items-center justify-between p-4 text-sm">
          <span className="text-charcoal">🏆 バッジギャラリー</span>
          <span className="text-warm-gray">›</span>
        </Link>
        <button
          type="button"
          onClick={handleExport}
          className="flex w-full items-center justify-between p-4 text-left text-sm"
        >
          <span className="text-charcoal">📤 バックアップを書き出す（JSON）</span>
          <span className="text-warm-gray">›</span>
        </button>
        <button
          type="button"
          onClick={handleImportClick}
          className="flex w-full items-center justify-between p-4 text-left text-sm"
        >
          <span className="text-charcoal">📥 バックアップから復元する</span>
          <span className="text-warm-gray">›</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleFileChange}
        />
      </Card>

      <p className="mb-2 text-xs font-medium text-warm-gray">このアプリについて</p>
      <Card className="p-4 text-sm text-charcoal">
        <p className="font-display mb-1 font-bold">KitchDom（キッチダム）</p>
        <p className="text-warm-gray">
          登録レシピ数: {recipes.length}件
          <br />
          データは端末内（localStorage）にのみ保存され、外部には送信されません。
        </p>
      </Card>
    </PageShell>
  );
}
