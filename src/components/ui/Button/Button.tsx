import type { ButtonHTMLAttributes } from 'react';

/** Props for the headless `Button` — all native button attributes pass through. */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Headless button component.
 *
 * No local styles. The visual comes from `css-starter`'s native button
 * styles (neutral variant); `.c-button` is applied as a class hook.
 * All native button attributes (onClick, disabled, aria-*, etc.) are
 * forwarded as-is.
 */
export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={['c-button', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
