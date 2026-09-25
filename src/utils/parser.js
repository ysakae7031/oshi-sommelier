// 「材料名 分量」の1行テキストを { name, amount } に分解する。
// 分量が見つからない行（見出し・空行）は null を返して呼び出し側でスキップする。

const AMOUNT_PATTERN =
  /(大さじ|小さじ|カップ)?\s*[0-9０-９]+(?:[.．][0-9０-９]+)?\s*(g|kg|ml|l|cc|個|本|枚|玉|片|袋|缶|パック|房|束|杯|尾|切れ|少々|適量|大さじ|小さじ|カップ)?$/;

function toHalfWidth(str) {
  return str.replace(/[０-９．]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
  );
}

export function parseIngredientLine(rawLine) {
  const line = rawLine.trim();
  if (!line) return null;

  // 「少々」「適量」だけの分量表記にも対応
  const looseAmountWords = ["少々", "適量", "お好みで", "ひとつまみ"];
  for (const word of looseAmountWords) {
    if (line.endsWith(word)) {
      const name = line.slice(0, line.length - word.length).trim();
      if (name) return { name, amount: word };
    }
  }

  // 末尾の空白で名前と分量を分割する（"豚ひき肉 100g" 等）
  const spaceMatch = line.match(/^(.+?)[\s　]+([^\s　]+)$/);
  if (spaceMatch) {
    const [, name, amount] = spaceMatch;
    if (AMOUNT_PATTERN.test(toHalfWidth(amount)) || /[0-9０-９]/.test(amount)) {
      return { name: name.trim(), amount: amount.trim() };
    }
  }

  // 区切り記号なし（"醤油大さじ2" 等）で分量が末尾にある場合
  const inlineMatch = line.match(
    /^(.*?)((?:大さじ|小さじ|カップ)?[0-9０-９]+(?:[.．][0-9０-９]+)?\s*(?:g|kg|ml|l|cc|個|本|枚|玉|片|袋|缶|パック|房|束|杯|尾|切れ)?)$/,
  );
  if (inlineMatch && inlineMatch[1] && inlineMatch[2]) {
    return { name: inlineMatch[1].trim(), amount: inlineMatch[2].trim() };
  }

  return null;
}

export function parseIngredientText(text) {
  return text
    .split(/\r?\n/)
    .map(parseIngredientLine)
    .filter(Boolean)
    .map((ingredient) => ({ ...ingredient, checked: false }));
}
