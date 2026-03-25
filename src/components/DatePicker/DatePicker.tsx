import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './DatePicker.css';

export interface DatePickerProps {
  /** Single date or range selection mode. */
  type?: 'single' | 'range';
  /** Selected date (start date in range mode). */
  value?: Date | null;
  /** End date for range mode. */
  endValue?: Date | null;
  /** Callback when date(s) change. */
  onChange?: (date: Date | null, endDate?: Date | null) => void;
  /** Placeholder text for the trigger button. */
  placeholder?: string;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Additional class name for the root element. */
  className?: string;
}

/* ----------------------------------------------------------------
   Inline SVG icons
   ---------------------------------------------------------------- */
const ChevronLeftIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7.5 15L12.5 10L7.5 5"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Date helpers
   ---------------------------------------------------------------- */
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

function formatDate(d: Date): string {
  const month = MONTH_NAMES[d.getMonth()].slice(0, 3);
  return `${month} ${d.getDate()}, ${d.getFullYear()}`;
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

function getCalendarDays(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const firstDay = new Date(year, month, 1);
  // Monday = 0, Sunday = 6 (ISO week start)
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Previous month padding
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({
      date: startOfDay(d),
      day: d.getDate(),
      isCurrentMonth: false,
      isToday: isToday(d),
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      date: startOfDay(d),
      day: i,
      isCurrentMonth: true,
      isToday: isToday(d),
    });
  }

  // Next month padding — fill to 6 rows (42 cells)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    days.push({
      date: startOfDay(d),
      day: i,
      isCurrentMonth: false,
      isToday: isToday(d),
    });
  }

  return days;
}

function isInRange(
  date: Date,
  start: Date | null | undefined,
  end: Date | null | undefined,
): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t > s && t < e;
}

/* ----------------------------------------------------------------
   Component
   ---------------------------------------------------------------- */
export const DatePicker: React.FC<DatePickerProps> = ({
  type = 'single',
  value = null,
  endValue = null,
  onChange,
  placeholder,
  open: controlledOpen,
  onOpenChange,
  className,
}) => {
  /* ---- State ---- */
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  // Pending selections (committed on Apply)
  const [pendingStart, setPendingStart] = useState<Date | null>(value);
  const [pendingEnd, setPendingEnd] = useState<Date | null>(endValue);
  const [rangeStep, setRangeStep] = useState<'start' | 'end'>('start');

  // Calendar month/year
  const [viewYear, setViewYear] = useState(() => {
    const ref = value || new Date();
    return ref.getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    const ref = value || new Date();
    return ref.getMonth();
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* ---- Sync pending state when props change ---- */
  useEffect(() => {
    setPendingStart(value);
  }, [value]);

  useEffect(() => {
    setPendingEnd(endValue);
  }, [endValue]);

  /* ---- Open/close helpers ---- */
  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const handleOpen = useCallback(() => {
    // Reset pending state when opening
    setPendingStart(value);
    setPendingEnd(endValue);
    setRangeStep('start');
    const ref = value || new Date();
    setViewYear(ref.getFullYear());
    setViewMonth(ref.getMonth());
    setOpen(true);
  }, [value, endValue, setOpen]);

  const toggle = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    } else {
      handleOpen();
    }
  }, [isOpen, setOpen, handleOpen]);

  /* ---- Click outside ---- */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, setOpen]);

  /* ---- Escape key ---- */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, setOpen]);

  /* ---- Month navigation ---- */
  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  /* ---- Today button ---- */
  const goToToday = useCallback(() => {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    const today = startOfDay(now);
    if (type === 'single') {
      setPendingStart(today);
    }
  }, [type]);

  /* ---- Day click ---- */
  const handleDayClick = useCallback(
    (day: CalendarDay) => {
      if (type === 'single') {
        setPendingStart(day.date);
      } else {
        // Range mode
        if (rangeStep === 'start') {
          setPendingStart(day.date);
          setPendingEnd(null);
          setRangeStep('end');
        } else {
          // Ensure start <= end
          if (day.date.getTime() < (pendingStart?.getTime() ?? 0)) {
            setPendingEnd(pendingStart);
            setPendingStart(day.date);
          } else {
            setPendingEnd(day.date);
          }
          setRangeStep('start');
        }
      }
    },
    [type, rangeStep, pendingStart],
  );

  /* ---- Apply / Cancel ---- */
  const handleApply = useCallback(() => {
    if (type === 'single') {
      onChange?.(pendingStart);
    } else {
      onChange?.(pendingStart, pendingEnd);
    }
    setOpen(false);
  }, [type, pendingStart, pendingEnd, onChange, setOpen]);

  const handleCancel = useCallback(() => {
    setPendingStart(value);
    setPendingEnd(endValue);
    setRangeStep('start');
    setOpen(false);
  }, [value, endValue, setOpen]);

  /* ---- Calendar days ---- */
  const calendarDays = useMemo(
    () => getCalendarDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  /* ---- Trigger label ---- */
  const defaultPlaceholder = type === 'range' ? 'Select dates' : 'Select date';
  const triggerPlaceholder = placeholder || defaultPlaceholder;

  let triggerLabel: string;
  let isPlaceholder = false;

  if (type === 'range') {
    if (value && endValue) {
      triggerLabel = `${formatDate(value)} - ${formatDate(endValue)}`;
    } else if (value) {
      triggerLabel = formatDate(value);
    } else {
      triggerLabel = triggerPlaceholder;
      isPlaceholder = true;
    }
  } else {
    if (value) {
      triggerLabel = formatDate(value);
    } else {
      triggerLabel = triggerPlaceholder;
      isPlaceholder = true;
    }
  }

  /* ---- Day cell class computation ---- */
  const getDayClasses = (day: CalendarDay): string => {
    const classes = ['date-picker__day'];

    if (!day.isCurrentMonth) {
      classes.push('date-picker__day--outside');
    }

    if (type === 'single') {
      if (isSameDay(day.date, pendingStart)) {
        classes.push('date-picker__day--selected');
      }
    } else {
      const s = pendingStart;
      const e = pendingEnd;
      const isStart = isSameDay(day.date, s);
      const isEnd = isSameDay(day.date, e);

      if (isStart && isEnd) {
        classes.push('date-picker__day--selected');
        classes.push('date-picker__day--range-start');
        classes.push('date-picker__day--range-end');
      } else if (isStart) {
        classes.push('date-picker__day--range-start');
      } else if (isEnd) {
        classes.push('date-picker__day--range-end');
      } else if (isInRange(day.date, s, e)) {
        classes.push('date-picker__day--in-range');
      }
    }

    return classes.join(' ');
  };

  /* ---- Root classes ---- */
  const rootClasses = [
    'date-picker',
    isOpen && 'date-picker--open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* ---- Input display values ---- */
  const inputStartValue = pendingStart ? formatDate(pendingStart) : '';
  const inputEndValue = pendingEnd ? formatDate(pendingEnd) : '';

  return (
    <div className={rootClasses} ref={containerRef}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        className={`date-picker__trigger${isPlaceholder ? ' date-picker__trigger--placeholder' : ''}`}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="date-picker__trigger-text">{triggerLabel}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="date-picker__dropdown" role="dialog" aria-label="Choose date">
          <div className="date-picker__content">
            {/* Month navigation */}
            <div className="date-picker__month-nav">
              <button
                className="date-picker__nav-btn"
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
              >
                <ChevronLeftIcon />
              </button>
              <span className="date-picker__month-label">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                className="date-picker__nav-btn"
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Actions row */}
            {type === 'single' ? (
              <div className="date-picker__actions">
                <div className="date-picker__input-field">
                  <div
                    className={`date-picker__input${!inputStartValue ? ' date-picker__input--placeholder' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label="Selected date"
                  >
                    {inputStartValue || triggerPlaceholder}
                  </div>
                </div>
                <button
                  className="date-picker__today-btn"
                  type="button"
                  onClick={goToToday}
                >
                  Today
                </button>
              </div>
            ) : (
              <div className="date-picker__range-inputs">
                <div className="date-picker__input-field">
                  <div
                    className={`date-picker__input${!inputStartValue ? ' date-picker__input--placeholder' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label="Start date"
                    onClick={() => setRangeStep('start')}
                  >
                    {inputStartValue || 'Start date'}
                  </div>
                </div>
                <div className="date-picker__input-field">
                  <div
                    className={`date-picker__input${!inputEndValue ? ' date-picker__input--placeholder' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label="End date"
                    onClick={() => setRangeStep('end')}
                  >
                    {inputEndValue || 'End date'}
                  </div>
                </div>
              </div>
            )}

            {/* Calendar grid */}
            <div className="date-picker__grid" role="grid" aria-label="Calendar">
              {/* Day-of-week headers */}
              {DAY_HEADERS.map((header) => (
                <div
                  key={header}
                  className="date-picker__day-header"
                  role="columnheader"
                  aria-label={header}
                >
                  <span className="date-picker__day-header-text">{header}</span>
                </div>
              ))}

              {/* Day cells */}
              {calendarDays.map((day, idx) => (
                <button
                  key={idx}
                  className={getDayClasses(day)}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  aria-label={formatDate(day.date)}
                  tabIndex={-1}
                >
                  <span className="date-picker__day-text">{day.day}</span>
                  {day.isToday && <span className="date-picker__day-dot" />}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="date-picker__footer">
            <div className="date-picker__footer-actions">
              <button
                className="date-picker__cancel-btn"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="date-picker__apply-btn"
                type="button"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
