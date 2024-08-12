import { useState, useEffect } from 'react';
import axios from 'axios';

interface Hero {
    id: string;
    name: string;
}


interface HeroDetails {
    hero: Hero | null; // Герой может быть null до загрузки
    loading: boolean;
}

const useHeroDetails = (heroId: string): HeroDetails => {
    const [hero, setHero] = useState<Hero | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`https://sw-api.starnavi.io/people/${heroId}`)
            .then(response => {
                setHero(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [heroId]);

    return { hero, loading };
};

export default useHeroDetails;
