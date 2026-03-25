import React, { useState, useRef, useEffect } from 'react';
import { Menu } from '../Menu';
import './ButtonSplit.css';

export interface ButtonSplitProps {
  /** Button size. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Visual hierarchy. */
  hierarchy?: 'primary' | 'secondary';
  /** Show a spinner and replace the label with "Submitting...". */
  loading?: boolean;
  /** Disable the entire split button. */
  disabled?: boolean;
  /** Label text for the main action. */
  children: React.ReactNode;
  /** Click handler for the main action button. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Menu items rendered inside the dropdown. */
  menuItems: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

const Spinner: React.FC = () => (
  <span className="button-split__spinner" aria-hidden="true">
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

const ChevronDown: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ButtonSplit = React.forwardRef<HTMLDivElement, ButtonSplitProps>(
  (
    {
      size = 'md',
      hierarchy = 'primary',
      loading = false,
      disabled,
      children,
      onClick,
      menuItems,
      className,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const isDisabled = disabled || loading;

    /* close on click outside */
    useEffect(() => {
      if (!open) return;

      function handleClickOutside(e: MouseEvent) {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    const containerClasses = [
      'button-split',
      `button-split--${size}`,
      `button-split--${hierarchy}`,
      loading && 'button-split--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
          if (typeof ref === 'function') ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={containerClasses}
      >
        {/* --- main action button --- */}
        <button
          type="button"
          className="button-split__main"
          disabled={isDisabled}
          aria-busy={loading || undefined}
          onClick={onClick}
        >
          {loading ? (
            <>
              <Spinner />
              <span className="button-split__text">Submitting...</span>
            </>
          ) : (
            <span className="button-split__text">{children}</span>
          )}
        </button>

        {/* --- divider --- */}
        <span className="button-split__divider" aria-hidden="true" />

        {/* --- dropdown trigger --- */}
        <button
          type="button"
          className="button-split__toggle"
          disabled={isDisabled}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="More options"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronDown />
        </button>

        {/* --- dropdown menu --- */}
        {open && (
          <div className="button-split__dropdown">
            <Menu>{menuItems}</Menu>
          </div>
        )}
      </div>
    );
  },
);

ButtonSplit.displayName = 'ButtonSplit';
