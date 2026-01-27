import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SessionPhase = 'create' | 'active' | 'pause' | 'resume' | 'end';

interface SessionState {
  phase: SessionPhase;
  label: string;
  description: string;
}

const sessionStates: SessionState[] = [
  { phase: 'create', label: 'Create', description: 'New session initialised with tenant context' },
  { phase: 'active', label: 'Active', description: 'Processing messages and executing flow nodes' },
  { phase: 'pause', label: 'Pause', description: 'Session serialised and stored for later' },
  { phase: 'resume', label: 'Resume', description: 'Session restored from storage' },
  { phase: 'end', label: 'End', description: 'Session completed and cleaned up' },
];

const sessionData = {
  id: 'sess_abc123def456',
  tenant: 'acme-corp',
  team: 'support',
  user: 'user_789',
  flow: 'it-support-flow',
  node: 'collect_issue',
  created: '2024-01-15T10:30:00Z',
  variables: {
    issue_type: 'password_reset',
    priority: 'medium',
    attempts: 2,
  },
};

interface SessionDiagramProps {
  className?: string;
}

export function SessionDiagram({ className = '' }: SessionDiagramProps) {
  const [currentPhase, setCurrentPhase] = useState<SessionPhase>('create');
  const [isAnimating, setIsAnimating] = useState(true);

  const primaryColour = 'hsl(220, 70%, 55%)';
  const activeColour = 'hsl(142, 70%, 50%)';
  const pauseColour = 'hsl(38, 92%, 55%)';

  useEffect(() => {
    if (!isAnimating) return;

    const phases: SessionPhase[] = ['create', 'active', 'pause', 'resume', 'active', 'end'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % phases.length;
      setCurrentPhase(phases[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const currentState = sessionStates.find(s => s.phase === currentPhase);

  const getPhaseColour = (phase: SessionPhase) => {
    switch (phase) {
      case 'create':
      case 'end':
        return primaryColour;
      case 'active':
      case 'resume':
        return activeColour;
      case 'pause':
        return pauseColour;
    }
  };

  return (
    <div className={`p-6 md:p-8 rounded-xl border border-border bg-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider"
          style={{ backgroundColor: `${primaryColour}15`, color: primaryColour }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          SESSION LIFECYCLE
        </div>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm text-muted-foreground transition-colors"
        >
          {isAnimating ? (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Play
            </>
          )}
        </button>
      </div>

      {/* Lifecycle Flow */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {sessionStates.map((state, index) => (
          <div key={state.phase} className="flex items-center">
            <button
              onClick={() => {
                setIsAnimating(false);
                setCurrentPhase(state.phase);
              }}
              className={`
                relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 min-w-[80px]
                hover:scale-105
              `}
              style={{
                borderColor: currentPhase === state.phase ? getPhaseColour(state.phase) : 'hsl(220, 15%, 25%)',
                background: currentPhase === state.phase
                  ? `linear-gradient(135deg, ${getPhaseColour(state.phase)}15 0%, ${getPhaseColour(state.phase)}25 100%)`
                  : 'transparent',
                boxShadow: currentPhase === state.phase ? `0 4px 20px ${getPhaseColour(state.phase)}30` : undefined,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all"
                style={{
                  backgroundColor: currentPhase === state.phase ? `${getPhaseColour(state.phase)}30` : 'hsl(220, 15%, 20%)',
                  color: currentPhase === state.phase ? getPhaseColour(state.phase) : 'hsl(220, 15%, 50%)',
                }}
              >
                {state.phase === 'create' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                )}
                {state.phase === 'active' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
                {state.phase === 'pause' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                )}
                {state.phase === 'resume' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                )}
                {state.phase === 'end' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                )}
              </div>
              <span
                className="text-xs font-semibold transition-colors"
                style={{ color: currentPhase === state.phase ? getPhaseColour(state.phase) : 'hsl(220, 15%, 60%)' }}
              >
                {state.label}
              </span>
            </button>
            {index < sessionStates.length - 1 && (
              <svg viewBox="0 0 24 24" fill="none" stroke="hsl(220, 15%, 35%)" strokeWidth="2" className="w-6 h-6 mx-2 shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Current State Description */}
      <AnimatePresence mode="wait">
        {currentState && (
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-6 p-4 rounded-lg text-center border"
            style={{
              borderColor: `${getPhaseColour(currentPhase)}30`,
              background: `${getPhaseColour(currentPhase)}08`,
            }}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold" style={{ color: getPhaseColour(currentPhase) }}>
                {currentState.label}:
              </span>{' '}
              {currentState.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session Data Preview */}
      <div
        className="rounded-xl border overflow-hidden"
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          SESSION DATA
        </div>
        <div className="p-4 font-mono text-xs bg-background/50">
          <pre className="text-muted-foreground overflow-x-auto">
{`{
  "id": "${sessionData.id}",
  "tenant": "${sessionData.tenant}",
  "team": "${sessionData.team}",
  "user": "${sessionData.user}",
  "flow": "${sessionData.flow}",
  "current_node": "${sessionData.node}",
  "created": "${sessionData.created}",
  "variables": {
    "issue_type": "${sessionData.variables.issue_type}",
    "priority": "${sessionData.variables.priority}",
    "attempts": ${sessionData.variables.attempts}
  }
}`}
          </pre>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: primaryColour }} />
            <span className="font-medium">Lifecycle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: activeColour }} />
            <span className="font-medium">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: pauseColour }} />
            <span className="font-medium">Paused</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionDiagram;
