import React from 'react';
import './SectionFooter.css';

export interface SectionFooterProps {
  /** Visual type — controls padding and gap. */
  type?: 'section' | 'card';
  /** Show a horizontal divider line above the content. */
  divider?: boolean;
  /** Optional ButtonGroup (or any node) rendered on the leading side. */
  buttonGroup?: React.ReactNode;
  /** Optional secondary link-style action. */
  secondaryAction?: { label: string; onClick: () => void };
  /** Trailing action buttons (e.g. Tertiary + Secondary + Primary). */
  actions?: React.ReactNode;
  /** Additional CSS class name(s). */
  className?: string;
}

export const SectionFooter: React.FC<SectionFooterProps> = ({
  type = 'section',
  divider = true,
  buttonGroup,
  secondaryAction,
  actions,
  className,
}) => {
  const rootClasses = [
    'section-footer',
    `section-footer--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasContent = Boolean(buttonGroup) || Boolean(secondaryAction) || Boolean(actions);

  return (
    <div className={rootClasses}>
      {divider && <div className="section-footer__divider" />}

      {hasContent && (
        <div className="section-footer__content">
          {buttonGroup && (
            <div className="section-footer__button-group">{buttonGroup}</div>
          )}

          {secondaryAction && (
            <button
              type="button"
              className="section-footer__secondary-action"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}

          {actions && (
            <div className="section-footer__actions">{actions}</div>
          )}
        </div>
      )}
    </div>
  );
};

SectionFooter.displayName = 'SectionFooter';
