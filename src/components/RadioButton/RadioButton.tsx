import React from 'react';
import './RadioButton.css';

export interface RadioButtonProps {
  /** RadioButton size. */
  size?: 'sm' | 'md';
  /** Controlled checked state. */
  checked?: boolean;
  /** Disable the radio button. */
  disabled?: boolean;
  /** Label text displayed beside the radio button. */
  label?: string;
  /** Description text below the label. */
  description?: string;
  /** HTML name attribute for grouping radio buttons. */
  name?: string;
  /** The value of this radio button. */
  value?: string;
  /** Called when this radio button is selected. */
  onChange?: (value: string) => void;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      size = 'md',
      checked,
      disabled = false,
      label,
      description,
      name,
      value = '',
      onChange,
    },
    forwardedRef,
  ) => {
    const classes = [
      'radio',
      `radio--${size}`,
      disabled && 'radio--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = () => {
      onChange?.(value);
    };

    return (
      <label className={classes}>
        <input
          ref={forwardedRef}
          type="radio"
          className="radio__input"
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleChange}
        />
        <span className="radio__circle" aria-hidden="true" />
        {(label || description) && (
          <span className="radio__content">
            {label && <span className="radio__label">{label}</span>}
            {description && (
              <span className="radio__description">{description}</span>
            )}
          </span>
        )}
      </label>
    );
  },
);

RadioButton.displayName = 'RadioButton';
