import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renders with children', () => {
    render(<Link href="https://example.com">Read more</Link>);
    expect(screen.getByRole('link', { name: /read more/i })).toBeInTheDocument();
  });

  it('applies the c-link class', () => {
    render(<Link href="https://example.com">Default</Link>);
    expect(screen.getByRole('link')).toHaveClass('c-link');
  });

  it('merges an external className', () => {
    render(
      <Link href="https://example.com" className="extra">
        Custom
      </Link>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('c-link', 'extra');
  });

  it('sets the href attribute', () => {
    render(<Link href="/docs">Docs</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/docs');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Link href="#section" onClick={handleClick}>
        Click
      </Link>,
    );
    fireEvent.click(screen.getByRole('link'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('omits href and sets aria-disabled when disabled', () => {
    const { container } = render(
      <Link href="/docs" disabled>
        Disabled
      </Link>,
    );
    const link = container.querySelector('a') as HTMLAnchorElement;
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Link href="/docs" disabled onClick={handleClick}>
        Disabled
      </Link>,
    );
    fireEvent.click(container.querySelector('a') as HTMLAnchorElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('opens in a new tab with noopener noreferrer rel', () => {
    render(
      <Link href="https://example.com" openInNewTab>
        New tab
      </Link>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('auto-adds rel when target is _blank and merges existing rel', () => {
    render(
      <Link href="https://example.com" target="_blank" rel="nofollow">
        New tab
      </Link>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer nofollow');
  });

  it('prevents default navigation when disabled', () => {
    const { container } = render(
      <Link href="/docs" disabled>
        Disabled
      </Link>,
    );
    const link = container.querySelector('a') as HTMLAnchorElement;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('does not propagate clicks to ancestors when disabled', () => {
    const handleWrapperClick = vi.fn();
    const { container } = render(
      <div onClick={handleWrapperClick}>
        <Link href="/docs" disabled>
          Disabled
        </Link>
      </div>,
    );
    fireEvent.click(container.querySelector('a') as HTMLAnchorElement);
    expect(handleWrapperClick).not.toHaveBeenCalled();
  });

  it('still propagates clicks to ancestors when enabled', () => {
    const handleWrapperClick = vi.fn();
    render(
      <div onClick={handleWrapperClick}>
        <Link href="/docs">Enabled</Link>
      </div>,
    );
    fireEvent.click(screen.getByRole('link'));
    expect(handleWrapperClick).toHaveBeenCalledTimes(1);
  });

  it('treats target="_BLANK" like target="_blank" for rel protection', () => {
    render(
      <Link href="https://example.com" target="_BLANK">
        New tab
      </Link>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
