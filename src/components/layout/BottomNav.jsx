import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "レシピ", icon: "📖", end: true },
  { to: "/kitchen", label: "キッチン", icon: "🍳" },
  { to: "/journal", label: "記録", icon: "📝" },
  { to: "/settings", label: "設定", icon: "⚙️" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-linen-edge bg-card">
      <div className="mx-auto flex max-w-[720px] items-stretch">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                isActive ? "text-terracotta" : "text-warm-gray"
              }`
            }
            style={{ minHeight: "56px" }}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
