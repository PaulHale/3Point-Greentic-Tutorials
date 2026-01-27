import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypeCategory {
  id: string;
  label: string;
  description: string;
  types: string[];
  colour: string;
}

const categories: TypeCategory[] = [
  {
    id: 'identity',
    label: 'Identity',
    description: 'Tenant, team, and user identity types',
    types: ['TenantCtx', 'TeamId', 'UserId', 'Identity'],
    colour: 'hsl(262, 70%, 60%)',
  },
  {
    id: 'flow',
    label: 'Flow',
    description: 'Flow definition and execution types',
    types: ['Flow', 'Node', 'Routing', 'FlowId'],
    colour: 'hsl(186, 70%, 50%)',
  },
  {
    id: 'component',
    label: 'Component',
    description: 'Component manifest and capability types',
    types: ['ComponentManifest', 'Capability', 'Schema', 'ComponentId'],
    colour: 'hsl(142, 70%, 50%)',
  },
  {
    id: 'pack',
    label: 'Pack',
    description: 'Pack bundling and distribution types',
    types: ['PackManifest', 'Signature', 'PackId', 'Version'],
    colour: 'hsl(38, 92%, 55%)',
  },
  {
    id: 'messaging',
    label: 'Messaging',
    description: 'Message and channel types',
    types: ['Message', 'MessageCard', 'Channel', 'Attachment'],
    colour: 'hsl(340, 70%, 55%)',
  },
  {
    id: 'telemetry',
    label: 'Telemetry',
    description: 'Observability and tracing types',
    types: ['Span', 'TraceContext', 'Metric', 'LogRecord'],
    colour: 'hsl(220, 70%, 55%)',
  },
];

interface TypesDiagramProps {
  className?: string;
}

export function TypesDiagram({ className = '' }: TypesDiagramProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const primaryColour = 'hsl(340, 70%, 55%)';
  const activeCategoryData = categories.find(c => c.id === activeCategory);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-4"
          style={{ backgroundColor: `${primaryColour}15`, color: primaryColour }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="M9 15h6" />
          </svg>
          SHARED TYPES
        </div>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Core Rust types and manifests used across all Greentic components
        </p>
      </div>

      {/* Type Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            onMouseEnter={() => setActiveCategory(category.id)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${activeCategory === category.id ? 'scale-[1.02] shadow-lg' : 'hover:scale-[1.01]'}
            `}
            style={{
              borderColor: activeCategory === category.id ? category.colour : `${category.colour}40`,
              background: `linear-gradient(135deg, ${category.colour}08 0%, ${category.colour}15 100%)`,
              boxShadow: activeCategory === category.id ? `0 4px 20px ${category.colour}25` : undefined,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${category.colour}20`, color: category.colour }}
              >
                {category.id === 'identity' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
                {category.id === 'flow' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                )}
                {category.id === 'component' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <rect x="7" y="7" width="3" height="9" />
                    <rect x="14" y="7" width="3" height="5" />
                  </svg>
                )}
                {category.id === 'pack' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  </svg>
                )}
                {category.id === 'messaging' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                )}
                {category.id === 'telemetry' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                )}
              </div>
              <div className="font-semibold text-foreground">{category.label}</div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.types.map((type) => (
                <span
                  key={type}
                  className="px-2 py-0.5 rounded text-[10px] font-mono"
                  style={{
                    backgroundColor: `${category.colour}15`,
                    color: category.colour,
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Category Description */}
      <AnimatePresence mode="wait">
        {activeCategoryData && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-6 p-4 rounded-lg text-center border"
            style={{
              borderColor: `${activeCategoryData.colour}30`,
              background: `${activeCategoryData.colour}08`,
            }}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold" style={{ color: activeCategoryData.colour }}>
                {activeCategoryData.label}:
              </span>{' '}
              {activeCategoryData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dependency Graph */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: `${primaryColour}30` }}
      >
        <div
          className="px-4 py-2 text-xs font-bold tracking-wider border-b flex items-center gap-2"
          style={{
            color: primaryColour,
            borderColor: `${primaryColour}20`,
            background: `${primaryColour}08`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          DEPENDENCY GRAPH
        </div>
        <div className="p-4 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: 'hsl(262, 70%, 60%, 0.4)', color: 'hsl(262, 70%, 60%)' }}>
                greentic-runner
              </div>
              <div className="px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: 'hsl(186, 70%, 50%, 0.4)', color: 'hsl(186, 70%, 50%)' }}>
                greentic-flow
              </div>
              <div className="px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: 'hsl(142, 70%, 50%, 0.4)', color: 'hsl(142, 70%, 50%)' }}>
                greentic-component
              </div>
            </div>
            <svg viewBox="0 0 200 30" className="w-48 h-6 text-muted-foreground">
              <path d="M30 5 L100 25 M100 25 L170 5" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 2" />
              <path d="M100 25 L100 5" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 2" />
            </svg>
            <div
              className="px-4 py-2 rounded-lg border-2 text-sm font-bold"
              style={{
                borderColor: primaryColour,
                background: `${primaryColour}15`,
                color: primaryColour,
              }}
            >
              greentic-types
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">All core crates depend on greentic-types</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {categories.slice(0, 4).map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: cat.colour }} />
              <span className="font-medium">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TypesDiagram;
