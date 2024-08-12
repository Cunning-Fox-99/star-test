import { useState, useEffect } from 'react';
import axios from 'axios';

interface HeroDetails {
    name: string;
    films: string[];
    starships: string[];
}

const useHeroDetails = (heroId: string) => {
    const [hero, setHero] = useState<HeroDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`https://sw-api.starnavi.io/people/${heroId}/`)
            .then(response => {
                setHero(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [heroId]);

    return { hero, loading };
};

export default useHeroDetails;
