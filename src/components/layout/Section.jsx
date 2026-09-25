export default function Section({ title, action, children, className = "" }) {
  return (
    <section className={className}>
      {(title || action) && (
        <div className="mb-2 flex items-center justify-between">
          {title && (
            <h2 className="font-display text-sm font-bold tracking-wide text-sage">
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
