import React from 'react';
import './Header.css';

export interface HeaderProps {
  /** Title text displayed in the center of the header. */
  title?: string;
  /** Callback fired when the back button is clicked. Shows a back arrow when provided. */
  onBack?: () => void;
  /** Logo element rendered next to the back button on the left. */
  logo?: React.ReactNode;
  /** Action buttons rendered on the right side of the header. */
  actions?: React.ReactNode;
  /** Additional CSS class name(s) for the root element. */
  className?: string;
}

/** Arrow-left icon for the back button */
const ArrowLeftIcon: React.FC = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M15.833 10H4.167m0 0L10 15.833M4.167 10 10 4.167"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  logo,
  actions,
  className,
}) => {
  const rootClasses = ['header', className].filter(Boolean).join(' ');

  return (
    <header className={rootClasses}>
      {/* Left: back button + logo */}
      <div className="header__left">
        {onBack && (
          <button
            type="button"
            className="header__back-btn"
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeftIcon />
          </button>
        )}
        {logo}
      </div>

      {/* Center: title */}
      {title && <h1 className="header__title">{title}</h1>}

      {/* Right: actions */}
      <div className="header__actions">{actions}</div>
    </header>
  );
};

Header.displayName = 'Header';
