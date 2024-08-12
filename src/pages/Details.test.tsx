import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Details from './Details';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Мокаем глобальный fetch
global.fetch = jest.fn();

const mockHeroData = {
    name: 'Luke Skywalker',
    starships: ['12', '22'],
    films: ['2', '6'],
};

const mockStarshipData = [
    { url: '12', name: 'X-wing' },
    { url: '22', name: 'Imperial shuttle' },
];

const mockFilmData = [
    { url: '2', title: 'The Empire Strikes Back' },
    { url: '6', title: 'Return of the Jedi' },
];

describe('Details Component', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockImplementation((url: string) => {
            if (url.includes('people')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockHeroData),
                });
            } else if (url.includes('starships')) {
                const id = url.split('/').pop();
                const starship = mockStarshipData.find((s) => s.url === id);
                return Promise.resolve({
                    json: () => Promise.resolve(starship),
                });
            } else if (url.includes('films')) {
                const id = url.split('/').pop();
                const film = mockFilmData.find((f) => f.url === id);
                return Promise.resolve({
                    json: () => Promise.resolve(film),
                });
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders hero details', async () => {
        render(
            <MemoryRouter initialEntries={['/details/1']}>
                <Routes>
                    <Route path="/details/:heroId" element={<Details />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());

        expect(screen.getByText('Starships')).toBeInTheDocument();
        expect(screen.getByText('X-wing')).toBeInTheDocument();
        expect(screen.getByText('Imperial shuttle')).toBeInTheDocument();

        expect(screen.getByText('Films')).toBeInTheDocument();
        expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
        expect(screen.getByText('Return of the Jedi')).toBeInTheDocument();
    });
});
