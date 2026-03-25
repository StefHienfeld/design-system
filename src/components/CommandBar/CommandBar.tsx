import React from 'react';
import './CommandBar.css';

export interface CommandBarResult {
  key: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface CommandBarProps {
  /** Whether the command bar is open. */
  open: boolean;
  /** Callback when the command bar should close. */
  onClose: () => void;
  /** Callback when the search query changes. */
  onSearch?: (query: string) => void;
  /** The list of results to display. */
  results?: CommandBarResult[];
  /** Callback when a result is selected. */
  onSelect?: (result: CommandBarResult) => void;
  /** Placeholder text for the search input. */
  placeholder?: string;
  /** Message shown when there are no results. */
  emptyMessage?: string;
  /** Additional CSS class name(s). */
  className?: string;
}

/* -- SVG icons (inline to avoid external dependencies) -- */

const SearchIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIconLarge = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowUpIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 13.3333V2.66667M8 2.66667L2.66667 8M8 2.66667L13.3333 8"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowDownIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 2.66667V13.3333M8 13.3333L13.3333 8M8 13.3333L2.66667 8"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EnterIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.33333 10.6667L6.66667 14M6.66667 14L10 10.6667M6.66667 14V6.66667C6.66667 5.95942 6.94762 5.28115 7.44772 4.78105C7.94781 4.28095 8.62609 4 9.33333 4H13.3333"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DefaultResultIcon = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="4" fill="currentColor" />
  </svg>
);

export const CommandBar: React.FC<CommandBarProps> = ({
  open,
  onClose,
  onSearch,
  results = [],
  onSelect,
  placeholder = 'Search',
  emptyMessage = 'No results found',
  className,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);

  /* -- reset state when opened -- */
  React.useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  /* -- close on Escape -- */
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  /* -- lock body scroll -- */
  React.useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  /* -- scroll active item into view -- */
  React.useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('.command-bar__item--active');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  /* -- keyboard navigation on the input -- */
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) {
        onSelect?.(results[activeIndex]);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(0);
    onSearch?.(value);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setActiveIndex(0);
    onSearch?.('');
    inputRef.current?.focus();
  };

  if (!open) return null;

  const dialogClasses = ['command-bar__dialog', className]
    .filter(Boolean)
    .join(' ');

  const hasResults = results.length > 0;
  const showEmpty = !hasResults && query.length > 0;

  return (
    <div
      className="command-bar__overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div className="command-bar__backdrop" aria-hidden="true" />
      <div
        className={dialogClasses}
        role="dialog"
        aria-modal="true"
        aria-label="Command bar"
      >
        {/* -- Search input -- */}
        <div className="command-bar__search">
          <span className="command-bar__search-icon" aria-hidden="true">
            {SearchIcon}
          </span>
          <input
            ref={inputRef}
            className="command-bar__input"
            type="text"
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={hasResults}
            aria-autocomplete="list"
            aria-controls="command-bar-results"
            aria-activedescendant={
              hasResults ? `command-bar-item-${activeIndex}` : undefined
            }
          />
          <span className="command-bar__shortcut" aria-hidden="true">
            <span className="command-bar__shortcut-key">{'\u2318/'}</span>
          </span>
        </div>

        {/* -- Results list -- */}
        {hasResults && (
          <div
            ref={listRef}
            id="command-bar-results"
            className="command-bar__results"
            role="listbox"
          >
            {results.map((result, index) => (
              <div
                key={result.key}
                id={`command-bar-item-${index}`}
                className={[
                  'command-bar__item',
                  index === activeIndex && 'command-bar__item--active',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => onSelect?.(result)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="command-bar__item-content">
                  <span className="command-bar__item-icon" aria-hidden="true">
                    {result.icon || DefaultResultIcon}
                  </span>
                  <div className="command-bar__item-text">
                    <span className="command-bar__item-label">
                      {result.label}
                    </span>
                    {result.description && (
                      <span className="command-bar__item-description">
                        {result.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* -- Empty state -- */}
        {showEmpty && (
          <div className="command-bar__empty">
            <div className="command-bar__empty-inner">
              <div className="command-bar__empty-content">
                <div className="command-bar__empty-icon" aria-hidden="true">
                  {SearchIconLarge}
                </div>
                <div className="command-bar__empty-text">
                  <p className="command-bar__empty-title">{emptyMessage}</p>
                  <p className="command-bar__empty-message">
                    &ldquo;{query}&rdquo; did not match any results.
                  </p>
                </div>
              </div>
              <div className="command-bar__empty-actions">
                <button
                  type="button"
                  className="command-bar__clear-button"
                  onClick={handleClearSearch}
                >
                  Clear search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -- Footer with keyboard hints -- */}
        {hasResults && (
          <div className="command-bar__footer">
            <div className="command-bar__footer-hints">
              {/* Navigate */}
              <div className="command-bar__footer-hint">
                <div className="command-bar__footer-hint-icons">
                  <span className="command-bar__footer-key" aria-hidden="true">
                    {ArrowUpIcon}
                  </span>
                  <span className="command-bar__footer-key" aria-hidden="true">
                    {ArrowDownIcon}
                  </span>
                </div>
                <span className="command-bar__footer-label">to navigate</span>
              </div>

              {/* Select */}
              <div className="command-bar__footer-hint">
                <span className="command-bar__footer-key" aria-hidden="true">
                  {EnterIcon}
                </span>
                <span className="command-bar__footer-label">to select</span>
              </div>

              {/* Close */}
              <div className="command-bar__footer-hint">
                <span
                  className="command-bar__footer-key command-bar__footer-key--text"
                  aria-hidden="true"
                >
                  esc
                </span>
                <span className="command-bar__footer-label">to close</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CommandBar.displayName = 'CommandBar';
