import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Dropdown.css';

export interface DropdownProps {
  /** Which trigger style to render. */
  trigger?: 'button' | 'icon' | 'avatar';
  /** Label shown inside the button trigger. */
  label?: string;
  /** Avatar image URL for the avatar trigger. */
  avatar?: string;
  /** Dropdown panel content (typically Menu items). */
  children: React.ReactNode;
  className?: string;
}

/* dots-vertical icon — three 2px circles stacked vertically */
const DotsVerticalIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="10" cy="4" r="2" />
    <circle cx="10" cy="10" r="2" />
    <circle cx="10" cy="16" r="2" />
  </svg>
);

/* chevron-down for button trigger */
const ChevronDownIcon: React.FC = () => (
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

/** Extract up to two initials from a name/label string. */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger = 'button',
  label = 'Options',
  avatar,
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  /* Close on click outside */
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, close]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, close]);

  const rootClasses = [
    'dropdown',
    `dropdown--${trigger}`,
    open && 'dropdown--open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* ---- render trigger ---- */
  const renderTrigger = () => {
    switch (trigger) {
      case 'icon':
        return (
          <button
            ref={triggerRef}
            className="dropdown__trigger dropdown__trigger--icon"
            type="button"
            onClick={toggle}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="More options"
          >
            <DotsVerticalIcon />
          </button>
        );

      case 'avatar':
        return (
          <button
            ref={triggerRef}
            className="dropdown__trigger dropdown__trigger--avatar"
            type="button"
            onClick={toggle}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="Account menu"
          >
            {avatar ? (
              <img
                className="dropdown__avatar-img"
                src={avatar}
                alt=""
              />
            ) : (
              <span className="dropdown__avatar-fallback" aria-hidden="true">
                {getInitials(label)}
              </span>
            )}
          </button>
        );

      case 'button':
      default:
        return (
          <button
            ref={triggerRef}
            className="dropdown__trigger dropdown__trigger--button"
            type="button"
            onClick={toggle}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <span className="dropdown__button-label">{label}</span>
            <span className="dropdown__button-chevron">
              <ChevronDownIcon />
            </span>
          </button>
        );
    }
  };

  return (
    <div className={rootClasses} ref={containerRef}>
      {renderTrigger()}
      {open && (
        <div className="dropdown__panel" role="menu">
          {children}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
