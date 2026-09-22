import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Callout } from './Callout';

describe('Callout', () => {
  it('renders with a .callout class and status role by default', () => {
    render(<Callout>Message</Callout>);
    const el = screen.getByRole('status');
    expect(el).toHaveClass('callout', 'callout--info');
    expect(el).toHaveTextContent('Message');
  });

  it('applies the tone modifier class', () => {
    render(
      <Callout tone="warning" title="Careful">
        Watch out
      </Callout>,
    );
    expect(screen.getByRole('status')).toHaveClass('callout--warning');
  });

  it('exposes an assertive role when requested', () => {
    render(
      <Callout tone="error" role="alert">
        Failure
      </Callout>,
    );
    expect(screen.getByRole('alert')).toHaveClass('callout--error');
  });

  it('renders the title in a .callout__title element and a decorative icon', () => {
    render(
      <Callout tone="success" title="Saved">
        Done
      </Callout>,
    );
    expect(screen.getByText('Saved')).toHaveClass('callout__title');
    expect(document.querySelector('.callout__icon[aria-hidden="true"] svg')).toBeTruthy();
  });

  it('merges an external className and forwards native attributes', () => {
    render(
      <Callout className="extra" data-testid="c">
        Body
      </Callout>,
    );
    const el = screen.getByTestId('c');
    expect(el).toHaveClass('callout', 'extra');
  });
});
