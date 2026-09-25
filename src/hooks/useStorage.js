import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "kitchdom:state:v1";

export function loadState(fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch (err) {
    console.warn("KitchDom: failed to load saved state", err);
    return fallback;
  }
}

// 保存に成功したかどうかを返す。容量超過（QuotaExceededError）等で
// 失敗した場合、呼び出し側でユーザーに知らせないとデータが静かに
// 失われてしまうため、真偽値で結果を伝える。
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.warn("KitchDom: failed to save state", err);
    return false;
  }
}

export function exportStateJson(state) {
  return JSON.stringify(state, null, 2);
}

export function useStorage(initialState) {
  const [state, setState] = useState(() => loadState(initialState));
  const [saveError, setSaveError] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSaveError(!saveState(state));
  }, [state]);

  const replaceState = useCallback((nextState) => {
    setState(nextState);
    setSaveError(!saveState(nextState));
  }, []);

  return [state, setState, replaceState, saveError];
}
