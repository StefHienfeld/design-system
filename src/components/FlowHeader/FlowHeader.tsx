import React from 'react';
import './FlowHeader.css';

export interface FlowHeaderProps {
  /** Title text displayed in the center when no stepper is provided. */
  title?: string;
  /** Stepper / progress component rendered in the center of the header. */
  stepper?: React.ReactNode;
  /** Callback fired when the back button is clicked. Shows a back arrow when provided. */
  onBack?: () => void;
  /** Callback fired when the close button is clicked. Shows an X button when provided. */
  onClose?: () => void;
  /** Action buttons rendered to the left of the close button. */
  actions?: React.ReactNode;
  /** Logo element rendered on the left. If both `logo` and `onBack` are provided, `logo` takes precedence. */
  logo?: React.ReactNode;
  /** Additional CSS class name(s) for the root element. */
  className?: string;
}

/* ----------------------------------------------------------------
   SVG icons (inline to avoid external asset dependencies)
   ---------------------------------------------------------------- */

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

/** X-close icon for the close button */
const XCloseIcon: React.FC = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M15 5L5 15M5 5l10 10"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Component
   ---------------------------------------------------------------- */
export const FlowHeader: React.FC<FlowHeaderProps> = ({
  title,
  stepper,
  onBack,
  onClose,
  actions,
  logo,
  className,
}) => {
  const hasStepper = Boolean(stepper);

  const rootClasses = [
    'flow-header',
    hasStepper && 'flow-header--has-stepper',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rootClasses}>
      {/* ---- top bar ---- */}
      <div className="flow-header__bar">
        {/* Left: logo or back button */}
        <div className="flow-header__left">
          {logo ? (
            logo
          ) : onBack ? (
            <button
              type="button"
              className="flow-header__back-btn"
              onClick={onBack}
              aria-label="Go back"
            >
              <ArrowLeftIcon />
            </button>
          ) : null}
        </div>

        {/* Center: stepper or title */}
        <div className="flow-header__center">
          {stepper ? stepper : title ? (
            <h1 className="flow-header__title">{title}</h1>
          ) : null}
        </div>

        {/* Right: actions + close */}
        <div className="flow-header__right">
          {actions}
          {onClose && (
            <button
              type="button"
              className="flow-header__close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <XCloseIcon />
            </button>
          )}
        </div>
      </div>

      {/* ---- small-screen stepper row (only rendered when stepper present) ---- */}
      {hasStepper && (
        <>
          <hr className="flow-header__divider" />
          <div className="flow-header__stepper-row">{stepper}</div>
        </>
      )}
    </header>
  );
};

FlowHeader.displayName = 'FlowHeader';
