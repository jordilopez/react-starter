import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size. */
  size?: 'sm' | 'md' | 'lg';
}

/** Reusable button component with support for multiple variants and sizes. */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[styles['c-button'], className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  );
}
