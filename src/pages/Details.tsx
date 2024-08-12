
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import GraphVisualization from '../components/GraphVisualization';
import { GraphNode, GraphEdge } from '../types/GraphTypes';

interface Hero {
    name?: string;
    starships: string[];
    films: string[];
}

interface Starship {
    url: string;
    name: string;
}

interface Film {
    url: string;
    title: string;
}

const Details: React.FC = () => {
    const { heroId } = useParams<{ heroId: string }>();
    const [hero, setHero] = useState<Hero | null>(null);
    const [loading, setLoading] = useState(true);
    const [starships, setStarships] = useState<Starship[]>([]);
    const [films, setFilms] = useState<Film[]>([]);

    const fetchHeroDetails = async (id: string) => {
        const response = await fetch(`https://sw-api.starnavi.io/people/${id}/`);
        const data: Hero = await response.json();
        console.log(data)
        setHero(data);
        setLoading(false);
        return data;
    };

    const fetchStarships = async (urls: string[]) => {
        const starshipPromises = urls.map((url: string) => fetch(`https://sw-api.starnavi.io/starships/${url}/`).then(res => res.json()));
        const starshipsData = await Promise.all(starshipPromises);
        setStarships(starshipsData);
    };

    const fetchFilms = async (urls: string[]) => {
        const filmPromises = urls.map((url: string) => fetch(`https://sw-api.starnavi.io/films/${url}/`).then(res => res.json()));
        const filmsData = await Promise.all(filmPromises);
        setFilms(filmsData);
    };

    const fetchRelatedData = async () => {
        if (heroId) {
            const heroData = await fetchHeroDetails(heroId);
            console.log(heroData)

            await fetchStarships(heroData.starships);


            await fetchFilms(heroData.films);
        }
    };

    useEffect(() => {
        fetchRelatedData();
    }, [heroId]);

    if (loading) return <div>Loading...</div>;

    // Генерация узлов для графа
    const nodes: GraphNode[] = [
        {
            id: heroId || '',
            type: 'hero',
            data: {}, // Можно заменить на реальные данные
            position: { x: 0, y: 0 } // Можно заменить на реальные координаты
        },
        ...starships.map(starship => ({
            id: starship.url,
            type: 'starship',
            data: {},
            position: { x: 0, y: 0 }
        })),
        ...films.map(film => ({
            id: film.url,
            type: 'film',
            data: {},
            position: { x: 0, y: 0 }
        }))
    ];

    // Генерация рёбер для графа
    const edges: GraphEdge[] = heroId ? [
        ...starships.map(starship => ({
            id: `edge-${heroId}-${starship.url}`,
            source: heroId,
            target: starship.url,
            label: 'Piloted'
        })),
        ...films.map(film => ({
            id: `edge-${heroId}-${film.url}`,
            source: heroId,
            target: film.url,
            label: 'Appeared in'
        }))
    ] : [];

    return (
        <div>
            <h1>{hero?.name || 'Неизвестен'}</h1>
            <h2>Starships</h2>
            <ul>
                {starships.map(starship => (
                    <li key={starship.url}>{starship.name || 'Неизвестен'}</li>
                ))}
            </ul>
            <h2>Films</h2>
            <ul>
                {films.map(film => (
                    <li key={film.url}>{film.title || 'Неизвестен'}</li>
                ))}
            </ul>
            {/*<GraphVisualization nodes={nodes} edges={edges} />*/}
        </div>
    );
};

export default Details;
