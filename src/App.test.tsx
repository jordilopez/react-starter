import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the heading', () => {
    render(<App />);
    expect(screen.getByText('Get started')).toBeInTheDocument();
  });

  it('renders docs and social sections', () => {
    render(<App />);
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Connect with us')).toBeInTheDocument();
  });

  it('renders Vite and React links', () => {
    render(<App />);
    expect(screen.getByText('Explore Vite').closest('a')).toHaveAttribute(
      'href',
      'https://vite.dev/',
    );
    expect(screen.getByText('Learn more').closest('a')).toHaveAttribute(
      'href',
      'https://react.dev/',
    );
  });

  it('increments count on button click', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument();
  });
});
