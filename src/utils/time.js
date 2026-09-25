// 手順のminutes文字列（例: "5分"）から秒数を取り出す。数値が無ければnull。
export function parseMinutesToSeconds(text) {
  if (!text) return null;
  const halfWidth = text.replace(/[０-９]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
  );
  const match = halfWidth.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!match) return null;
  return Math.round(parseFloat(match[1]) * 60);
}

export function formatSeconds(totalSeconds) {
  const clamped = Math.max(0, totalSeconds);
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
