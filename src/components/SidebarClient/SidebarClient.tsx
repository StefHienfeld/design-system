import React from 'react';
import './SidebarClient.css';

/* ================================================================
   Types
   ================================================================ */

export interface SidebarClientNavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  badge?: string;
  active?: boolean;
  dot?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface SidebarClientSection {
  label?: string;
  items: SidebarClientNavItem[];
}

export interface SidebarClientProps {
  /** Navigation sections. */
  sections: SidebarClientSection[];
  /** User info displayed in the footer card. */
  user?: { name: string; email: string; avatar?: string };
  /** Collapsed state (icon-only, 80px). */
  collapsed?: boolean;
  /** Callback to toggle collapsed state. */
  onToggleCollapse?: () => void;
  /** Logo content rendered at the top (use the Logo component). */
  logo?: React.ReactNode;
  /** Called when user clicks the search input. */
  onSearch?: () => void;
  /** Additional CSS class(es). */
  className?: string;
}

/* ================================================================
   Helpers
   ================================================================ */

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

/* ================================================================
   Inline SVG Icons
   ================================================================ */

/** Search icon (20px). */
const SearchIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Chevron-left icon (16px) for collapse toggle. */
const ChevronLeftIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Chevron-selector-vertical icon (16px) for user card. */
const ChevronSelectorIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5.33333 10L8 12.6667L10.6667 10M5.33333 6L8 3.33333L10.6667 6"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Hienfeld logomark icon (collapsed sidebar). */
const LogomarkIcon: React.FC = () => (
  <svg
    width="23"
    height="29"
    viewBox="0 0 23 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10.4 3.3C7.4 0 5.6 0.3 4.8 1.3C1.8 7.3 0 18 0 23C0 24.2 0.5 25.3 1.5 26C5 28.5 10 30 13 30L10.4 3.3Z"
      fill="#10069F"
    />
    <path
      d="M22 26C17 17 14 13 7 6C9 12 8 22 4 28C12 30 18 28 21 25C21.5 24.5 22 24 22 26Z"
      fill="#10069F"
    />
  </svg>
);

/* ================================================================
   Nav Item (internal)
   ================================================================ */

interface InternalNavItemProps {
  item: SidebarClientNavItem;
  collapsed: boolean;
}

const NavItem: React.FC<InternalNavItemProps> = ({ item, collapsed }) => {
  const rootClasses = [
    'sidebar-client__item',
    item.active && 'sidebar-client__item--active',
  ]
    .filter(Boolean)
    .join(' ');

  const showDot = item.dot !== undefined ? item.dot : !item.icon;
  const firstLetter = item.label.charAt(0).toUpperCase();

  const content = (
    <span className="sidebar-client__item-content">
      <span className="sidebar-client__item-text-group">
        {showDot && !collapsed && (
          <span className="sidebar-client__item-dot" aria-hidden="true">
            <span className="sidebar-client__item-dot-indicator" />
          </span>
        )}
        {showDot && collapsed && (
          <span className="sidebar-client__item-dot" aria-hidden="true">
            <span className="sidebar-client__item-dot-indicator" />
          </span>
        )}
        {!showDot && item.icon && (
          <span className="sidebar-client__item-icon" aria-hidden="true">
            {item.icon}
          </span>
        )}
        {!collapsed && (
          <span className="sidebar-client__item-label">{item.label}</span>
        )}
      </span>

      {collapsed && showDot && (
        <span className="sidebar-client__item-letter">{firstLetter}</span>
      )}

      {!collapsed && item.count != null && (
        <span className="sidebar-client__item-count">{item.count}</span>
      )}

      {!collapsed && item.count == null && item.badge != null && (
        <span className="sidebar-client__item-badge">{item.badge}</span>
      )}
    </span>
  );

  if (item.href) {
    return (
      <a
        className={rootClasses}
        href={item.href}
        onClick={item.onClick}
        title={collapsed ? item.label : undefined}
        aria-current={item.active ? 'page' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={rootClasses}
      type="button"
      onClick={item.onClick}
      title={collapsed ? item.label : undefined}
      aria-current={item.active ? 'page' : undefined}
    >
      {content}
    </button>
  );
};

/* ================================================================
   SidebarClient
   ================================================================ */

export const SidebarClient: React.FC<SidebarClientProps> = ({
  sections,
  user,
  collapsed = false,
  onToggleCollapse,
  logo,
  onSearch,
  className,
}) => {
  const sidebarClasses = [
    'sidebar-client',
    collapsed && 'sidebar-client--collapsed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={sidebarClasses} aria-label="Client navigation">
      {/* ---- Header ---- */}
      <div className="sidebar-client__header">
        <div className="sidebar-client__header-top">
          {!collapsed ? (
            <>
              {logo && <div className="sidebar-client__logo">{logo}</div>}
              {onToggleCollapse && (
                <button
                  className="sidebar-client__collapse-btn"
                  type="button"
                  onClick={onToggleCollapse}
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeftIcon />
                </button>
              )}
            </>
          ) : (
            <div className="sidebar-client__logomark" aria-label="Hienfeld">
              <LogomarkIcon />
            </div>
          )}
        </div>

        {/* Search */}
        <button
          className="sidebar-client__search"
          type="button"
          onClick={onSearch}
          title={collapsed ? 'Search' : undefined}
          aria-label="Search"
        >
          <span className="sidebar-client__search-icon">
            <SearchIcon />
          </span>
          {!collapsed && (
            <span className="sidebar-client__search-text">Search</span>
          )}
        </button>
      </div>

      {/* ---- Navigation ---- */}
      <div className="sidebar-client__nav">
        {sections.map((section, si) => (
          <React.Fragment key={si}>
            {section.label && !collapsed && (
              <div className="sidebar-client__section-header">
                {section.label}
              </div>
            )}
            <div className="sidebar-client__section">
              {section.items.map((item) => (
                <NavItem
                  key={item.key}
                  item={item}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* ---- Footer / User Card ---- */}
      {user && (
        <div className="sidebar-client__footer">
          <button
            className="sidebar-client__user-card"
            type="button"
            aria-label={`User menu: ${user.name}`}
          >
            <div className="sidebar-client__user-avatar-group">
              {user.avatar ? (
                <img
                  className="sidebar-client__user-avatar"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div
                  className="sidebar-client__user-avatar-fallback"
                  aria-hidden="true"
                >
                  {getInitials(user.name)}
                </div>
              )}
              {!collapsed && (
                <div className="sidebar-client__user-info">
                  <div className="sidebar-client__user-name">{user.name}</div>
                  <div className="sidebar-client__user-email">{user.email}</div>
                </div>
              )}
            </div>
            {!collapsed && (
              <span className="sidebar-client__user-chevron" aria-hidden="true">
                <ChevronSelectorIcon />
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

SidebarClient.displayName = 'SidebarClient';
