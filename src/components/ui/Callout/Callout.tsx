import type { HTMLAttributes, ReactNode } from 'react';
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import { Icon } from '../Icon/Icon';

/** Callout tone. Drives the `.callout--<tone>` modifier and accent icon. */
export type CalloutTone = 'info' | 'success' | 'warning' | 'error';

/** Props for the headless `Callout` — native div attributes plus `tone`/`title`. */
export type CalloutProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Visual tone. Defaults to `'info'`. */
  tone?: CalloutTone;
  /** Optional bold title row (`.callout__title`). */
  title?: ReactNode;
};

/**
 * Exhaustive tone → icon mapping (mirrors `Toast`).
 *
 * The `never` guard fails the build whenever a `CalloutTone` is added
 * without a matching case here.
 */
function calloutIcon(tone: CalloutTone): LucideIcon {
  switch (tone) {
    case 'info':
      return Info;
    case 'success':
      return CircleCheck;
    case 'warning':
      return TriangleAlert;
    case 'error':
      return CircleX;
    default: {
      const _exhaustive: never = tone;
      return _exhaustive;
    }
  }
}

/**
 * Headless advisory block styled by `css-starter`'s `.callout` component.
 *
 * No local styles — the visual comes from css-starter (border, tint, radius);
 * the tone modifier + accent icon follow `tone`. The icon is component-owned
 * (rendered via the repo's `Icon` → lucide, one per tone, like `Toast`) but the
 * glyph is supplied here so css-starter stays free of any icon dependency.
 * A polite live region by default (`role="status"`); pass `role="alert"` for
 * assertive errors. All other native div attributes are forwarded as-is.
 */
export function Callout({
  tone = 'info',
  title,
  children,
  className,
  role = 'status',
  ...rest
}: CalloutProps) {
  return (
    <div
      className={['callout', `callout--${tone}`, className].filter(Boolean).join(' ')}
      role={role}
      {...rest}
    >
      <span className="callout__icon" aria-hidden="true">
        <Icon icon={calloutIcon(tone)} />
      </span>
      <div className="callout__content">
        {title ? <p className="callout__title">{title}</p> : null}
        <div className="callout__body">{children}</div>
      </div>
    </div>
  );
}
