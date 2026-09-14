function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export default function RevisionTimeline({ revisions }) {
  if (revisions.length === 0) {
    return <p className="text-sm text-warm-gray">まだ変遷の記録がありません</p>;
  }
  return (
    <ul className="flex flex-col gap-2">
      {[...revisions].reverse().map((rev, i) => (
        <li key={i} className="flex gap-2 text-sm">
          <span className="shrink-0 font-medium text-terracotta">
            {formatDate(rev.date)}
          </span>
          <span className="text-charcoal">{rev.summary}</span>
        </li>
      ))}
    </ul>
  );
}
