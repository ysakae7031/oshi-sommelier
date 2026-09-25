import { useCallback, useEffect, useState } from "react";
import { parseMinutesToSeconds } from "../utils/time";

function buildInitialTimers(steps) {
  const timers = {};
  steps.forEach((step, index) => {
    const seconds = parseMinutesToSeconds(step.minutes);
    if (seconds !== null) {
      timers[index] = {
        initialSeconds: seconds,
        remainingSeconds: seconds,
        running: false,
        completed: false,
      };
    }
  });
  return timers;
}

// 手順ごとに独立したカウントダウンタイマーを管理する。
// ステップを移動しても実行中のタイマーは裏で進み続ける。
export function useStepTimers(steps) {
  const [timers, setTimers] = useState(() => buildInitialTimers(steps));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const [key, timer] of Object.entries(prev)) {
          if (!timer.running) continue;
          changed = true;
          const remainingSeconds = timer.remainingSeconds - 1;
          if (remainingSeconds <= 0) {
            next[key] = { ...timer, remainingSeconds: 0, running: false, completed: true };
          } else {
            next[key] = { ...timer, remainingSeconds };
          }
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const start = useCallback((index) => {
    setTimers((prev) => ({
      ...prev,
      [index]: { ...prev[index], running: true, completed: false },
    }));
  }, []);

  const pause = useCallback((index) => {
    setTimers((prev) => ({ ...prev, [index]: { ...prev[index], running: false } }));
  }, []);

  const addSeconds = useCallback((index, seconds) => {
    setTimers((prev) => {
      const timer = prev[index];
      const remainingSeconds = timer.remainingSeconds + seconds;
      return {
        ...prev,
        [index]: { ...timer, remainingSeconds, completed: remainingSeconds <= 0 },
      };
    });
  }, []);

  const reset = useCallback((index) => {
    setTimers((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        remainingSeconds: prev[index].initialSeconds,
        running: false,
        completed: false,
      },
    }));
  }, []);

  return { timers, start, pause, addSeconds, reset };
}
