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
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-linen-edge p-4">{children}</div>
        </div>
      </div>
    </Card>
  );
}
