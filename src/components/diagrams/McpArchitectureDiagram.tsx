const RunnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);

const ToolIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

interface Tool {
  name: string;
  icon: string;
  colour: string;
}

const tools: Tool[] = [
  { name: 'Weather', icon: '🌤️', colour: 'hsl(186, 70%, 55%)' },
  { name: 'Search', icon: '🔍', colour: 'hsl(262, 70%, 60%)' },
  { name: 'Database', icon: '🗄️', colour: 'hsl(38, 92%, 55%)' },
  { name: 'Email', icon: '📧', colour: 'hsl(142, 70%, 50%)' },
  { name: 'Calendar', icon: '📅', colour: 'hsl(340, 70%, 55%)' },
];

interface McpArchitectureDiagramProps {
  className?: string;
}

export function McpArchitectureDiagram({ className = '' }: McpArchitectureDiagramProps) {
  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* Flow Runner Container */}
      <div
        className="rounded-2xl border-2 p-4 overflow-hidden"
        style={{
          borderColor: 'hsl(220, 70%, 60%)',
          background: 'linear-gradient(135deg, hsl(220, 70%, 60%, 0.05) 0%, hsl(220, 70%, 60%, 0.1) 100%)',
        }}
      >
        {/* Flow Runner Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'hsl(220, 70%, 60%, 0.2)', color: 'hsl(220, 70%, 60%)' }}
          >
            <RunnerIcon />
          </div>
          <span className="font-bold text-lg" style={{ color: 'hsl(220, 70%, 60%)' }}>
            Flow Runner
          </span>
        </div>

        {/* Component Node Container */}
        <div
          className="rounded-xl border-2 p-4 mx-4"
          style={{
            borderColor: 'hsl(186, 70%, 55%)',
            background: 'linear-gradient(135deg, hsl(186, 70%, 55%, 0.05) 0%, hsl(186, 70%, 55%, 0.1) 100%)',
          }}
        >
          {/* Component Node Header */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="p-1.5 rounded-lg"
              style={{ backgroundColor: 'hsl(186, 70%, 55%, 0.2)', color: 'hsl(186, 70%, 55%)' }}
            >
              <CodeIcon />
            </div>
            <span className="font-semibold" style={{ color: 'hsl(186, 70%, 55%)' }}>
              Component Node
            </span>
          </div>

          {/* LLM and MCP Executor */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* LLM Component */}
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 bg-card/90"
              style={{ borderColor: 'hsl(262, 70%, 60%)' }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: 'hsl(262, 70%, 60%, 0.2)', color: 'hsl(262, 70%, 60%)' }}
              >
                <BrainIcon />
              </div>
              <div>
                <div className="font-semibold text-foreground">LLM Component</div>
                <div className="text-xs" style={{ color: 'hsl(262, 70%, 60%)' }}>AI Processing</div>
              </div>
            </div>

            {/* Arrow */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="hsl(186, 70%, 55%)"
              strokeWidth="2"
              className="w-8 h-8 shrink-0"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>

            {/* MCP Executor */}
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 bg-card/90"
              style={{ borderColor: 'hsl(38, 92%, 55%)' }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: 'hsl(38, 92%, 55%, 0.2)', color: 'hsl(38, 92%, 55%)' }}
              >
                <ToolIcon />
              </div>
              <div>
                <div className="font-semibold text-foreground">MCP Executor</div>
                <div className="text-xs" style={{ color: 'hsl(38, 92%, 55%)' }}>Tool Dispatcher</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Lines */}
      <div className="flex justify-center py-2">
        <div className="flex items-end gap-8">
          {tools.map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-8"
              style={{
                backgroundColor: 'hsl(38, 92%, 55%)',
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Branching Lines */}
      <div className="relative h-6 mx-auto" style={{ width: '80%' }}>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M 50% 0 L 50% 50% M 10% 100% L 10% 50% L 90% 50% L 90% 100%"
            fill="none"
            stroke="hsl(38, 92%, 55%)"
            strokeWidth="2"
            strokeOpacity="0.6"
            strokeDasharray="4 2"
          />
          {/* Individual branches */}
          {[10, 30, 50, 70, 90].map((x) => (
            <line
              key={x}
              x1={`${x}%`}
              y1="50%"
              x2={`${x}%`}
              y2="100%"
              stroke="hsl(38, 92%, 55%)"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
          ))}
          {/* Horizontal connector */}
          <line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="hsl(38, 92%, 55%)"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          {/* Central vertical line */}
          <line
            x1="50%"
            y1="0%"
            x2="50%"
            y2="50%"
            stroke="hsl(38, 92%, 55%)"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
        </svg>
      </div>

      {/* Arrow heads */}
      <div className="flex justify-center -mt-1">
        <div className="flex gap-8" style={{ width: '80%', justifyContent: 'space-between', paddingLeft: '5%', paddingRight: '5%' }}>
          {tools.map((tool) => (
            <svg
              key={tool.name}
              viewBox="0 0 24 24"
              fill={tool.colour}
              className="w-4 h-4"
            >
              <path d="M12 16l-8-8h16l-8 8z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Tools Row */}
      <div className="flex justify-center mt-2">
        <div className="flex gap-3 flex-wrap justify-center" style={{ maxWidth: '90%' }}>
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 bg-card/90 transition-all hover:scale-105"
              style={{
                borderColor: tool.colour,
                boxShadow: `0 4px 12px ${tool.colour}20`,
              }}
            >
              <span className="text-xl">{tool.icon}</span>
              <div>
                <div className="font-semibold text-sm text-foreground">{tool.name}</div>
                <div className="text-[10px] font-medium" style={{ color: tool.colour }}>Tool</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(220, 70%, 60%)' }} />
            <span>Flow Runner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(262, 70%, 60%)' }} />
            <span>LLM Component</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(38, 92%, 55%)' }} />
            <span>MCP Executor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-[hsl(186,70%,55%)] to-[hsl(142,70%,50%)]" />
            <span>External Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default McpArchitectureDiagram;
