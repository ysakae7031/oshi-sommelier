import { useEffect, useRef } from "react";

// キッチンモード表示中の画面消灯を防止する。非対応ブラウザでは何もしない。
export function useWakeLock(active) {
  const wakeLockRef = useRef(null);

  useEffect(() => {
    if (!active || !("wakeLock" in navigator)) return;

    let cancelled = false;

    async function acquire() {
      try {
        const lock = await navigator.wakeLock.request("screen");
        if (cancelled) {
          lock.release();
          return;
        }
        wakeLockRef.current = lock;
      } catch (err) {
        console.warn("KitchDom: wake lock request failed", err);
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && !wakeLockRef.current) {
        acquire();
      }
    }

    acquire();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
    };
  }, [active]);
}
