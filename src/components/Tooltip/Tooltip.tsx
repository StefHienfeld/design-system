import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Tooltip.css';

export interface TooltipProps {
  /** Primary text shown inside the tooltip. */
  content: string;
  /** Optional secondary line of text below the title. */
  supportingText?: string;
  /** Which side of the trigger the tooltip appears on. */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** The trigger element the tooltip attaches to. */
  children: React.ReactElement;
}

const SHOW_DELAY = 200;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  supportingText,
  position = 'top',
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), SHOW_DELAY);
  }, []);

  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  }, []);

  /* Clean up on unmount */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const isRich = Boolean(supportingText);

  const tooltipClasses = [
    'tooltip',
    `tooltip--${position}`,
    isRich ? 'tooltip--rich' : 'tooltip--simple',
    visible && 'tooltip--visible',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      <span className={tooltipClasses} role="tooltip" aria-hidden={!visible}>
        <span className="tooltip__title">{content}</span>
        {supportingText && (
          <span className="tooltip__supporting">{supportingText}</span>
        )}
        <span className="tooltip__arrow" />
      </span>
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
