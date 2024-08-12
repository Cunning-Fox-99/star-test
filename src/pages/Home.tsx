import React, { useState } from 'react';
import HeroList from '../components/HeroList';
import useHeroes from '../hooks/useHeroes';

// Обновите компонент Home для использования heroId
const Home: React.FC = () => {
    const heroId = '';
    const { heroes, loading } = useHeroes(heroId);

    return (
        <div>
            <HeroList heroes={heroes} loading={loading}  />
            {/* Передайте выбранного героя для отображения деталей */}
        </div>
    );
};

export default Home;
