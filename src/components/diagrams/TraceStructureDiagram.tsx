import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Span {
  id: string;
  name: string;
  type: 'flow' | 'node' | 'component' | 'http';
  children?: Span[];
  duration?: string;
}

const traceStructure: Span = {
  id: 'root',
  name: 'flow.start',
  type: 'flow',
  duration: '1234ms',
  children: [
    {
      id: 'greet',
      name: 'node.greet',
      type: 'node',
      duration: '45ms',
      children: [
        { id: 'template', name: 'component.template.execute', type: 'component', duration: '12ms' },
      ],
    },
    {
      id: 'process',
      name: 'node.process',
      type: 'node',
      duration: '1089ms',
      children: [
        {
          id: 'llm',
          name: 'component.llm-openai.execute',
          type: 'component',
          duration: '1045ms',
          children: [
            { id: 'http', name: 'http.request (OpenAI API)', type: 'http', duration: '1020ms' },
          ],
        },
        { id: 'state', name: 'state.update', type: 'component', duration: '8ms' },
      ],
    },
    {
      id: 'respond',
      name: 'node.respond',
      type: 'node',
      duration: '32ms',
      children: [
        { id: 'card', name: 'component.adaptive-card.execute', type: 'component', duration: '28ms' },
      ],
    },
    { id: 'complete', name: 'flow.complete', type: 'flow', duration: '2ms' },
  ],
};

const typeColours: Record<Span['type'], string> = {
  flow: 'hsl(262, 70%, 60%)',
  node: 'hsl(186, 70%, 55%)',
  component: 'hsl(142, 70%, 50%)',
  http: 'hsl(38, 92%, 55%)',
};

const typeLabels: Record<Span['type'], string> = {
  flow: 'Flow',
  node: 'Node',
  component: 'Component',
  http: 'HTTP',
};

interface SpanNodeProps {
  span: Span;
  depth: number;
  activeSpan: string | null;
  setActiveSpan: (id: string | null) => void;
  isLast: boolean;
  parentConnectors: boolean[];
}

function SpanNode({ span, depth, activeSpan, setActiveSpan, isLast, parentConnectors }: SpanNodeProps) {
  const colour = typeColours[span.type];
  const isActive = activeSpan === span.id;
  const hasChildren = span.children && span.children.length > 0;

  return (
    <div className="relative">
      {/* Connection lines */}
      <div className="absolute left-0 top-0 h-full">
        {parentConnectors.map((showLine, i) => (
          showLine && (
            <div
              key={i}
              className="absolute border-l-2 h-full"
              style={{
                left: `${i * 24 + 8}px`,
                borderColor: 'hsl(220, 10%, 30%)',
              }}
            />
          )
        ))}
      </div>

      {/* Horizontal connector and branch */}
      {depth > 0 && (
        <div
          className="absolute top-4"
          style={{ left: `${(depth - 1) * 24 + 8}px` }}
        >
          {/* Vertical line segment */}
          <div
            className="absolute border-l-2"
            style={{
              height: isLast ? '0' : '100%',
              borderColor: 'hsl(220, 10%, 30%)',
            }}
          />
          {/* Horizontal connector */}
          <div
            className="absolute border-t-2 w-4"
            style={{
              top: '0',
              borderColor: 'hsl(220, 10%, 30%)',
            }}
          />
          {/* Corner or T-junction */}
          <div
            className="absolute w-2 h-2 rounded-full -left-1 -top-1"
            style={{ backgroundColor: colour }}
          />
        </div>
      )}

      {/* Span content */}
      <motion.button
        onClick={() => setActiveSpan(isActive ? null : span.id)}
        onMouseEnter={() => setActiveSpan(span.id)}
        onMouseLeave={() => setActiveSpan(null)}
        className={`
          relative flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 w-full text-left
          ${isActive ? 'shadow-md' : ''}
        `}
        style={{
          marginLeft: `${depth * 24}px`,
          background: isActive ? `${colour}15` : 'transparent',
          borderLeft: isActive ? `3px solid ${colour}` : '3px solid transparent',
        }}
        whileHover={{ x: 4 }}
      >
        {/* Type indicator */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${colour}20` }}
        >
          {span.type === 'flow' && (
            <svg viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2" className="w-4 h-4">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
          {span.type === 'node' && (
            <svg viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2" className="w-4 h-4">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
          {span.type === 'component' && (
            <svg viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2" className="w-4 h-4">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          )}
          {span.type === 'http' && (
            <svg viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2" className="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )}
        </div>

        {/* Span name */}
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm text-foreground truncate">{span.name}</div>
          <div className="text-[11px] font-medium" style={{ color: colour }}>
            {typeLabels[span.type]}
          </div>
        </div>

        {/* Duration badge */}
        {span.duration && (
          <div
            className="px-2 py-0.5 rounded text-[11px] font-mono font-medium shrink-0"
            style={{
              backgroundColor: `${colour}20`,
              color: colour,
            }}
          >
            {span.duration}
          </div>
        )}

        {/* Expand indicator */}
        {hasChildren && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4 text-muted-foreground shrink-0"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </motion.button>

      {/* Children */}
      {hasChildren && (
        <div className="relative">
          {span.children!.map((child, index) => (
            <SpanNode
              key={child.id}
              span={child}
              depth={depth + 1}
              activeSpan={activeSpan}
              setActiveSpan={setActiveSpan}
              isLast={index === span.children!.length - 1}
              parentConnectors={[...parentConnectors.slice(0, depth), !isLast]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TraceStructureDiagramProps {
  className?: string;
}

export function TraceStructureDiagram({ className = '' }: TraceStructureDiagramProps) {
  const [activeSpan, setActiveSpan] = useState<string | null>(null);

  const activeSpanData = findSpan(traceStructure, activeSpan);

  function findSpan(span: Span, id: string | null): Span | null {
    if (!id) return null;
    if (span.id === id) return span;
    if (span.children) {
      for (const child of span.children) {
        const found = findSpan(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'hsl(262, 70%, 60%, 0.2)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="hsl(262, 70%, 60%)" strokeWidth="2" className="w-5 h-5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Trace: flow-execution-abc123</h3>
            <p className="text-xs text-muted-foreground">Distributed trace structure</p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-muted text-xs font-mono text-muted-foreground">
          Total: 1234ms
        </div>
      </div>

      {/* Trace Tree */}
      <div className="relative bg-muted/30 rounded-lg p-4 overflow-x-auto">
        <SpanNode
          span={traceStructure}
          depth={0}
          activeSpan={activeSpan}
          setActiveSpan={setActiveSpan}
          isLast={true}
          parentConnectors={[]}
        />
      </div>

      {/* Span Details */}
      <AnimatePresence mode="wait">
        {activeSpanData && (
          <motion.div
            key={activeSpan}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-4 rounded-lg border"
            style={{
              borderColor: `${typeColours[activeSpanData.type]}30`,
              background: `${typeColours[activeSpanData.type]}08`,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${typeColours[activeSpanData.type]}20` }}
              >
                {activeSpanData.type === 'http' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke={typeColours[activeSpanData.type]} strokeWidth="2" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke={typeColours[activeSpanData.type]} strokeWidth="2" className="w-6 h-6">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm font-semibold text-foreground">{activeSpanData.name}</div>
                <div className="text-xs mt-1 text-muted-foreground">
                  Type: <span style={{ color: typeColours[activeSpanData.type] }}>{typeLabels[activeSpanData.type]}</span>
                  {activeSpanData.duration && (
                    <> · Duration: <span className="font-mono">{activeSpanData.duration}</span></>
                  )}
                  {activeSpanData.children && (
                    <> · Children: {activeSpanData.children.length}</>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {Object.entries(typeColours).map(([type, colour]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: colour }} />
              <span className="font-medium">{typeLabels[type as Span['type']]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TraceStructureDiagram;
