import React from 'react';
import './Tag.css';

export interface TagProps {
  /** Tag size. */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon style. */
  icon?: 'none' | 'dot' | 'avatar';
  /** Trailing action. */
  action?: 'text-only' | 'x-close' | 'count';
  /** Show a checkbox before the content. */
  checkbox?: boolean;
  /** Controlled checked state (when checkbox is true). */
  checked?: boolean;
  /** Called when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Tag label. */
  children: React.ReactNode;
  /** Called when the close action is clicked. */
  onClose?: () => void;
  /** Count number shown in the trailing pill. */
  count?: number;
  /** Avatar image URL (used when icon='avatar'). */
  avatar?: string;
}

/* ----------------------------------------------------------------
   Inline SVG helpers
   ---------------------------------------------------------------- */

const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.5 3.5 3.5 10.5M3.5 3.5l7 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg
    className="tag__checkbox-icon"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 4L3.25 5.75L6.5 2.25"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Tag component
   ---------------------------------------------------------------- */

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      size = 'md',
      icon = 'none',
      action = 'text-only',
      checkbox = false,
      checked = false,
      onCheckedChange,
      children,
      onClose,
      count,
      avatar,
    },
    ref,
  ) => {
    const hasLeading = icon !== 'none' || checkbox;
    const hasTrailing = action !== 'text-only';

    const classes = [
      'tag',
      `tag--${size}`,
      hasLeading && 'tag--has-leading',
      hasTrailing && 'tag--has-trailing',
      checkbox && 'tag--checkbox',
    ]
      .filter(Boolean)
      .join(' ');

    /* --- Leading elements --- */
    const renderLeading = () => {
      const elements: React.ReactNode[] = [];

      if (checkbox) {
        elements.push(
          <span
            key="checkbox"
            className={`tag__checkbox${checked ? ' tag__checkbox--checked' : ''}`}
            aria-hidden="true"
          >
            <CheckIcon />
          </span>,
        );
      }

      if (icon === 'dot') {
        elements.push(<span key="dot" className="tag__dot" aria-hidden="true" />);
      }

      if (icon === 'avatar' && avatar) {
        elements.push(
          <img
            key="avatar"
            className="tag__avatar"
            src={avatar}
            alt=""
            aria-hidden="true"
          />,
        );
      }

      return elements;
    };

    /* --- Trailing action --- */
    const renderTrailing = () => {
      if (action === 'x-close') {
        return (
          <button
            type="button"
            className="tag__close"
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
          >
            <CloseIcon />
          </button>
        );
      }

      if (action === 'count' && count !== undefined) {
        return (
          <span className="tag__count" aria-label={`Count: ${count}`}>
            {count}
          </span>
        );
      }

      return null;
    };

    /* --- Checkbox click handler --- */
    const handleClick = checkbox
      ? () => onCheckedChange?.(!checked)
      : undefined;

    const handleKeyDown = checkbox
      ? (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCheckedChange?.(!checked);
          }
        }
      : undefined;

    return (
      <div
        ref={ref}
        className={classes}
        role={checkbox ? 'checkbox' : undefined}
        aria-checked={checkbox ? checked : undefined}
        tabIndex={checkbox ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {renderLeading()}
        <span className="tag__text">{children}</span>
        {renderTrailing()}
      </div>
    );
  },
);

Tag.displayName = 'Tag';
