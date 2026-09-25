// ボタンのクリックでフォーカスを奪わないようにする（下記deferListMutationと併用）。
export function preventFocusSteal(e) {
  e.preventDefault();
}

// リストから項目を削除/追加するなど、クリックした結果ページのレイアウトが
// 変わる操作向けに、状態更新を1tick遅らせる。
//
// クリックハンドラの中で同期的にDOMを変更し、クリックされたボタンと同じ
// 座標に別の役割の要素が現れると、Chromiumがその新しい要素へも合成clickを
// 発火させることがある（実機で確認済み）。setTimeoutで次のタスクに
// 更新を回すことで、クリックイベント自体の処理が完全に終わってから
// DOMが変化するようになり、この誤発火を防げる。
export function deferListMutation(fn) {
  setTimeout(fn, 0);
}
