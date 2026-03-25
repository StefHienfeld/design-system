import React from 'react';
import './Tabs.css';

export type TabsType =
  | 'underline'
  | 'button-brand'
  | 'button-gray'
  | 'button-border'
  | 'button-minimal';

export type TabsSize = 'sm' | 'md';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  /** Visual style variant. @default 'underline' */
  type?: TabsType;
  /** Size of the tab items. @default 'sm' */
  size?: TabsSize;
  /** When true, tabs stretch to fill the full container width equally. @default false */
  fullWidth?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  onChange,
  type = 'underline',
  size = 'sm',
  fullWidth = false,
  className,
}) => {
  const classes = [
    'tabs',
    `tabs--${type}`,
    `tabs--${size}`,
    fullWidth && 'tabs--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="tablist">
      {items.map((item) => {
        const isActive = item.key === activeKey;

        const tabClasses = [
          'tabs__tab',
          isActive && 'tabs__tab--active',
          item.disabled && 'tabs__tab--disabled',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={item.disabled || undefined}
            tabIndex={isActive ? 0 : -1}
            className={tabClasses}
            onClick={() => {
              if (!item.disabled) {
                onChange(item.key);
              }
            }}
          >
            {item.icon && (
              <span className="tabs__icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="tabs__label">{item.label}</span>
            {item.count !== undefined && (
              <span className="tabs__count">{item.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

Tabs.displayName = 'Tabs';
