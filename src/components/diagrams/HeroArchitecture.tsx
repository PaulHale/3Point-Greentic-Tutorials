import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
  MarkerType,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ComponentNode, type ComponentNodeData } from './nodes/ComponentNode';
import { FlowNode, type FlowNodeData } from './nodes/FlowNode';
import { PackNode, type PackNodeData } from './nodes/PackNode';

// Icons as simple SVG components
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const WorkflowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const nodeTypes: NodeTypes = {
  component: ComponentNode,
  flow: FlowNode,
  pack: PackNode,
};

const initialNodes: Node<ComponentNodeData | FlowNodeData | PackNodeData>[] = [
  // Components row - 60px gaps between ~170px wide nodes
  {
    id: 'llm',
    type: 'component',
    position: { x: 0, y: 0 },
    data: { label: 'LLM Component', description: 'OpenAI, Claude, Ollama', icon: <CodeIcon /> },
  },
  {
    id: 'card',
    type: 'component',
    position: { x: 230, y: 0 },
    data: { label: 'Adaptive Card', description: 'Rich UI', icon: <CodeIcon /> },
  },
  {
    id: 'script',
    type: 'component',
    position: { x: 420, y: 0 },
    data: { label: 'Script', description: 'Rhai Engine', icon: <CodeIcon /> },
  },

  // Flows row - centered between their source components
  {
    id: 'flow-qa',
    type: 'flow',
    position: { x: 80, y: 130 },
    data: { label: 'QA Flow', description: 'Structured Q&A', icon: <WorkflowIcon /> },
  },
  {
    id: 'flow-support',
    type: 'flow',
    position: { x: 295, y: 130 },
    data: { label: 'Support Flow', description: 'IT Helpdesk', icon: <WorkflowIcon /> },
  },

  // Pack node - centered below
  {
    id: 'pack',
    type: 'pack',
    position: { x: 165, y: 260 },
    data: { label: 'Digital Worker Pack', description: 'Signed & Versioned', icon: <PackageIcon /> },
  },
];

const initialEdges: Edge[] = [
  // Components to Flows
  { id: 'llm-qa', source: 'llm', target: 'flow-qa', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'card-qa', source: 'card', target: 'flow-qa', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'card-support', source: 'card', target: 'flow-support', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'script-support', source: 'script', target: 'flow-support', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },

  // Flows to Pack
  { id: 'qa-pack', source: 'flow-qa', target: 'pack', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'support-pack', source: 'flow-support', target: 'pack', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

interface HeroArchitectureProps {
  className?: string;
  onNodeClick?: (nodeId: string) => void;
}

export function HeroArchitecture({ className = '', onNodeClick }: HeroArchitectureProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node.id);
      }

      // Highlight the clicked node
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            active: n.id === node.id,
          },
        }))
      );
    },
    [onNodeClick, setNodes]
  );

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  return (
    <div className={`w-full h-[400px] rounded-xl overflow-hidden border border-border bg-card/50 ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={proOptions}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="hsl(220, 15%, 20%)" gap={20} size={1} />
        <Controls
          showInteractive={false}
          className="!bg-card !border-border !shadow-soft [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-muted-foreground hover:[&>button]:!bg-muted [&>button]:!w-7 [&>button]:!h-7"
        />
      </ReactFlow>
    </div>
  );
}

export default HeroArchitecture;
