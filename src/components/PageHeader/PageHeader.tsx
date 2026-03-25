import React from 'react';
import './PageHeader.css';

export interface PageHeaderProps {
  /** Page title (display-sm, semibold). */
  title: string;
  /** Supporting text displayed below the title. */
  description?: string;
  /** Breadcrumb navigation rendered above the title. */
  breadcrumbs?: React.ReactNode;
  /** Badges rendered below the title and description. */
  badges?: React.ReactNode;
  /** Action buttons rendered on the right side. */
  actions?: React.ReactNode;
  /** Search field rendered on the right side. */
  search?: React.ReactNode;
  /** Show a full-width divider at the bottom. */
  divider?: boolean;
  /** Additional CSS class name(s). */
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  badges,
  actions,
  search,
  divider = true,
  className,
}) => {
  const classes = ['page-header', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {breadcrumbs && (
        <div className="page-header__breadcrumbs">{breadcrumbs}</div>
      )}

      <div className="page-header__content">
        <div className="page-header__text-group">
          <div className="page-header__heading">
            <h1 className="page-header__title">{title}</h1>
            {description && (
              <p className="page-header__description">{description}</p>
            )}
          </div>
          {badges && <div className="page-header__badges">{badges}</div>}
        </div>

        {actions && <div className="page-header__actions">{actions}</div>}

        {search && <div className="page-header__search">{search}</div>}
      </div>

      {divider && <div className="page-header__divider" role="separator" />}
    </div>
  );
};

PageHeader.displayName = 'PageHeader';
