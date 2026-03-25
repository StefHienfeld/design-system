import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from '../Modal';
import './DatePickerModal.css';

/* ----------------------------------------------------------------
   Types
   ---------------------------------------------------------------- */
export interface DatePickerModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Callback to close the modal. */
  onClose: () => void;
  /** Single date or range selection mode. */
  type?: 'single' | 'range';
  /** Selected date (start date in range mode). */
  value?: Date | null;
  /** End date for range mode. */
  endValue?: Date | null;
  /** Callback when date(s) are applied. */
  onChange?: (date: Date | null, endDate?: Date | null) => void;
  /** Title shown in the modal header (optional). */
  title?: string;
  /** Additional class name for the modal dialog. */
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

function isTodayDate(d: Date): boolean {
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
      isToday: isTodayDate(d),
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      date: startOfDay(d),
      day: i,
      isCurrentMonth: true,
      isToday: isTodayDate(d),
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
      isToday: isTodayDate(d),
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

/** Return { year, month } for the next month after the given month. */
function nextMonthOf(year: number, month: number): { year: number; month: number } {
  if (month === 11) return { year: year + 1, month: 0 };
  return { year, month: month + 1 };
}

/* ----------------------------------------------------------------
   DatePickerModal component
   ---------------------------------------------------------------- */
export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  open,
  onClose,
  type = 'single',
  value = null,
  endValue = null,
  onChange,
  title,
  className,
}) => {
  /* ---- Pending selections (committed on Apply) ---- */
  const [pendingStart, setPendingStart] = useState<Date | null>(value);
  const [pendingEnd, setPendingEnd] = useState<Date | null>(endValue);
  const [rangeStep, setRangeStep] = useState<'start' | 'end'>('start');

  /* ---- Calendar month/year (left panel drives both) ---- */
  const [viewYear, setViewYear] = useState(() => {
    const ref = value || new Date();
    return ref.getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    const ref = value || new Date();
    return ref.getMonth();
  });

  /* ---- Sync pending state when modal opens ---- */
  useEffect(() => {
    if (open) {
      setPendingStart(value);
      setPendingEnd(endValue);
      setRangeStep('start');
      const ref = value || new Date();
      setViewYear(ref.getFullYear());
      setViewMonth(ref.getMonth());
    }
  }, [open, value, endValue]);

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
    if (type === 'single') {
      setPendingStart(startOfDay(now));
    }
  }, [type]);

  /* ---- Day click ---- */
  const handleDayClick = useCallback(
    (day: CalendarDay) => {
      if (type === 'single') {
        setPendingStart(day.date);
      } else {
        if (rangeStep === 'start') {
          setPendingStart(day.date);
          setPendingEnd(null);
          setRangeStep('end');
        } else {
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
    onClose();
  }, [type, pendingStart, pendingEnd, onChange, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  /* ---- Calendar days ---- */
  const leftDays = useMemo(
    () => getCalendarDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const rightMonth = useMemo(() => nextMonthOf(viewYear, viewMonth), [viewYear, viewMonth]);
  const rightDays = useMemo(
    () => getCalendarDays(rightMonth.year, rightMonth.month),
    [rightMonth],
  );

  /* ---- Day cell class computation ---- */
  const getDayClasses = useCallback(
    (day: CalendarDay): string => {
      const classes = ['date-picker-modal__day'];

      if (!day.isCurrentMonth) {
        classes.push('date-picker-modal__day--outside');
      }

      if (type === 'single') {
        if (isSameDay(day.date, pendingStart)) {
          classes.push('date-picker-modal__day--selected');
        }
      } else {
        const s = pendingStart;
        const e = pendingEnd;
        const isStart = isSameDay(day.date, s);
        const isEnd = isSameDay(day.date, e);

        if (isStart && isEnd) {
          classes.push('date-picker-modal__day--selected');
          classes.push('date-picker-modal__day--range-start');
          classes.push('date-picker-modal__day--range-end');
        } else if (isStart) {
          classes.push('date-picker-modal__day--range-start');
        } else if (isEnd) {
          classes.push('date-picker-modal__day--range-end');
        } else if (isInRange(day.date, s, e)) {
          classes.push('date-picker-modal__day--in-range');
        }
      }

      return classes.join(' ');
    },
    [type, pendingStart, pendingEnd],
  );

  /* ---- Input display values ---- */
  const inputStartValue = pendingStart ? formatDate(pendingStart) : '';
  const inputEndValue = pendingEnd ? formatDate(pendingEnd) : '';

  /* ---- Dialog class ---- */
  const dialogClasses = ['date-picker-modal__dialog', className]
    .filter(Boolean)
    .join(' ');

  /* ---- Footer ---- */
  const footer = (
    <div className="date-picker-modal__footer">
      <div className="date-picker-modal__footer-actions">
        <button
          className="date-picker-modal__cancel-btn"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="date-picker-modal__apply-btn"
          type="button"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );

  /* ---- Render ---- */
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      className={dialogClasses}
    >
      <div className="date-picker-modal__body">
        {/* Left (or only) panel */}
        <div className="date-picker-modal__panel">
          <div className="date-picker-modal__content">
            {/* Month nav */}
            <div className="date-picker-modal__month-nav">
              <button
                className="date-picker-modal__nav-btn"
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
              >
                <ChevronLeftIcon />
              </button>
              <span className="date-picker-modal__month-label">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              {type === 'single' ? (
                <button
                  className="date-picker-modal__nav-btn"
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                >
                  <ChevronRightIcon />
                </button>
              ) : (
                <span className="date-picker-modal__nav-btn date-picker-modal__nav-btn--hidden" />
              )}
            </div>

            {/* Actions row */}
            {type === 'single' ? (
              <div className="date-picker-modal__actions">
                <div className="date-picker-modal__input-field">
                  <div
                    className={`date-picker-modal__input${!inputStartValue ? ' date-picker-modal__input--placeholder' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label="Selected date"
                  >
                    {inputStartValue || 'Select date'}
                  </div>
                </div>
                <button
                  className="date-picker-modal__today-btn"
                  type="button"
                  onClick={goToToday}
                >
                  Today
                </button>
              </div>
            ) : (
              <div className="date-picker-modal__range-inputs">
                <div className="date-picker-modal__input-field">
                  <div
                    className={`date-picker-modal__input${!inputStartValue ? ' date-picker-modal__input--placeholder' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label="Start date"
                    onClick={() => setRangeStep('start')}
                  >
                    {inputStartValue || 'Start date'}
                  </div>
                </div>
                <div className="date-picker-modal__range-connector" aria-hidden="true">
                  <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1H8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="date-picker-modal__input-field">
                  <div
                    className={`date-picker-modal__input${!inputEndValue ? ' date-picker-modal__input--placeholder' : ''}`}
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
            <div className="date-picker-modal__grid" role="grid" aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear}`}>
              {DAY_HEADERS.map((header) => (
                <div
                  key={header}
                  className="date-picker-modal__day-header"
                  role="columnheader"
                  aria-label={header}
                >
                  <span className="date-picker-modal__day-header-text">{header}</span>
                </div>
              ))}
              {leftDays.map((day, idx) => (
                <button
                  key={idx}
                  className={getDayClasses(day)}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  aria-label={formatDate(day.date)}
                  tabIndex={-1}
                >
                  <span className="date-picker-modal__day-text">{day.day}</span>
                  {day.isToday && <span className="date-picker-modal__day-dot" />}
                </button>
              ))}
            </div>
          </div>

          {/* Footer in single mode lives inside the sole panel */}
          {type === 'single' && footer}
        </div>

        {/* Right panel (range mode only) */}
        {type === 'range' && (
          <div className="date-picker-modal__panel">
            <div className="date-picker-modal__content">
              {/* Month nav (right) */}
              <div className="date-picker-modal__month-nav">
                <span className="date-picker-modal__nav-btn date-picker-modal__nav-btn--hidden" />
                <span className="date-picker-modal__month-label">
                  {MONTH_NAMES[rightMonth.month]} {rightMonth.year}
                </span>
                <button
                  className="date-picker-modal__nav-btn"
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                >
                  <ChevronRightIcon />
                </button>
              </div>

              {/* Calendar grid (right) */}
              <div className="date-picker-modal__grid" role="grid" aria-label={`${MONTH_NAMES[rightMonth.month]} ${rightMonth.year}`}>
                {DAY_HEADERS.map((header) => (
                  <div
                    key={header}
                    className="date-picker-modal__day-header"
                    role="columnheader"
                    aria-label={header}
                  >
                    <span className="date-picker-modal__day-header-text">{header}</span>
                  </div>
                ))}
                {rightDays.map((day, idx) => (
                  <button
                    key={idx}
                    className={getDayClasses(day)}
                    type="button"
                    onClick={() => handleDayClick(day)}
                    aria-label={formatDate(day.date)}
                    tabIndex={-1}
                  >
                    <span className="date-picker-modal__day-text">{day.day}</span>
                    {day.isToday && <span className="date-picker-modal__day-dot" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer in range mode lives inside the right panel */}
            {footer}
          </div>
        )}
      </div>
    </Modal>
  );
};

DatePickerModal.displayName = 'DatePickerModal';
