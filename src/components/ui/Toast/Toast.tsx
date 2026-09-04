import {
  useEffect,
  useRef,
  type DialogHTMLAttributes,
  type SyntheticEvent,
} from 'react';
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Icon } from '../Icon/Icon';
import styles from './Toast.module.css';

/** Toast severity variants. Drives the accent icon and coloring. */
export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

/**
 * Props for the headless `Toast` — native dialog attributes plus the
 * `variant` and `autoCloseSeconds` behavior flags. The native `open`
 * attribute is omitted; the dialog is opened imperatively on mount.
 */
export type ToastProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open'> & {
  /** Visual severity. Defaults to `'info'`. */
  variant?: ToastVariant;
  /** Seconds before the toast auto-dismisses. `0` disables auto-close. */
  autoCloseSeconds?: number;
};

/**
 * Exhaustive variant → icon mapping.
 *
 * The `never` guard makes the compiler fail the build whenever a
 * `ToastVariant` is added without a matching case here.
 */
function toastIcon(variant: ToastVariant): LucideIcon {
  switch (variant) {
    case 'info':
      return Info;
    case 'success':
      return CircleCheck;
    case 'error':
      return CircleX;
    case 'warning':
      return TriangleAlert;
    default: {
      // Exhaustiveness guard: compiles only when every variant is handled.
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

/**
 * Headless toast component backed by the native `<dialog>` element.
 *
 * Opens with `showModal()` on mount (the rest of the page becomes inert
 * while the toast is visible — intentional modal behavior) and
 * auto-dismisses after `autoCloseSeconds` (default 5; `0` or a
 * non-finite value disables auto-close). An accessible close button
 * dismisses it early. The visual comes from the co-located
 * `Toast.module.css` (token-driven); `.c-toast` is applied as an
 * unscoped design-system hook. All native dialog attributes (aria-*,
 * onCancel, onClose, etc.) are forwarded as-is. Reopen by remounting.
 */
export function Toast({
  variant = 'info',
  autoCloseSeconds = 5,
  className,
  children,
  onClose,
  ...rest
}: ToastProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timerRef = useRef<number | undefined>(undefined);

  // Open the dialog on mount (guard for Strict Mode double-invoke).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  // Auto-dismiss after the configured duration.
  useEffect(() => {
    if (autoCloseSeconds <= 0 || !Number.isFinite(autoCloseSeconds)) return;
    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (dialog?.open) {
        dialog.close();
      }
    }, autoCloseSeconds * 1000);
    timerRef.current = timer;
    return () => window.clearTimeout(timer);
  }, [autoCloseSeconds]);

  // Clear any pending timer when the dialog closes natively (close
  // button, Escape, auto-dismiss) or on unmount.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const clearTimer = () => {
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };
    dialog.addEventListener('close', clearTimer);
    return () => {
      dialog.removeEventListener('close', clearTimer);
      clearTimer();
    };
  }, []);

  function handleClose(event: SyntheticEvent<HTMLDialogElement>) {
    onClose?.(event);
  }

  function handleCloseClick() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      data-variant={variant}
      className={['c-toast', styles.toast, className].filter(Boolean).join(' ')}
      onClose={handleClose}
      {...rest}
    >
      <div className={styles.content}>
        <Icon icon={toastIcon(variant)} />
        {children}
      </div>
      <div className={styles.close}>
        <button type="button" aria-label="Close toast" onClick={handleCloseClick}>
          <Icon icon={X} />
        </button>
      </div>
    </dialog>
  );
}
