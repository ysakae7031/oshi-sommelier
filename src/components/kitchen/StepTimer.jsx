import { formatSeconds } from "../../utils/time";

export default function StepTimer({ timer, onStart, onPause, onAddSeconds, onReset }) {
  if (!timer) return null;

  const stateColor = timer.completed
    ? "bg-terracotta"
    : timer.running
      ? "bg-sage"
      : "bg-warm-gray";

  return (
    <div className={`rounded-btn p-4 ${stateColor}`}>
      <div className="mb-3 text-center">
        <span className="font-display text-4xl font-bold text-white">
          {timer.completed ? "⏰ 完了!" : formatSeconds(timer.remainingSeconds)}
        </span>
      </div>
      <div className="flex justify-center gap-2">
        {timer.running ? (
          <TimerButton onClick={onPause} label="⏸ 一時停止" />
        ) : (
          <TimerButton onClick={onStart} label="▶ スタート" />
        )}
        <TimerButton onClick={() => onAddSeconds(60)} label="+1分" />
        <TimerButton onClick={() => onAddSeconds(180)} label="+3分" />
        <TimerButton onClick={onReset} label="↺ リセット" />
      </div>
    </div>
  );
}

function TimerButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="min-h-[60px] flex-1 rounded-btn bg-white/20 px-2 text-sm font-bold text-white active:bg-white/30"
    >
      {label}
    </button>
  );
}
