import { render } from '@testing-library/react';
import { EmptyState } from '@/components/EmptyState';
import { describe, it, expect } from 'vitest';

describe('EmptyState', () => {
  it('displays provided title and description', () => {
    const { getByText } = render(
      <EmptyState title="No items" description="Add new items" />
    );
    expect(getByText(/no items/i)).toBeInTheDocument();
    expect(getByText(/add new items/i)).toBeInTheDocument();
  });
});
