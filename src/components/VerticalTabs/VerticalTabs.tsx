import React from 'react';
import type { TabItem } from '../Tabs/Tabs';
import './VerticalTabs.css';

export interface VerticalTabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  type?: 'button-primary' | 'button-gray' | 'line' | 'button-border' | 'button-minimal';
  size?: 'sm' | 'md';
  className?: string;
}

export const VerticalTabs: React.FC<VerticalTabsProps> = ({
  items,
  activeKey,
  onChange,
  type = 'button-primary',
  size = 'sm',
  className,
}) => {
  const containerClasses = [
    'vertical-tabs',
    `vertical-tabs--${type}`,
    `vertical-tabs--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={containerClasses} role="tablist" aria-orientation="vertical">
      {items.map((item) => {
        const isActive = item.key === activeKey;

        const tabClasses = [
          'vertical-tabs__tab',
          isActive && 'vertical-tabs__tab--active',
          item.disabled && 'vertical-tabs__tab--disabled',
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
              <span className="vertical-tabs__icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="vertical-tabs__label">{item.label}</span>
            {item.count !== undefined && (
              <span className="vertical-tabs__count">{item.count}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

VerticalTabs.displayName = 'VerticalTabs';
