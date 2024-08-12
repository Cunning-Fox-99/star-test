// src/pages/Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import useHeroes from '../hooks/useHeroes';

jest.mock('../hooks/useHeroes');

const mockedUseHeroes = useHeroes as jest.MockedFunction<typeof useHeroes>;

describe('Home Component', () => {
    beforeEach(() => {
        mockedUseHeroes.mockReturnValue({
            heroes: [
                { id: '1', name: 'Luke Skywalker' },
                { id: '2', name: 'Darth Vader' },
            ],
            loading: false,
        });
    });

    test('renders list of heroes', () => {
        render(<Home />);
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });
});
