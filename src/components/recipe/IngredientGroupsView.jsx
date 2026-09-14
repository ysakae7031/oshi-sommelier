export default function IngredientGroupsView({ groups }) {
  if (groups.length === 0) {
    return <p className="text-sm text-warm-gray">材料が登録されていません</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.label && (
            <p className="mb-1.5 text-sm font-bold text-sage">{group.label}</p>
          )}
          <ul className="flex flex-col gap-1.5">
            {group.items.map((item, ii) => (
              <li
                key={ii}
                className="flex items-center justify-between border-b border-linen-edge pb-1.5 text-sm last:border-0"
              >
                <span className="text-charcoal">{item.name}</span>
                <span className="text-warm-gray">{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
