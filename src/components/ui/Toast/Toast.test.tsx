import { render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { Toast } from './Toast';

/**
 * jsdom does not implement `showModal`/`close` on HTMLDialogElement,
 * so the Toast tests install local mocks: `showModal` flips `open`
 * to true, `close` flips it back and dispatches the native `close`
 * event (mimicking browser behavior).
 */
function installDialogMocks() {
  const prototype = HTMLDialogElement.prototype;
  const originalShow = Object.getOwnPropertyDescriptor(prototype, 'showModal');
  const originalClose = Object.getOwnPropertyDescriptor(prototype, 'close');

  const showModal = vi
    .fn()
    .mockImplementation(function (this: HTMLDialogElement) {
      this.open = true;
    });
  const close = vi.fn().mockImplementation(function (this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  });

  Object.defineProperty(prototype, 'showModal', {
    value: showModal,
    configurable: true,
  });
  Object.defineProperty(prototype, 'close', {
    value: close,
    configurable: true,
  });

  return {
    showModal,
    close,
    restore() {
      if (originalShow) {
        Object.defineProperty(prototype, 'showModal', originalShow);
      } else {
        Reflect.deleteProperty(prototype, 'showModal');
      }
      if (originalClose) {
        Object.defineProperty(prototype, 'close', originalClose);
      } else {
        Reflect.deleteProperty(prototype, 'close');
      }
    },
  };
}

describe('Toast', () => {
  let mocks: ReturnType<typeof installDialogMocks>;

  beforeEach(() => {
    mocks = installDialogMocks();
  });

  afterEach(() => {
    mocks.restore();
    vi.useRealTimers();
  });

  it('renders a native dialog with children', () => {
    const { container } = render(<Toast>Saved successfully</Toast>);
    const dialog = container.querySelector('dialog');
    expect(dialog).not.toBeNull();
    expect(screen.getByText(/saved successfully/i)).toBeInTheDocument();
  });

  it('calls showModal on mount', () => {
    render(<Toast>Default</Toast>);
    expect(mocks.showModal).toHaveBeenCalledTimes(1);
  });

  it('applies the c-toast class to the dialog', () => {
    const { container } = render(<Toast>Default</Toast>);
    expect(container.querySelector('dialog')).toHaveClass('c-toast');
  });

  it('merges an external className', () => {
    const { container } = render(<Toast className="extra">Custom</Toast>);
    expect(container.querySelector('dialog')).toHaveClass('c-toast', 'extra');
  });

  it('forwards native attributes', () => {
    render(
      <Toast role="status" aria-live="polite">
        Heads up
      </Toast>,
    );
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('renders an accessible close button that closes the dialog', () => {
    const { container } = render(<Toast>Dismiss me</Toast>);
    const closeButton = screen.getByRole('button', { name: /close toast/i });
    expect(closeButton).toBeInTheDocument();

    // The nested Lucide icon is decorative and uses the shared defaults.
    const icon = closeButton.querySelector('svg');
    expect(icon).toHaveClass('c-icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('width', '1em');
    expect(icon).toHaveAttribute('height', '1em');
    expect(icon).toHaveAttribute('stroke', 'currentColor');

    fireEvent.click(closeButton);
    expect(mocks.close).toHaveBeenCalledTimes(1);
    expect(container.querySelector('dialog')).not.toHaveAttribute('open');
  });

  it('auto-closes after the configured number of seconds', () => {
    vi.useFakeTimers();
    render(<Toast autoCloseSeconds={2}>Auto close</Toast>);
    expect(mocks.close).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mocks.close).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mocks.close).toHaveBeenCalledTimes(1);
  });

  it('clears the auto-close timer on unmount', () => {
    vi.useFakeTimers();
    const { unmount } = render(<Toast autoCloseSeconds={2}>Unmount</Toast>);
    unmount();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(mocks.close).not.toHaveBeenCalled();
  });

  it('clears the pending timer after manual dismissal (no double close)', () => {
    vi.useFakeTimers();
    render(<Toast autoCloseSeconds={1}>Manual</Toast>);
    fireEvent.click(screen.getByRole('button', { name: /close toast/i }));
    expect(mocks.close).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(mocks.close).toHaveBeenCalledTimes(1);
  });

  it('does not schedule auto-close when autoCloseSeconds is 0', () => {
    vi.useFakeTimers();
    render(<Toast autoCloseSeconds={0}>Sticky</Toast>);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(mocks.close).not.toHaveBeenCalled();
  });

  it('composes the consumer onClose callback with internal cleanup', () => {
    const handleUserClose = vi.fn();
    render(<Toast onClose={handleUserClose}>Callback</Toast>);
    fireEvent.click(screen.getByRole('button', { name: /close toast/i }));
    expect(handleUserClose).toHaveBeenCalledTimes(1);
  });
});
