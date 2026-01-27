import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
  delay?: number;
}

interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  autoPlay?: boolean;
  className?: string;
}

export function Terminal({ lines, title = 'Terminal', autoPlay = true, className = '' }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying || currentIndex >= lines.length) return;

    const line = lines[currentIndex];
    const delay = line.delay ?? (line.type === 'command' ? 500 : 100);

    const timeout = setTimeout(() => {
      setVisibleLines((prev) => [...prev, line]);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isPlaying, currentIndex, lines]);

  const handleReplay = () => {
    setVisibleLines([]);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const getLineStyle = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-[#7aa2f7]';
      case 'output':
        return 'text-[#a9b1d6]';
      case 'error':
        return 'text-[#f7768e]';
      case 'success':
        return 'text-[#9ece6a]';
    }
  };

  const getPrefix = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return '$ ';
      default:
        return '';
    }
  };

  return (
    <div className={`terminal my-6 ${className}`}>
      {/* Header */}
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <div className="terminal-dot bg-[#ff5f56]" />
          <div className="terminal-dot bg-[#ffbd2e]" />
          <div className="terminal-dot bg-[#27c93f]" />
        </div>
        <span className="text-xs text-[#565f89] ml-3">{title}</span>
        <div className="flex-1" />
        <button
          onClick={handleReplay}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#565f89] hover:text-[#a9b1d6] hover:bg-[#1f2335] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
          Replay
        </button>
      </div>

      {/* Content */}
      <div className="terminal-content min-h-[120px]">
        <AnimatePresence>
          {visibleLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`font-mono text-sm ${getLineStyle(line.type)}`}
            >
              <span className="text-[#565f89]">{getPrefix(line.type)}</span>
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing cursor */}
        {isPlaying && currentIndex < lines.length && (
          <motion.span
            className="inline-block w-2 h-4 bg-[#7aa2f7] ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}

        {/* Completed indicator */}
        {currentIndex >= lines.length && visibleLines.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#2a2b3d] text-xs text-[#565f89]">
            Command completed
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
