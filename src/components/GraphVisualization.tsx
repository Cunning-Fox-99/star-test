import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { GraphNode, GraphEdge } from '../types/GraphTypes';
import { nodeTypes, edgeTypes } from './nodeTypes'; // Импортируйте определенные типы

interface GraphVisualizationProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ nodes, edges }) => {
    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default GraphVisualization;
