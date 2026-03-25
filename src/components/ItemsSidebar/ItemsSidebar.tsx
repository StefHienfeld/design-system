import React from 'react';
import { ObjectItemCard } from '../ObjectItemCard';
import './ItemsSidebar.css';

export interface SidebarItem {
  /** Unique key identifying this item. */
  key: string;
  /** Optional icon rendered inside the featured-icon circle (16 x 16 SVG recommended). */
  icon?: React.ReactNode;
  /** Text label for the item. */
  label: string;
  /** Numeric count shown as a badge. */
  count?: number;
  /** Whether this item is currently selected. */
  active?: boolean;
}

export interface ItemsSidebarProps {
  /** Section title displayed above the item list. */
  title?: string;
  /** Array of sidebar items to render. */
  items: SidebarItem[];
  /** Callback when an item is selected. */
  onSelectItem?: (key: string) => void;
  /** Callback when the "Add item" button is clicked. */
  onAddItem?: () => void;
  /** Callback for the copy action on an item (shown on hover). */
  onCopyItem?: (key: string) => void;
  /** Callback for the delete action on an item (shown on hover). */
  onDeleteItem?: (key: string) => void;
  /** Additional CSS class(es) appended to the root element. */
  className?: string;
}

/** Plus icon (20 x 20). */
const PlusIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 4.167v11.666M4.167 10h11.666"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ItemsSidebar: React.FC<ItemsSidebarProps> = ({
  title = 'ITEMS',
  items,
  onSelectItem,
  onAddItem,
  onCopyItem,
  onDeleteItem,
  className,
}) => {
  const rootClasses = ['items-sidebar', className].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      <div className="items-sidebar__content">
        <nav className="items-sidebar__nav">
          <div className="items-sidebar__heading">
            <p className="items-sidebar__title">{title}</p>
          </div>

          <div className="items-sidebar__section">
            <ul className="items-sidebar__list" role="listbox">
              {items.map((item) => (
                <li key={item.key} className="items-sidebar__list-item" role="option" aria-selected={item.active || false}>
                  <ObjectItemCard
                    icon={item.icon}
                    label={item.label}
                    count={item.count}
                    active={item.active}
                    onClick={
                      onSelectItem
                        ? () => onSelectItem(item.key)
                        : undefined
                    }
                    onCopy={
                      onCopyItem
                        ? () => onCopyItem(item.key)
                        : undefined
                    }
                    onDelete={
                      onDeleteItem
                        ? () => onDeleteItem(item.key)
                        : undefined
                    }
                  />
                </li>
              ))}
            </ul>

            {onAddItem && (
              <button
                type="button"
                className="items-sidebar__add-btn"
                onClick={onAddItem}
              >
                <span className="items-sidebar__add-btn-icon">
                  <PlusIcon />
                </span>
                <span className="items-sidebar__add-btn-text">Add item</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

ItemsSidebar.displayName = 'ItemsSidebar';
