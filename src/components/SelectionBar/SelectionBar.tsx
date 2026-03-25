import React from 'react';
import './SelectionBar.css';

export interface SelectionBarAction {
  key: string;
  label: string;
  onClick: () => void;
}

export interface SelectionBarProps {
  /** Number of selected items. */
  count: number;
  /** Callback when the close (X) button is clicked. */
  onClose: () => void;
  /** Action links rendered on the right side of the bar. */
  actions?: SelectionBarAction[];
  /** Additional CSS class names. */
  className?: string;
}

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

export const SelectionBar: React.FC<SelectionBarProps> = ({
  count,
  onClose,
  actions,
  className,
}) => {
  const classes = ['selection-bar', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status">
      <div className="selection-bar__left">
        <button
          className="selection-bar__close"
          onClick={onClose}
          aria-label="Clear selection"
          type="button"
        >
          {CloseIcon}
        </button>
        <span className="selection-bar__count">
          {count} selected
        </span>
      </div>

      {actions && actions.length > 0 && (
        <div className="selection-bar__actions">
          {actions.map((action) => (
            <button
              key={action.key}
              className="selection-bar__action"
              onClick={action.onClick}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

SelectionBar.displayName = 'SelectionBar';
