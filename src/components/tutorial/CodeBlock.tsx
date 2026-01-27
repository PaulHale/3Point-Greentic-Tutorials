import { useState, type ReactNode } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  caption?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  caption,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={`code-block my-6 ${className}`}>
      {/* Header */}
      {(filename || language) && (
        <div className="code-block-header">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-medium text-foreground">{filename}</span>
            )}
            {!filename && language && (
              <span className="text-xs text-muted-foreground uppercase">{language}</span>
            )}
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
                Copy
              </>
            )}
          </button>
        </div>
      )}

      {/* Code content */}
      <div className="code-block-content">
        <pre className="p-4 text-sm font-mono overflow-x-auto">
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={`flex ${isHighlighted ? 'bg-primary/10 -mx-4 px-4' : ''}`}
                >
                  {showLineNumbers && (
                    <span className="select-none text-muted-foreground/50 w-8 shrink-0 text-right pr-4">
                      {lineNumber}
                    </span>
                  )}
                  <span className={isHighlighted ? 'text-primary' : 'text-foreground'}>
                    {line || ' '}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Caption */}
      {caption && (
        <div className="px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
          {caption}
        </div>
      )}
    </div>
  );
}

export default CodeBlock;
