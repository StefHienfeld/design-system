import React from 'react';
import './ButtonGroup.css';

export interface ButtonGroupItem {
  /** Text label for the button segment. */
  label?: string;
  /** Icon rendered inside the button segment. */
  icon?: React.ReactNode;
  /** Click handler for this segment. */
  onClick?: () => void;
  /** Whether this segment is disabled. */
  disabled?: boolean;
}

export interface ButtonGroupProps {
  /** The button segments to render. */
  items: ButtonGroupItem[];
  /** Additional CSS class for the root element. */
  className?: string;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ items, className }, ref) => {
    const rootClasses = ['button-group', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={rootClasses} role="group">
        {items.map((item, index) => {
          const hasIcon = Boolean(item.icon);
          const hasLabel = Boolean(item.label);

          const variant = hasIcon && hasLabel
            ? 'leading'
            : hasIcon
              ? 'icon-only'
              : 'text-only';

          const segmentClasses = [
            'button-group__item',
            `button-group__item--${variant}`,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={index}
              type="button"
              className={segmentClasses}
              onClick={item.onClick}
              disabled={item.disabled}
              aria-label={variant === 'icon-only' ? item.label : undefined}
            >
              {hasIcon && (
                <span className="button-group__icon">{item.icon}</span>
              )}
              {hasLabel && variant !== 'icon-only' && (
                <span className="button-group__text">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
