import React from 'react';
import './Button.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button size. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Visual hierarchy. */
  hierarchy?: 'primary' | 'secondary' | 'tertiary' | 'link-color' | 'link-gray';
  /** Icon rendered before the label. */
  iconLeading?: React.ReactNode;
  /** Icon rendered after the label. */
  iconTrailing?: React.ReactNode;
  /** Render as a square icon-only button (uses the first icon or children). */
  iconOnly?: boolean;
  /** Show a spinner and replace the label with "Submitting...". */
  loading?: boolean;
}

const Spinner: React.FC = () => (
  <span className="button__spinner" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2a8 8 0 1 0 8 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      hierarchy = 'primary',
      iconLeading,
      iconTrailing,
      iconOnly = false,
      loading = false,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      'button',
      `button--${size}`,
      `button--${hierarchy}`,
      iconOnly && 'button--icon-only',
      loading && 'button--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const isDisabled = disabled || loading;

    /* --- icon-only mode ---- */
    if (iconOnly) {
      return (
        <button
          ref={ref}
          className={classes}
          disabled={isDisabled}
          aria-busy={loading || undefined}
          {...rest}
        >
          {loading ? (
            <Spinner />
          ) : (
            iconLeading ?? iconTrailing ?? children
          )}
        </button>
      );
    }

    /* --- standard mode ---- */
    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? (
          <>
            <Spinner />
            <span className="button__text">Submitting...</span>
          </>
        ) : (
          <>
            {iconLeading && (
              <span className="button__icon-leading">{iconLeading}</span>
            )}
            <span className="button__text">{children}</span>
            {iconTrailing && (
              <span className="button__icon-trailing">{iconTrailing}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
