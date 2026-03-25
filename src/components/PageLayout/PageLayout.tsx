import React from 'react';
import './PageLayout.css';

export interface PageLayoutProps {
  /** Sidebar content rendered on the left (e.g. ItemsSidebar). */
  sidebar?: React.ReactNode;
  /** Header content rendered at the top of the main area (e.g. PageHeader). */
  header?: React.ReactNode;
  /** Main content rendered below the header. */
  children: React.ReactNode;
  /** Additional CSS class(es) appended to the root element. */
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  sidebar,
  header,
  children,
  className,
}) => {
  const rootClasses = ['page-layout', className].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      {sidebar && <aside className="page-layout__sidebar">{sidebar}</aside>}

      <main className="page-layout__main">
        {header && <div className="page-layout__header">{header}</div>}
        <div className="page-layout__content">{children}</div>
      </main>
    </div>
  );
};

PageLayout.displayName = 'PageLayout';
