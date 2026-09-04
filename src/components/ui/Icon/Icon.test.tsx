import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Camera } from 'lucide-react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders the Lucide SVG with the c-icon class', () => {
    const { container } = render(<Icon icon={Camera} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveClass('c-icon');
    expect(svg).toHaveClass('lucide-camera');
  });

  it('defaults to 1em sizing and currentColor stroke (no hard-coded px or hex color)', () => {
    const { container } = render(<Icon icon={Camera} />);
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg.getAttribute('width')).toBe('1em');
    expect(svg.getAttribute('height')).toBe('1em');
    expect(svg.getAttribute('stroke')).toBe('currentColor');
    // Explicit guard against hard-coded defaults like 24px or hex colors:
    expect(svg.getAttribute('width')).not.toBe('24');
    expect(svg.getAttribute('stroke')).not.toMatch(/^#/);
  });

  it('is decorative (aria-hidden) when no label is provided', () => {
    const { container } = render(<Icon icon={Camera} />);
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
    expect(svg).not.toHaveAttribute('aria-label');
  });

  it('exposes the accessible label with role="img" when a label is provided', () => {
    render(<Icon icon={Camera} aria-label="Take photo" />);
    const svg = screen.getByRole('img', { name: 'Take photo' });
    expect(svg).not.toHaveAttribute('aria-hidden');
  });

  it('merges an external className', () => {
    const { container } = render(<Icon icon={Camera} className="extra" />);
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg).toHaveClass('c-icon', 'extra');
  });

  it('forwards native SVG props', () => {
    const handleClick = vi.fn();
    render(
      <Icon
        icon={Camera}
        data-testid="camera-icon"
        strokeWidth={1.5}
        onClick={handleClick}
      />,
    );
    const svg = screen.getByTestId('camera-icon');
    expect(svg).toHaveAttribute('stroke-width', '1.5');
    fireEvent.click(svg);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('allows overriding size and color', () => {
    const { container } = render(
      <Icon icon={Camera} size={32} color="#ff0000" />,
    );
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('height')).toBe('32');
    expect(svg.getAttribute('stroke')).toBe('#ff0000');
  });
});
