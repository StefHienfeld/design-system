import React from 'react';
import './ActivityGauge.css';

export interface GaugeSegment {
  /** Display label shown in the legend. */
  label: string;
  /** Numeric value for this segment. */
  value: number;
  /** CSS color for the segment arc. */
  color: string;
}

export interface ActivityGaugeProps {
  /** Data segments to render as concentric rings. */
  segments: GaugeSegment[];
  /** Size variant. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Legend placement. */
  legend?: 'none' | 'bottom' | 'right';
  /** Small text label shown in the center of the donut. */
  centerLabel?: string;
  /** Large text value shown in the center of the donut. */
  centerValue?: string;
  /** Additional CSS class names. */
  className?: string;
}

/* ---------- Ring geometry per size ---------- */
/*
  The Figma design shows 3 concentric rings (outer, middle, inner).
  Each ring is an SVG circle with a strokeDasharray to form arc segments.
  Sizes are derived from the Figma node dimensions.
*/

const RING_CONFIG: Record<
  'xs' | 'sm' | 'md' | 'lg',
  { viewBox: number; rings: { radius: number; strokeWidth: number }[] }
> = {
  xs: {
    viewBox: 160,
    rings: [
      { radius: 72, strokeWidth: 16 },   // outer  (152 diameter -> r=76, stroke ~16 -> center r≈72)
      { radius: 60, strokeWidth: 16 },   // middle (128 diameter)
      { radius: 48, strokeWidth: 16 },   // inner  (104 diameter)
    ],
  },
  sm: {
    viewBox: 200,
    rings: [
      { radius: 89, strokeWidth: 18 },
      { radius: 73, strokeWidth: 18 },
      { radius: 57, strokeWidth: 18 },
    ],
  },
  md: {
    viewBox: 240,
    rings: [
      { radius: 106, strokeWidth: 20 },
      { radius: 86, strokeWidth: 20 },
      { radius: 66, strokeWidth: 20 },
    ],
  },
  lg: {
    viewBox: 280,
    rings: [
      { radius: 124, strokeWidth: 22 },
      { radius: 100, strokeWidth: 22 },
      { radius: 76, strokeWidth: 22 },
    ],
  },
};

/* Gap angle in degrees between segments on the same ring */
const GAP_DEGREES = 4;

/**
 * Build an SVG arc path for a segment on a circle.
 * Uses the `stroke-dasharray` technique on a <circle> element.
 */
function computeDashProps(
  value: number,
  total: number,
  radius: number,
  offsetAngle: number,
) {
  const circumference = 2 * Math.PI * radius;

  if (total <= 0 || value <= 0) {
    return { dashArray: `0 ${circumference}`, dashOffset: 0, rotation: -90 + offsetAngle };
  }

  const fraction = value / total;
  const gapLength = (GAP_DEGREES / 360) * circumference;
  const arcLength = Math.max(0, fraction * circumference - gapLength);

  return {
    dashArray: `${arcLength} ${circumference - arcLength}`,
    dashOffset: 0,
    rotation: -90 + offsetAngle,
  };
}

export const ActivityGauge: React.FC<ActivityGaugeProps> = ({
  segments,
  size = 'md',
  legend = 'none',
  centerLabel,
  centerValue,
  className,
}) => {
  const config = RING_CONFIG[size];
  const cx = config.viewBox / 2;
  const cy = config.viewBox / 2;

  /* Total value across all segments */
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  /* We draw up to 3 concentric rings.
     Each segment gets its own ring (outer = first segment, middle = second, inner = third).
     If fewer than 3 segments, fewer rings are drawn.
     If more than 3, only the first 3 get dedicated rings. */
  const maxRings = Math.min(segments.length, config.rings.length);

  const rootClasses = [
    'activity-gauge',
    `activity-gauge--legend-${legend}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {/* Chart */}
      <div className={`activity-gauge__chart activity-gauge__chart--${size}`}>
        <svg
          className="activity-gauge__svg"
          viewBox={`0 0 ${config.viewBox} ${config.viewBox}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Activity gauge chart"
        >
          {/* Render rings from outer to inner */}
          {config.rings.slice(0, maxRings).map((ring, ringIndex) => {
            const segment = segments[ringIndex];
            if (!segment) return null;

            const circumference = 2 * Math.PI * ring.radius;
            const { dashArray, rotation } = computeDashProps(
              segment.value,
              total,
              ring.radius,
              0,
            );

            return (
              <g key={ringIndex}>
                {/* Track */}
                <circle
                  className="activity-gauge__track"
                  cx={cx}
                  cy={cy}
                  r={ring.radius}
                  strokeWidth={ring.strokeWidth}
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset="0"
                />
                {/* Segment arc */}
                <circle
                  className="activity-gauge__segment"
                  cx={cx}
                  cy={cy}
                  r={ring.radius}
                  strokeWidth={ring.strokeWidth}
                  stroke={segment.color}
                  strokeDasharray={dashArray}
                  strokeDashoffset="0"
                  transform={`rotate(${rotation} ${cx} ${cy})`}
                />
              </g>
            );
          })}
        </svg>

        {/* Center label */}
        {(centerLabel || centerValue) && (
          <div className={`activity-gauge__center activity-gauge__center--${size}`}>
            {centerLabel && (
              <p className={`activity-gauge__center-label activity-gauge__center-label--${size}`}>
                {centerLabel}
              </p>
            )}
            {centerValue && (
              <p className={`activity-gauge__center-value activity-gauge__center-value--${size}`}>
                {centerValue}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      {legend !== 'none' && segments.length > 0 && (
        <div className={`activity-gauge__legend activity-gauge__legend--${legend}`}>
          {segments.map((segment, index) => (
            <div key={index} className="activity-gauge__legend-item">
              <span
                className="activity-gauge__legend-dot"
                style={{ backgroundColor: segment.color }}
                aria-hidden="true"
              />
              <p className="activity-gauge__legend-label">{segment.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ActivityGauge.displayName = 'ActivityGauge';
