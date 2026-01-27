import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: string;
  title: string;
  content: ReactNode;
}

interface StepByStepProps {
  steps: Step[];
  className?: string;
}

export function StepByStep({ steps, className = '' }: StepByStepProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const handleMarkComplete = () => {
    setCompletedSteps((prev) => new Set([...prev, activeStep]));
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row gap-6 ${className}`}>
      {/* Step sidebar */}
      <div className="lg:w-64 shrink-0">
        <div className="sticky top-24 space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-4">Steps</h4>
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = completedSteps.has(index);

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all
                  ${isActive ? 'bg-primary/10' : 'hover:bg-muted'}
                `}
              >
                {/* Step number/check */}
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0
                    ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step title */}
                <span
                  className={`
                    text-sm truncate
                    ${isActive ? 'text-primary font-medium' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                  `}
                >
                  {step.title}
                </span>
              </button>
            );
          })}

          {/* Progress */}
          <div className="pt-4 mt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>
                {completedSteps.size}/{steps.length}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                Step {activeStep + 1} of {steps.length}
              </div>
              <h2 className="text-2xl font-bold text-foreground">{steps[activeStep].title}</h2>
            </div>

            {/* Step content */}
            <div className="prose-greentic">{steps[activeStep].content}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={handlePrevious}
                disabled={activeStep === 0}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeStep === 0 ? 'text-muted-foreground cursor-not-allowed' : 'text-foreground hover:bg-muted'}
                `}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <button
                onClick={handleMarkComplete}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {completedSteps.has(activeStep) ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Completed
                  </>
                ) : (
                  <>
                    Mark as done
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeStep === steps.length - 1 ? 'text-muted-foreground cursor-not-allowed' : 'text-foreground hover:bg-muted'}
                `}
              >
                Next
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default StepByStep;
