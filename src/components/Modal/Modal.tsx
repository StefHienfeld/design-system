import React from 'react';
import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  icon?: React.ReactNode;
  iconColor?: 'brand' | 'success' | 'warning' | 'error';
  footer?: React.ReactNode;
}

const CloseIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className,
  icon,
  iconColor = 'brand',
  footer,
}) => {
  const dialogRef = React.useRef<HTMLDivElement>(null);

  /* -- close on Escape -- */
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  /* -- focus trap: auto-focus first focusable element -- */
  React.useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    requestAnimationFrame(() => {
      const focusable = dialog.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    });
  }, [open]);

  /* -- lock body scroll -- */
  React.useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  const classes = [
    'modal__dialog',
    `modal__dialog--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal__overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={classes}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          {CloseIcon}
        </button>

        {(title || description || icon) && (
          <div className="modal__header">
            {icon && (
              <div
                className={`modal__icon-wrapper modal__icon-wrapper--${iconColor}`}
              >
                {icon}
              </div>
            )}
            <div className="modal__text-group">
              {title && (
                <h2 className="modal__title" id="modal-title">
                  {title}
                </h2>
              )}
              {description && (
                <p className="modal__description" id="modal-description">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="modal__content">{children}</div>

        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
