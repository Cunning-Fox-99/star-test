import { useState, useEffect } from 'react';
import axios from 'axios';


interface Hero {
    id: string;
    name: string;
}

const useHeroes = (heroId: string) => {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('https://sw-api.starnavi.io/people/')
            .then(response => {
                setHeroes(response.data.results);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return { heroes, loading };
};

export default useHeroes;
