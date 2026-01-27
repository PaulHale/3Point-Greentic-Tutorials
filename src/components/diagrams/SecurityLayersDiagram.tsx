interface SecurityLayer {
  title: string;
  subtitle: string;
  colour: string;
  icon: React.ReactNode;
}

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const layers: SecurityLayer[] = [
  {
    title: 'Network Security',
    subtitle: 'mTLS, firewall, rate limiting',
    colour: 'hsl(186, 70%, 55%)',
    icon: <ShieldIcon />,
  },
  {
    title: 'Authentication Layer',
    subtitle: 'OAuth, API keys, SAML/OIDC',
    colour: 'hsl(262, 70%, 60%)',
    icon: <KeyIcon />,
  },
  {
    title: 'Authorisation Layer',
    subtitle: 'RBAC, tenant isolation, scopes',
    colour: 'hsl(38, 92%, 55%)',
    icon: <UsersIcon />,
  },
  {
    title: 'Execution Sandbox',
    subtitle: 'Wasm isolation, capabilities',
    colour: 'hsl(142, 70%, 50%)',
    icon: <BoxIcon />,
  },
  {
    title: 'Data Protection',
    subtitle: 'Encryption, secrets, audit',
    colour: 'hsl(220, 70%, 60%)',
    icon: <LockIcon />,
  },
];

interface SecurityLayersDiagramProps {
  className?: string;
}

export function SecurityLayersDiagram({ className = '' }: SecurityLayersDiagramProps) {
  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Outer Shield Container */}
      <div
        className="relative rounded-2xl border-2 p-6 overflow-hidden"
        style={{
          borderColor: 'hsl(186, 70%, 55%)',
          background: 'linear-gradient(180deg, hsl(186, 70%, 55%, 0.05) 0%, hsl(220, 70%, 60%, 0.05) 100%)',
        }}
      >
        {/* Defence in Depth Label */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-card border border-border text-xs font-bold tracking-wider text-muted-foreground">
          DEFENCE IN DEPTH
        </div>

        {/* Layers Stack */}
        <div className="mt-6 space-y-3">
          {layers.map((layer, index) => (
            <div
              key={layer.title}
              className="group relative rounded-xl border-2 p-4 transition-all hover:scale-[1.01] hover:shadow-lg cursor-default"
              style={{
                borderColor: layer.colour,
                background: `linear-gradient(90deg, ${layer.colour}15 0%, ${layer.colour}08 50%, ${layer.colour}15 100%)`,
                marginLeft: `${index * 8}px`,
                marginRight: `${index * 8}px`,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${layer.colour}20`,
                    color: layer.colour,
                  }}
                >
                  {layer.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground">{layer.title}</div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: layer.colour }}
                  >
                    {layer.subtitle}
                  </div>
                </div>

                {/* Layer Number */}
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: `${layer.colour}20`,
                    color: layer.colour,
                  }}
                >
                  {index + 1}
                </div>
              </div>

              {/* Connector Line */}
              {index < layers.length - 1 && (
                <div
                  className="absolute left-1/2 -bottom-3 w-0.5 h-3 -translate-x-1/2"
                  style={{ backgroundColor: layer.colour }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Protected Core Label */}
        <div className="mt-6 flex justify-center">
          <div
            className="px-6 py-2 rounded-lg border-2 text-sm font-semibold"
            style={{
              borderColor: 'hsl(142, 70%, 50%)',
              backgroundColor: 'hsl(142, 70%, 50%, 0.1)',
              color: 'hsl(142, 70%, 50%)',
            }}
          >
            ✓ Protected Workload
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        {layers.map((layer) => (
          <div key={layer.title} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: layer.colour }}
            />
            <span className="text-muted-foreground font-medium truncate">
              {layer.title.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecurityLayersDiagram;
