import {
  useEffect,
  useRef,
  type DialogHTMLAttributes,
  type SyntheticEvent,
} from 'react';
import { X } from 'lucide-react';
import { Icon } from '../Icon/Icon';
import styles from './Toast.module.css';

/**
 * Props for the headless `Toast` — native dialog attributes plus the
 * `autoCloseSeconds` behavior flag. The native `open` attribute is
 * omitted; the dialog is opened imperatively on mount.
 */
export type ToastProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open'> & {
  /** Seconds before the toast auto-dismisses. `0` disables auto-close. */
  autoCloseSeconds?: number;
};

/**
 * Headless toast component backed by the native `<dialog>` element.
 *
 * Opens with `showModal()` on mount and auto-dismisses after
 * `autoCloseSeconds` (default 5; `0` or a non-finite value disables
 * auto-close). An accessible close button dismisses it early. The
 * visual comes from the co-located `Toast.css` (token-driven); `.c-toast`
 * is applied as a class hook. All native dialog attributes (aria-*, onCancel, onClose,
 * etc.) are forwarded as-is. Reopen by remounting.
 */
export function Toast({
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
      className={['c-toast', styles.toast, className].filter(Boolean).join(' ')}
      onClose={handleClose}
      {...rest}
    >
      <div className={styles.content}>{children}</div>
      <div className={styles.close}>
        <button type="button" aria-label="Close toast" onClick={handleCloseClick}>
          <Icon icon={X} />
        </button>
      </div>
    </dialog>
  );
}
