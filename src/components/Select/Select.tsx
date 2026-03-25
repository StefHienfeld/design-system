import React from 'react';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  avatar?: string;
  dotColor?: string;
}

export interface SelectProps {
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Label displayed above the trigger. */
  label?: string;
  /** Placeholder text when no option is selected. */
  placeholder?: string;
  /** Hint text displayed below the trigger. */
  hint?: string;
  /** Error message displayed below the trigger; activates error styling. */
  error?: string;
  /** Disable the select. */
  disabled?: boolean;
  /** Show a required asterisk after the label. */
  required?: boolean;
  /** The list of selectable options. */
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Default selected value (uncontrolled). */
  defaultValue?: string;
  /** Callback fired when an option is selected. */
  onChange?: (value: string) => void;
  /** Enable search/filter functionality in the dropdown. */
  searchable?: boolean;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
}

/* Inline SVG icons ----------------------------------------------------- */

const ChevronDownIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M16.667 5L7.5 14.167 3.333 10"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M17.5 17.5L13.875 13.875M15.833 9.167a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Component ------------------------------------------------------------ */

export const Select: React.FC<SelectProps> = ({
  size = 'md',
  label,
  placeholder = 'Select...',
  hint,
  error,
  disabled = false,
  required = false,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  searchable = false,
  searchPlaceholder = 'Search...',
}) => {
  const generatedId = React.useId();
  const hintId = hint ? `${generatedId}-hint` : undefined;
  const errorId = error ? `${generatedId}-error` : undefined;
  const listboxId = `${generatedId}-listbox`;

  /* -- state -- */
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue,
  );
  const selectedValue = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [searchQuery, setSearchQuery] = React.useState('');

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === selectedValue);

  const filteredOptions = searchable && searchQuery
    ? options.filter((o) =>
        o.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options;

  /* -- clear search when dropdown closes & auto-focus search input -- */
  React.useEffect(() => {
    if (!open) {
      setSearchQuery('');
    } else if (searchable) {
      // Auto-focus the search input when dropdown opens
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [open, searchable]);

  /* -- close on outside click -- */
  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  /* -- scroll active option into view -- */
  React.useEffect(() => {
    if (!open || activeIndex < 0) return;
    const dropdown = dropdownRef.current;
    if (!dropdown) return;
    const items = dropdown.querySelectorAll('[role="option"]');
    const item = items[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  /* -- handlers -- */
  const handleSelect = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
    if (!open) {
      const idx = filteredOptions.findIndex((o) => o.value === selectedValue);
      setActiveIndex(idx >= 0 ? idx : 0);
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    // When searchable, printable characters should open dropdown and focus the search input
    if (
      searchable &&
      !open &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      setOpen(true);
      setActiveIndex(0);
      // Let the character be typed into the search input after it focuses
      return;
    }

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open && activeIndex >= 0 && filteredOptions[activeIndex]) {
          handleSelect(filteredOptions[activeIndex].value);
        } else {
          setOpen(true);
          const idx = filteredOptions.findIndex((o) => o.value === selectedValue);
          setActiveIndex(idx >= 0 ? idx : 0);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          const idx = filteredOptions.findIndex((o) => o.value === selectedValue);
          setActiveIndex(idx >= 0 ? idx : 0);
        } else {
          setActiveIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (open) {
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setActiveIndex(filteredOptions.length - 1);
        }
        break;
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && filteredOptions[activeIndex]) {
          handleSelect(filteredOptions[activeIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(filteredOptions.length - 1);
        break;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setActiveIndex(0);
  };

  /* -- class helpers -- */
  const triggerClasses = [
    'select__trigger',
    `select__trigger--${size}`,
    error && 'select__trigger--error',
    disabled && 'select__trigger--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  /* -- render helpers -- */
  const renderOptionDecorator = (option: SelectOption) => {
    if (option.icon) {
      return <span className="select__option-icon">{option.icon}</span>;
    }
    if (option.avatar) {
      return (
        <img
          className="select__option-avatar"
          src={option.avatar}
          alt=""
          aria-hidden="true"
        />
      );
    }
    if (option.dotColor) {
      return (
        <span
          className="select__option-dot"
          style={{ backgroundColor: option.dotColor }}
          aria-hidden="true"
        />
      );
    }
    return null;
  };

  const hasDecorator = (option: SelectOption) =>
    !!(option.icon || option.avatar || option.dotColor);

  return (
    <div className="select">
      {label && (
        <label className="select__label" id={`${generatedId}-label`}>
          {label}
          {required && <span className="select__required"> *</span>}
        </label>
      )}

      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={label ? `${generatedId}-label` : undefined}
        aria-describedby={
          [errorId, hintId].filter(Boolean).join(' ') || undefined
        }
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-activedescendant={
          open && activeIndex >= 0
            ? `${generatedId}-option-${activeIndex}`
            : undefined
        }
        className={triggerClasses}
        disabled={disabled}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        {selectedOption ? (
          hasDecorator(selectedOption) ? (
            <span className="select__trigger-content">
              {renderOptionDecorator(selectedOption)}
              <span className="select__trigger-text">
                {selectedOption.label}
              </span>
            </span>
          ) : (
            <span className="select__trigger-text">
              {selectedOption.label}
            </span>
          )
        ) : (
          <span className="select__trigger-text select__trigger-text--placeholder">
            {placeholder}
          </span>
        )}

        <span
          className={[
            'select__chevron',
            open && 'select__chevron--open',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        >
          {ChevronDownIcon}
        </span>
      </button>

      {open && (
        <div
          ref={dropdownRef}
          role="listbox"
          id={listboxId}
          aria-labelledby={label ? `${generatedId}-label` : undefined}
          className="select__dropdown"
        >
          {searchable && (
            <div className="select__search" onMouseDown={(e) => e.preventDefault()}>
              <span className="select__search-icon" aria-hidden="true">
                {SearchIcon}
              </span>
              <input
                ref={searchInputRef}
                type="text"
                className="select__search-input"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                aria-label="Search options"
                autoComplete="off"
              />
            </div>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isActive = index === activeIndex;
              const decorator = renderOptionDecorator(option);

              return (
                <div
                  key={option.value}
                  id={`${generatedId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'select__option',
                    isSelected && 'select__option--selected',
                    isActive && 'select__option--active',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option.value);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span className="select__option-content">
                    {decorator}
                    <span>{option.label}</span>
                  </span>
                  {isSelected && (
                    <span className="select__check" aria-hidden="true">
                      {CheckIcon}
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            searchable && searchQuery && (
              <div className="select__no-results">No results found</div>
            )
          )}
        </div>
      )}

      {error && (
        <p className="select__error" id={errorId} role="alert">
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="select__hint" id={hintId}>
          {hint}
        </p>
      )}
    </div>
  );
};

Select.displayName = 'Select';
