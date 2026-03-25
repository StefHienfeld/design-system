import React, { useCallback, useId, useRef, useState } from 'react';
import './HelpIcon.css';

export interface HelpIconProps {
  /** Primary tooltip text. */
  tooltip: string;
  /** Optional supporting paragraph below the title. */
  supportingText?: string;
  /** Which side the tooltip appears on. */
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Icon size in px (default 16). */
  size?: number;
  /** Additional class name on the wrapper. */
  className?: string;
}

export const HelpIcon: React.FC<HelpIconProps> = ({
  tooltip,
  supportingText,
  tooltipPosition = 'top',
  size = 16,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const showTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const show = useCallback(() => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    showTimeout.current = setTimeout(() => setVisible(true), 200);
  }, []);

  const hide = useCallback(() => {
    if (showTimeout.current) {
      clearTimeout(showTimeout.current);
      showTimeout.current = null;
    }
    hideTimeout.current = setTimeout(() => setVisible(false), 100);
  }, []);

  const hasSupporting = Boolean(supportingText);

  const tooltipClasses = [
    'help-icon__tooltip',
    `help-icon__tooltip--${tooltipPosition}`,
    hasSupporting ? 'help-icon__tooltip--rich' : 'help-icon__tooltip--simple',
    visible && 'help-icon__tooltip--visible',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClasses = ['help-icon', className].filter(Boolean).join(' ');

  return (
    <span
      className={wrapperClasses}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="img"
      aria-label={tooltip}
      aria-describedby={tooltipId}
    >
      {/* Help-circle SVG icon */}
      <svg
        className="help-icon__svg"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6.06 6a2 2 0 0 1 3.89.67c0 1.33-2 2-2 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="11" r="0.5" fill="currentColor" />
      </svg>

      {/* Tooltip */}
      <span id={tooltipId} className={tooltipClasses} role="tooltip">
        <span className="help-icon__arrow" />
        <span className="help-icon__tooltip-title">{tooltip}</span>
        {supportingText && (
          <p className="help-icon__tooltip-supporting">{supportingText}</p>
        )}
      </span>
    </span>
  );
};

HelpIcon.displayName = 'HelpIcon';
