import { useState } from 'react';

interface DiffLine {
  type: 'add' | 'remove' | 'context';
  content: string;
  lineNumber?: number;
}

interface CodeDiffProps {
  filename: string;
  oldCode?: string;
  newCode?: string;
  diff?: DiffLine[];
  language?: string;
  className?: string;
}

function computeDiff(oldCode: string, newCode: string): DiffLine[] {
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  const diff: DiffLine[] = [];

  // Simple line-by-line diff (not a true diff algorithm)
  const maxLines = Math.max(oldLines.length, newLines.length);

  for (let i = 0; i < maxLines; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];

    if (oldLine === undefined && newLine !== undefined) {
      diff.push({ type: 'add', content: newLine, lineNumber: i + 1 });
    } else if (oldLine !== undefined && newLine === undefined) {
      diff.push({ type: 'remove', content: oldLine, lineNumber: i + 1 });
    } else if (oldLine !== newLine) {
      diff.push({ type: 'remove', content: oldLine || '', lineNumber: i + 1 });
      diff.push({ type: 'add', content: newLine || '', lineNumber: i + 1 });
    } else {
      diff.push({ type: 'context', content: oldLine || '', lineNumber: i + 1 });
    }
  }

  return diff;
}

export function CodeDiff({
  filename,
  oldCode,
  newCode,
  diff: providedDiff,
  language = 'typescript',
  className = '',
}: CodeDiffProps) {
  const [copied, setCopied] = useState(false);

  const diff = providedDiff || (oldCode && newCode ? computeDiff(oldCode, newCode) : []);

  const handleCopy = async () => {
    // Copy only the new/added lines
    const newContent = diff
      .filter((line) => line.type === 'add' || line.type === 'context')
      .map((line) => line.content)
      .join('\n');
    await navigator.clipboard.writeText(newContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLineStyle = (type: DiffLine['type']) => {
    switch (type) {
      case 'add':
        return 'bg-green-500/10 text-green-400';
      case 'remove':
        return 'bg-red-500/10 text-red-400 line-through opacity-60';
      case 'context':
        return 'text-muted-foreground';
    }
  };

  const getPrefix = (type: DiffLine['type']) => {
    switch (type) {
      case 'add':
        return '+';
      case 'remove':
        return '-';
      case 'context':
        return ' ';
    }
  };

  return (
    <div className={`code-block my-6 ${className}`}>
      {/* Header */}
      <div className="code-block-header">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-muted-foreground">
            <path d="M12 3v18" />
            <path d="m8 8 4-5 4 5" />
            <path d="m8 16 4 5 4-5" />
          </svg>
          <span className="text-sm font-medium text-foreground">{filename}</span>
          <span className="text-xs text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-green-500">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy new
            </>
          )}
        </button>
      </div>

      {/* Diff content */}
      <div className="code-block-content">
        <pre className="p-4 text-sm font-mono overflow-x-auto">
          <code>
            {diff.map((line, index) => (
              <div key={index} className={`flex ${getLineStyle(line.type)} -mx-4 px-4`}>
                <span className="select-none w-6 shrink-0 text-muted-foreground/50">
                  {getPrefix(line.type)}
                </span>
                <span>{line.content || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-green-500/20 border border-green-500/50" />
          <span className="text-muted-foreground">Added</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-500/20 border border-red-500/50" />
          <span className="text-muted-foreground">Removed</span>
        </div>
      </div>
    </div>
  );
}

export default CodeDiff;
