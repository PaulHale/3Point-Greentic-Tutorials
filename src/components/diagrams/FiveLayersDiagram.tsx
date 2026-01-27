interface LayerItem {
  name: string;
  subtitle?: string;
}

interface Layer {
  title: string;
  colour: string;
  items: LayerItem[];
  hasArrows?: boolean;
}

const layers: Layer[] = [
  {
    title: 'DEVELOPER EXPERIENCE',
    colour: 'hsl(186, 70%, 55%)',
    items: [
      { name: 'greentic-dev', subtitle: 'CLI' },
      { name: 'greentic-gui', subtitle: 'Visual Editor' },
      { name: 'greentic-webchat', subtitle: 'Test Widget' },
      { name: 'IDE Plugins', subtitle: 'VS Code' },
    ],
  },
  {
    title: 'SUPPLY CHAIN',
    colour: 'hsl(262, 70%, 60%)',
    items: [
      { name: 'Repo', subtitle: 'Build' },
      { name: 'Store', subtitle: 'Catalogue' },
      { name: 'Distributor', subtitle: 'Deploy' },
    ],
    hasArrows: true,
  },
  {
    title: 'RUNTIME',
    colour: 'hsl(38, 92%, 55%)',
    items: [
      { name: 'Runner', subtitle: 'Orchestration' },
      { name: 'Session', subtitle: 'Conversation' },
      { name: 'State', subtitle: 'Key-Value' },
      { name: 'MCP Exec', subtitle: 'Tool Calls' },
    ],
  },
  {
    title: 'INTEGRATION',
    colour: 'hsl(142, 70%, 50%)',
    items: [
      { name: 'Messaging', subtitle: '6 Channels' },
      { name: 'Events', subtitle: 'Webhooks' },
      { name: 'OAuth Broker', subtitle: 'Auth' },
    ],
  },
  {
    title: 'FOUNDATION',
    colour: 'hsl(220, 70%, 60%)',
    items: [
      { name: 'greentic-types', subtitle: 'Core Types' },
      { name: 'greentic-interfaces', subtitle: 'WIT Bindings' },
      { name: 'greentic-telemetry', subtitle: 'Observability' },
    ],
  },
];

interface FiveLayersDiagramProps {
  className?: string;
}

export function FiveLayersDiagram({ className = '' }: FiveLayersDiagramProps) {
  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <div className="relative">
        {layers.map((layer, layerIndex) => (
          <div key={layer.title} className="relative">
            {/* Layer Card */}
            <div
              className="rounded-xl border-2 overflow-hidden mb-2 transition-all hover:shadow-lg"
              style={{
                borderColor: layer.colour,
                background: `linear-gradient(135deg, ${layer.colour}08 0%, ${layer.colour}15 100%)`,
              }}
            >
              {/* Layer Header */}
              <div
                className="px-4 py-2.5 text-xs font-bold tracking-[0.2em] border-b"
                style={{
                  color: layer.colour,
                  borderColor: `${layer.colour}30`,
                  background: `${layer.colour}10`,
                }}
              >
                {layer.title}
              </div>

              {/* Layer Items */}
              <div className="p-4">
                <div className={`flex flex-wrap justify-center gap-3 ${layer.hasArrows ? 'items-center' : ''}`}>
                  {layer.items.map((item, itemIndex) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="group px-4 py-2.5 rounded-lg border bg-card/90 backdrop-blur-sm min-w-[110px] text-center transition-all hover:scale-[1.02]"
                        style={{
                          borderColor: `${layer.colour}50`,
                          boxShadow: `0 2px 8px ${layer.colour}15`,
                        }}
                      >
                        <div className="font-semibold text-sm text-foreground">{item.name}</div>
                        {item.subtitle && (
                          <div
                            className="text-[11px] mt-0.5 font-medium"
                            style={{ color: layer.colour }}
                          >
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      {/* Arrow between items in supply chain */}
                      {layer.hasArrows && itemIndex < layer.items.length - 1 && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={layer.colour}
                          strokeWidth="2.5"
                          className="w-5 h-5 shrink-0"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector Arrow to next layer */}
            {layerIndex < layers.length - 1 && (
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
          {layers.map((layer) => (
            <div key={layer.title} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: layer.colour }}
              />
              <span className="font-medium">
                {layer.title.charAt(0) + layer.title.slice(1).toLowerCase().replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FiveLayersDiagram;
