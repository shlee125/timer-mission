import React, { useState, useEffect, useCallback, useRef } from "react";
import { Settings, X } from "lucide-react";
import AnalogClock from "./AnalogClock";
import ModeIndicator from "./ModeIndicator";
import TimerControls from "./TimerControls";
import TimerSettings from "./TimerSettings";

type TimerMode = "prepare" | "study" | "rest";

interface TimerConfig {
  prepare: number;
  study: number;
  rest: number;
  totalSets: number;
}

const StudyTimer: React.FC = () => {
  const [config, setConfig] = useState<TimerConfig>({
    prepare: 10,
    study: 50 * 60,
    rest: 10 * 60,
    totalSets: 10,
  });
  const [mode, setMode] = useState<TimerMode>("prepare");
  const [currentSet, setCurrentSet] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(config.prepare);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTotalSeconds = useCallback(() => {
    return config[mode];
  }, [config, mode]);

  const playSound = useCallback(() => {
    try {
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 880;
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.4,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (e) {
      console.log("Audio not supported");
    }
  }, []);

  const moveToNextPhase = useCallback(() => {
    playSound();

    if (mode === "prepare") {
      setMode("study");
      setRemainingSeconds(config.study);
    } else if (mode === "study") {
      setMode("rest");
      setRemainingSeconds(config.rest);
    } else if (mode === "rest") {
      if (currentSet < config.totalSets) {
        setCurrentSet((prev) => prev + 1);
        setMode("prepare");
        setRemainingSeconds(config.prepare);
      } else {
        setIsRunning(false);
        setCurrentSet(1);
        setMode("prepare");
        setRemainingSeconds(config.prepare);
      }
    }
  }, [mode, currentSet, config, playSound]);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    } else if (remainingSeconds === 0 && isRunning) {
      moveToNextPhase();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingSeconds, moveToNextPhase]);

  const handleStart = () => {
    setShowSettings(false);
    setIsRunning(true);
  };
  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setMode("prepare");
    setCurrentSet(1);
    setRemainingSeconds(config.prepare);
  };

  const handleSkip = () => {
    moveToNextPhase();
  };

  // Settings handlers
  const handlePrepareChange = (seconds: number) => {
    setConfig((prev) => ({ ...prev, prepare: seconds }));
    if (mode === "prepare" && !isRunning) {
      setRemainingSeconds(seconds);
    }
  };

  const handleStudyChange = (minutes: number) => {
    const seconds = minutes * 60;
    setConfig((prev) => ({ ...prev, study: seconds }));
    if (mode === "study" && !isRunning) {
      setRemainingSeconds(seconds);
    }
  };

  const handleRestChange = (minutes: number) => {
    const seconds = minutes * 60;
    setConfig((prev) => ({ ...prev, rest: seconds }));
    if (mode === "rest" && !isRunning) {
      setRemainingSeconds(seconds);
    }
  };

  const handleSetsChange = (sets: number) => {
    setConfig((prev) => ({ ...prev, totalSets: sets }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10 safe-area-inset">
      <div className="w-full max-w-sm flex flex-col items-center gap-6 bg-card border border-border rounded-3xl p-6 shadow-sm relative">
        {/* Settings Toggle */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {!showSettings && !isRunning && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground animate-pulse">
              <span>시간 설정하려면 누르세요</span>
              <span>→</span>
            </div>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-95 transition-transform"
            disabled={isRunning}
          >
            {showSettings ? (
              <X className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Settings className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Mode & Set */}
        <div className="mt-12">
          <ModeIndicator
            mode={mode}
            currentSet={currentSet}
            totalSets={config.totalSets}
          />
        </div>

        {showSettings ? (
          /* Settings Panel */
          <TimerSettings
            prepareSeconds={config.prepare}
            studyMinutes={Math.floor(config.study / 60)}
            restMinutes={Math.floor(config.rest / 60)}
            totalSets={config.totalSets}
            onPrepareChange={handlePrepareChange}
            onStudyChange={handleStudyChange}
            onRestChange={handleRestChange}
            onSetsChange={handleSetsChange}
          />
        ) : (
          /* Timer Circle */
          <AnalogClock
            totalSeconds={getTotalSeconds()}
            remainingSeconds={remainingSeconds}
            mode={mode}
          />
        )}

        {/* Controls */}
        <TimerControls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onSkip={handleSkip}
        />

        {/* Phase info */}
        {!showSettings && (
          <div className="flex gap-4 text-xs text-muted-foreground flex-wrap justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-timer-prepare" />
              <span>준비 {config.prepare}초</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-timer-study" />
              <span>공부 {Math.floor(config.study / 60)}분</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-timer-rest" />
              <span>휴식 {Math.floor(config.rest / 60)}분</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTimer;
