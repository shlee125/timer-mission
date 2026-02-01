import React from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  return (
    <div className="flex items-center gap-6">
      <button
        onClick={onReset}
        className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
        aria-label="리셋"
      >
        <RotateCcw className="w-5 h-5 text-muted-foreground" />
      </button>

      <button
        onClick={isRunning ? onPause : onStart}
        className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
        aria-label={isRunning ? "일시정지" : "시작"}
      >
        {isRunning ? (
          <Pause className="w-7 h-7 text-primary-foreground" />
        ) : (
          <Play className="w-7 h-7 text-primary-foreground ml-1" />
        )}
      </button>

      <button
        onClick={onSkip}
        className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
        aria-label="건너뛰기"
      >
        <SkipForward className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
};

export default TimerControls;
