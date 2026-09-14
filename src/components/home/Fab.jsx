import { Link } from "react-router-dom";

export default function Fab({ to = "/recipes/new" }) {
  return (
    <Link
      to={to}
      className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-2xl text-white shadow-lg active:opacity-90"
      style={{ boxShadow: "0 4px 14px rgba(224,109,83,0.4)" }}
      aria-label="レシピを追加"
    >
      +
    </Link>
  );
}
