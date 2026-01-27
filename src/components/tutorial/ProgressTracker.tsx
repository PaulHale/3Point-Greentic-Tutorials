import { useEffect, useState } from 'react';

interface ProgressTrackerProps {
  tutorialId: string;
  totalSteps: number;
  className?: string;
}

interface TutorialProgress {
  completedSteps: number[];
  lastAccessed: string;
}

const STORAGE_KEY = 'greentic-tutorial-progress';

function getProgress(tutorialId: string): TutorialProgress | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const allProgress = JSON.parse(stored) as Record<string, TutorialProgress>;
    return allProgress[tutorialId] || null;
  } catch {
    return null;
  }
}

function saveProgress(tutorialId: string, progress: TutorialProgress): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allProgress = stored ? JSON.parse(stored) : {};
    allProgress[tutorialId] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch {
    // Ignore storage errors
  }
}

export function ProgressTracker({ tutorialId, totalSteps, className = '' }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<TutorialProgress | null>(null);

  useEffect(() => {
    const savedProgress = getProgress(tutorialId);
    if (savedProgress) {
      setProgress(savedProgress);
    } else {
      const newProgress: TutorialProgress = {
        completedSteps: [],
        lastAccessed: new Date().toISOString(),
      };
      setProgress(newProgress);
      saveProgress(tutorialId, newProgress);
    }
  }, [tutorialId]);

  const toggleStep = (step: number) => {
    if (!progress) return;

    const newCompletedSteps = progress.completedSteps.includes(step)
      ? progress.completedSteps.filter((s) => s !== step)
      : [...progress.completedSteps, step];

    const newProgress: TutorialProgress = {
      completedSteps: newCompletedSteps,
      lastAccessed: new Date().toISOString(),
    };

    setProgress(newProgress);
    saveProgress(tutorialId, newProgress);
  };

  const resetProgress = () => {
    const newProgress: TutorialProgress = {
      completedSteps: [],
      lastAccessed: new Date().toISOString(),
    };
    setProgress(newProgress);
    saveProgress(tutorialId, newProgress);
  };

  if (!progress) return null;

  const completedCount = progress.completedSteps.length;
  const percentage = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className={`rounded-lg border border-border bg-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-foreground">Your Progress</h4>
        {completedCount > 0 && (
          <button onClick={resetProgress} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Reset
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {completedCount} of {totalSteps} steps
        </span>
        <span>{percentage}%</span>
      </div>

      {/* Step checklist */}
      <div className="mt-4 space-y-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = progress.completedSteps.includes(step);

          return (
            <button
              key={step}
              onClick={() => toggleStep(step)}
              className={`
                w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-sm transition-colors
                ${isCompleted ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <div
                className={`
                  w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors
                  ${isCompleted ? 'bg-primary border-primary' : 'border-border'}
                `}
              >
                {isCompleted && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span>Step {step}</span>
            </button>
          );
        })}
      </div>

      {/* Completion message */}
      {completedCount === totalSteps && (
        <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-center gap-2 text-green-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="text-sm font-medium">Tutorial Complete!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressTracker;
