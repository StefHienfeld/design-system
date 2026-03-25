import React from 'react';
import './Table.css';

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  categoryHeader?: string;
  categoryColor?: string;
  striped?: boolean;
  className?: string;
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
}

function TableInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    categoryHeader,
    categoryColor,
    striped = false,
    className,
    onRowClick,
    emptyMessage = 'No data available',
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const classes = [
    'table',
    striped && 'table--striped',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const categoryStyle = categoryColor
    ? ({ '--table-category-header-bg': categoryColor } as React.CSSProperties)
    : undefined;

  return (
    <div ref={ref} className={classes}>
      <table className="table__element">
        <thead className="table__head">
          {categoryHeader && (
            <tr className="table__category-row" style={categoryStyle}>
              <th
                className="table__category-cell"
                colSpan={columns.length}
              >
                {categoryHeader}
              </th>
            </tr>
          )}
          <tr className="table__header-row">
            {columns.map((col) => (
              <th
                key={col.key}
                className="table__header-cell"
                style={{
                  width: col.width,
                  textAlign: col.align || 'left',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.length === 0 ? (
            <tr className="table__empty-row">
              <td
                className="table__empty-cell"
                colSpan={columns.length}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={[
                  'table__row',
                  onRowClick && 'table__row--clickable',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="table__cell"
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : (row[col.key] as React.ReactNode) ?? ''}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export const Table = React.forwardRef(TableInner) as <
  T extends Record<string, unknown>,
>(
  props: TableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

(Table as React.FC).displayName = 'Table';
