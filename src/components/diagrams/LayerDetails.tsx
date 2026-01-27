import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComponentInfo {
  name: string;
  description: string;
  docs: string | null;
}

interface LayerData {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: JSX.Element;
  components: ComponentInfo[];
}

const base = import.meta.env.BASE_URL;

const layerData: LayerData[] = [
  {
    id: 'dev-experience',
    title: 'Developer Experience',
    description: 'Tools for building, testing, and debugging digital workers.',
    color: '#22c55e',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    components: [
      { name: 'greentic-dev CLI', description: 'Flow creation, validation, and pack building', docs: `${base}docs/reference/cli` },
      { name: 'greentic-gui', description: 'GUI runtime for visual flow interactions', docs: `${base}docs/architecture/gui` },
      { name: 'greentic-webchat', description: 'Interactive WebChat SPA for testing flows', docs: `${base}docs/messaging/webchat` },
    ],
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain',
    description: 'Complete lifecycle from building components to distributing packs.',
    color: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      </svg>
    ),
    components: [
      { name: 'greentic-pack', description: 'Build signed .gtpack bundles', docs: `${base}docs/architecture/packs` },
      { name: 'greentic-component', description: 'Component manifest parsing and store', docs: `${base}docs/architecture/components` },
      { name: 'greentic-distributor-client', description: 'Fetch packs from the distributor service', docs: `${base}docs/architecture/distributor` },
    ],
  },
  {
    id: 'runtime',
    title: 'Runtime',
    description: 'Executes flows in secure WebAssembly sandboxes.',
    color: '#3b82f6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    components: [
      { name: 'greentic-runner', description: 'Production flow execution host', docs: `${base}docs/architecture/runner` },
      { name: 'greentic-session', description: 'Conversational session management', docs: `${base}docs/architecture/session` },
      { name: 'greentic-state', description: 'Key-value state persistence', docs: `${base}docs/architecture/state` },
      { name: 'greentic-mcp', description: 'MCP tool execution host', docs: `${base}docs/mcp/overview` },
    ],
  },
  {
    id: 'integration',
    title: 'Integration',
    description: 'Connects digital workers to the outside world.',
    color: '#8b5cf6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    components: [
      { name: 'greentic-messaging', description: 'Multi-channel: Teams, Slack, WhatsApp, Telegram, WebChat, Webex', docs: `${base}docs/messaging/overview` },
      { name: 'greentic-events', description: 'Event triggers: webhooks, timers, email', docs: `${base}docs/events/overview` },
      { name: 'greentic-oauth', description: 'OAuth broker for API authentication', docs: `${base}docs/oauth/overview` },
    ],
  },
  {
    id: 'foundation',
    title: 'Foundation',
    description: 'Shared primitives used by all layers.',
    color: '#ec4899',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    components: [
      { name: 'greentic-types', description: 'Shared Rust types and manifests', docs: `${base}docs/architecture/types` },
      { name: 'greentic-interfaces', description: 'WIT contracts for WebAssembly', docs: `${base}docs/architecture/interfaces` },
      { name: 'greentic-telemetry', description: 'OpenTelemetry integration', docs: `${base}docs/reference/telemetry` },
    ],
  },
];

interface LayerCardProps {
  layer: LayerData;
  isExpanded: boolean;
  onToggle: () => void;
}

function LayerCard({ layer, isExpanded, onToggle }: LayerCardProps) {
  return (
    <div
      className="rounded-xl border transition-all duration-300 border-border bg-card hover:border-muted-foreground/30"
      style={isExpanded ? { borderColor: `${layer.color}60` } : undefined}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300"
            style={{
              backgroundColor: `${layer.color}20`,
              color: layer.color,
              transform: isExpanded ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {layer.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-foreground">{layer.title}</h3>
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 text-muted-foreground shrink-0"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </div>
            <p className="text-muted-foreground mt-1">{layer.description}</p>

            {/* Collapsed view: show component chips */}
            {!isExpanded && (
              <div className="flex flex-wrap gap-2 mt-4">
                {layer.components.map((comp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                  >
                    {comp.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div
                className="h-px w-full mb-6"
                style={{ backgroundColor: `${layer.color}30` }}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {layer.components.map((comp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4
                          className="font-semibold text-sm"
                          style={{ color: layer.color }}
                        >
                          {comp.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {comp.description}
                        </p>
                      </div>
                      {comp.docs && (
                        <a
                          href={comp.docs}
                          className="shrink-0 p-2 rounded-md hover:bg-background transition-colors group"
                          title="View documentation"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LayerDetails() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {layerData.map((layer) => (
        <LayerCard
          key={layer.id}
          layer={layer}
          isExpanded={expandedId === layer.id}
          onToggle={() => handleToggle(layer.id)}
        />
      ))}

      {/* Hint text */}
      <p className="text-center text-sm text-muted-foreground pt-4">
        Click any layer to explore its components
      </p>
    </div>
  );
}

export default LayerDetails;
