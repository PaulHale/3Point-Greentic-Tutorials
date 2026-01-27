import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  colour: string;
}

const channels: Channel[] = [
  {
    id: 'teams',
    name: 'Teams',
    colour: 'hsl(255, 70%, 60%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.625 8.5h-5.25V6.625C15.375 5.175 14.2 4 12.75 4h-1.5c-1.45 0-2.625 1.175-2.625 2.625V8.5h-5.25A2.625 2.625 0 0 0 .75 11.125v6.75A2.625 2.625 0 0 0 3.375 20.5h17.25a2.625 2.625 0 0 0 2.625-2.625v-6.75A2.625 2.625 0 0 0 20.625 8.5zM10.875 6.625c0-.52.425-.938.938-.938h.375c.52 0 .937.418.937.938V8.5h-2.25V6.625z" />
      </svg>
    ),
  },
  {
    id: 'slack',
    name: 'Slack',
    colour: 'hsl(350, 70%, 55%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    colour: 'hsl(142, 70%, 45%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    id: 'telegram',
    name: 'Telegram',
    colour: 'hsl(200, 70%, 55%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    id: 'webchat',
    name: 'WebChat',
    colour: 'hsl(186, 70%, 55%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 'webex',
    name: 'Webex',
    colour: 'hsl(38, 92%, 55%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6a8.4 8.4 0 1 1 0 16.8 8.4 8.4 0 0 1 0-16.8zm0 2.4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
      </svg>
    ),
  },
];

interface MessagingArchitectureDiagramProps {
  className?: string;
}

export function MessagingArchitectureDiagram({ className = '' }: MessagingArchitectureDiagramProps) {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const gatewayColour = 'hsl(262, 70%, 60%)';
  const runnerColour = 'hsl(38, 92%, 55%)';

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Channel Clients */}
      <div className="mb-6">
        <div className="text-xs font-bold tracking-[0.2em] mb-4 text-muted-foreground text-center">
          CHANNEL CLIENTS
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onMouseEnter={() => setActiveChannel(channel.id)}
              onMouseLeave={() => setActiveChannel(null)}
              className={`
                px-4 py-3 rounded-xl border-2 transition-all duration-300 min-w-[100px]
                ${activeChannel === channel.id ? 'scale-105 shadow-lg' : 'hover:scale-[1.02]'}
              `}
              style={{
                borderColor: activeChannel === channel.id ? channel.colour : `${channel.colour}40`,
                background: `linear-gradient(135deg, ${channel.colour}08 0%, ${channel.colour}15 100%)`,
                boxShadow: activeChannel === channel.id ? `0 4px 20px ${channel.colour}30` : undefined,
              }}
            >
              <div
                className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${channel.colour}20`, color: channel.colour }}
              >
                {channel.icon}
              </div>
              <div className="font-semibold text-sm text-foreground">{channel.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Connector Arrows */}
      <div className="flex justify-center gap-6 mb-6">
        {channels.map((channel) => (
          <motion.div
            key={channel.id}
            animate={{
              opacity: activeChannel === channel.id ? 1 : 0.3,
              scale: activeChannel === channel.id ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill={activeChannel === channel.id ? channel.colour : 'currentColor'}
              className="w-5 h-5 text-muted-foreground"
            >
              <path d="M12 16l-8-8h16l-8 8z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Messaging Gateway */}
      <div
        className="rounded-xl border-2 overflow-hidden mb-6"
        style={{
          borderColor: gatewayColour,
          background: `linear-gradient(135deg, ${gatewayColour}08 0%, ${gatewayColour}15 100%)`,
        }}
      >
        <div
          className="px-4 py-2.5 text-xs font-bold tracking-[0.2em] border-b text-center"
          style={{ color: gatewayColour, borderColor: `${gatewayColour}30`, background: `${gatewayColour}10` }}
        >
          MESSAGING GATEWAY
        </div>
        <div className="p-4">
          <div className="flex flex-wrap justify-center gap-3">
            {channels.map((channel) => (
              <motion.div
                key={`adapter-${channel.id}`}
                animate={{
                  scale: activeChannel === channel.id ? 1.05 : 1,
                  opacity: activeChannel && activeChannel !== channel.id ? 0.5 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="px-3 py-2 rounded-lg border bg-card/90 text-center min-w-[90px]"
                style={{
                  borderColor: activeChannel === channel.id ? channel.colour : `${gatewayColour}40`,
                  boxShadow: activeChannel === channel.id ? `0 2px 12px ${channel.colour}30` : undefined,
                }}
              >
                <div className="text-xs font-semibold text-foreground">{channel.name}</div>
                <div className="text-[10px] mt-0.5" style={{ color: gatewayColour }}>
                  Adapter
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Connector Arrow */}
      <div className="flex justify-center mb-6">
        <motion.svg
          viewBox="0 0 24 24"
          fill={gatewayColour}
          className="w-8 h-8"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 20l-10-10h6V4h8v6h6l-10 10z" />
        </motion.svg>
      </div>

      {/* Flow Runner */}
      <div
        className="rounded-xl border-2 overflow-hidden"
        style={{
          borderColor: runnerColour,
          background: `linear-gradient(135deg, ${runnerColour}08 0%, ${runnerColour}15 100%)`,
        }}
      >
        <div
          className="px-4 py-3 text-center border-b"
          style={{ borderColor: `${runnerColour}30`, background: `${runnerColour}10` }}
        >
          <div className="text-xs font-bold tracking-[0.2em]" style={{ color: runnerColour }}>
            FLOW RUNNER
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Executes YGTC flows</div>
        </div>
        <div className="p-4">
          <div className="flex justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 border border-border">
              <svg viewBox="0 0 24 24" fill="none" stroke={runnerColour} strokeWidth="2" className="w-4 h-4">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span className="text-xs font-medium text-muted-foreground">Normalised Messages</span>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke={runnerColour} strokeWidth="2" className="w-5 h-5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 border border-border">
              <svg viewBox="0 0 24 24" fill="none" stroke={runnerColour} strokeWidth="2" className="w-4 h-4">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span className="text-xs font-medium text-muted-foreground">Component Execution</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        {activeChannel && (
          <motion.div
            key={activeChannel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6 p-4 rounded-lg text-center border"
            style={{
              borderColor: `${channels.find(c => c.id === activeChannel)?.colour}30`,
              background: `${channels.find(c => c.id === activeChannel)?.colour}08`,
            }}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold" style={{ color: channels.find(c => c.id === activeChannel)?.colour }}>
                {channels.find(c => c.id === activeChannel)?.name}:
              </span>{' '}
              Messages flow through the dedicated adapter, are normalised to a common format, and routed to the appropriate flow.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: gatewayColour }} />
            <span className="font-medium">Gateway</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: runnerColour }} />
            <span className="font-medium">Runner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {channels.slice(0, 3).map(c => (
                <div key={c.id} className="w-2 h-3 rounded-sm" style={{ backgroundColor: c.colour }} />
              ))}
            </div>
            <span className="font-medium">6 Channels</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagingArchitectureDiagram;
