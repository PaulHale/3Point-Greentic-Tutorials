import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Layer {
  id: string;
  label: string;
  description: string;
  items: string[];
  color: string;
  glowColor: string;
}

const layers: Layer[] = [
  {
    id: 'dev-experience',
    label: 'Developer Experience',
    description: 'Tools for building and testing',
    items: ['greentic-dev', 'greentic-gui', 'greentic-webchat'],
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.6)',
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain',
    description: 'Build, store, and distribute',
    items: ['Repo (build)', 'Store (catalog)', 'Distributor'],
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
  },
  {
    id: 'runtime',
    label: 'Runtime',
    description: 'Execution and state management',
    items: ['Runner', 'Session', 'State', 'MCP Exec'],
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.6)',
  },
  {
    id: 'integration',
    label: 'Integration',
    description: 'External connectivity',
    items: ['Messaging (6 channels)', 'Events (webhook)', 'OAuth Broker'],
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
  },
  {
    id: 'foundation',
    label: 'Foundation',
    description: 'Core shared libraries',
    items: ['greentic-types', 'greentic-interfaces', 'greentic-telemetry'],
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
  },
];

interface Particle {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
  layerIndex: number;
}

interface FiveLayersCanvasProps {
  className?: string;
  onLayerSelect?: (layer: Layer | null) => void;
}

// Layer descriptions for detail panel
const layerDescriptions: Record<string, string> = {
  'dev-experience': 'The Developer Experience layer provides all the tools developers need to build, test, and debug their digital workers. This includes the CLI for command-line workflows, GUI runtime for visual flow interactions, and WebChat for interactive testing.',
  'supply-chain': 'The Supply Chain layer handles the entire lifecycle of packs from build to deployment. The Repo compiles and validates components, the Store acts as a catalog for discovery, and the Distributor delivers signed packs to runners with integrity verification.',
  'runtime': 'The Runtime layer executes flows and manages state. The Runner orchestrates component execution in Wasm sandboxes, Session tracks conversation context, State provides persistent key-value storage, and MCP Exec handles AI tool calls.',
  'integration': 'The Integration layer connects digital workers to the outside world. Messaging supports Teams, Slack, WhatsApp, Telegram, WebChat, and Webex. Events handles webhooks and scheduled triggers. OAuth Broker manages secure authentication with external APIs.',
  'foundation': 'The Foundation layer provides shared primitives used by all other layers. greentic-types defines core Rust types and manifests, greentic-interfaces specifies WIT contracts for Wasm, and greentic-telemetry provides OpenTelemetry integration for observability.',
};

export function FiveLayersCanvas({ className = '', onLayerSelect }: FiveLayersCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const dimensionsRef = useRef({ width: 800, height: 650 });
  const hoveredLayerRef = useRef<number | null>(null);
  const selectedLayerRef = useRef<string | null>(null);

  const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null);
  const [, forceUpdate] = useState(0);

  // Layer geometry calculations
  const getLayerGeometry = useCallback((index: number, width: number, height: number) => {
    const padding = 40;
    const topPadding = 60;
    const layerHeight = (height - padding - topPadding - 40) / layers.length;
    const layerWidth = Math.min(width - padding * 2, 700);
    const y = topPadding + index * layerHeight;
    const x = (width - layerWidth) / 2;

    return {
      x,
      y,
      width: layerWidth,
      height: layerHeight - 12,
      centerX: x + layerWidth / 2,
      centerY: y + (layerHeight - 12) / 2,
    };
  }, []);

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const layerIndex = Math.floor(Math.random() * (layers.length - 1));
      const geo = getLayerGeometry(layerIndex, width, height);
      const nextGeo = getLayerGeometry(layerIndex + 1, width, height);

      particles.push({
        x: geo.centerX + (Math.random() - 0.5) * geo.width * 0.5,
        y: geo.y + geo.height + Math.random() * (nextGeo.y - geo.y - geo.height),
        targetY: nextGeo.y,
        speed: 0.4 + Math.random() * 0.6,
        size: 2 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.4,
        color: layers[layerIndex].color,
        layerIndex,
      });
    }

    particlesRef.current = particles;
  }, [getLayerGeometry]);

  // Main render function
  const render = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    const { width, height } = dimensionsRef.current;
    const dpr = window.devicePixelRatio || 1;

    // Clear canvas
    ctx.clearRect(0, 0, width * dpr, height * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#080c14');
    bgGradient.addColorStop(0.5, '#0a1020');
    bgGradient.addColorStop(1, '#080c14');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw connections between layers
    for (let i = 0; i < layers.length - 1; i++) {
      const geo = getLayerGeometry(i, width, height);
      const nextGeo = getLayerGeometry(i + 1, width, height);

      // Animated dash offset
      const dashOffset = (time * 0.03) % 20;

      ctx.save();
      ctx.shadowColor = layers[i].color;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.moveTo(geo.centerX, geo.y + geo.height);
      ctx.lineTo(nextGeo.centerX, nextGeo.y);

      ctx.strokeStyle = `${layers[i].color}50`;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = -dashOffset;
      ctx.stroke();

      // Arrow
      const angle = Math.PI / 2;
      const arrowSize = 6;
      const arrowY = nextGeo.y - 2;

      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(nextGeo.centerX, arrowY);
      ctx.lineTo(nextGeo.centerX - arrowSize, arrowY - arrowSize);
      ctx.moveTo(nextGeo.centerX, arrowY);
      ctx.lineTo(nextGeo.centerX + arrowSize, arrowY - arrowSize);
      ctx.strokeStyle = layers[i].color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    }

    // Draw particles
    particlesRef.current.forEach((particle) => {
      ctx.save();
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

      const alpha = Math.round(particle.opacity * 255).toString(16).padStart(2, '0');
      ctx.fillStyle = `${particle.color}${alpha}`;
      ctx.fill();
      ctx.restore();

      // Update particle position
      particle.y += particle.speed;
      particle.x += Math.sin(time * 0.002 + particle.x * 0.01) * 0.2;

      // Reset particle when it reaches target
      if (particle.y >= particle.targetY) {
        const geo = getLayerGeometry(particle.layerIndex, width, height);
        particle.y = geo.y + geo.height;
        particle.x = geo.centerX + (Math.random() - 0.5) * geo.width * 0.5;
        particle.opacity = 0.4 + Math.random() * 0.4;
      }
    });

    // Draw layers
    layers.forEach((layer, index) => {
      const geo = getLayerGeometry(index, width, height);
      const isHovered = hoveredLayerRef.current === index;
      const isSelected = selectedLayerRef.current === layer.id;

      ctx.save();

      // Glow effect
      if (isHovered || isSelected) {
        ctx.shadowColor = layer.glowColor;
        ctx.shadowBlur = isSelected ? 25 : 15;
      }

      // Background gradient
      const gradient = ctx.createLinearGradient(geo.x, geo.y, geo.x + geo.width, geo.y + geo.height);
      const alpha = isHovered ? 0.2 : isSelected ? 0.25 : 0.12;
      gradient.addColorStop(0, `${layer.color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${layer.color}${Math.round(alpha * 0.3 * 255).toString(16).padStart(2, '0')}`);

      // Draw rounded rect
      const radius = 10;
      ctx.beginPath();
      ctx.moveTo(geo.x + radius, geo.y);
      ctx.lineTo(geo.x + geo.width - radius, geo.y);
      ctx.quadraticCurveTo(geo.x + geo.width, geo.y, geo.x + geo.width, geo.y + radius);
      ctx.lineTo(geo.x + geo.width, geo.y + geo.height - radius);
      ctx.quadraticCurveTo(geo.x + geo.width, geo.y + geo.height, geo.x + geo.width - radius, geo.y + geo.height);
      ctx.lineTo(geo.x + radius, geo.y + geo.height);
      ctx.quadraticCurveTo(geo.x, geo.y + geo.height, geo.x, geo.y + geo.height - radius);
      ctx.lineTo(geo.x, geo.y + radius);
      ctx.quadraticCurveTo(geo.x, geo.y, geo.x + radius, geo.y);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();

      // Border
      ctx.strokeStyle = isSelected ? layer.color : isHovered ? `${layer.color}cc` : `${layer.color}50`;
      ctx.lineWidth = isSelected ? 2 : isHovered ? 1.5 : 1;
      ctx.stroke();

      ctx.restore();

      // Draw text
      ctx.save();

      // Title
      ctx.font = `${isHovered || isSelected ? '600' : '500'} 15px Inter, system-ui, sans-serif`;
      ctx.fillStyle = isHovered || isSelected ? '#ffffff' : '#e0e0e0';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(layer.label, geo.x + 16, geo.y + 20);

      // Description
      ctx.font = '400 11px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#888888';
      ctx.fillText(layer.description, geo.x + 16, geo.y + 38);

      // Items as chips
      const chipY = geo.y + geo.height - 22;
      let currentX = geo.x + 16;
      ctx.font = '400 10px Inter, system-ui, sans-serif';

      layer.items.forEach((item) => {
        const textWidth = ctx.measureText(item).width;
        const chipWidth = textWidth + 12;
        const chipHeight = 18;

        if (currentX + chipWidth < geo.x + geo.width - 16) {
          // Chip background
          ctx.fillStyle = `${layer.color}18`;
          ctx.beginPath();
          ctx.roundRect(currentX, chipY, chipWidth, chipHeight, 3);
          ctx.fill();

          // Chip text
          ctx.fillStyle = `${layer.color}cc`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item, currentX + chipWidth / 2, chipY + chipHeight / 2);

          currentX += chipWidth + 6;
        }
      });

      ctx.restore();
    });

    // Title
    ctx.save();
    ctx.font = '700 22px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('The Five Layers', width / 2, 32);
    ctx.restore();

    ctx.restore();

    animationRef.current = requestAnimationFrame(render);
  }, [getLayerGeometry]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { width, height } = dimensionsRef.current;

    // Check which layer is hovered
    let foundHover: number | null = null;
    layers.forEach((_, index) => {
      const geo = getLayerGeometry(index, width, height);
      if (x >= geo.x && x <= geo.x + geo.width && y >= geo.y && y <= geo.y + geo.height) {
        foundHover = index;
      }
    });

    if (foundHover !== hoveredLayerRef.current) {
      hoveredLayerRef.current = foundHover;
      forceUpdate(n => n + 1);
    }
  }, [getLayerGeometry]);

  // Handle click
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { width, height } = dimensionsRef.current;

    layers.forEach((layer, index) => {
      const geo = getLayerGeometry(index, width, height);
      if (x >= geo.x && x <= geo.x + geo.width && y >= geo.y && y <= geo.y + geo.height) {
        const newSelection = selectedLayerRef.current === layer.id ? null : layer;
        selectedLayerRef.current = newSelection?.id || null;
        setSelectedLayer(newSelection);
        onLayerSelect?.(newSelection);
      }
    });
  }, [getLayerGeometry, onLayerSelect]);

  // Setup canvas and animation
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = 650;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      dimensionsRef.current = { width, height };
      initParticles(width, height);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    // Start animation
    animationRef.current = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, render]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-full h-[650px] rounded-xl overflow-hidden border border-border">
        <canvas
          ref={canvasRef}
          className={`w-full h-full ${hoveredLayerRef.current !== null ? 'cursor-pointer' : 'cursor-default'}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            hoveredLayerRef.current = null;
            forceUpdate(n => n + 1);
          }}
          onClick={handleClick}
        />
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedLayer && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card/95 backdrop-blur-md border border-border rounded-xl p-5 shadow-2xl"
            style={{ borderColor: `${selectedLayer.color}40` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div
                  className="w-3 h-3 rounded-full mb-2"
                  style={{ backgroundColor: selectedLayer.color, boxShadow: `0 0 12px ${selectedLayer.glowColor}` }}
                />
                <h3 className="text-lg font-semibold text-foreground">{selectedLayer.label}</h3>
              </div>
              <button
                onClick={() => {
                  selectedLayerRef.current = null;
                  setSelectedLayer(null);
                  onLayerSelect?.(null);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {layerDescriptions[selectedLayer.id]}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedLayer.items.map((item, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${selectedLayer.color}15`,
                    color: selectedLayer.color,
                    border: `1px solid ${selectedLayer.color}30`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {!selectedLayer && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border">
          Click a layer to explore
        </div>
      )}
    </div>
  );
}

export default FiveLayersCanvas;
