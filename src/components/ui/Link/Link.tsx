import type { AnchorHTMLAttributes, MouseEvent as ReactMouseEvent } from 'react';

/**
 * Props for the headless `Link` — native anchor attributes plus the
 * `disabled` and `openInNewTab` behavior flags.
 */
export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Destination URL. Required. */
  href: string;
  /** When `true`, prevents navigation and dims the link. */
  disabled?: boolean;
  /** When `true`, opens in a new tab with `rel="noopener noreferrer"`. */
  openInNewTab?: boolean;
};

/**
 * Headless link component.
 *
 * The default visual comes from `css-starter`'s native anchor styles
 * (`:where(a)`); `.c-link` is applied as a class hook. All native
 * anchor attributes (target, aria-*, etc.) are forwarded as-is.
 *
 * `openInNewTab` sets `target="_blank"` and merges
 * `rel="noopener noreferrer"` (also automatic when `target="_blank"`,
 * matched case-insensitively so `target="_BLANK"` is protected too).
 * Disabled links drop the `href` attribute, announce
 * `aria-disabled="true"`, and swallow clicks (preventDefault +
 * stopPropagation).
 */
export function Link({
  href,
  disabled = false,
  openInNewTab = false,
  target,
  rel,
  className,
  children,
  onClick,
  ...rest
}: LinkProps) {
  const isNewTab = openInNewTab || target?.toLowerCase() === '_blank';
  const effectiveTarget = openInNewTab ? '_blank' : target;
  const effectiveRel = isNewTab
    ? ['noopener', 'noreferrer', rel].filter(Boolean).join(' ')
    : rel;

  function handleClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (disabled) {
      // Suppress activation AND propagation so disabled links never
      // bubble click events to ancestor handlers.
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  }

  return (
    <a
      className={['c-link', className].filter(Boolean).join(' ')}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      target={effectiveTarget}
      rel={effectiveRel}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
