export interface GraphNode {
    id: string;
    type: string;
    data: {
        [key: string]: any;
    };
    position: { x: number; y: number };
    style?: React.CSSProperties;
}

export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    label?: string;
}
