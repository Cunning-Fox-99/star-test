import React from 'react';
import { NodeProps } from 'react-flow-renderer';

interface HeroNodeData {
    name: string;
}

interface StarshipNodeData {
    name: string;
}

interface FilmNodeData {
    title: string;
}


export const HeroNode: React.FC<NodeProps<HeroNodeData>> = ({ data }) => (
    <div style={{ padding: 10, border: '1px solid #000', borderRadius: 5 }}>
        <strong>{data.name}</strong>
    </div>
);


export const StarshipNode: React.FC<NodeProps<StarshipNodeData>> = ({ data }) => (
    <div style={{ padding: 10, border: '1px solid #000', borderRadius: 5 }}>
        <strong>{data.name}</strong>
    </div>
);


export const FilmNode: React.FC<NodeProps<FilmNodeData>> = ({ data }) => (
    <div style={{ padding: 10, border: '1px solid #000', borderRadius: 5 }}>
        <strong>{data.title}</strong>
    </div>
);
