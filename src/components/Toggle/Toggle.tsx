import React, { useCallback, useId, useState } from 'react';
import './Toggle.css';

export interface ToggleProps {
  /** Toggle size. */
  size?: 'sm' | 'md';
  /** Toggle type — default or slim (narrower/thinner). */
  type?: 'default' | 'slim';
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage. */
  defaultChecked?: boolean;
  /** Disables the toggle. */
  disabled?: boolean;
  /** Label text displayed beside the toggle. */
  label?: string;
  /** Supporting description text below the label. */
  description?: string;
  /** Callback fired when the checked state changes. */
  onChange?: (checked: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      size = 'md',
      type = 'default',
      checked: controlledChecked,
      defaultChecked = false,
      disabled = false,
      label,
      description,
      onChange,
    },
    ref,
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const generatedId = useId();
    const labelId = label ? `${generatedId}-label` : undefined;
    const descriptionId = description ? `${generatedId}-desc` : undefined;

    const handleClick = useCallback(() => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) {
        setInternalChecked(next);
      }
      onChange?.(next);
    }, [disabled, isChecked, isControlled, onChange]);

    const trackClasses = [
      'toggle__track',
      `toggle__track--${size}`,
      type === 'slim' && 'toggle__track--slim',
      isChecked && 'toggle__track--checked',
      disabled && 'toggle__track--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const track = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        disabled={disabled}
        className={trackClasses}
        onClick={handleClick}
      >
        <span className="toggle__thumb" />
      </button>
    );

    if (!label && !description) {
      return track;
    }

    return (
      <div className="toggle-wrapper">
        {track}
        <div className="toggle__text">
          {label && (
            <span id={labelId} className="toggle__label">
              {label}
            </span>
          )}
          {description && (
            <span id={descriptionId} className="toggle__description">
              {description}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Toggle.displayName = 'Toggle';
