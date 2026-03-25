import React from 'react';
import './NavItemBase.css';

export interface NavItemBaseProps {
  /** Text label displayed next to the icon. */
  label: string;
  /** Leading icon (20 x 20 SVG recommended). */
  icon?: React.ReactNode;
  /** Numeric count rendered as a pill badge on the right. */
  count?: number;
  /** Text badge rendered as a pill on the right (ignored when count is set). */
  badge?: string;
  /** Marks this item as the currently active page/route. */
  active?: boolean;
  /** Collapsed (icon-only) mode — hides label, count, badge, and chevron. */
  collapsed?: boolean;
  /** Optional dot indicator rendered before the icon. */
  dot?: React.ReactNode;
  /** When provided, the item renders as an anchor. */
  href?: string;
  /** Click handler. */
  onClick?: () => void;
  /** Additional CSS class(es) appended to the root element. */
  className?: string;
}

/** Chevron-down icon (16 x 16). */
const ChevronDown: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NavItemBase: React.FC<NavItemBaseProps> = ({
  label,
  icon,
  count,
  badge,
  active = false,
  collapsed = false,
  dot,
  href,
  onClick,
  className,
}) => {
  const rootClasses = [
    'nav-item',
    active && 'nav-item--active',
    collapsed && 'nav-item--collapsed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <span className="nav-item__content">
      <span className="nav-item__text-group">
        {dot && (
          <span className="nav-item__dot" aria-hidden="true">
            {dot}
          </span>
        )}
        {icon && (
          <span className="nav-item__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {!collapsed && (
          <span className="nav-item__label">{label}</span>
        )}
      </span>

      {!collapsed && count != null && (
        <span className="nav-item__count">{count}</span>
      )}

      {!collapsed && count == null && badge != null && (
        <span className="nav-item__badge">{badge}</span>
      )}

      {!collapsed && onClick && (
        <span className="nav-item__chevron" aria-hidden="true">
          <ChevronDown />
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <a
        className={rootClasses}
        href={href}
        onClick={onClick}
        title={collapsed ? label : undefined}
        aria-current={active ? 'page' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={rootClasses}
      type="button"
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </button>
  );
};

NavItemBase.displayName = 'NavItemBase';
