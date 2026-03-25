import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Slider.css';

export interface SliderProps {
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Step increment. */
  step?: number;
  /** Controlled range value as [low, high]. */
  value?: [number, number];
  /** Initial range value for uncontrolled usage. */
  defaultValue?: [number, number];
  /** Callback fired when the range changes. */
  onChange?: (value: [number, number]) => void;
  /** Label display mode. */
  label?: 'none' | 'bottom' | 'top-floating';
  /** Custom label formatter. */
  formatLabel?: (value: number) => string;
  /** Additional CSS class for the root element. */
  className?: string;
}

const defaultFormatLabel = (v: number) => `${v}%`;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, step: number): number {
  return Math.round((value - min) / step) * step + min;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = [25, 75],
  onChange,
  label = 'none',
  formatLabel = defaultFormatLabel,
  className,
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
  const rangeValue = isControlled ? controlledValue : internalValue;

  const trackRef = useRef<HTMLDivElement>(null);
  const activeHandleRef = useRef<0 | 1 | null>(null);
  const handleElements = useRef<(HTMLDivElement | null)[]>([null, null]);

  const getPercentage = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max],
  );

  const getValueFromPosition = useCallback(
    (clientX: number): number => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = ratio * (max - min) + min;
      return clamp(snapToStep(raw, min, step), min, max);
    },
    [min, max, step],
  );

  const updateValue = useCallback(
    (index: 0 | 1, newVal: number) => {
      const next: [number, number] = [...rangeValue] as [number, number];
      next[index] = newVal;

      // Ensure low <= high
      if (next[0] > next[1]) {
        if (index === 0) {
          next[0] = next[1];
        } else {
          next[1] = next[0];
        }
      }

      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [rangeValue, isControlled, onChange],
  );

  /* ---- pointer handlers ---- */
  const handlePointerDown = useCallback(
    (index: 0 | 1) => (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      activeHandleRef.current = index;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (activeHandleRef.current === null) return;
      const newVal = getValueFromPosition(e.clientX);
      updateValue(activeHandleRef.current, newVal);
    },
    [getValueFromPosition, updateValue],
  );

  const handlePointerUp = useCallback(() => {
    activeHandleRef.current = null;
  }, []);

  /* ---- track click: move nearest handle ---- */
  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      const newVal = getValueFromPosition(e.clientX);
      const distLow = Math.abs(newVal - rangeValue[0]);
      const distHigh = Math.abs(newVal - rangeValue[1]);
      const index: 0 | 1 = distLow <= distHigh ? 0 : 1;
      updateValue(index, newVal);
      // Focus the moved handle
      handleElements.current[index]?.focus();
    },
    [getValueFromPosition, rangeValue, updateValue],
  );

  /* ---- keyboard support ---- */
  const handleKeyDown = useCallback(
    (index: 0 | 1) => (e: React.KeyboardEvent) => {
      let newVal = rangeValue[index];
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newVal = clamp(rangeValue[index] + step, min, max);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newVal = clamp(rangeValue[index] - step, min, max);
          break;
        case 'Home':
          e.preventDefault();
          newVal = min;
          break;
        case 'End':
          e.preventDefault();
          newVal = max;
          break;
        default:
          return;
      }
      updateValue(index, newVal);
    },
    [rangeValue, step, min, max, updateValue],
  );

  /* ---- sync internal state when controlled value changes ---- */
  useEffect(() => {
    if (isControlled && controlledValue) {
      setInternalValue(controlledValue);
    }
  }, [isControlled, controlledValue]);

  /* ---- derived positions ---- */
  const lowPct = getPercentage(rangeValue[0]);
  const highPct = getPercentage(rangeValue[1]);

  const rootClasses = ['slider', className].filter(Boolean).join(' ');

  const renderLabel = (index: 0 | 1) => {
    if (label === 'none') return null;
    const text = formatLabel(rangeValue[index]);
    if (label === 'bottom') {
      return <span className="slider__label-bottom">{text}</span>;
    }
    return <span className="slider__label-floating">{text}</span>;
  };

  const renderHandle = (index: 0 | 1, leftPercent: number) => {
    const isActive = activeHandleRef.current === index;
    const classes = ['slider__handle', isActive && 'slider__handle--active']
      .filter(Boolean)
      .join(' ');
    return (
      <div
        key={index}
        ref={(el) => {
          handleElements.current[index] = el;
        }}
        className={classes}
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={rangeValue[index]}
        aria-label={index === 0 ? 'Range minimum' : 'Range maximum'}
        style={{ left: `${leftPercent}%` }}
        onPointerDown={handlePointerDown(index)}
        onKeyDown={handleKeyDown(index)}
      >
        {renderLabel(index)}
      </div>
    );
  };

  return (
    <div
      className={rootClasses}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        ref={trackRef}
        className="slider__track"
        onClick={handleTrackClick}
      >
        <div
          className="slider__range"
          style={{
            left: `${lowPct}%`,
            width: `${highPct - lowPct}%`,
          }}
        />
      </div>
      {renderHandle(0, lowPct)}
      {renderHandle(1, highPct)}
    </div>
  );
};

Slider.displayName = 'Slider';
