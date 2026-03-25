import React from 'react';
import './Alert.css';

export interface AlertProps {
  /** Color theme of the alert. */
  color?: 'default' | 'brand' | 'gray' | 'error' | 'warning' | 'success';
  /** Size variant: floating (card with radius + shadow) or full-width (banner). */
  size?: 'floating' | 'full-width';
  /** Icon rendered in the leading slot. */
  icon?: React.ReactNode;
  /** Alert title text. */
  title?: string;
  /** Supporting description text. */
  description?: React.ReactNode;
  /** Action buttons / links rendered after the text content. */
  actions?: React.ReactNode;
  /** Show the close (X) button. */
  closable?: boolean;
  /** Callback when the close button is clicked. */
  onClose?: () => void;
  /** Additional CSS class names. */
  className?: string;
}

/* -- Default SVG icons per color variant -- */

const InfoCircleIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 13.333V10m0-3.333h.008M18.333 10a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z"
      stroke="currentColor"
      strokeWidth="1.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertCircleIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 6.667V10m0 3.333h.008M18.333 10a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z"
      stroke="currentColor"
      strokeWidth="1.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertTriangleIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 7.5v3.333m0 3.334h.008M8.575 3.217 1.517 15a1.667 1.667 0 0 0 1.425 2.5h14.116a1.667 1.667 0 0 0 1.425-2.5L11.425 3.217a1.667 1.667 0 0 0-2.85 0Z"
      stroke="currentColor"
      strokeWidth="1.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckCircleIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.333 9.233V10a8.333 8.333 0 1 1-4.941-7.617M18.333 3.333 10 11.675l-2.5-2.5"
      stroke="currentColor"
      strokeWidth="1.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.667 5 7.5 14.167 3.333 10"
      stroke="currentColor"
      strokeWidth="1.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 5 5 15M5 5l10 10"
      stroke="currentColor"
      strokeWidth="1.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Returns the default icon for a given color + size combination,
 * matching Figma specifications.
 */
function getDefaultIcon(
  color: AlertProps['color'],
  size: AlertProps['size'],
): React.ReactNode {
  switch (color) {
    case 'error':
      /* Floating error uses triangle; full-width uses circle */
      return size === 'floating' ? AlertTriangleIcon : AlertCircleIcon;
    case 'warning':
      return AlertCircleIcon;
    case 'success':
      return size === 'floating' ? CheckIcon : CheckCircleIcon;
    case 'brand':
    case 'gray':
    case 'default':
    default:
      return InfoCircleIcon;
  }
}

export const Alert: React.FC<AlertProps> = ({
  color = 'default',
  size = 'floating',
  icon,
  title,
  description,
  actions,
  closable = true,
  onClose,
  className,
}) => {
  const resolvedIcon = icon !== undefined ? icon : getDefaultIcon(color, size);

  const classes = [
    'alert',
    `alert--${color}`,
    `alert--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const closeButton = closable && onClose && (
    <button
      className="alert__close"
      onClick={onClose}
      aria-label="Close alert"
      type="button"
    >
      {CloseIcon}
    </button>
  );

  /* --- Full-width layout --- */
  if (size === 'full-width') {
    return (
      <div className={classes} role="alert">
        <div className="alert__container">
          {resolvedIcon && (
            <span className="alert__icon" aria-hidden="true">
              {resolvedIcon}
            </span>
          )}
          <div className="alert__content">
            <div className="alert__text">
              {title && <p className="alert__title">{title}</p>}
              {description && <p className="alert__description">{description}</p>}
            </div>
          </div>
          {actions && <div className="alert__actions">{actions}</div>}
          {closeButton}
        </div>
      </div>
    );
  }

  /* --- Floating layout --- */
  return (
    <div className={classes} role="alert">
      {resolvedIcon && (
        <span className="alert__icon" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <div className="alert__content">
        <div className="alert__text">
          {title && <p className="alert__title">{title}</p>}
          {description && <p className="alert__description">{description}</p>}
        </div>
        {actions && <div className="alert__actions">{actions}</div>}
      </div>
      {closeButton}
    </div>
  );
};

Alert.displayName = 'Alert';
