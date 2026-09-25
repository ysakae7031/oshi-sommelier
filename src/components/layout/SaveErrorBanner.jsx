import { useRecipesContext } from "../../context/RecipesContext";

export default function SaveErrorBanner() {
  const { saveError } = useRecipesContext();
  if (!saveError) return null;

  return (
    <div className="bg-terracotta px-4 py-2 text-center text-xs font-bold text-white">
      ⚠️ 保存に失敗しました。端末の空き容量を確認するか、設定画面からバックアップを書き出してください
    </div>
  );
}
