import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

function Bomb() {
  throw new Error('Boom');
}

describe('ErrorBoundary', () => {
  it('renders fallback when child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );
    expect(
      screen.getByText(/Algo deu errado/i)
    ).toBeInTheDocument();
  });
});
