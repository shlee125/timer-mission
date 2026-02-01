import React from "react";

interface ModeIndicatorProps {
  mode: "prepare" | "study" | "rest";
  currentSet: number;
  totalSets: number;
}

const ModeIndicator: React.FC<ModeIndicatorProps> = ({
  mode,
  currentSet,
  totalSets,
}) => {
  const getModeLabel = () => {
    switch (mode) {
      case "prepare":
        return "준비";
      case "study":
        return "공부";
      case "rest":
        return "휴식";
    }
  };

  const getModeStyles = () => {
    switch (mode) {
      case "prepare":
        return "bg-timer-prepare text-white";
      case "study":
        return "bg-timer-study text-white";
      case "rest":
        return "bg-timer-rest text-white";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`px-5 py-1.5 rounded-full ${getModeStyles()} font-medium text-sm shadow-sm`}
      >
        {getModeLabel()}
      </div>
      <div className="text-muted-foreground text-sm">
        세트{" "}
        <span className="text-foreground font-bold text-lg">{currentSet}</span>
        <span className="text-muted-foreground/70"> / {totalSets}</span>
      </div>
    </div>
  );
};

export default ModeIndicator;
