import type { LucideIcon, LucideProps } from 'lucide-react';

/** Props for the headless `Icon` — a Lucide icon component plus all Lucide/SVG props pass through. */
export type IconProps = Omit<LucideProps, 'ref'> & {
  /** Lucide icon component to render (use named imports for tree-shaking). */
  icon: LucideIcon;
};

/**
 * Headless icon component wrapping a Lucide icon.
 *
 * No local styles — sizing scales with the surrounding font size
 * (`size="1em"`) and color inherits text color (`color="currentColor"`,
 * rendered as the SVG `stroke`), so `--c-*` tokens can be applied on any
 * parent. Without a label the icon is decorative (`aria-hidden="true"`);
 * pass `aria-label` for a standalone informative icon (exposed with
 * `role="img"`). Icon-only buttons/links keep the label on the control —
 * the nested icon stays decorative. All other Lucide/SVG attributes are
 * forwarded as-is.
 */
export function Icon({
  icon: IconComponent,
  size = '1em',
  color = 'currentColor',
  className,
  'aria-label': ariaLabel,
  ...rest
}: IconProps) {
  const hasLabel = Boolean(ariaLabel);
  return (
    <IconComponent
      {...rest}
      size={size}
      color={color}
      className={['c-icon', className].filter(Boolean).join(' ')}
      aria-hidden={hasLabel ? undefined : true}
      role={hasLabel ? 'img' : undefined}
      aria-label={ariaLabel}
    />
  );
}
