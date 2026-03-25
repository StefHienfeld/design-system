import React from 'react';
import './FilterBar.css';

export interface FilterItem {
  key: string;
  label: string;
}

export interface FilterBarProps {
  /** Current value of the search input. */
  searchValue?: string;
  /** Called when the search input value changes. */
  onSearchChange?: (value: string) => void;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
  /** Active filter items displayed as removable badges. */
  filters?: FilterItem[];
  /** Called when a filter badge remove button is clicked. */
  onRemoveFilter?: (key: string) => void;
  /** Called when the "Clear all" button is clicked. */
  onClearAll?: () => void;
  /** Called when the "Filters" button is clicked. */
  onFilterClick?: () => void;
  /** Additional CSS class name for the root element. */
  className?: string;
}

/* ----------------------------------------------------------------
   Inline SVG icons (matching Figma: search-lg, filter-lines, x-close)
   ---------------------------------------------------------------- */
const SearchIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterLinesIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M9 3L3 9M3 3L9 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search',
  filters = [],
  onRemoveFilter,
  onClearAll,
  onFilterClick,
  className,
}) => {
  const hasFilters = filters.length > 0;

  const rootClasses = ['filter-bar', className].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      {/* Search input with icon */}
      <div className="filter-bar__search-wrapper">
        <span className="filter-bar__search-icon">
          <SearchIcon />
        </span>
        <input
          type="text"
          className="filter-bar__search-input"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
        />
      </div>

      {/* Filters button */}
      <button
        type="button"
        className="filter-bar__filters-button"
        onClick={onFilterClick}
      >
        <span className="filter-bar__filters-button-icon">
          <FilterLinesIcon />
        </span>
        <span>Filters</span>
      </button>

      {/* Separator + active filter badges */}
      {hasFilters && (
        <>
          <div className="filter-bar__separator" aria-hidden="true" />

          <div className="filter-bar__active-filters">
            {filters.map((filter) => (
              <span key={filter.key} className="filter-bar__filter-badge">
                {filter.label}
                <button
                  type="button"
                  className="filter-bar__filter-badge-remove"
                  onClick={() => onRemoveFilter?.(filter.key)}
                  aria-label={`Remove ${filter.label}`}
                >
                  <CloseIcon />
                </button>
              </span>
            ))}

            {/* Clear all */}
            <button
              type="button"
              className="filter-bar__clear"
              onClick={onClearAll}
            >
              Clear all
            </button>
          </div>
        </>
      )}
    </div>
  );
};

FilterBar.displayName = 'FilterBar';
