import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WitPackage {
  id: string;
  label: string;
  description: string;
  interfaces: string[];
  colour: string;
}

const witPackages: WitPackage[] = [
  {
    id: 'component',
    label: 'greentic:component',
    description: 'Core component interface for flow node execution',
    interfaces: ['handle', 'describe', 'config-schema'],
    colour: 'hsl(142, 70%, 50%)',
  },
  {
    id: 'messaging',
    label: 'greentic:messaging',
    description: 'Multi-channel messaging contracts',
    interfaces: ['send', 'receive', 'card-builder'],
    colour: 'hsl(186, 70%, 50%)',
  },
  {
    id: 'state',
    label: 'greentic:state',
    description: 'Key-value state persistence interface',
    interfaces: ['get', 'set', 'delete', 'list'],
    colour: 'hsl(262, 70%, 60%)',
  },
  {
    id: 'secrets',
    label: 'greentic:secrets',
    description: 'Secure secrets access interface',
    interfaces: ['get-secret', 'list-secrets'],
    colour: 'hsl(340, 70%, 55%)',
  },
  {
    id: 'mcp',
    label: 'wasix:mcp',
    description: 'Model Context Protocol tool execution',
    interfaces: ['invoke-tool', 'list-tools'],
    colour: 'hsl(38, 92%, 55%)',
  },
  {
    id: 'http',
    label: 'wasi:http',
    description: 'HTTP client capabilities for components',
    interfaces: ['outgoing-request', 'incoming-response'],
    colour: 'hsl(220, 70%, 55%)',
  },
];

interface InterfacesDiagramProps {
  className?: string;
}

export function InterfacesDiagram({ className = '' }: InterfacesDiagramProps) {
  const [activePackage, setActivePackage] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<'host' | 'guest' | null>(null);

  const primaryColour = 'hsl(262, 70%, 60%)';
  const activePackageData = witPackages.find(p => p.id === activePackage);

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
            <path d="M8 13h2" />
            <path d="M8 17h2" />
            <path d="M14 13h2" />
            <path d="M14 17h2" />
          </svg>
          WIT INTERFACES
        </div>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          WebAssembly Interface Types defining host-guest contracts
        </p>
      </div>

      {/* Component Model Diagram */}
      <div className="relative mb-8">
        {/* Guest Side (Component) */}
        <div
          className={`
            p-4 rounded-xl border-2 mb-4 transition-all duration-300
            ${hoveredLayer === 'guest' ? 'scale-[1.01] shadow-lg' : ''}
          `}
          style={{
            borderColor: hoveredLayer === 'guest' ? 'hsl(142, 70%, 50%)' : 'hsl(142, 70%, 50%, 0.4)',
            background: 'linear-gradient(135deg, hsl(142, 70%, 50%, 0.08) 0%, hsl(142, 70%, 50%, 0.15) 100%)',
          }}
          onMouseEnter={() => setHoveredLayer('guest')}
          onMouseLeave={() => setHoveredLayer(null)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'hsl(142, 70%, 50%, 0.2)', color: 'hsl(142, 70%, 50%)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <rect x="7" y="7" width="3" height="9" />
                <rect x="14" y="7" width="3" height="5" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-foreground">Guest (Wasm Component)</div>
              <div className="text-xs text-muted-foreground">Exports functions, imports capabilities</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded text-xs font-mono bg-green-500/15 text-green-500">
              export handle()
            </span>
            <span className="px-2 py-1 rounded text-xs font-mono bg-green-500/15 text-green-500">
              export describe()
            </span>
          </div>
        </div>

        {/* WIT Contract Layer */}
        <div className="flex justify-center mb-4">
          <div
            className="px-6 py-3 rounded-xl border-2 text-center"
            style={{
              borderColor: primaryColour,
              background: `linear-gradient(135deg, ${primaryColour}15 0%, ${primaryColour}25 100%)`,
            }}
          >
            <div className="flex items-center gap-2 justify-center mb-1">
              <svg viewBox="0 0 24 24" fill="none" stroke={primaryColour} strokeWidth="2" className="w-4 h-4">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="font-bold text-sm" style={{ color: primaryColour }}>WIT Contract</span>
            </div>
            <div className="text-xs text-muted-foreground">Type-safe interface boundary</div>
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 100 40" className="w-24 h-8 text-muted-foreground">
            <defs>
              <marker id="arrowhead-up" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
              </marker>
              <marker id="arrowhead-down" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto-start-reverse">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
              </marker>
            </defs>
            <line x1="30" y1="5" x2="30" y2="35" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead-down)" strokeDasharray="4 2" />
            <line x1="70" y1="35" x2="70" y2="5" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead-up)" strokeDasharray="4 2" />
            <text x="20" y="22" fontSize="8" fill="currentColor">imports</text>
            <text x="60" y="22" fontSize="8" fill="currentColor">exports</text>
          </svg>
        </div>

        {/* Host Side (Runtime) */}
        <div
          className={`
            p-4 rounded-xl border-2 transition-all duration-300
            ${hoveredLayer === 'host' ? 'scale-[1.01] shadow-lg' : ''}
          `}
          style={{
            borderColor: hoveredLayer === 'host' ? 'hsl(186, 70%, 50%)' : 'hsl(186, 70%, 50%, 0.4)',
            background: 'linear-gradient(135deg, hsl(186, 70%, 50%, 0.08) 0%, hsl(186, 70%, 50%, 0.15) 100%)',
          }}
          onMouseEnter={() => setHoveredLayer('host')}
          onMouseLeave={() => setHoveredLayer(null)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'hsl(186, 70%, 50%, 0.2)', color: 'hsl(186, 70%, 50%)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-foreground">Host (Wasmtime Runtime)</div>
              <div className="text-xs text-muted-foreground">Provides capabilities to components</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded text-xs font-mono bg-cyan-500/15 text-cyan-500">
              import state
            </span>
            <span className="px-2 py-1 rounded text-xs font-mono bg-cyan-500/15 text-cyan-500">
              import secrets
            </span>
            <span className="px-2 py-1 rounded text-xs font-mono bg-cyan-500/15 text-cyan-500">
              import http
            </span>
            <span className="px-2 py-1 rounded text-xs font-mono bg-cyan-500/15 text-cyan-500">
              import mcp
            </span>
          </div>
        </div>
      </div>

      {/* WIT Packages Grid */}
      <div
        className="rounded-xl border overflow-hidden mb-6"
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
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          </svg>
          WIT PACKAGES
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {witPackages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setActivePackage(activePackage === pkg.id ? null : pkg.id)}
              onMouseEnter={() => setActivePackage(pkg.id)}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-left
                ${activePackage === pkg.id ? 'scale-[1.02] shadow-md' : 'hover:scale-[1.01]'}
              `}
              style={{
                borderColor: activePackage === pkg.id ? pkg.colour : `${pkg.colour}40`,
                background: `linear-gradient(135deg, ${pkg.colour}08 0%, ${pkg.colour}15 100%)`,
                boxShadow: activePackage === pkg.id ? `0 4px 15px ${pkg.colour}20` : undefined,
              }}
            >
              <div className="font-mono text-xs font-semibold mb-2" style={{ color: pkg.colour }}>
                {pkg.label}
              </div>
              <div className="flex flex-wrap gap-1">
                {pkg.interfaces.slice(0, 2).map((iface) => (
                  <span
                    key={iface}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                    style={{
                      backgroundColor: `${pkg.colour}15`,
                      color: pkg.colour,
                    }}
                  >
                    {iface}
                  </span>
                ))}
                {pkg.interfaces.length > 2 && (
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px]"
                    style={{ color: pkg.colour }}
                  >
                    +{pkg.interfaces.length - 2}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Package Description */}
      <AnimatePresence mode="wait">
        {activePackageData && (
          <motion.div
            key={activePackage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-6 p-4 rounded-lg border"
            style={{
              borderColor: `${activePackageData.colour}30`,
              background: `${activePackageData.colour}08`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${activePackageData.colour}20`, color: activePackageData.colour }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-sm font-semibold mb-1" style={{ color: activePackageData.colour }}>
                  {activePackageData.label}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {activePackageData.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activePackageData.interfaces.map((iface) => (
                    <span
                      key={iface}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{
                        backgroundColor: `${activePackageData.colour}15`,
                        color: activePackageData.colour,
                      }}
                    >
                      {iface}()
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benefits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '🔒', label: 'Type Safety', desc: 'Compile-time contracts' },
          { icon: '🔌', label: 'Portable', desc: 'Language agnostic' },
          { icon: '⚡', label: 'Zero Copy', desc: 'Efficient memory sharing' },
          { icon: '🛡️', label: 'Sandboxed', desc: 'Capability-based security' },
        ].map((benefit) => (
          <div
            key={benefit.label}
            className="p-3 rounded-lg border border-border bg-muted/30 text-center"
          >
            <div className="text-xl mb-1">{benefit.icon}</div>
            <div className="font-medium text-xs text-foreground">{benefit.label}</div>
            <div className="text-[10px] text-muted-foreground">{benefit.desc}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(142, 70%, 50%)' }} />
            <span className="font-medium">Guest (Component)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(186, 70%, 50%)' }} />
            <span className="font-medium">Host (Runtime)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: primaryColour }} />
            <span className="font-medium">WIT Contract</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterfacesDiagram;
