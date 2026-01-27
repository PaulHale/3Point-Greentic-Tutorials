import { useCallback, useState, useMemo } from 'react';
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
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { LayerNode, type LayerNodeData } from './nodes/LayerNode';

const nodeTypes: NodeTypes = {
  layer: LayerNode,
};

interface Layer {
  id: string;
  label: string;
  description: string;
  items: string[];
  color: string;
  y: number;
}

const layers: Layer[] = [
  {
    id: 'dev-experience',
    label: 'Developer Experience',
    description: 'Tools for building and testing',
    items: ['greentic-dev', 'greentic-gui', 'greentic-webchat', 'IDE Plugins'],
    color: 'hsl(166, 70%, 45%)',
    y: 0,
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain',
    description: 'Build, store, and distribute',
    items: ['Repo (build)', 'Store (catalog)', 'Distributor'],
    color: 'hsl(186, 70%, 50%)',
    y: 150,
  },
  {
    id: 'runtime',
    label: 'Runtime',
    description: 'Execution and state management',
    items: ['Runner', 'Session', 'State', 'MCP Exec'],
    color: 'hsl(220, 70%, 50%)',
    y: 300,
  },
  {
    id: 'integration',
    label: 'Integration',
    description: 'External connectivity',
    items: ['Messaging (6 channels)', 'Events (webhook)', 'OAuth Broker'],
    color: 'hsl(280, 70%, 50%)',
    y: 450,
  },
  {
    id: 'foundation',
    label: 'Foundation',
    description: 'Core shared libraries',
    items: ['greentic-types', 'greentic-interfaces', 'greentic-telemetry'],
    color: 'hsl(340, 70%, 50%)',
    y: 600,
  },
];

const createNodes = (expanded: string | null): Node<LayerNodeData>[] =>
  layers.map((layer) => ({
    id: layer.id,
    type: 'layer',
    position: { x: 50, y: layer.y },
    data: {
      label: layer.label,
      description: layer.description,
      items: layer.items,
      color: layer.color,
      active: expanded === layer.id,
      expanded: expanded === layer.id,
    },
  }));

const createEdges = (): Edge[] => {
  const edges: Edge[] = [];
  for (let i = 0; i < layers.length - 1; i++) {
    edges.push({
      id: `${layers[i].id}-${layers[i + 1].id}`,
      source: layers[i].id,
      target: layers[i + 1].id,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(220, 15%, 40%)' },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(220, 15%, 40%)' },
    });
  }
  return edges;
};

interface LayeredArchitectureProps {
  className?: string;
  onLayerClick?: (layerId: string) => void;
}

export function LayeredArchitecture({ className = '', onLayerClick }: LayeredArchitectureProps) {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const initialNodes = useMemo(() => createNodes(expandedLayer), [expandedLayer]);
  const initialEdges = useMemo(() => createEdges(), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const newExpanded = expandedLayer === node.id ? null : node.id;
      setExpandedLayer(newExpanded);

      if (onLayerClick) {
        onLayerClick(node.id);
      }

      // Update nodes with new expanded state
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            active: n.id === node.id && newExpanded !== null,
            expanded: n.id === node.id && newExpanded !== null,
          },
        }))
      );
    },
    [expandedLayer, onLayerClick, setNodes]
  );

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  const layerDescriptions: Record<string, string> = {
    'dev-experience':
      'The Developer Experience layer provides all the tools developers need to build, test, and debug their digital workers. This includes the CLI, GUI editor, webchat for testing, and IDE plugins for popular editors.',
    'supply-chain':
      'The Supply Chain layer handles the entire lifecycle of packs from build to deployment. Components are compiled, manifests are validated, packs are signed and stored in the catalog, then distributed to runners.',
    runtime:
      'The Runtime layer executes flows and manages state. The Runner orchestrates component execution, Session tracks conversation state, State provides key-value storage, and MCP Exec handles tool calls.',
    integration:
      'The Integration layer connects digital workers to the outside world. Messaging supports 6 channels, Events handles webhooks and triggers, and OAuth Broker manages authentication with external services.',
    foundation:
      'The Foundation layer provides shared primitives used by all other layers. Types define core data structures, Interfaces specify WIT contracts, and Telemetry provides observability.',
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-border bg-card/50 ${className}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Diagram */}
        <div className="flex-1 h-[700px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={proOptions}
            nodesDraggable={false}
            nodesConnectable={false}
            panOnDrag={true}
            zoomOnScroll={true}
            zoomOnDoubleClick={false}
            minZoom={0.3}
            maxZoom={1.5}
          >
            <Background color="hsl(220, 15%, 20%)" gap={20} size={1} />
            <Controls showInteractive={false} className="!bg-card !border-border !shadow-soft" />
            <Panel position="top-left" className="!m-4">
              <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-sm text-muted-foreground">
                Click a layer to expand details
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Detail Panel */}
        {expandedLayer && (
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {layers.find((l) => l.id === expandedLayer)?.label}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{layerDescriptions[expandedLayer]}</p>

            <h4 className="text-sm font-medium text-foreground mb-2">Components</h4>
            <ul className="space-y-2">
              {layers
                .find((l) => l.id === expandedLayer)
                ?.items.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: layers.find((l) => l.id === expandedLayer)?.color }}
                    />
                    {item}
                  </li>
                ))}
            </ul>

            <button
              onClick={() => setExpandedLayer(null)}
              className="mt-6 text-sm text-primary hover:underline"
            >
              Close panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LayeredArchitecture;
