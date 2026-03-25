import React from 'react';
import './Chart.css';

export interface ChartLegendItem {
  label: string;
  color: string;
}

export interface ChartProps {
  /** Optional title displayed above the chart. */
  title?: string;
  /** Legend items to render. Each item has a label and a color for its dot. */
  legend?: ChartLegendItem[];
  /** Where to position the legend relative to the chart area. */
  legendPosition?: 'top' | 'bottom' | 'right';
  /** Height of the chart area. Accepts a number (px) or CSS string value. */
  height?: number | string;
  /** Chart content slot — pass an SVG, canvas, or third-party chart component. */
  children: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export const Chart: React.FC<ChartProps> = ({
  title,
  legend,
  legendPosition = 'top',
  height = 240,
  children,
  className,
}) => {
  const classes = ['chart', className].filter(Boolean).join(' ');

  const heightValue = typeof height === 'number' ? `${height}px` : height;

  /* --- Legend rendering --- */
  const legendElement =
    legend && legend.length > 0 ? (
      <div className={`chart__legend chart__legend--${legendPosition}`}>
        {legend.map((item) => (
          <div key={item.label} className="chart__legend-item">
            <span
              className="chart__legend-dot"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span className="chart__legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <div className={classes}>
      {title && <p className="chart__title">{title}</p>}

      <div className="chart__body" style={{ height: heightValue }}>
        <div className="chart__content">
          {legendPosition === 'top' && legendElement}
          <div className="chart__area">{children}</div>
          {legendPosition === 'bottom' && legendElement}
        </div>
        {legendPosition === 'right' && legendElement}
      </div>
    </div>
  );
};

Chart.displayName = 'Chart';
