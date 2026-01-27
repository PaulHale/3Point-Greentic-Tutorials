import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export interface PackNodeData {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

function PackNodeComponent({ data }: NodeProps<PackNodeData>) {
  const { label, description, icon, active } = data;

  return (
    <div
      className={`
        group relative px-4 py-3 rounded-lg border-2 bg-card
        transition-all duration-300 min-w-[140px]
        ${active ? 'border-[hsl(220,70%,50%)] shadow-[0_0_30px_hsl(220,70%,50%,0.3)] scale-105' : 'border-[hsl(220,70%,50%)] hover:shadow-lg hover:scale-102'}
      `}
    >
      <Handle type="target" position={Position.Top} className="!bg-[hsl(220,70%,50%)] !border-primary-foreground !w-3 !h-3" />

      <div className="flex items-center gap-2">
        {icon && <div className="text-[hsl(220,70%,50%)] shrink-0">{icon}</div>}
        <div>
          <div className="font-semibold text-sm text-foreground">{label}</div>
          {description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-[hsl(220,70%,50%,0.05)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <Handle type="source" position={Position.Bottom} className="!bg-[hsl(220,70%,50%)] !border-primary-foreground !w-3 !h-3" />
    </div>
  );
}

export const PackNode = memo(PackNodeComponent);
export default PackNode;
