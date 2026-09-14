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

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("KitchDom: failed to save state", err);
  }
}

export function exportStateJson(state) {
  return JSON.stringify(state, null, 2);
}

export function useStorage(initialState) {
  const [state, setState] = useState(() => loadState(initialState));
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveState(state);
  }, [state]);

  const replaceState = useCallback((nextState) => {
    setState(nextState);
    saveState(nextState);
  }, []);

  return [state, setState, replaceState];
}
