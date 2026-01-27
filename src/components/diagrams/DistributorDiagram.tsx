import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DistributorNode {
  id: string;
  label: string;
  type: 'source' | 'distributor' | 'target';
  colour: string;
}

const nodes: DistributorNode[] = [
  { id: 'registry', label: 'Pack Registry', type: 'source', colour: 'hsl(262, 70%, 60%)' },
  { id: 'distributor', label: 'Distributor', type: 'distributor', colour: 'hsl(186, 70%, 50%)' },
  { id: 'runner1', label: 'Runner 1', type: 'target', colour: 'hsl(142, 70%, 50%)' },
  { id: 'runner2', label: 'Runner 2', type: 'target', colour: 'hsl(142, 70%, 50%)' },
  { id: 'runner3', label: 'Runner 3', type: 'target', colour: 'hsl(142, 70%, 50%)' },
];

const features = [
  {
    id: 'caching',
    label: 'Local Caching',
    description: 'Caches packs locally to reduce registry load and improve delivery speed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'verification',
    label: 'Signature Verification',
    description: 'Validates cryptographic signatures before distributing packs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'routing',
    label: 'Tenant Routing',
    description: 'Routes packs to runners based on tenant configuration',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 'updates',
    label: 'Push Updates',
    description: 'Notifies runners of new pack versions via webhooks or pub/sub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

interface DistributorDiagramProps {
  className?: string;
}

export function DistributorDiagram({ className = '' }: DistributorDiagramProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState(0);

  const primaryColour = 'hsl(186, 70%, 50%)';
  const activeFeatureData = features.find(f => f.id === activeFeature);

  // Animate flow
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowStep((s) => (s + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-4"
          style={{ backgroundColor: `${primaryColour}15`, color: primaryColour }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12l-4 4-4-4M12 8v7" />
          </svg>
          PACK DISTRIBUTION
        </div>
      </div>

      {/* Distribution Flow */}
      <div className="relative mb-8">
        {/* Source */}
        <div className="flex justify-center mb-4">
          <div
            className={`
              px-6 py-4 rounded-xl border-2 transition-all duration-300
              ${flowStep === 0 ? 'scale-105 shadow-lg' : ''}
            `}
            style={{
              borderColor: flowStep === 0 ? 'hsl(262, 70%, 60%)' : 'hsl(262, 70%, 60%, 0.4)',
              background: 'linear-gradient(135deg, hsl(262, 70%, 60%, 0.08) 0%, hsl(262, 70%, 60%, 0.15) 100%)',
              boxShadow: flowStep === 0 ? '0 4px 20px hsl(262, 70%, 60%, 0.3)' : undefined,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'hsl(262, 70%, 60%, 0.2)', color: 'hsl(262, 70%, 60%)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-foreground">Pack Registry</div>
                <div className="text-xs text-muted-foreground">OCI / HTTPS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-4">
          <motion.div
            animate={{ y: flowStep === 1 ? [0, 5, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={flowStep === 1 ? primaryColour : 'hsl(220, 15%, 40%)'} strokeWidth="2" className="w-8 h-8">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>

        {/* Distributor */}
        <div className="flex justify-center mb-4">
          <div
            className={`
              px-8 py-5 rounded-xl border-2 transition-all duration-300
              ${flowStep === 1 || flowStep === 2 ? 'scale-105 shadow-lg' : ''}
            `}
            style={{
              borderColor: flowStep === 1 || flowStep === 2 ? primaryColour : `${primaryColour}40`,
              background: `linear-gradient(135deg, ${primaryColour}08 0%, ${primaryColour}15 100%)`,
              boxShadow: flowStep === 1 || flowStep === 2 ? `0 4px 20px ${primaryColour}30` : undefined,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${primaryColour}20`, color: primaryColour }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 12l-4 4-4-4M12 8v7" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">Distributor</div>
                <div className="text-xs text-muted-foreground">Cache • Verify • Route</div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows to Runners */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: flowStep === 2 + i * 0.3 ? [0, 5, 0] : 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={flowStep >= 2 ? 'hsl(142, 70%, 50%)' : 'hsl(220, 15%, 40%)'}
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Runners */}
        <div className="flex justify-center gap-4">
          {['Runner 1', 'Runner 2', 'Runner 3'].map((runner, i) => (
            <div
              key={runner}
              className={`
                px-4 py-3 rounded-xl border-2 transition-all duration-300
                ${flowStep === 3 ? 'scale-105' : ''}
              `}
              style={{
                borderColor: flowStep === 3 ? 'hsl(142, 70%, 50%)' : 'hsl(142, 70%, 50%, 0.4)',
                background: 'linear-gradient(135deg, hsl(142, 70%, 50%, 0.08) 0%, hsl(142, 70%, 50%, 0.15) 100%)',
                boxShadow: flowStep === 3 ? '0 4px 15px hsl(142, 70%, 50%, 0.2)' : undefined,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'hsl(142, 70%, 50%, 0.2)', color: 'hsl(142, 70%, 50%)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="font-medium text-sm text-foreground">{runner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {features.map((feature) => (
          <button
            key={feature.id}
            onMouseEnter={() => setActiveFeature(feature.id)}
            onMouseLeave={() => setActiveFeature(null)}
            className={`
              p-4 rounded-xl border transition-all duration-200 text-center
              ${activeFeature === feature.id ? 'scale-105 shadow-md border-current' : 'border-border hover:scale-[1.02]'}
            `}
            style={{
              color: activeFeature === feature.id ? primaryColour : undefined,
              background: activeFeature === feature.id ? `${primaryColour}10` : undefined,
            }}
          >
            <div
              className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: `${primaryColour}15`,
                color: primaryColour,
              }}
            >
              {feature.icon}
            </div>
            <div className="font-medium text-xs">{feature.label}</div>
          </button>
        ))}
      </div>

      {/* Feature Description */}
      <AnimatePresence mode="wait">
        {activeFeatureData && (
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-lg text-center border"
            style={{
              borderColor: `${primaryColour}30`,
              background: `${primaryColour}08`,
            }}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold" style={{ color: primaryColour }}>
                {activeFeatureData.label}:
              </span>{' '}
              {activeFeatureData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(262, 70%, 60%)' }} />
            <span className="font-medium">Registry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: primaryColour }} />
            <span className="font-medium">Distributor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(142, 70%, 50%)' }} />
            <span className="font-medium">Runners</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistributorDiagram;
