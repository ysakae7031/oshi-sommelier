import { useState } from "react";
import Card from "../layout/Card";

export default function Accordion({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="mb-3 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-display text-sm font-bold text-charcoal">
          {title}
        </span>
        <span className="text-warm-gray">{open ? "︿" : "﹀"}</span>
      </button>
      {open && <div className="border-t border-linen-edge p-4">{children}</div>}
    </Card>
  );
}
