import React from 'react';
import './EmptyState.css';

export interface EmptyStateProps {
  /** Component size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Icon rendered inside the featured icon container. */
  icon?: React.ReactNode;
  /** Title text displayed prominently. */
  title: string;
  /** Optional supporting description text. */
  description?: string;
  /** Action buttons rendered below the content. */
  actions?: React.ReactNode;
  /** Additional CSS class name(s). */
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  size = 'sm',
  icon,
  title,
  description,
  actions,
  className,
}) => {
  const classes = [
    'empty-state',
    `empty-state--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="empty-state__inner">
        <div className="empty-state__content">
          {icon && (
            <div className="empty-state__icon" aria-hidden="true">
              {icon}
            </div>
          )}
          <div className="empty-state__text">
            <p className="empty-state__title">{title}</p>
            {description && (
              <p className="empty-state__description">{description}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="empty-state__actions">{actions}</div>
        )}
      </div>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
