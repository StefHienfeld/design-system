import React from 'react';
import './SectionHeader.css';

export interface SectionHeaderProps {
  /** Section title text. */
  title: string;
  /** Optional description below the title. */
  supportingText?: string;
  /** Action elements (buttons, search, button-group, etc.) rendered to the right of the title. */
  actions?: React.ReactNode;
  /** Tabs rendered below the content row. */
  tabs?: React.ReactNode;
  /** Show a vertical-dots dropdown icon button. */
  dropdown?: boolean;
  /** Callback when the dropdown icon is clicked. */
  onDropdownClick?: () => void;
  /** Show a horizontal divider at the bottom. Defaults to true. */
  divider?: boolean;
  /** Additional CSS class name(s). */
  className?: string;
}

/**
 * Dots-vertical icon (20 x 20).
 * Matches the Figma `dots-vertical` icon.
 */
const DotsVerticalIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="10" cy="4.5" r="1.5" fill="currentColor" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    <circle cx="10" cy="15.5" r="1.5" fill="currentColor" />
  </svg>
);

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  supportingText,
  actions,
  tabs,
  dropdown = false,
  onDropdownClick,
  divider = true,
  className,
}) => {
  const rootClasses = ['section-header', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {/* --- Content row: text + actions + dropdown --- */}
      <div className="section-header__content">
        <div className="section-header__text">
          <h2 className="section-header__title">{title}</h2>
          {supportingText && (
            <p className="section-header__supporting-text">
              {supportingText}
            </p>
          )}
        </div>

        {actions && (
          <div className="section-header__actions">{actions}</div>
        )}

        {dropdown && (
          <button
            type="button"
            className="section-header__dropdown"
            onClick={onDropdownClick}
            aria-label="More options"
          >
            <span className="section-header__dropdown-icon">
              <DotsVerticalIcon />
            </span>
          </button>
        )}
      </div>

      {/* --- Tabs row --- */}
      {tabs && <div className="section-header__tabs">{tabs}</div>}

      {/* --- Divider --- */}
      {divider && <div className="section-header__divider" />}
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';
