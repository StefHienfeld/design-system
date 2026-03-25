import React from 'react';
import './SlideoutMenu.css';

export interface SlideoutMenuProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  className?: string;
}

const CloseIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M15 5L5 15M5 5l10 10"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SlideoutMenu: React.FC<SlideoutMenuProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width,
  className,
}) => {
  const panelRef = React.useRef<HTMLDivElement>(null);

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

  /* -- focus trap: auto-focus close button -- */
  React.useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    requestAnimationFrame(() => {
      const focusable = panel.querySelector<HTMLElement>(
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const overlayClasses = [
    'slideout-menu__overlay',
    open && 'slideout-menu__overlay--open',
  ]
    .filter(Boolean)
    .join(' ');

  const panelClasses = ['slideout-menu__panel', className]
    .filter(Boolean)
    .join(' ');

  const panelStyle: React.CSSProperties | undefined = width
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : undefined;

  return (
    <div
      className={overlayClasses}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={panelClasses}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'slideout-menu-title' : undefined}
      >
        <div className="slideout-menu__header">
          <div className="slideout-menu__header-text">
            {title && (
              <h2 className="slideout-menu__title" id="slideout-menu-title">
                {title}
              </h2>
            )}
          </div>
          <button
            className="slideout-menu__close"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            {CloseIcon}
          </button>
        </div>

        <div className="slideout-menu__content">{children}</div>

        {footer && <div className="slideout-menu__footer">{footer}</div>}
      </div>
    </div>
  );
};

SlideoutMenu.displayName = 'SlideoutMenu';
