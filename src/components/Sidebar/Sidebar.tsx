import React from 'react';
import './Sidebar.css';

/* ================================================================
   Types
   ================================================================ */

export interface SidebarItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface SidebarSection {
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  /** Logo content rendered at the top (use the Logo component). */
  logo?: React.ReactNode;
  /** Navigation sections. */
  sections: SidebarSection[];
  /** User info at the bottom. */
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  /** Called when user clicks sign out. */
  onSignOut?: () => void;
  /** Collapsed state (icon-only). */
  collapsed?: boolean;
  /** Callback to toggle collapsed state. */
  onToggleCollapse?: () => void;
  className?: string;
}

/* ================================================================
   Helpers
   ================================================================ */

/** Extract up to two initials from a name string. */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

/** Collapse toggle chevron icon (20px). */
const CollapseIcon: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: collapsed ? 'rotate(180deg)' : undefined }}
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

/** Sign-out icon (20px). */
const SignOutIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ================================================================
   Sidebar
   ================================================================ */

export const Sidebar: React.FC<SidebarProps> = ({
  logo,
  sections,
  user,
  onSignOut,
  collapsed = false,
  onToggleCollapse,
  className,
}) => {
  const classes = [
    'sidebar',
    collapsed && 'sidebar--collapsed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classes} aria-label="Sidebar navigation">
      {/* ---------- Logo ---------- */}
      {logo && (
        <div className="sidebar__logo">
          {logo}
        </div>
      )}

      {/* ---------- Navigation ---------- */}
      <div className="sidebar__nav">
        {sections.map((section, si) => (
          <div className="sidebar__section" key={si}>
            {section.label && !collapsed && (
              <div className="sidebar__section-header">{section.label}</div>
            )}
            <ul className="sidebar__list" role="list">
              {section.items.map((item) => {
                const isActive = item.active;
                const isDisabled = item.disabled;

                const itemClasses = [
                  'sidebar__item',
                  isActive && 'sidebar__item--active',
                  isDisabled && 'sidebar__item--disabled',
                ]
                  .filter(Boolean)
                  .join(' ');

                const content = (
                  <>
                    {item.icon && (
                      <span className="sidebar__item-icon">{item.icon}</span>
                    )}
                    {!collapsed && (
                      <span className="sidebar__item-label">{item.label}</span>
                    )}
                    {!collapsed && item.count != null && item.count > 0 && (
                      <span className="sidebar__item-count">{item.count}</span>
                    )}
                  </>
                );

                /* Render as <a> when href is provided, otherwise <button>. */
                if (item.href && !isDisabled) {
                  return (
                    <li key={item.key} role="listitem">
                      <a
                        className={itemClasses}
                        href={item.href}
                        onClick={item.onClick}
                        title={collapsed ? item.label : undefined}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {content}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.key} role="listitem">
                    <button
                      className={itemClasses}
                      type="button"
                      onClick={isDisabled ? undefined : item.onClick}
                      disabled={isDisabled}
                      title={collapsed ? item.label : undefined}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {content}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* ---------- Bottom area ---------- */}
      <div className="sidebar__bottom">
        {/* Collapse toggle */}
        {onToggleCollapse && (
          <button
            className="sidebar__collapse-toggle"
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <CollapseIcon collapsed={collapsed} />
          </button>
        )}

        {/* User section */}
        {user && (
          <div className="sidebar__user">
            <div className="sidebar__user-avatar-wrapper">
              {user.avatar ? (
                <img
                  className="sidebar__user-avatar"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div
                  className="sidebar__user-avatar-fallback"
                  aria-hidden="true"
                >
                  {getInitials(user.name)}
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="sidebar__user-info">
                <div className="sidebar__user-name">{user.name}</div>
                <div className="sidebar__user-email">{user.email}</div>
              </div>
            )}
            {!collapsed && onSignOut && (
              <button
                className="sidebar__signout"
                type="button"
                onClick={onSignOut}
                title="Sign out"
                aria-label="Sign out"
              >
                <SignOutIcon />
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

Sidebar.displayName = 'Sidebar';
