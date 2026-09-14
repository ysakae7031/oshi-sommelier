// 分量文字列の先頭の数値部分だけを倍率でスケーリングする。
// 例: scaleAmount("100g", 2) -> "200g" / scaleAmount("大さじ2", 1.5) -> "大さじ3"
// 数値を含まない分量（"少々" 等）はそのまま返す。

function toHalfWidthDigits(str) {
  return str.replace(/[０-９．]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
  );
}

function formatNumber(num) {
  const rounded = Math.round(num * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

export function scaleAmount(amount, multiplier) {
  if (!amount || multiplier === 1) return amount;
  const normalized = toHalfWidthDigits(amount);
  const match = normalized.match(/^(\D*?)([0-9]+(?:\.[0-9]+)?)(\D*)$/);
  if (!match) return amount;
  const [, prefix, numStr, suffix] = match;
  const scaled = parseFloat(numStr) * multiplier;
  return `${prefix}${formatNumber(scaled)}${suffix}`;
}

export function scaleIngredientGroups(groups, multiplier) {
  if (multiplier === 1) return groups;
  return groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      amount: scaleAmount(item.amount, multiplier),
    })),
  }));
}
