import { useState } from 'react';
import { motion } from 'framer-motion';

interface LayerItem {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface Layer {
  id: string;
  title: string;
  colour: string;
  items: LayerItem[];
  hasFlow?: boolean;
}

// Icons
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const EmbedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
    <path d="m4.93 4.93 2.83 2.83m8.48 8.48 2.83 2.83m-2.83-14.14 2.83 2.83M4.93 19.07l2.83-2.83" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const layers: Layer[] = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    colour: 'hsl(186, 70%, 55%)',
    items: [
      { id: 'astro', label: 'Astro Site', subtitle: 'Landing Page', icon: <GlobeIcon /> },
      { id: 'webchat', label: 'WebChat', subtitle: 'Chat Widget', icon: <ChatIcon /> },
    ],
  },
  {
    id: 'backend',
    title: 'BACKEND',
    colour: 'hsl(262, 70%, 60%)',
    items: [
      { id: 'embed', label: 'Query Embed', subtitle: 'text-embedding-3', icon: <EmbedIcon /> },
      { id: 'search', label: 'Vector Search', subtitle: 'MCP Tool', icon: <SearchIcon /> },
      { id: 'llm', label: 'LLM + Context', subtitle: 'gpt-4o', icon: <BrainIcon /> },
    ],
    hasFlow: true,
  },
  {
    id: 'storage',
    title: 'STORAGE',
    colour: 'hsl(142, 70%, 50%)',
    items: [
      { id: 'docs', label: 'Document Store', subtitle: 'Markdown / PDF', icon: <FileIcon /> },
      { id: 'vectors', label: 'Vector DB', subtitle: 'Embeddings', icon: <DatabaseIcon /> },
    ],
  },
];

interface RAGArchitectureDiagramProps {
  className?: string;
}

export function RAGArchitectureDiagram({ className = '' }: RAGArchitectureDiagramProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card overflow-hidden ${className}`}>
      {/* Layers */}
      <div className="space-y-4">
        {layers.map((layer, layerIndex) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: layerIndex * 0.1 }}
          >
            {/* Layer container */}
            <div
              className="rounded-xl border-2 overflow-hidden"
              style={{
                borderColor: layer.colour,
                background: `linear-gradient(135deg, ${layer.colour}05 0%, ${layer.colour}10 100%)`,
              }}
            >
              {/* Layer header */}
              <div
                className="px-4 py-2 text-xs font-bold tracking-[0.2em] flex items-center gap-2"
                style={{
                  color: layer.colour,
                  borderBottom: `1px solid ${layer.colour}30`,
                  background: `${layer.colour}10`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: layer.colour }}
                />
                {layer.title}
              </div>

              {/* Layer content */}
              <div className="p-4">
                {layer.hasFlow ? (
                  /* RAG Flow - horizontal with arrows */
                  <div
                    className="rounded-lg border-2 border-dashed p-4"
                    style={{ borderColor: `${layer.colour}40` }}
                  >
                    <div className="text-xs font-semibold mb-3 text-center" style={{ color: layer.colour }}>
                      RAG Flow Pipeline
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {layer.items.map((item, itemIndex) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <motion.div
                            className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 bg-card/90 cursor-default"
                            style={{
                              borderColor: activeItem === item.id ? layer.colour : `${layer.colour}50`,
                              boxShadow: activeItem === item.id ? `0 4px 16px ${layer.colour}30` : `0 2px 8px ${layer.colour}10`,
                            }}
                            onMouseEnter={() => setActiveItem(item.id)}
                            onMouseLeave={() => setActiveItem(null)}
                            whileHover={{ scale: 1.03, y: -2 }}
                          >
                            <div
                              className="p-1.5 rounded-md"
                              style={{ backgroundColor: `${layer.colour}20`, color: layer.colour }}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-foreground">{item.label}</div>
                              <div className="text-[10px]" style={{ color: layer.colour }}>{item.subtitle}</div>
                            </div>
                          </motion.div>
                          {itemIndex < layer.items.length - 1 && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={layer.colour}
                              strokeWidth="2"
                              className="w-6 h-6 shrink-0"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Regular items */
                  <div className="flex justify-center gap-4 flex-wrap">
                    {layer.items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg border-2 bg-card/90 cursor-default min-w-[160px]"
                        style={{
                          borderColor: activeItem === item.id ? layer.colour : `${layer.colour}50`,
                          boxShadow: activeItem === item.id ? `0 4px 16px ${layer.colour}30` : `0 2px 8px ${layer.colour}10`,
                        }}
                        onMouseEnter={() => setActiveItem(item.id)}
                        onMouseLeave={() => setActiveItem(null)}
                        whileHover={{ scale: 1.03, y: -2 }}
                      >
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${layer.colour}20`, color: layer.colour }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">{item.label}</div>
                          <div className="text-[10px]" style={{ color: layer.colour }}>{item.subtitle}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Connector between layers */}
            {layerIndex < layers.length - 1 && (
              <div className="flex justify-center py-2">
                <svg width="40" height="24" viewBox="0 0 40 24" className="overflow-visible">
                  <line
                    x1="20" y1="0" x2="20" y2="18"
                    stroke={layers[layerIndex + 1].colour}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <polygon
                    points="14,14 26,14 20,22"
                    fill={layers[layerIndex + 1].colour}
                  />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Data flow annotation */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Data Flow:</span>
          </div>
          <div className="flex items-center gap-1">
            <span>User Query</span>
            <span className="text-muted-foreground/50">→</span>
          </div>
          <div className="flex items-center gap-1">
            <span style={{ color: 'hsl(262, 70%, 60%)' }}>Embed</span>
            <span className="text-muted-foreground/50">→</span>
          </div>
          <div className="flex items-center gap-1">
            <span style={{ color: 'hsl(142, 70%, 50%)' }}>Search Vectors</span>
            <span className="text-muted-foreground/50">→</span>
          </div>
          <div className="flex items-center gap-1">
            <span style={{ color: 'hsl(262, 70%, 60%)' }}>Generate Answer</span>
            <span className="text-muted-foreground/50">→</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Response</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
        {layers.map((layer) => (
          <div key={layer.id} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: layer.colour }}
            />
            <span>{layer.title.charAt(0) + layer.title.slice(1).toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RAGArchitectureDiagram;
