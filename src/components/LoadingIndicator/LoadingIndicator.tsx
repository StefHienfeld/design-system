import React from 'react';
import './LoadingIndicator.css';

export interface LoadingIndicatorProps {
  /** Spinner size. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional loading text displayed below the spinner. */
  label?: string;
  /** Additional CSS class name(s). */
  className?: string;
}

/**
 * Stroke widths per size, matching the Figma spec proportions.
 * Larger spinners use thicker strokes.
 */
const STROKE_WIDTH: Record<string, number> = {
  sm: 3,
  md: 4,
  lg: 4.5,
  xl: 5,
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'md',
  label,
  className,
}) => {
  const classes = [
    'loading-indicator',
    `loading-indicator--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const strokeWidth = STROKE_WIDTH[size];
  const viewBoxSize = 48;
  const center = viewBoxSize / 2;
  const radius = (viewBoxSize - strokeWidth) / 2;

  return (
    <div className={classes} role="status">
      <svg
        className="loading-indicator__spinner"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          className="loading-indicator__track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="loading-indicator__arc"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${Math.PI * radius * 0.75} ${Math.PI * radius * 1.25}`}
        />
      </svg>
      {label && (
        <span className="loading-indicator__label">{label}</span>
      )}
      {/* Accessible text for screen readers when no visible label */}
      {!label && <span className="loading-indicator__sr-only">Loading</span>}
    </div>
  );
};

LoadingIndicator.displayName = 'LoadingIndicator';
