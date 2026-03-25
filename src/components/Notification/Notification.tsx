import React from 'react';
import './Notification.css';

export interface NotificationProps {
  /** Notification type / visual variant. */
  type?: 'primary' | 'image' | 'gray' | 'error' | 'warning' | 'success' | 'plain' | 'progress';
  /** Title text (required). */
  title: string;
  /** Optional supporting text below the title. */
  description?: string;
  /** Image URL for the "image" variant. */
  image?: string;
  /** Custom icon node rendered in the icon slot. */
  icon?: React.ReactNode;
  /** Progress value (0-100) for the "progress" variant. */
  progress?: number;
  /** Action buttons rendered below the text content. */
  actions?: React.ReactNode;
  /** Callback when the close button is clicked. */
  onClose?: () => void;
  /** Additional CSS class name(s). */
  className?: string;
}

/* ----------------------------------------------------------------
   Default icons — inline SVGs matching the Figma design
   ---------------------------------------------------------------- */

const InfoIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 10.667V8m0-2.667h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.333 4 6 11.333 2.667 8"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 5.333V8m0 2.667h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UploadIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.667 13.333 10 10m0 0 3.333 3.333M10 10v7.5m6.667-3.548a4.583 4.583 0 0 0-2.917-8.12.516.516 0 0 1-.444-.25 6.25 6.25 0 1 0-9.816 7.02"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m15 5-10 10M5 5l10 10"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Helper: resolve the default icon per type
   ---------------------------------------------------------------- */
function getDefaultIcon(type: NotificationProps['type']): React.ReactNode | null {
  switch (type) {
    case 'primary':
      return InfoIcon;
    case 'success':
      return CheckIcon;
    case 'error':
    case 'warning':
      return AlertIcon;
    case 'progress':
      return UploadIcon;
    default:
      return null;
  }
}

/* ----------------------------------------------------------------
   Helper: resolve icon-wrap modifier class
   ---------------------------------------------------------------- */
function getIconWrapModifier(type: NotificationProps['type']): string {
  if (type === 'gray' || type === 'progress') {
    return 'notification__icon-wrap--square';
  }
  return 'notification__icon-wrap--round';
}

/* ================================================================
   Component
   ================================================================ */

export const Notification: React.FC<NotificationProps> = ({
  type = 'primary',
  title,
  description,
  image,
  icon,
  progress = 0,
  actions,
  onClose,
  className,
}) => {
  const rootClasses = [
    'notification',
    `notification--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Determine which icon to render */
  const hasIconSlot = type !== 'image' && type !== 'plain';
  const resolvedIcon = icon ?? getDefaultIcon(type);
  const showIcon = hasIconSlot && resolvedIcon != null;

  /* Clamp progress */
  const clampedProgress = Math.min(100, Math.max(0, progress));

  /* ---- image variant ---- */
  if (type === 'image') {
    return (
      <div className={rootClasses} role="status">
        {image && (
          <div className="notification__image-wrap">
            <img className="notification__image" src={image} alt="" />
          </div>
        )}

        <div className="notification__body">
          <div className="notification__content">
            <div className="notification__text">
              <p className="notification__title">{title}</p>
              {description && <p className="notification__description">{description}</p>}
            </div>
            {actions && <div className="notification__actions">{actions}</div>}
          </div>
        </div>

        {onClose && (
          <button
            className="notification__close"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            {CloseIcon}
          </button>
        )}
      </div>
    );
  }

  /* ---- all other variants ---- */
  return (
    <div className={rootClasses} role="status">
      {showIcon && (
        <div className={`notification__icon-wrap ${getIconWrapModifier(type)}`}>
          {resolvedIcon}
        </div>
      )}

      <div className="notification__content">
        <div className="notification__text">
          <p className="notification__title">{title}</p>
          {description && <p className="notification__description">{description}</p>}
        </div>

        {type === 'progress' && (
          <div className="notification__progress-wrap">
            <div className="notification__progress-bar">
              <div
                className="notification__progress-fill"
                style={{ width: `${clampedProgress}%` }}
              />
            </div>
            <span className="notification__progress-label">
              {clampedProgress}% uploaded...
            </span>
          </div>
        )}

        {actions && <div className="notification__actions">{actions}</div>}
      </div>

      {onClose && (
        <button
          className="notification__close"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          {CloseIcon}
        </button>
      )}
    </div>
  );
};

Notification.displayName = 'Notification';
