import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GUIComponent {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  icon: React.ReactNode;
}

const guiComponents: GUIComponent[] = [
  {
    id: 'flow-canvas',
    label: 'Flow Canvas',
    sublabel: 'Visual Editor',
    description: 'Interactive canvas for viewing and debugging flow execution in real-time',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <circle cx="15.5" cy="8.5" r="1.5" />
        <circle cx="12" cy="15.5" r="1.5" />
        <path d="M8.5 10v2.5a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V10" />
      </svg>
    ),
  },
  {
    id: 'state-inspector',
    label: 'State Inspector',
    sublabel: 'Debug Panel',
    description: 'Real-time inspection of session state, variables, and flow context',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'message-panel',
    label: 'Message Panel',
    sublabel: 'I/O Stream',
    description: 'View incoming and outgoing messages with full payload inspection',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="12" y2="14" />
      </svg>
    ),
  },
  {
    id: 'trace-viewer',
    label: 'Trace Viewer',
    sublabel: 'Telemetry',
    description: 'OpenTelemetry trace visualization with span details and timing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const runtimeLayers = [
  {
    id: 'ui',
    label: 'User Interface',
    colour: 'hsl(262, 70%, 60%)',
    items: ['Flow Canvas', 'State Inspector', 'Message Panel', 'Trace Viewer'],
  },
  {
    id: 'runtime',
    label: 'GUI Runtime Core',
    colour: 'hsl(186, 70%, 50%)',
    items: ['Pack Loader', 'Flow Executor', 'State Manager', 'Event Bus'],
  },
  {
    id: 'wasm',
    label: 'WebAssembly Layer',
    colour: 'hsl(142, 70%, 50%)',
    items: ['Wasmtime', 'Component Model', 'WIT Bindings', 'Sandbox'],
  },
];

interface GUIRuntimeDiagramProps {
  className?: string;
}

export function GUIRuntimeDiagram({ className = '' }: GUIRuntimeDiagramProps) {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const primaryColour = 'hsl(262, 70%, 60%)';

  const activeData = guiComponents.find(c => c.id === activeComponent);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-4"
          style={{ backgroundColor: `${primaryColour}15`, color: primaryColour }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          GUI RUNTIME
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {guiComponents.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setActiveComponent(activeComponent === comp.id ? null : comp.id)}
            onMouseEnter={() => setActiveComponent(comp.id)}
            onMouseLeave={() => setActiveComponent(null)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-300 text-center
              ${activeComponent === comp.id ? 'scale-105 shadow-lg' : 'hover:scale-[1.02]'}
            `}
            style={{
              borderColor: activeComponent === comp.id ? primaryColour : `${primaryColour}40`,
              background: `linear-gradient(135deg, ${primaryColour}08 0%, ${primaryColour}15 100%)`,
              boxShadow: activeComponent === comp.id ? `0 4px 20px ${primaryColour}30` : undefined,
            }}
          >
            <div
              className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${primaryColour}20`, color: primaryColour }}
            >
              {comp.icon}
            </div>
            <div className="font-semibold text-sm text-foreground">{comp.label}</div>
            <div className="text-[11px] mt-1 font-medium" style={{ color: primaryColour }}>
              {comp.sublabel}
            </div>
          </button>
        ))}
      </div>

      {/* Description Panel */}
      <AnimatePresence mode="wait">
        {activeData && (
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-8 p-4 rounded-lg text-center border"
            style={{
              borderColor: `${primaryColour}30`,
              background: `${primaryColour}08`,
            }}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold" style={{ color: primaryColour }}>
                {activeData.label}:
              </span>{' '}
              {activeData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Architecture Layers */}
      <div className="space-y-3">
        {runtimeLayers.map((layer, index) => (
          <div key={layer.id}>
            <div
              className="rounded-xl border-2 overflow-hidden"
              style={{
                borderColor: `${layer.colour}50`,
                background: `linear-gradient(135deg, ${layer.colour}08 0%, ${layer.colour}12 100%)`,
              }}
            >
              <div
                className="px-4 py-2 text-xs font-bold tracking-wider border-b"
                style={{
                  color: layer.colour,
                  borderColor: `${layer.colour}30`,
                  background: `${layer.colour}10`,
                }}
              >
                {layer.label}
              </div>
              <div className="p-4">
                <div className="flex flex-wrap justify-center gap-3">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="px-4 py-2 rounded-lg border text-sm font-medium"
                      style={{
                        borderColor: `${layer.colour}40`,
                        color: layer.colour,
                        background: `${layer.colour}10`,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {index < runtimeLayers.length - 1 && (
              <div className="flex justify-center -my-1 relative z-10">
                <svg
                  viewBox="0 0 24 24"
                  fill={layer.colour}
                  className="w-6 h-6"
                  style={{ filter: `drop-shadow(0 2px 4px ${layer.colour}40)` }}
                >
                  <path d="M12 16l-8-8h16l-8 8z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {runtimeLayers.map((layer) => (
            <div key={layer.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: layer.colour }} />
              <span className="font-medium">{layer.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GUIRuntimeDiagram;
