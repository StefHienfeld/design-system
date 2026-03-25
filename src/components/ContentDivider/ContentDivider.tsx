import React from 'react';
import './ContentDivider.css';

export interface ContentDividerProps {
  /** Visual style of the divider. */
  style?: 'single-line' | 'dual-line' | 'background-fill';
  /** Primary label displayed in the divider. */
  label?: string;
  /** Supporting text displayed below or alongside the label. */
  supportingText?: string;
  /** Actions (buttons, icons, etc.) rendered on the right side. */
  actions?: React.ReactNode;
  /** Additional CSS class name(s). */
  className?: string;
}

export const ContentDivider: React.FC<ContentDividerProps> = ({
  style = 'single-line',
  label,
  supportingText,
  actions,
  className,
}) => {
  const rootClasses = [
    'content-divider',
    `content-divider--${style}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasLabel = Boolean(label);
  const hasSupportingText = Boolean(supportingText);
  const hasActions = Boolean(actions);

  /* -- Single-line: line — label — line, with optional actions -- */
  if (style === 'single-line') {
    return (
      <div className={rootClasses}>
        <div className="content-divider__line" />

        {hasLabel && (
          <span className="content-divider__label content-divider__label--heading">
            {label}
          </span>
        )}

        {hasSupportingText && !hasLabel && (
          <span className="content-divider__label content-divider__label--text">
            {supportingText}
          </span>
        )}

        {hasActions && !hasLabel && !hasSupportingText && (
          <span className="content-divider__actions">{actions}</span>
        )}

        <div className="content-divider__line" />
      </div>
    );
  }

  /* -- Dual-line & Background-fill: vertical stack -- */
  return (
    <div className={rootClasses}>
      {hasLabel && (
        <div
          className={`content-divider__content${
            hasActions ? ' content-divider__content--with-actions' : ''
          }`}
        >
          <span className="content-divider__label content-divider__label--heading">
            {label}
          </span>
          {hasActions && (
            <span className="content-divider__actions">{actions}</span>
          )}
        </div>
      )}

      {hasSupportingText && (
        <div
          className={`content-divider__content${
            hasActions && !hasLabel ? ' content-divider__content--with-actions' : ''
          }`}
        >
          <span className="content-divider__label content-divider__label--text">
            {supportingText}
          </span>
          {hasActions && !hasLabel && (
            <span className="content-divider__actions">{actions}</span>
          )}
        </div>
      )}

      {!hasLabel && !hasSupportingText && hasActions && (
        <div className="content-divider__content">
          <span className="content-divider__actions">{actions}</span>
        </div>
      )}
    </div>
  );
};

ContentDivider.displayName = 'ContentDivider';
