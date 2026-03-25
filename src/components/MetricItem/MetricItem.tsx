import React from 'react';
import './MetricItem.css';

export interface MetricItemProps {
  /** Metric label displayed above the value. */
  label: string;
  /** The large display value (number or formatted string). */
  value: string | number;
  /** Trend indicator shown as a badge beside the value. */
  trend?: { value: string; positive?: boolean };
  /** Optional description shown after the inline trend (e.g. "vs last month"). */
  trendDescription?: string;
  /** Decorative icon rendered above the label. */
  icon?: React.ReactNode;
  /** Small chart / sparkline rendered beside the number. */
  chart?: React.ReactNode;
  /** Action buttons rendered in a footer row below the content. */
  actions?: React.ReactNode;
  /** Show a dropdown (three-dot) menu button in the top-right corner. */
  dropdown?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* -- Arrow-up-right icon for the badge trend variant -- */
const ArrowUpRightIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.5 8.5 8.5 3.5M8.5 3.5H3.5M8.5 3.5v5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowDownRightIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.5 3.5 8.5 8.5M8.5 8.5H3.5M8.5 8.5v-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* -- Arrow-up / Arrow-down for the inline change indicator -- */
const ArrowUpIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 12.667V3.333m0 0L3.333 8M8 3.333 12.667 8"
      stroke="currentColor"
      strokeWidth="1.333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowDownIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 3.333v9.334m0 0 4.667-4.667M8 12.667 3.333 8"
      stroke="currentColor"
      strokeWidth="1.333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MetricItem: React.FC<MetricItemProps> = ({
  label,
  value,
  trend,
  trendDescription,
  icon,
  chart,
  actions,
  dropdown,
  className,
}) => {
  const hasChart = !!chart;
  const hasIcon = !!icon;

  const classes = [
    'metric-item',
    hasIcon && 'metric-item--has-icon',
    hasChart && 'metric-item--has-chart',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* --- Badge-style trend (simple + icon variants) --- */
  const trendBadge = trend && !hasChart && (
    <span className="metric-item__trend">
      <span className="metric-item__trend-icon" aria-hidden="true">
        {trend.positive !== false ? ArrowUpRightIcon : ArrowDownRightIcon}
      </span>
      <span className="metric-item__trend-text">{trend.value}</span>
    </span>
  );

  /* --- Inline trend (chart variant) --- */
  const trendInline = trend && hasChart && (
    <div className="metric-item__trend-inline">
      <span
        className={[
          'metric-item__change',
          trend.positive !== false
            ? 'metric-item__change--positive'
            : 'metric-item__change--negative',
        ].join(' ')}
      >
        <span className="metric-item__change-icon" aria-hidden="true">
          {trend.positive !== false ? ArrowUpIcon : ArrowDownIcon}
        </span>
        <span className="metric-item__change-text">{trend.value}</span>
      </span>
      {trendDescription && (
        <p className="metric-item__trend-description">{trendDescription}</p>
      )}
    </div>
  );

  /* --- Chart variant layout --- */
  if (hasChart) {
    return (
      <div className={classes}>
        <div className="metric-item__content">
          <p className="metric-item__label">{label}</p>
          <div className="metric-item__number-chart-row">
            <div className="metric-item__number-badge-col">
              <p className="metric-item__value">{value}</p>
              {trendInline}
            </div>
            <div className="metric-item__chart">{chart}</div>
          </div>
        </div>
        {actions && <div className="metric-item__actions">{actions}</div>}
        {dropdown}
      </div>
    );
  }

  /* --- Simple / Icon variant layout --- */
  return (
    <div className={classes}>
      <div className="metric-item__content">
        {hasIcon && (
          <span className="metric-item__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="metric-item__heading">
          <p className="metric-item__label">{label}</p>
          <div className="metric-item__number-row">
            <p className="metric-item__value">{value}</p>
            {trendBadge}
          </div>
        </div>
      </div>
      {actions && <div className="metric-item__actions">{actions}</div>}
      {dropdown}
    </div>
  );
};

MetricItem.displayName = 'MetricItem';
