import BottomNav from "./BottomNav";
import TopBar from "./TopBar";
import SaveErrorBanner from "./SaveErrorBanner";

export default function PageShell({ title, onBack, action, children, fab }) {
  return (
    <div className="min-h-screen bg-linen">
      <SaveErrorBanner />
      <TopBar title={title} onBack={onBack} action={action} />
      <main className="page-enter mx-auto max-w-[720px] px-4 pb-24 pt-4">{children}</main>
      {fab}
      <BottomNav />
    </div>
  );
}
