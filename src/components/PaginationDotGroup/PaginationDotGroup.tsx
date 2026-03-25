import React from 'react';
import './PaginationDotGroup.css';

export interface PaginationDotGroupProps {
  /** Total number of pages/slides. */
  total: number;
  /** Zero-based index of the current active page. */
  current: number;
  /** Visual style of the indicators. */
  style?: 'dot' | 'line';
  /** Size variant. */
  size?: 'md' | 'lg';
  /** Whether to render the framed (background + padding) variant. */
  framed?: boolean;
  /** Callback fired when an indicator is clicked. Receives the zero-based index. */
  onChange?: (index: number) => void;
  /** Additional CSS class for the root element. */
  className?: string;
}

export const PaginationDotGroup: React.FC<PaginationDotGroupProps> = ({
  total,
  current,
  style = 'dot',
  size = 'md',
  framed = false,
  onChange,
  className,
}) => {
  const rootClasses = [
    'pagination-dots',
    `pagination-dots--${size}`,
    `pagination-dots--${style}`,
    framed && 'pagination-dots--framed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} role="tablist" aria-label="Pagination">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        const dotClasses = [
          'pagination-dots__dot',
          isActive && 'pagination-dots__dot--active',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={i}
            type="button"
            className={dotClasses}
            role="tab"
            aria-selected={isActive}
            aria-label={`Page ${i + 1}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange?.(i)}
          />
        );
      })}
    </div>
  );
};

PaginationDotGroup.displayName = 'PaginationDotGroup';
