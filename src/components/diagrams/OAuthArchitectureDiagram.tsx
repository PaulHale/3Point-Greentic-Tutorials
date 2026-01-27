import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Provider {
  id: string;
  name: string;
  icon: React.ReactNode;
  colour: string;
}

const AppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 9h6M9 13h6M9 17h4" />
  </svg>
);

const BrokerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// Official brand icons - paths from SimpleIcons (MIT licensed)
const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#F25022" d="M0 0h11.377v11.377H0z" />
    <path fill="#7FBA00" d="M12.623 0H24v11.377H12.623z" />
    <path fill="#00A4EF" d="M0 12.623h11.377V24H0z" />
    <path fill="#FFB900" d="M12.623 12.623H24V24H12.623z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
    <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
    <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.524 2.521h-2.52V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
    <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.52A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.524v-2.52h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);

const OktaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#007DC1" d="M12 0C5.389 0 0 5.389 0 12s5.389 12 12 12 12-5.389 12-12S18.611 0 12 0zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" />
  </svg>
);

const Auth0Icon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#EB5424" d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.552c3.755-2.81 5.182-7.688 3.815-12.015l-6.16 4.58 2.343 7.45-6.157-4.597-6.158 4.58 2.358-7.433-6.188-4.55 7.63-.045L12.008 0l2.356 7.404 7.615.044z" />
  </svg>
);

const KeycloakIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4D4D4D" d="M18.616 2.97L12 0 5.384 2.97 0 12l5.384 9.03L12 24l6.616-2.97L24 12l-5.384-9.03zM12 18.604a6.604 6.604 0 110-13.208 6.604 6.604 0 010 13.208z" />
    <circle fill="#008AAA" cx="12" cy="12" r="4.5" />
  </svg>
);

// Providers grouped by mode: Automated (full provisioning) vs Guided (manual setup)
const providers: Provider[] = [
  // Automated providers (can create apps, manage redirects, rotate secrets)
  {
    id: 'microsoft',
    name: 'Microsoft Entra ID',
    colour: 'hsl(207, 90%, 54%)',
    icon: <MicrosoftIcon />,
  },
  {
    id: 'okta',
    name: 'Okta',
    colour: 'hsl(200, 100%, 38%)',
    icon: <OktaIcon />,
  },
  {
    id: 'auth0',
    name: 'Auth0',
    colour: 'hsl(14, 84%, 53%)',
    icon: <Auth0Icon />,
  },
  {
    id: 'keycloak',
    name: 'Keycloak',
    colour: 'hsl(189, 100%, 33%)',
    icon: <KeycloakIcon />,
  },
  // Guided providers (credentials provided manually)
  {
    id: 'google',
    name: 'Google',
    colour: 'hsl(217, 89%, 61%)',
    icon: <GoogleIcon />,
  },
  {
    id: 'github',
    name: 'GitHub',
    colour: 'hsl(0, 0%, 60%)',
    icon: <GitHubIcon />,
  },
  {
    id: 'slack',
    name: 'Slack',
    colour: 'hsl(350, 70%, 55%)',
    icon: <SlackIcon />,
  },
];

const flowSteps = [
  { num: 1, label: 'Request OAuth flow', from: 'app', to: 'broker' },
  { num: 2, label: 'Generate PKCE + signed state', from: 'broker', to: 'broker' },
  { num: 3, label: 'User consents', from: 'broker', to: 'provider' },
  { num: 4, label: 'Exchange code for tokens', from: 'provider', to: 'broker' },
  { num: 5, label: 'Encrypt & store tokens', from: 'broker', to: 'secrets' },
  { num: 6, label: 'Return token handle', from: 'broker', to: 'app' },
];

interface OAuthArchitectureDiagramProps {
  className?: string;
}

export function OAuthArchitectureDiagram({ className = '' }: OAuthArchitectureDiagramProps) {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const appColour = 'hsl(186, 70%, 55%)';
  const brokerColour = 'hsl(262, 70%, 60%)';
  const secretsColour = 'hsl(38, 92%, 55%)';

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Main Architecture Flow */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* App/SDK */}
        <motion.div
          className="rounded-xl border-2 p-4"
          style={{
            borderColor: appColour,
            background: `linear-gradient(135deg, ${appColour}08 0%, ${appColour}15 100%)`,
          }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="p-2.5 rounded-lg"
              style={{ backgroundColor: `${appColour}20`, color: appColour }}
            >
              <AppIcon />
            </div>
            <div>
              <div className="font-bold text-foreground">App / SDK</div>
              <div className="text-xs" style={{ color: appColour }}>Client Application</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Initiates OAuth flows and receives signed token handles for API access
          </div>
        </motion.div>

        {/* OAuth Broker */}
        <motion.div
          className="rounded-xl border-2 p-4 relative"
          style={{
            borderColor: brokerColour,
            background: `linear-gradient(135deg, ${brokerColour}08 0%, ${brokerColour}15 100%)`,
          }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="p-2.5 rounded-lg"
              style={{ backgroundColor: `${brokerColour}20`, color: brokerColour }}
            >
              <BrokerIcon />
            </div>
            <div>
              <div className="font-bold text-foreground">OAuth Broker</div>
              <div className="text-xs" style={{ color: brokerColour }}>HTTP / NATS / WIT</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Manages handshakes, stores credentials, provides token contracts
          </div>
          {/* Connector badges */}
          <div className="flex gap-2 mt-3">
            {['HTTP', 'NATS', 'WIT'].map((protocol) => (
              <span
                key={protocol}
                className="px-2 py-0.5 rounded text-[10px] font-bold"
                style={{ backgroundColor: `${brokerColour}20`, color: brokerColour }}
              >
                {protocol}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Provider */}
        <div
          className="rounded-xl border-2 p-4"
          style={{
            borderColor: activeProvider
              ? providers.find((p) => p.id === activeProvider)?.colour
              : 'hsl(220, 15%, 40%)',
            background: activeProvider
              ? `linear-gradient(135deg, ${providers.find((p) => p.id === activeProvider)?.colour}08 0%, ${providers.find((p) => p.id === activeProvider)?.colour}15 100%)`
              : 'linear-gradient(135deg, hsl(220, 15%, 40%, 0.08) 0%, hsl(220, 15%, 40%, 0.15) 100%)',
            transition: 'all 0.3s ease',
          }}
        >
          <div className="text-xs font-bold tracking-[0.15em] mb-3 text-muted-foreground">
            IDENTITY PROVIDERS
          </div>
          <div className="flex flex-wrap gap-2">
            {providers.map((provider) => (
              <motion.button
                key={provider.id}
                onMouseEnter={() => setActiveProvider(provider.id)}
                onMouseLeave={() => setActiveProvider(null)}
                className="p-2 rounded-lg border transition-all"
                style={{
                  borderColor:
                    activeProvider === provider.id ? provider.colour : `${provider.colour}40`,
                  backgroundColor:
                    activeProvider === provider.id ? `${provider.colour}20` : `${provider.colour}08`,
                  color: provider.colour,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {provider.icon}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeProvider && (
              <motion.div
                key={activeProvider}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-3 text-sm font-medium"
                style={{ color: providers.find((p) => p.id === activeProvider)?.colour }}
              >
                {providers.find((p) => p.id === activeProvider)?.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Flow Arrows */}
      <div className="hidden md:flex justify-center items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 24 24" fill={appColour} className="w-6 h-6">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
          <span className="text-xs text-muted-foreground">Request</span>
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Consent</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <svg viewBox="0 0 24 24" fill={brokerColour} className="w-6 h-6">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg viewBox="0 0 24 24" fill={secretsColour} className="w-6 h-6 rotate-180">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
          <span className="text-xs text-muted-foreground">Token Handle</span>
        </div>
      </div>

      {/* Secrets Store */}
      <div className="flex justify-center mb-8">
        <motion.div
          className="rounded-xl border-2 p-4 max-w-md w-full"
          style={{
            borderColor: secretsColour,
            background: `linear-gradient(135deg, ${secretsColour}08 0%, ${secretsColour}15 100%)`,
          }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center gap-4">
            <div
              className="p-2.5 rounded-lg"
              style={{ backgroundColor: `${secretsColour}20`, color: secretsColour }}
            >
              <ShieldIcon />
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground">Secrets Store</div>
              <div className="text-xs" style={{ color: secretsColour }}>
                JWE-encrypted tokens · Automatic refresh
              </div>
            </div>
            <div
              className="p-2.5 rounded-lg"
              style={{ backgroundColor: `${secretsColour}20`, color: secretsColour }}
            >
              <KeyIcon />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flow Steps */}
      <div className="border-t border-border pt-6">
        <div className="text-xs font-bold tracking-[0.15em] mb-4 text-center text-muted-foreground">
          OAUTH FLOW SEQUENCE
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {flowSteps.map((step) => (
            <motion.div
              key={step.num}
              className="relative rounded-lg border p-3 cursor-default transition-all"
              style={{
                borderColor: activeStep === step.num ? brokerColour : 'hsl(220, 15%, 25%)',
                backgroundColor:
                  activeStep === step.num ? `${brokerColour}15` : 'hsl(220, 15%, 15%, 0.3)',
              }}
              onMouseEnter={() => setActiveStep(step.num)}
              onMouseLeave={() => setActiveStep(null)}
              whileHover={{ y: -2 }}
            >
              <div
                className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: activeStep === step.num ? brokerColour : 'hsl(220, 15%, 35%)',
                  color: 'white',
                }}
              >
                {step.num}
              </div>
              <div className="text-xs text-muted-foreground mt-2 leading-tight">{step.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: appColour }} />
            <span className="font-medium">Client App</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: brokerColour }} />
            <span className="font-medium">OAuth Broker</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: secretsColour }} />
            <span className="font-medium">Secrets Store</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {providers.slice(0, 4).map((p) => (
                <div key={p.id} className="w-2 h-3 rounded-sm" style={{ backgroundColor: p.colour }} />
              ))}
            </div>
            <span className="font-medium">7 Providers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OAuthArchitectureDiagram;
