import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RunnerComponent {
  id: string;
  label: string;
  description: string;
  colour: string;
}

const ingressAdapters: RunnerComponent[] = [
  { id: 'teams', label: 'Teams', description: 'Microsoft Teams bot messages', colour: 'hsl(262, 70%, 60%)' },
  { id: 'slack', label: 'Slack', description: 'Slack app events', colour: 'hsl(262, 70%, 60%)' },
  { id: 'telegram', label: 'Telegram', description: 'Telegram bot updates', colour: 'hsl(262, 70%, 60%)' },
  { id: 'whatsapp', label: 'WhatsApp', description: 'WhatsApp Business API', colour: 'hsl(262, 70%, 60%)' },
  { id: 'webchat', label: 'WebChat', description: 'Embedded web widget', colour: 'hsl(262, 70%, 60%)' },
  { id: 'webhook', label: 'Webhook', description: 'HTTP webhook triggers', colour: 'hsl(262, 70%, 60%)' },
];

const coreComponents: RunnerComponent[] = [
  { id: 'pack-watcher', label: 'Pack Watcher', description: 'Monitors pack sources and triggers reloads', colour: 'hsl(186, 70%, 50%)' },
  { id: 'tenant-router', label: 'Tenant Router', description: 'Routes requests to correct tenant runtime', colour: 'hsl(186, 70%, 50%)' },
  { id: 'flow-executor', label: 'Flow Executor', description: 'Orchestrates flow node execution', colour: 'hsl(186, 70%, 50%)' },
  { id: 'component-host', label: 'Component Host', description: 'Wasmtime runtime for Wasm components', colour: 'hsl(186, 70%, 50%)' },
];

const packSources = [
  { id: 'filesystem', label: 'Filesystem', icon: 'folder' },
  { id: 'https', label: 'HTTPS', icon: 'globe' },
  { id: 'oci', label: 'OCI Registry', icon: 'box' },
  { id: 's3', label: 'S3 Bucket', icon: 'cloud' },
];

interface RunnerArchitectureDiagramProps {
  className?: string;
}

export function RunnerArchitectureDiagram({ className = '' }: RunnerArchitectureDiagramProps) {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const allComponents = [...ingressAdapters, ...coreComponents];
  const activeData = allComponents.find(c => c.id === activeComponent);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Ingress Layer */}
      <div className="mb-6">
        <div
          className="text-xs font-bold tracking-[0.2em] mb-4 flex items-center gap-2"
          style={{ color: 'hsl(262, 70%, 60%)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          INGRESS ADAPTERS
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {ingressAdapters.map((adapter) => (
            <button
              key={adapter.id}
              onMouseEnter={() => setActiveComponent(adapter.id)}
              onMouseLeave={() => setActiveComponent(null)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 text-center
                ${activeComponent === adapter.id ? 'scale-105' : 'hover:scale-[1.02]'}
              `}
              style={{
                borderColor: activeComponent === adapter.id ? adapter.colour : `${adapter.colour}40`,
                background: `linear-gradient(135deg, ${adapter.colour}08 0%, ${adapter.colour}15 100%)`,
              }}
            >
              <div className="font-medium text-xs text-foreground">{adapter.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Arrow Down */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="hsl(220, 15%, 40%)" strokeWidth="2" className="w-6 h-6">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span className="text-xs text-muted-foreground mt-1">Messages</span>
        </div>
      </div>

      {/* Core Runner */}
      <div
        className="rounded-xl border-2 overflow-hidden mb-6"
        style={{
          borderColor: 'hsl(186, 70%, 50%, 0.5)',
          background: 'linear-gradient(135deg, hsl(186, 70%, 50%, 0.05) 0%, hsl(186, 70%, 50%, 0.1) 100%)',
        }}
      >
        <div
          className="px-4 py-3 text-xs font-bold tracking-wider border-b flex items-center justify-between"
          style={{
            color: 'hsl(186, 70%, 50%)',
            borderColor: 'hsl(186, 70%, 50%, 0.3)',
            background: 'hsl(186, 70%, 50%, 0.1)',
          }}
        >
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            GREENTIC RUNNER
          </div>
          <span className="text-[10px] font-normal opacity-70">Production Host</span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {coreComponents.map((comp) => (
              <button
                key={comp.id}
                onMouseEnter={() => setActiveComponent(comp.id)}
                onMouseLeave={() => setActiveComponent(null)}
                className={`
                  p-3 rounded-lg border transition-all duration-200 text-center
                  ${activeComponent === comp.id ? 'scale-105 shadow-md' : 'hover:scale-[1.02]'}
                `}
                style={{
                  borderColor: activeComponent === comp.id ? comp.colour : `${comp.colour}30`,
                  background: activeComponent === comp.id ? `${comp.colour}15` : `${comp.colour}08`,
                }}
              >
                <div className="font-semibold text-sm text-foreground">{comp.label}</div>
              </button>
            ))}
          </div>
        </div>
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
            className="mb-6 p-4 rounded-lg text-center border"
            style={{
              borderColor: `${activeData.colour}30`,
              background: `${activeData.colour}08`,
            }}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold" style={{ color: activeData.colour }}>
                {activeData.label}:
              </span>{' '}
              {activeData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pack Sources */}
      <div
        className="rounded-xl border-2 overflow-hidden"
        style={{
          borderColor: 'hsl(142, 70%, 50%, 0.5)',
          background: 'linear-gradient(135deg, hsl(142, 70%, 50%, 0.05) 0%, hsl(142, 70%, 50%, 0.1) 100%)',
        }}
      >
        <div
          className="px-4 py-3 text-xs font-bold tracking-wider border-b flex items-center gap-2"
          style={{
            color: 'hsl(142, 70%, 50%)',
            borderColor: 'hsl(142, 70%, 50%, 0.3)',
            background: 'hsl(142, 70%, 50%, 0.1)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          </svg>
          PACK INDEX SOURCES
        </div>
        <div className="p-4">
          <div className="flex flex-wrap justify-center gap-4">
            {packSources.map((source) => (
              <div
                key={source.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border"
                style={{
                  borderColor: 'hsl(142, 70%, 50%, 0.4)',
                  background: 'hsl(142, 70%, 50%, 0.1)',
                }}
              >
                {source.icon === 'folder' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="hsl(142, 70%, 50%)" strokeWidth="2" className="w-4 h-4">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                )}
                {source.icon === 'globe' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="hsl(142, 70%, 50%)" strokeWidth="2" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                )}
                {source.icon === 'box' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="hsl(142, 70%, 50%)" strokeWidth="2" className="w-4 h-4">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                )}
                {source.icon === 'cloud' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="hsl(142, 70%, 50%)" strokeWidth="2" className="w-4 h-4">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                  </svg>
                )}
                <span className="text-sm font-medium" style={{ color: 'hsl(142, 70%, 50%)' }}>
                  {source.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(262, 70%, 60%)' }} />
            <span className="font-medium">Ingress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(186, 70%, 50%)' }} />
            <span className="font-medium">Runner Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(142, 70%, 50%)' }} />
            <span className="font-medium">Pack Sources</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RunnerArchitectureDiagram;
