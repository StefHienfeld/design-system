import React from 'react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Separator style between items. @default 'chevron' */
  divider?: 'chevron' | 'slash';
  /** Visual variant for the breadcrumb. @default 'text' */
  type?: 'text' | 'text-with-line' | 'button';
  className?: string;
}

const ChevronRight = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 12l4-4-4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SlashDivider = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M12.5 3.333 7.5 16.667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  divider = 'chevron',
  type = 'text',
  className,
}) => {
  const classes = [
    'breadcrumb',
    `breadcrumb--divider-${divider}`,
    `breadcrumb--type-${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const separatorIcon = divider === 'slash' ? SlashDivider : ChevronRight;

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          const linkClasses = [
            'breadcrumb__link',
            type === 'button' && 'breadcrumb__link--type-button',
          ]
            .filter(Boolean)
            .join(' ');

          const currentClasses = [
            'breadcrumb__text',
            'breadcrumb__text--current',
            type === 'button' && 'breadcrumb__text--current-button',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li key={index} className="breadcrumb__item">
              {index > 0 && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  {separatorIcon}
                </span>
              )}
              {isLast ? (
                <span className={currentClasses} aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  className={linkClasses}
                  href={item.href}
                  onClick={item.onClick}
                >
                  {item.label}
                </a>
              ) : item.onClick ? (
                <button
                  type="button"
                  className={`${linkClasses} breadcrumb__link--native-button`}
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              ) : (
                <span className="breadcrumb__text">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
