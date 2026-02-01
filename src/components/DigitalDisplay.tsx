import React from "react";

interface DigitalDisplayProps {
  remainingSeconds: number;
}

const DigitalDisplay: React.FC<DigitalDisplayProps> = ({
  remainingSeconds,
}) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-muted-foreground tracking-wider uppercase">
        남은 시간
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-foreground tabular-nums">
          {String(minutes).padStart(2, "0")}
        </span>
        <span className="text-lg text-muted-foreground">:</span>
        <span className="text-2xl font-semibold text-foreground tabular-nums">
          {String(seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default DigitalDisplay;
