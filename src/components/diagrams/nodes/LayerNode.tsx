import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export interface LayerNodeData {
  label: string;
  description?: string;
  items?: string[];
  color?: string;
  active?: boolean;
  expanded?: boolean;
}

function LayerNodeComponent({ data }: NodeProps<LayerNodeData>) {
  const { label, description, items = [], color = 'hsl(166, 70%, 45%)', active, expanded } = data;

  return (
    <div
      className={`
        group relative rounded-xl border-2 bg-card overflow-hidden
        transition-all duration-300
        ${active ? 'shadow-glow scale-[1.02]' : 'hover:shadow-lg'}
        ${expanded ? 'min-w-[400px]' : 'min-w-[300px]'}
      `}
      style={{ borderColor: color }}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary !border-primary-foreground !w-3 !h-3" />

      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50" style={{ backgroundColor: `${color}15` }}>
        <div className="font-bold text-foreground">{label}</div>
        {description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}
      </div>

      {/* Items grid */}
      {items.length > 0 && (
        <div className="p-3 grid grid-cols-2 gap-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-3 py-2 text-xs rounded-md bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-primary !border-primary-foreground !w-3 !h-3" />
    </div>
  );
}

export const LayerNode = memo(LayerNodeComponent);
export default LayerNode;
