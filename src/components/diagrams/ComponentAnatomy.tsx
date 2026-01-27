import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComponentPart {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  colour: string;
  file: string;
  icon: React.ReactNode;
}

const parts: ComponentPart[] = [
  {
    id: 'manifest',
    label: 'Component Manifest',
    shortLabel: 'Manifest',
    description:
      'The component.manifest.json file describes the component: name, version, capabilities, config schema, and WIT world.',
    colour: 'hsl(166, 70%, 45%)',
    file: 'component.manifest.json',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'wasm',
    label: 'Wasm Binary',
    shortLabel: 'Wasm',
    description:
      'The compiled WebAssembly module (wasm32-wasip2 target) containing the executable logic that runs in the secure sandbox.',
    colour: 'hsl(186, 70%, 50%)',
    file: 'component.wasm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4" />
        <path d="M14 12h4" />
      </svg>
    ),
  },
  {
    id: 'schema',
    label: 'Config Schema',
    shortLabel: 'Schema',
    description:
      'JSON Schema definitions in schemas/v1/ that validate component configuration at build time and runtime.',
    colour: 'hsl(220, 70%, 55%)',
    file: 'schemas/v1/config.schema.json',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'wit',
    label: 'WIT Interface',
    shortLabel: 'WIT',
    description:
      'WebAssembly Interface Types definition in wit/world.wit specifying the component API contract.',
    colour: 'hsl(280, 70%, 55%)',
    file: 'wit/world.wit',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
];

interface ComponentAnatomyProps {
  className?: string;
}

export function ComponentAnatomy({ className = '' }: ComponentAnatomyProps) {
  const [activePart, setActivePart] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Component Anatomy</h3>
          <p className="text-sm text-muted-foreground">Explore the structure of a Wasm component</p>
        </div>
        <button
          onClick={() => setIsExploded(!isExploded)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium text-foreground transition-colors"
        >
          {isExploded ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M4 14h6v6" />
                <path d="M20 10h-6V4" />
                <path d="M14 10l7-7" />
                <path d="M3 21l7-7" />
              </svg>
              Collapse
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M14 4h6v6" />
                <path d="M4 20h6v-6" />
                <path d="M20 4l-7 7" />
                <path d="M4 20l7-7" />
              </svg>
              Explode
            </>
          )}
        </button>
      </div>

      {/* Visualisation */}
      <AnimatePresence mode="wait">
        {!isExploded ? (
          /* Collapsed View - Nested Package */
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-8"
          >
            <div className="relative">
              {/* Outer package container */}
              <div
                className="relative w-72 rounded-2xl border-2 p-4 flex flex-col"
                style={{
                  borderColor: 'hsl(166, 70%, 45%)',
                  background: 'linear-gradient(135deg, hsl(166, 70%, 45%, 0.08) 0%, hsl(166, 70%, 45%, 0.15) 100%)',
                }}
              >
                {/* Package icon and label */}
                <div className="flex items-center gap-2 mb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="hsl(166, 70%, 45%)" strokeWidth="2" className="w-5 h-5">
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                  <span className="font-semibold text-sm" style={{ color: 'hsl(166, 70%, 45%)' }}>
                    my-component/
                  </span>
                </div>

                {/* File list */}
                <div className="space-y-2">
                  {parts.map((part) => {
                    const isActive = activePart === part.id;
                    return (
                      <motion.button
                        key={part.id}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 text-left
                          transition-all duration-200
                        `}
                        style={{
                          borderColor: isActive ? part.colour : `${part.colour}40`,
                          backgroundColor: isActive ? `${part.colour}25` : `${part.colour}10`,
                          boxShadow: isActive ? `0 0 20px ${part.colour}30` : 'none',
                        }}
                        onMouseEnter={() => setActivePart(part.id)}
                        onMouseLeave={() => setActivePart(null)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div style={{ color: part.colour }}>{part.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-foreground truncate">{part.shortLabel}</div>
                          <div className="text-[10px] truncate" style={{ color: part.colour }}>
                            {part.file}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Exploded View - Grid Layout */
          <motion.div
            key="exploded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-6"
          >
            {/* Center component reference */}
            <div className="flex justify-center mb-6">
              <div
                className="px-6 py-3 rounded-xl border-2 border-dashed"
                style={{ borderColor: 'hsl(220, 15%, 40%)' }}
              >
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-muted-foreground">
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  </svg>
                  <span className="font-semibold text-foreground">Wasm Component</span>
                </div>
              </div>
            </div>

            {/* Connection lines */}
            <div className="mb-4 px-4">
              <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" className="overflow-visible">
                {/* Vertical line from top */}
                <line x1="50" y1="0" x2="50" y2="15" stroke="hsl(220, 15%, 40%)" strokeWidth="0.5" strokeDasharray="2 1" vectorEffect="non-scaling-stroke" />
                {/* Horizontal line */}
                <line x1="12.5" y1="15" x2="87.5" y2="15" stroke="hsl(220, 15%, 40%)" strokeWidth="0.5" strokeDasharray="2 1" vectorEffect="non-scaling-stroke" />
                {/* Individual drop lines and arrows - positioned at 12.5%, 37.5%, 62.5%, 87.5% to center on 4-col grid */}
                {[12.5, 37.5, 62.5, 87.5].map((x, i) => (
                  <g key={i}>
                    <line x1={x} y1="15" x2={x} y2="32" stroke={parts[i].colour} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                    <polygon points={`${x - 1.5},28 ${x + 1.5},28 ${x},32`} fill={parts[i].colour} />
                  </g>
                ))}
              </svg>
            </div>

            {/* Parts grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
              {parts.map((part, index) => {
                const isActive = activePart === part.id;
                return (
                  <motion.button
                    key={part.id}
                    className="relative p-4 rounded-xl border-2 text-center transition-all duration-200"
                    style={{
                      borderColor: part.colour,
                      backgroundColor: isActive ? `${part.colour}25` : `${part.colour}10`,
                      boxShadow: isActive ? `0 4px 20px ${part.colour}40` : `0 2px 8px ${part.colour}15`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setActivePart(part.id)}
                    onMouseLeave={() => setActivePart(null)}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${part.colour}20`,
                        color: part.colour,
                      }}
                    >
                      {part.icon}
                    </div>
                    <div className="font-semibold text-sm text-foreground mb-1">{part.shortLabel}</div>
                    <div className="text-[10px] font-mono truncate" style={{ color: part.colour }}>
                      {part.file}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Description panel */}
      <div className="mt-4 min-h-[80px]">
        <AnimatePresence mode="wait">
          {activePart ? (
            <motion.div
              key={activePart}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl"
              style={{
                backgroundColor: `${parts.find((p) => p.id === activePart)?.colour}12`,
                borderLeft: `4px solid ${parts.find((p) => p.id === activePart)?.colour}`,
              }}
            >
              <h4
                className="font-semibold mb-1 flex items-center gap-2"
                style={{ color: parts.find((p) => p.id === activePart)?.colour }}
              >
                {parts.find((p) => p.id === activePart)?.icon}
                {parts.find((p) => p.id === activePart)?.label}
              </h4>
              <p className="text-sm text-muted-foreground">
                {parts.find((p) => p.id === activePart)?.description}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-muted-foreground text-center py-4"
            >
              Hover over a part to see its description
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ComponentAnatomy;
