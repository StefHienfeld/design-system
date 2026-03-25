import React from 'react';
import './ObjectItemCard.css';

export interface ObjectItemCardProps {
  /** Leading icon (16 x 16 SVG recommended). */
  icon?: React.ReactNode;
  /** Text label displayed next to the icon. */
  label: string;
  /** Numeric count rendered as a small badge on the right. */
  count?: number;
  /** Marks this card as the currently active/selected item. */
  active?: boolean;
  /** Click handler for selecting the card. */
  onClick?: () => void;
  /** Callback for the copy action (shown on hover). */
  onCopy?: () => void;
  /** Callback for the delete action (shown on hover). */
  onDelete?: () => void;
  /** Additional CSS class(es) appended to the root element. */
  className?: string;
}

/** Copy icon (16 x 16). */
const CopyIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="5.333"
      y="5.333"
      width="8"
      height="8"
      rx="1.333"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.667 5.333V4c0-.736-.597-1.333-1.334-1.333H4A1.333 1.333 0 002.667 4v5.333c0 .737.597 1.334 1.333 1.334h1.333"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Trash icon (16 x 16). */
const TrashIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2 4h12M5.333 4V2.667A1.333 1.333 0 016.667 1.333h2.666A1.333 1.333 0 0110.667 2.667V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.667 7.333v4M9.333 7.333v4"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ObjectItemCard: React.FC<ObjectItemCardProps> = ({
  icon,
  label,
  count,
  active = false,
  onClick,
  onCopy,
  onDelete,
  className,
}) => {
  const rootClasses = [
    'object-item-card',
    active && 'object-item-card--active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleActionClick = (
    e: React.MouseEvent,
    handler?: () => void,
  ) => {
    e.stopPropagation();
    handler?.();
  };

  return (
    <div
      className={rootClasses}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-pressed={active}
    >
      {icon && (
        <span className="object-item-card__icon" aria-hidden="true">
          {icon}
        </span>
      )}

      <div className="object-item-card__container">
        <div className="object-item-card__header">
          <span className="object-item-card__label">{label}</span>
          {count != null && (
            <span className="object-item-card__count">{count}</span>
          )}
        </div>
      </div>

      {(onCopy || onDelete) && (
        <div className="object-item-card__actions">
          {onCopy && (
            <button
              type="button"
              className="object-item-card__action-btn"
              aria-label={`Copy ${label}`}
              onClick={(e) => handleActionClick(e, onCopy)}
            >
              <CopyIcon />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="object-item-card__action-btn"
              aria-label={`Delete ${label}`}
              onClick={(e) => handleActionClick(e, onDelete)}
            >
              <TrashIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

ObjectItemCard.displayName = 'ObjectItemCard';
