import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
  brandName?: string;
  durationMs?: number;
}

export default function Preloader({
  onComplete,
  brandName = "lescy®",
  durationMs = 2000,
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);

      // Custom easing curve: brisk start, subtle ease near 85-95%, firm arrival at 100
      let easedProgress = rawProgress;
      if (rawProgress < 0.7) {
        easedProgress = Math.pow(rawProgress / 0.7, 0.9) * 0.75;
      } else {
        const remaining = (rawProgress - 0.7) / 0.3;
        easedProgress = 0.75 + Math.pow(remaining, 1.3) * 0.25;
      }

      const currentVal = Math.min(Math.round(easedProgress * 100), 100);
      setProgress(currentVal);

      if (rawProgress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Complete! Brief delay on 100, then slide/fade up exit
        setTimeout(() => {
          setIsExiting(true);
          onComplete?.();
          setTimeout(() => {
            setIsDone(true);
          }, 700);
        }, 220);
      }
    };

    const rafId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(rafId);
  }, [durationMs, onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`preloader-screen ${isExiting ? "preloader-screen--exiting" : ""}`}
      aria-hidden={isExiting}
      role="status"
      aria-live="polite"
      aria-label={`Page Loading ${progress}%`}
    >
      {/* Top-Left Brand Wordmark */}
      <div className="preloader-brand">
        <span>{brandName}</span>
      </div>

      {/* Center Horizontal Progress Line */}
      <div className="preloader-line-container">
        <div
          className="preloader-line-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom-Right Large Typography Counter */}
      <div className="preloader-counter-wrap">
        <span className="preloader-counter-num">{progress}</span>
      </div>
    </div>
  );
}
