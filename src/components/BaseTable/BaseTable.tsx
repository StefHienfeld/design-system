import React from 'react';
import './BaseTable.css';

export interface BaseTableProps {
  /** Tabs slot — pass a <Tabs /> component. */
  tabs?: React.ReactNode;
  /** Filters slot — pass a <FilterBar /> component. */
  filters?: React.ReactNode;
  /** Selection bar slot — pass a <SelectionBar /> component. Renders as an overlay. */
  selection?: React.ReactNode;
  /** Main content area — typically a <Table /> or <EmptyState /> component. */
  children: React.ReactNode;
  /** Pagination slot — pass a <Pagination /> component. */
  pagination?: React.ReactNode;
  /** Additional CSS class name(s) for the root element. */
  className?: string;
}

export const BaseTable: React.FC<BaseTableProps> = ({
  tabs,
  filters,
  selection,
  children,
  pagination,
  className,
}) => {
  const classes = ['base-table', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {selection && (
        <div className="base-table__selection">{selection}</div>
      )}

      {tabs && <div className="base-table__tabs">{tabs}</div>}

      {filters && <div className="base-table__filters">{filters}</div>}

      <div className="base-table__content-wrapper">
        <div className="base-table__content">{children}</div>

        {pagination && (
          <div className="base-table__pagination">{pagination}</div>
        )}
      </div>
    </div>
  );
};

BaseTable.displayName = 'BaseTable';
