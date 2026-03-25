import React from 'react';
import './InputField.css';

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size variant. */
  size?: 'sm' | 'md';
  /** Label displayed above the input. */
  label?: string;
  /** Hint text displayed below the input. */
  hint?: string;
  /** Error message displayed below the input; activates error styling. */
  error?: string;
  /** Show a required asterisk after the label. */
  required?: boolean;
  /** Icon rendered inside the input on the leading (left) side. */
  iconLeading?: React.ReactNode;
  /** Icon rendered inside the input on the trailing (right) side. */
  iconTrailing?: React.ReactNode;
  /** Text addon rendered as a separate block on the leading side. */
  leadingText?: string;
  /** Button rendered on the trailing end of the input. */
  trailingButton?: {
    label: string;
    onClick?: () => void;
  };
  /** Dropdown rendered on the leading side of the input. */
  leadingDropdown?: {
    value: string;
    options: { value: string; label: string }[];
    onChange?: (value: string) => void;
  };
  /** Dropdown rendered on the trailing side of the input. */
  trailingDropdown?: {
    value: string;
    options: { value: string; label: string }[];
    onChange?: (value: string) => void;
  };
  /** Force destructive (error) border styling without an error message. */
  destructive?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      size = 'md',
      label,
      hint,
      error,
      required,
      iconLeading,
      iconTrailing,
      leadingText,
      trailingButton,
      leadingDropdown,
      trailingDropdown,
      destructive = false,
      disabled,
      className,
      id,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const hasError = !!error || destructive;

    const containerClasses = [
      'input-field__container',
      `input-field__container--${size}`,
      hasError && 'input-field__container--error',
      disabled && 'input-field__container--disabled',
      leadingText && 'input-field__container--has-leading-text',
      leadingDropdown && 'input-field__container--has-leading-dropdown',
      trailingButton && 'input-field__container--has-trailing-button',
      trailingDropdown && 'input-field__container--has-trailing-dropdown',
      iconLeading && 'input-field__container--has-leading-icon',
      iconTrailing && 'input-field__container--has-trailing-icon',
      hasError && !iconTrailing && 'input-field__container--has-error-icon',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = ['input-field', className].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="input-field__label" htmlFor={inputId}>
            {label}
            {required && <span className="input-field__required"> *</span>}
          </label>
        )}

        <div className={containerClasses}>
          {leadingDropdown && (
            <span className="input-field__leading-dropdown">
              <select
                value={leadingDropdown.value}
                onChange={(e) => leadingDropdown.onChange?.(e.target.value)}
                disabled={disabled}
              >
                {leadingDropdown.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="input-field__dropdown-chevron" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          )}

          {leadingText && (
            <span className="input-field__leading-text">{leadingText}</span>
          )}

          {iconLeading && (
            <span className="input-field__icon-leading" aria-hidden="true">
              {iconLeading}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className="input-field__input"
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={
              [errorId, hintId].filter(Boolean).join(' ') || undefined
            }
            {...rest}
          />

          {iconTrailing && (
            <span
              className={[
                'input-field__icon-trailing',
                hasError && 'input-field__icon-trailing--error',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            >
              {iconTrailing}
            </span>
          )}

          {hasError && !iconTrailing && (
            <span
              className="input-field__icon-trailing input-field__icon-trailing--error"
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5.33v2.67m0 2.67h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}

          {trailingDropdown && (
            <span className="input-field__trailing-dropdown">
              <select
                value={trailingDropdown.value}
                onChange={(e) => trailingDropdown.onChange?.(e.target.value)}
                disabled={disabled}
              >
                {trailingDropdown.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="input-field__dropdown-chevron" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          )}

          {trailingButton && (
            <button
              type="button"
              className="input-field__trailing-button"
              onClick={trailingButton.onClick}
              disabled={disabled}
            >
              {trailingButton.label}
            </button>
          )}
        </div>

        {error && (
          <p className="input-field__error" id={errorId} role="alert">
            {error}
          </p>
        )}

        {hint && !error && (
          <p className="input-field__hint" id={hintId}>
            {hint}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';
