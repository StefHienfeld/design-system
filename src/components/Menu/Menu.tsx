import React from 'react';
import './Menu.css';

/* ================================================================
   Menu — container
   ================================================================ */

export interface MenuProps {
  children: React.ReactNode;
  /** Default width in pixels. Defaults to 248. */
  width?: number;
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  width = 248,
  className,
}) => {
  const classes = ['menu', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="menu" style={{ width }}>
      {children}
    </div>
  );
};

Menu.displayName = 'Menu';

/* ================================================================
   MenuItem — clickable row
   ================================================================ */

export interface MenuItemProps {
  /** Optional leading icon (16px). */
  icon?: React.ReactNode;
  /** Item label text. */
  label: string;
  /** Keyboard shortcut badge (e.g. "Ctrl+C"). */
  shortcut?: string;
  /** Click handler. */
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  shortcut,
  onClick,
}) => {
  return (
    <div className="menu-item" role="none">
      <button
        className="menu-item__content"
        role="menuitem"
        onClick={onClick}
        type="button"
      >
        {icon && <span className="menu-item__icon">{icon}</span>}
        <span className="menu-item__label">{label}</span>
        {shortcut && <span className="menu-item__shortcut">{shortcut}</span>}
      </button>
    </div>
  );
};

MenuItem.displayName = 'MenuItem';

/* ================================================================
   MenuDivider — horizontal separator
   ================================================================ */

export const MenuDivider: React.FC = () => {
  return (
    <div className="menu-divider" role="separator">
      <div className="menu-divider__line" />
    </div>
  );
};

MenuDivider.displayName = 'MenuDivider';

/* ================================================================
   MenuHeader — avatar + name + email
   ================================================================ */

export interface MenuHeaderProps {
  /** Display name. */
  name: string;
  /** Email address. */
  email: string;
  /** Avatar image URL. Falls back to initials when omitted. */
  avatar?: string;
  /** Show a green online indicator on the avatar. */
  online?: boolean;
}

/** Extract up to two initials from a name string. */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  name,
  email,
  avatar,
  online = false,
}) => {
  return (
    <div className="menu-header">
      <div className="menu-header__avatar-wrapper">
        {avatar ? (
          <img
            className="menu-header__avatar"
            src={avatar}
            alt={name}
          />
        ) : (
          <div className="menu-header__avatar-fallback" aria-hidden="true">
            {getInitials(name)}
          </div>
        )}
        {online && <span className="menu-header__online-indicator" />}
      </div>
      <div className="menu-header__text">
        <div className="menu-header__name">{name}</div>
        <div className="menu-header__email">{email}</div>
      </div>
    </div>
  );
};

MenuHeader.displayName = 'MenuHeader';
