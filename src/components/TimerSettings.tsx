import React from "react";
import { Minus, Plus } from "lucide-react";

interface TimerSettingsProps {
  prepareSeconds: number;
  studyMinutes: number;
  restMinutes: number;
  totalSets: number;
  onPrepareChange: (seconds: number) => void;
  onStudyChange: (minutes: number) => void;
  onRestChange: (minutes: number) => void;
  onSetsChange: (sets: number) => void;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
  prepareSeconds,
  studyMinutes,
  restMinutes,
  totalSets,
  onPrepareChange,
  onStudyChange,
  onRestChange,
  onSetsChange,
}) => {
  const SettingRow = ({
    label,
    value,
    unit,
    min,
    max,
    step = 1,
    onChange,
    color,
  }: {
    label: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    step?: number;
    onChange: (val: number) => void;
    color: string;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-sm text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          disabled={value <= min}
        >
          <Minus className="w-4 h-4 text-muted-foreground" />
        </button>
        <span className="w-16 text-center font-medium text-foreground tabular-nums">
          {value} {unit}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          disabled={value >= max}
        >
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-card rounded-2xl border border-border p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
        타이머 설정
      </h3>
      <div className="divide-y divide-border">
        <SettingRow
          label="준비"
          value={prepareSeconds}
          unit="초"
          min={5}
          max={60}
          step={5}
          onChange={onPrepareChange}
          color="bg-timer-prepare"
        />
        <SettingRow
          label="공부"
          value={studyMinutes}
          unit="분"
          min={5}
          max={120}
          step={5}
          onChange={onStudyChange}
          color="bg-timer-study"
        />
        <SettingRow
          label="휴식"
          value={restMinutes}
          unit="분"
          min={1}
          max={30}
          step={1}
          onChange={onRestChange}
          color="bg-timer-rest"
        />
        <SettingRow
          label="세트"
          value={totalSets}
          unit="회"
          min={1}
          max={20}
          step={1}
          onChange={onSetsChange}
          color="bg-foreground"
        />
      </div>
    </div>
  );
};

export default TimerSettings;
