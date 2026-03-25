import React, { useEffect, useRef } from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  /** Checkbox size. */
  size?: 'sm' | 'md';
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Display the indeterminate (dash) indicator. */
  indeterminate?: boolean;
  /** Disable the checkbox. */
  disabled?: boolean;
  /** Label text displayed beside the checkbox. */
  label?: string;
  /** Description text below the label. */
  description?: string;
  /** Called when checked state changes. */
  onChange?: (checked: boolean) => void;
}

const CheckIcon: React.FC = () => (
  <svg
    className="checkbox__icon-check"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon: React.FC = () => (
  <svg
    className="checkbox__icon-indeterminate"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.5 6H9.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      checked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      label,
      description,
      onChange,
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge forwarded ref and internal ref
    const inputRef = (forwardedRef as React.RefObject<HTMLInputElement>) ?? internalRef;
    const resolvedRef = inputRef || internalRef;

    useEffect(() => {
      const el =
        typeof resolvedRef === 'object' && resolvedRef !== null
          ? (resolvedRef as React.RefObject<HTMLInputElement>).current
          : null;
      if (el) {
        el.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const classes = [
      'checkbox',
      `checkbox--${size}`,
      indeterminate && 'checkbox--indeterminate',
      disabled && 'checkbox--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label className={classes}>
        <input
          ref={resolvedRef as React.RefObject<HTMLInputElement>}
          type="checkbox"
          className="checkbox__input"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={indeterminate ? 'mixed' : undefined}
        />
        <span className="checkbox__box" aria-hidden="true">
          <CheckIcon />
          <IndeterminateIcon />
        </span>
        {(label || description) && (
          <span className="checkbox__content">
            {label && <span className="checkbox__label">{label}</span>}
            {description && (
              <span className="checkbox__description">{description}</span>
            )}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
