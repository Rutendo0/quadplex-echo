import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface PressHoldButtonProps {
  durationMs?: number;
  onComplete?: () => void;
}

export const PressHoldButton = ({ durationMs = 1000, onComplete }: PressHoldButtonProps) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const stop = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    timerRef.current = null;
    startRef.current = null;
    setProgress(0);
  };

  const step = (ts: number) => {
    if (!startRef.current) startRef.current = ts;
    const elapsed = ts - startRef.current;
    const pct = Math.min(100, (elapsed / durationMs) * 100);
    setProgress(pct);
    if (pct >= 100) {
      stop();
      onComplete?.();
      return;
    }
    timerRef.current = requestAnimationFrame(step);
  };

  const handleDown = () => {
    if (timerRef.current) return;
    timerRef.current = requestAnimationFrame(step);
  };
  const handleUp = () => stop();

  useEffect(() => () => stop(), []);

  return (
    <div className="w-full max-w-sm mx-auto select-none">
      <Button
        variant="hero"
        className="w-full h-12 relative overflow-hidden"
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={handleDown}
        onTouchEnd={handleUp}
        aria-label="Press and hold to enter"
      >
        <span className="relative z-10">Press & Hold</span>
        <span
          className="absolute inset-0 bg-foreground/10"
          style={{ width: `${progress}%` } as React.CSSProperties}
        />
      </Button>
      <div className="h-1 w-full mt-2 bg-muted rounded">
        <div
          className="h-1 bg-foreground/40 rounded"
          style={{ width: `${progress}%` } as React.CSSProperties}
        />
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground tracking-wide">
        Enter without sound
      </p>
    </div>
  );
};
