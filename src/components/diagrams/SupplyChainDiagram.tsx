import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  icon: React.ReactNode;
}

const publishSteps: Step[] = [
  {
    id: 'develop',
    label: 'Develop',
    sublabel: 'Source',
    description: 'Write flows and components in your IDE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'build',
    label: 'Build',
    sublabel: 'packc',
    description: 'Compile flows and components into a pack',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: 'sign',
    label: 'Sign',
    sublabel: 'Keys',
    description: 'Cryptographically sign with Ed25519 keys',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: 'publish',
    label: 'Publish',
    sublabel: 'Registry',
    description: 'Push signed pack to the registry',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
];

const consumeSteps: Step[] = [
  {
    id: 'discover',
    label: 'Discover',
    sublabel: 'Search',
    description: 'Browse and find packs in the registry',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: 'download',
    label: 'Download',
    sublabel: 'Pull',
    description: 'Pull pack from registry to local cache',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    id: 'verify',
    label: 'Verify',
    sublabel: 'Signature',
    description: 'Validate cryptographic signature and hash',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'deploy',
    label: 'Deploy',
    sublabel: 'Runner',
    description: 'Load verified pack into the runner',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
];

interface SupplyChainDiagramProps {
  className?: string;
}

export function SupplyChainDiagram({ className = '' }: SupplyChainDiagramProps) {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const publishColour = 'hsl(262, 70%, 60%)';
  const consumeColour = 'hsl(142, 70%, 55%)';

  const allSteps = [...publishSteps, ...consumeSteps];
  const activeStepData = allSteps.find(s => s.id === activeStep);
  const isPublishPhase = publishSteps.some(s => s.id === activeStep);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Publish Row */}
      <div className="mb-8">
        <div
          className="text-xs font-bold tracking-[0.2em] mb-4 flex items-center gap-2"
          style={{ color: publishColour }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="21" />
          </svg>
          PUBLISH PIPELINE
        </div>
        <div className="flex items-center justify-between gap-2">
          {publishSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
                className={`
                  flex-1 p-3 md:p-4 rounded-xl border-2 transition-all duration-300 text-center
                  ${activeStep === step.id
                    ? 'scale-105 shadow-lg'
                    : 'hover:scale-[1.02]'
                  }
                `}
                style={{
                  borderColor: activeStep === step.id ? publishColour : `${publishColour}40`,
                  background: `linear-gradient(135deg, ${publishColour}08 0%, ${publishColour}15 100%)`,
                  boxShadow: activeStep === step.id ? `0 4px 20px ${publishColour}30` : undefined,
                }}
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: `${publishColour}20`,
                    color: publishColour,
                  }}
                >
                  {step.icon}
                </div>
                <div className="font-semibold text-sm text-foreground">{step.label}</div>
                <div className="text-[11px] mt-0.5 font-medium" style={{ color: publishColour }}>
                  {step.sublabel}
                </div>
              </button>
              {index < publishSteps.length - 1 && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={publishColour}
                  strokeWidth="2.5"
                  className="w-6 h-6 shrink-0 mx-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Registry Connector */}
      <div className="flex justify-center mb-8">
        <div
          className="px-6 py-3 rounded-full border-2 border-dashed flex items-center gap-3"
          style={{
            borderColor: 'hsl(220, 70%, 60%)',
            background: 'hsl(220, 70%, 60%, 0.08)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="hsl(220, 70%, 60%)" strokeWidth="2" className="w-5 h-5">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: 'hsl(220, 70%, 60%)' }}>
            Pack Registry
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="hsl(220, 70%, 60%)" strokeWidth="2" className="w-5 h-5">
            <path d="M12 3v18M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Consume Row */}
      <div>
        <div
          className="text-xs font-bold tracking-[0.2em] mb-4 flex items-center gap-2"
          style={{ color: consumeColour }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="7 16 12 21 17 16" />
            <line x1="12" y1="21" x2="12" y2="3" />
          </svg>
          CONSUME PIPELINE
        </div>
        <div className="flex items-center justify-between gap-2">
          {consumeSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
                className={`
                  flex-1 p-3 md:p-4 rounded-xl border-2 transition-all duration-300 text-center
                  ${activeStep === step.id
                    ? 'scale-105 shadow-lg'
                    : 'hover:scale-[1.02]'
                  }
                `}
                style={{
                  borderColor: activeStep === step.id ? consumeColour : `${consumeColour}40`,
                  background: `linear-gradient(135deg, ${consumeColour}08 0%, ${consumeColour}15 100%)`,
                  boxShadow: activeStep === step.id ? `0 4px 20px ${consumeColour}30` : undefined,
                }}
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: `${consumeColour}20`,
                    color: consumeColour,
                  }}
                >
                  {step.icon}
                </div>
                <div className="font-semibold text-sm text-foreground">{step.label}</div>
                <div className="text-[11px] mt-0.5 font-medium" style={{ color: consumeColour }}>
                  {step.sublabel}
                </div>
              </button>
              {index < consumeSteps.length - 1 && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={consumeColour}
                  strokeWidth="2.5"
                  className="w-6 h-6 shrink-0 mx-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Description */}
      <AnimatePresence mode="wait">
        {activeStepData && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6 p-4 rounded-lg text-center border"
            style={{
              borderColor: isPublishPhase ? `${publishColour}30` : `${consumeColour}30`,
              background: isPublishPhase ? `${publishColour}08` : `${consumeColour}08`,
            }}
          >
            <p className="text-sm text-muted-foreground">
              <span
                className="font-semibold"
                style={{ color: isPublishPhase ? publishColour : consumeColour }}
              >
                {activeStepData.label}:
              </span>{' '}
              {activeStepData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: publishColour }} />
            <span className="font-medium">Publish (CI/CD)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: consumeColour }} />
            <span className="font-medium">Consume (Runtime)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(220, 70%, 60%)' }} />
            <span className="font-medium">Registry (OCI)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplyChainDiagram;
