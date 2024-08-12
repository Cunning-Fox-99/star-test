import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroList from './HeroList';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('HeroList Component', () => {
    const heroes = [
        { id: '1', name: 'Luke Skywalker' },
        { id: '2', name: 'Darth Vader' },
    ];

    test('renders list of heroes', () => {
        render(
            <MemoryRouter>
                <HeroList heroes={heroes} loading={false} />
            </MemoryRouter>
        );

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });

    test('calls navigate on hero click', () => {
        render(
            <MemoryRouter>
                <HeroList heroes={heroes} loading={false} />
            </MemoryRouter>
        );

        userEvent.click(screen.getByText('Luke Skywalker'));
        expect(mockNavigate).toHaveBeenCalledWith('/details/1');
    });

    test('shows loading indicator when loading', () => {
        render(
            <MemoryRouter>
                <HeroList heroes={[]} loading={true} />
            </MemoryRouter>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
