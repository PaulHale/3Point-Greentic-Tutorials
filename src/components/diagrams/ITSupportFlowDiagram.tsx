import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlowNode {
  id: string;
  label: string;
  subtitle?: string;
  type: 'input' | 'process' | 'decision' | 'output';
  colour: string;
  icon: React.ReactNode;
}

interface Branch {
  label: string;
  colour: string;
  icon: string;
  target: string;
}

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const QAIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M12 8v2" />
    <path d="M12 14h.01" />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
  </svg>
);

const nodes: FlowNode[] = [
  {
    id: 'input',
    label: 'User Message',
    subtitle: 'Issue Description',
    type: 'input',
    colour: 'hsl(186, 70%, 55%)',
    icon: <UserIcon />,
  },
  {
    id: 'collect',
    label: 'Collect Info',
    subtitle: 'Q&A Component',
    type: 'process',
    colour: 'hsl(166, 70%, 50%)',
    icon: <QAIcon />,
  },
  {
    id: 'classify',
    label: 'Classify',
    subtitle: 'LLM Component',
    type: 'decision',
    colour: 'hsl(262, 70%, 60%)',
    icon: <BrainIcon />,
  },
];

const branches: Branch[] = [
  { label: 'Password Reset', colour: 'hsl(340, 70%, 55%)', icon: '🔑', target: 'password' },
  { label: 'Hardware Ticket', colour: 'hsl(38, 92%, 55%)', icon: '🖥️', target: 'hardware' },
  { label: 'Software Help', colour: 'hsl(220, 70%, 60%)', icon: '💿', target: 'software' },
  { label: 'Network Support', colour: 'hsl(142, 70%, 50%)', icon: '🌐', target: 'network' },
  { label: 'General Support', colour: 'hsl(280, 60%, 55%)', icon: '💬', target: 'other' },
];

interface ITSupportFlowDiagramProps {
  className?: string;
}

export function ITSupportFlowDiagram({ className = '' }: ITSupportFlowDiagramProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card overflow-hidden ${className}`}>
      {/* Main vertical flow */}
      <div className="flex flex-col items-center">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex flex-col items-center">
            {/* Node */}
            <motion.div
              className="relative"
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`
                  flex items-center gap-3 px-5 py-3 rounded-xl border-2 bg-card
                  transition-all duration-300 cursor-default
                  ${node.type === 'decision' ? 'rotate-0' : ''}
                `}
                style={{
                  borderColor: node.colour,
                  backgroundColor: activeNode === node.id ? `${node.colour}20` : `${node.colour}08`,
                  boxShadow: activeNode === node.id ? `0 4px 20px ${node.colour}30` : `0 2px 8px ${node.colour}10`,
                }}
              >
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${node.colour}20`, color: node.colour }}
                >
                  {node.icon}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{node.label}</div>
                  {node.subtitle && (
                    <div className="text-xs font-medium" style={{ color: node.colour }}>
                      {node.subtitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Decision diamond indicator */}
              {node.type === 'decision' && (
                <div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 border-2"
                  style={{
                    borderColor: node.colour,
                    backgroundColor: `${node.colour}30`,
                  }}
                />
              )}
            </motion.div>

            {/* Connector arrow */}
            {index < nodes.length - 1 && (
              <div className="flex flex-col items-center py-2">
                <div
                  className="w-0.5 h-6"
                  style={{ backgroundColor: nodes[index + 1].colour }}
                />
                <svg
                  viewBox="0 0 24 24"
                  fill={nodes[index + 1].colour}
                  className="w-4 h-4 -mt-1"
                >
                  <path d="M12 16l-6-6h12l-6 6z" />
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* Branching section */}
        <div className="w-full mt-4">
          {/* Branch connector lines */}
          <div className="relative h-12 mx-auto" style={{ maxWidth: '600px' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 48" preserveAspectRatio="none" className="overflow-visible">
              {/* Vertical line from classifier */}
              <line
                x1="50" y1="0" x2="50" y2="16"
                stroke="hsl(262, 70%, 60%)"
                strokeWidth="0.4"
                vectorEffect="non-scaling-stroke"
              />
              {/* Horizontal spread line */}
              <line
                x1="10" y1="16" x2="90" y2="16"
                stroke="hsl(220, 15%, 35%)"
                strokeWidth="0.3"
                strokeDasharray="2 1"
                vectorEffect="non-scaling-stroke"
              />
              {/* Individual drop lines */}
              {[10, 30, 50, 70, 90].map((x, i) => (
                <g key={i}>
                  <line
                    x1={x} y1="16" x2={x} y2="40"
                    stroke={branches[i].colour}
                    strokeWidth="0.4"
                    vectorEffect="non-scaling-stroke"
                  />
                  <polygon
                    points={`${x - 1},36 ${x + 1},36 ${x},40`}
                    fill={branches[i].colour}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Branch labels */}
          <div className="grid grid-cols-5 gap-2 md:gap-3 mx-auto" style={{ maxWidth: '650px' }}>
            {branches.map((branch) => (
              <motion.div
                key={branch.target}
                className="text-center"
                onMouseEnter={() => setActiveBranch(branch.target)}
                onMouseLeave={() => setActiveBranch(null)}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div
                  className={`
                    p-3 rounded-xl border-2 transition-all duration-200
                    ${activeBranch === branch.target ? 'shadow-lg' : ''}
                  `}
                  style={{
                    borderColor: branch.colour,
                    backgroundColor: activeBranch === branch.target ? `${branch.colour}20` : `${branch.colour}08`,
                    boxShadow: activeBranch === branch.target ? `0 4px 16px ${branch.colour}30` : 'none',
                  }}
                >
                  <div className="text-2xl mb-1">{branch.icon}</div>
                  <div
                    className="text-[10px] md:text-xs font-semibold leading-tight"
                    style={{ color: branch.colour }}
                  >
                    {branch.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(166, 70%, 50%)' }} />
            <span>Q&A Collection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(262, 70%, 60%)' }} />
            <span>LLM Classification</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-[hsl(340,70%,55%)] via-[hsl(38,92%,55%)] to-[hsl(142,70%,50%)]" />
            <span>Conditional Routing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ITSupportFlowDiagram;
