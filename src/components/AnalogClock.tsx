import React from "react";

interface AnalogClockProps {
  totalSeconds: number;
  remainingSeconds: number;
  mode: "prepare" | "study" | "rest";
}

const AnalogClock: React.FC<AnalogClockProps> = ({
  totalSeconds,
  remainingSeconds,
  mode,
}) => {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const elapsedSeconds = totalSeconds - remainingSeconds;

  // Calculate progress percentage
  const progress = elapsedSeconds / totalSeconds;

  const getColor = () => {
    switch (mode) {
      case "prepare":
        return "hsl(var(--timer-prepare))";
      case "study":
        return "hsl(var(--timer-study))";
      case "rest":
        return "hsl(var(--timer-rest))";
    }
  };

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width="280"
        height="280"
        viewBox="0 0 280 280"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-light text-foreground tabular-nums">
          {Math.floor(remainingSeconds / 60)}:
          {String(remainingSeconds % 60).padStart(2, "0")}
        </span>
        <span className="text-sm text-muted-foreground mt-1">
          {totalMinutes > 0 ? `${totalMinutes}분 중` : "준비 중"}
        </span>
      </div>
    </div>
  );
};

export default AnalogClock;
