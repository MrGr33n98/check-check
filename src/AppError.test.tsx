import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { routes } from './App';

function Bomb() {
  throw new Error('Boom');
}

describe('App route error handling', () => {
  it('displays fallback UI when a route component throws', () => {
    const testRoutes = [
      {
        ...routes[0],
        children: [{ index: true, element: <Bomb /> }],
      },
    ];
    const router = createMemoryRouter(testRoutes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Algo deu errado/i)).toBeInTheDocument();
  });
});
