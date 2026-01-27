import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Inject CSS keyframes for marching ants animation
const marchingAntsStyles = `
@keyframes marchingAntsClockwise {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -20; }
}
@keyframes marchingAntsAnticlockwise {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 20; }
}
`;

// Inject styles once
if (typeof document !== 'undefined') {
  const styleId = 'marching-ants-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = marchingAntsStyles;
    document.head.appendChild(style);
  }
}

interface FlowStep {
  id: string;
  label: string;
  requestDesc: string;
  responseDesc: string;
  icon: React.ReactNode;
}

const steps: FlowStep[] = [
  {
    id: 'user',
    label: 'User',
    requestDesc: 'Sends a message via chat',
    responseDesc: 'Receives the response',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
  },
  {
    id: 'channel',
    label: 'Channel',
    requestDesc: 'Routes through Teams, Slack, etc.',
    responseDesc: 'Delivers response to user',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'gateway',
    label: 'Gateway',
    requestDesc: 'Authenticates and routes to runner',
    responseDesc: 'Returns response to channel',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
      </svg>
    ),
  },
  {
    id: 'runner',
    label: 'Runner',
    requestDesc: 'Loads flow and starts execution',
    responseDesc: 'Collects component output',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    id: 'component',
    label: 'Component',
    requestDesc: 'Wasm module processes request',
    responseDesc: 'Generates response',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

type Phase = 'request' | 'processing' | 'response';

interface DataFlowAnimationProps {
  className?: string;
  autoPlay?: boolean;
  speed?: number;
}

export function DataFlowAnimation({ className = '', autoPlay = true, speed = 1200 }: DataFlowAnimationProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [phase, setPhase] = useState<Phase>('request');
  const wasPlayingRef = useRef(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (phase === 'request') {
        if (activeStep >= steps.length - 1) {
          setPhase('processing');
        } else {
          setActiveStep((prev) => prev + 1);
        }
      } else if (phase === 'processing') {
        setPhase('response');
        setActiveStep(steps.length - 1);
      } else {
        if (activeStep <= 0) {
          setPhase('request');
          setActiveStep(0);
        } else {
          setActiveStep((prev) => prev - 1);
        }
      }
    }, phase === 'processing' ? speed * 1.5 : speed);

    return () => clearInterval(interval);
  }, [isPlaying, phase, activeStep, speed]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
    wasPlayingRef.current = false;
  }, []);

  const handleStepHoverEnter = useCallback((index: number) => {
    wasPlayingRef.current = isPlaying;
    setActiveStep(index);
    setIsPlaying(false);
  }, [isPlaying]);

  const handleStepHoverLeave = useCallback(() => {
    if (wasPlayingRef.current) {
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const restart = useCallback(() => {
    setActiveStep(0);
    setPhase('request');
    setIsPlaying(true);
  }, []);

  const phaseLabel = phase === 'request' ? 'REQUEST' : phase === 'processing' ? 'PROCESSING' : 'RESPONSE';
  const phaseColour = phase === 'request' ? 'text-cyan-400' : phase === 'processing' ? 'text-amber-400' : 'text-green-400';

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Header with phase indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-foreground">Message Flow</h3>
          <motion.div
            key={phase}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${phaseColour} bg-current/10 border border-current/30`}
          >
            {phaseLabel}
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={restart}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm text-muted-foreground transition-colors"
            title="Restart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm text-muted-foreground transition-colors"
          >
            {isPlaying ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play
              </>
            )}
          </button>
        </div>
      </div>

      {/* Flow visualisation with continuous loop path */}
      <div className="relative py-2">
        {/* SVG for the continuous loop path - calculated to hug circles exactly */}
        <svg
          className="absolute inset-0 w-full pointer-events-none"
          viewBox="0 0 910 90"
          preserveAspectRatio="none"
          style={{ zIndex: 0, height: '72%', top: 'calc(8% - 6px)' }}
        >
          {/* Static background path for reference */}
          <path
            d="M 44 45
               A 32 32 0 0 1 76 13
               L 827 13
               A 32 32 0 0 1 859 45
               A 32 32 0 0 1 827 77
               L 76 77
               A 32 32 0 0 1 44 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.15"
            strokeLinecap="round"
          />

          {/* Animated path with marching ants effect */}
          <motion.path
            d="M 44 45
               A 32 32 0 0 1 76 13
               L 827 13
               A 32 32 0 0 1 859 45
               A 32 32 0 0 1 827 77
               L 76 77
               A 32 32 0 0 1 44 45"
            fill="none"
            stroke={phase === 'response' ? 'hsl(142, 70%, 65%)' : phase === 'processing' ? 'hsl(38, 92%, 60%)' : 'hsl(186, 70%, 65%)'}
            strokeWidth="2"
            strokeDasharray="12 8"
            strokeLinecap="round"
            animate={{
              strokeDashoffset: phase === 'response' ? [0, 40] : [0, -40],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{
              filter: `drop-shadow(0 0 4px ${phase === 'response' ? 'hsl(142, 70%, 45%)' : phase === 'processing' ? 'hsl(38, 92%, 50%)' : 'hsl(186, 70%, 45%)'})`
            }}
          />
        </svg>

        {/* Steps */}
        <div className="relative flex justify-between px-[4%] z-10">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isProcessing = phase === 'processing' && index === steps.length - 1;
            const isPassed = phase === 'request'
              ? index < activeStep
              : phase === 'response'
                ? index > activeStep
                : false;

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                onMouseEnter={() => handleStepHoverEnter(index)}
                onMouseLeave={handleStepHoverLeave}
                className="flex flex-col items-center gap-2 p-2 rounded-lg transition-all"
              >
                {/* Icon circle with animated dashed border */}
                <div
                  className={`
                    relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      isProcessing
                        ? 'bg-amber-500/20 text-amber-400'
                        : isActive
                          ? phase === 'request'
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-green-500/20 text-green-400'
                          : isPassed
                            ? phase === 'request'
                              ? 'bg-cyan-500/10 text-cyan-400/60'
                              : 'bg-green-500/10 text-green-400/60'
                            : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {step.icon}

                  {/* Animated dashed circle border (marching ants) */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    viewBox="0 0 64 64"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="30"
                      fill="none"
                      stroke={
                        isProcessing
                          ? 'hsl(38, 92%, 50%)'
                          : isActive
                            ? phase === 'request'
                              ? 'hsl(186, 70%, 55%)'
                              : 'hsl(142, 70%, 55%)'
                            : isPassed
                              ? phase === 'request'
                                ? 'hsl(186, 70%, 45%)'
                                : 'hsl(142, 70%, 45%)'
                              : 'hsl(220, 10%, 40%)'
                      }
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      style={{
                        animation: isActive || isProcessing
                          ? `marchingAnts${phase === 'response' && !isProcessing ? 'Anticlockwise' : 'Clockwise'} 0.8s linear infinite`
                          : 'none',
                        opacity: isActive || isProcessing ? 1 : isPassed ? 0.5 : 0.25,
                        filter: isActive || isProcessing
                          ? `drop-shadow(0 0 6px ${
                              isProcessing
                                ? 'hsl(38, 92%, 50%)'
                                : phase === 'request'
                                  ? 'hsl(186, 70%, 55%)'
                                  : 'hsl(142, 70%, 55%)'
                            })`
                          : 'none',
                      }}
                    />
                  </svg>

                  {/* Processing spinner overlay */}
                  {isProcessing && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-amber-400 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`
                    text-xs md:text-sm font-medium transition-colors
                    ${
                      isProcessing
                        ? 'text-amber-400'
                        : isActive
                          ? phase === 'request'
                            ? 'text-cyan-400'
                            : 'text-green-400'
                          : 'text-muted-foreground'
                    }
                  `}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active step description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeStep}-${phase}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`
            mt-6 p-4 rounded-lg text-center border
            ${
              phase === 'processing'
                ? 'bg-amber-500/5 border-amber-500/20'
                : phase === 'request'
                  ? 'bg-cyan-500/5 border-cyan-500/20'
                  : 'bg-green-500/5 border-green-500/20'
            }
          `}
        >
          <p className="text-sm text-muted-foreground">
            <span className={`font-semibold ${phaseColour}`}>
              {steps[activeStep].label}:
            </span>{' '}
            {phase === 'processing'
              ? 'Processing request...'
              : phase === 'request'
                ? steps[activeStep].requestDesc
                : steps[activeStep].responseDesc
            }
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Visual legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 12 8" className="w-4 h-3 text-cyan-500">
            <polygon points="0,1 8,4 0,7" fill="currentColor" />
          </svg>
          <span>Request (top)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 12 8" className="w-4 h-3 text-green-500">
            <polygon points="8,1 0,4 8,7" fill="currentColor" />
          </svg>
          <span>Response (bottom)</span>
        </div>
      </div>
    </div>
  );
}

export default DataFlowAnimation;
