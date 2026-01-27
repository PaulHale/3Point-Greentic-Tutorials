import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StateOperation {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  colour: string;
}

const operations: StateOperation[] = [
  {
    id: 'get',
    label: 'Get',
    description: 'Retrieve a value by key with tenant isolation',
    colour: 'hsl(142, 70%, 50%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: 'set',
    label: 'Set',
    description: 'Store a value with optional TTL and conditions',
    colour: 'hsl(220, 70%, 55%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
  },
  {
    id: 'delete',
    label: 'Delete',
    description: 'Remove a key and its value',
    colour: 'hsl(0, 70%, 55%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    id: 'list',
    label: 'List',
    description: 'List keys matching a prefix pattern',
    colour: 'hsl(262, 70%, 60%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
];

const backends = [
  { id: 'redis', label: 'Redis', description: 'High-performance in-memory store' },
  { id: 'postgres', label: 'PostgreSQL', description: 'ACID-compliant relational storage' },
  { id: 'sqlite', label: 'SQLite', description: 'Embedded local storage' },
  { id: 'memory', label: 'In-Memory', description: 'Development and testing' },
];

const exampleData = [
  { key: 'user:prefs:u123', value: '{"theme":"dark","lang":"en"}', ttl: '30d' },
  { key: 'cache:weather:london', value: '{"temp":15,"conditions":"cloudy"}', ttl: '1h' },
  { key: 'session:abc:vars', value: '{"step":3,"answers":[...]}', ttl: '24h' },
];

interface StateDiagramProps {
  className?: string;
}

export function StateDiagram({ className = '' }: StateDiagramProps) {
  const [activeOp, setActiveOp] = useState<string | null>(null);
  const [activeBackend, setActiveBackend] = useState<string>('redis');

  const primaryColour = 'hsl(186, 70%, 50%)';
  const activeOpData = operations.find(o => o.id === activeOp);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-4"
          style={{ backgroundColor: `${primaryColour}15`, color: primaryColour }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
          KEY-VALUE STATE STORE
        </div>
      </div>

      {/* Operations */}
      <div className="mb-8">
        <div className="text-xs font-bold tracking-wider text-muted-foreground mb-4">OPERATIONS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {operations.map((op) => (
            <button
              key={op.id}
              onMouseEnter={() => setActiveOp(op.id)}
              onMouseLeave={() => setActiveOp(null)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-center
                ${activeOp === op.id ? 'scale-105 shadow-lg' : 'hover:scale-[1.02]'}
              `}
              style={{
                borderColor: activeOp === op.id ? op.colour : `${op.colour}40`,
                background: `linear-gradient(135deg, ${op.colour}08 0%, ${op.colour}15 100%)`,
                boxShadow: activeOp === op.id ? `0 4px 20px ${op.colour}30` : undefined,
              }}
            >
              <div
                className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${op.colour}20`, color: op.colour }}
              >
                {op.icon}
              </div>
              <div className="font-semibold text-sm text-foreground">{op.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Operation Description */}
      <AnimatePresence mode="wait">
        {activeOpData && (
          <motion.div
            key={activeOp}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-8 p-4 rounded-lg text-center border"
            style={{
              borderColor: `${activeOpData.colour}30`,
              background: `${activeOpData.colour}08`,
            }}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold" style={{ color: activeOpData.colour }}>
                {activeOpData.label}:
              </span>{' '}
              {activeOpData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backend Selection */}
      <div className="mb-8">
        <div className="text-xs font-bold tracking-wider text-muted-foreground mb-4">STORAGE BACKENDS</div>
        <div className="flex flex-wrap gap-2">
          {backends.map((backend) => (
            <button
              key={backend.id}
              onClick={() => setActiveBackend(backend.id)}
              className={`
                px-4 py-2 rounded-lg border-2 transition-all duration-200
                ${activeBackend === backend.id ? 'scale-105' : 'hover:scale-[1.02]'}
              `}
              style={{
                borderColor: activeBackend === backend.id ? primaryColour : `${primaryColour}30`,
                background: activeBackend === backend.id ? `${primaryColour}15` : 'transparent',
                color: activeBackend === backend.id ? primaryColour : 'inherit',
              }}
            >
              <span className="font-medium text-sm">{backend.label}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {backends.find(b => b.id === activeBackend)?.description}
        </p>
      </div>

      {/* Example Data */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: `${primaryColour}30` }}
      >
        <div
          className="px-4 py-2 text-xs font-bold tracking-wider border-b flex items-center justify-between"
          style={{
            color: primaryColour,
            borderColor: `${primaryColour}20`,
            background: `${primaryColour}08`,
          }}
        >
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            EXAMPLE ENTRIES
          </div>
          <span className="font-normal opacity-70">tenant: acme-corp</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Key</th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Value</th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">TTL</th>
              </tr>
            </thead>
            <tbody>
              {exampleData.map((item, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: primaryColour }}>
                    {item.key}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground max-w-[200px] truncate">
                    {item.value}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {item.ttl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {operations.map((op) => (
            <div key={op.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: op.colour }} />
              <span className="font-medium">{op.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StateDiagram;
