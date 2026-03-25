import React from 'react';
import './Pagination.css';

export interface PaginationProps {
  /** The currently active page (1-based). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Callback fired when the user selects a page. */
  onPageChange: (page: number) => void;
  /** Additional CSS class for the root element. */
  className?: string;
}

/* ----------------------------------------------------------------
   Icons — inline SVGs matching the Figma chevron icons
   ---------------------------------------------------------------- */
const ChevronLeftDouble: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 14.167 10.833 10 15 5.833M9.167 14.167 5 10l4.167-4.167" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronLeft: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12.5 15 7.5 10l5-5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7.5 15 12.5 10 7.5 5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightDouble: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 14.167 9.167 10 5 5.833M10.833 14.167 15 10l-4.167-4.167" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ----------------------------------------------------------------
   Page-range helper — returns the page numbers (and ellipses)
   to render, keeping a consistent window around the current page.
   Always shows first, last, and up to 2 siblings of currentPage.
   ---------------------------------------------------------------- */
function getPageRange(
  currentPage: number,
  totalPages: number,
): (number | 'ellipsis')[] {
  /* When there are 7 or fewer pages, show all of them. */
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  const siblings = 1; // pages shown on each side of currentPage

  const leftSibling = Math.max(currentPage - siblings, 2);
  const rightSibling = Math.min(currentPage + siblings, totalPages - 1);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  /* Always include page 1 */
  pages.push(1);

  if (showLeftEllipsis) {
    pages.push('ellipsis');
  } else {
    /* Fill in pages 2 up to leftSibling */
    for (let i = 2; i < leftSibling; i++) {
      pages.push(i);
    }
  }

  /* Sibling range (includes currentPage) */
  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push('ellipsis');
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) {
      pages.push(i);
    }
  }

  /* Always include last page */
  pages.push(totalPages);

  return pages;
}

/* ----------------------------------------------------------------
   Component
   ---------------------------------------------------------------- */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, className }, ref) => {
    const pages = getPageRange(currentPage, totalPages);

    const rootClasses = ['pagination', className].filter(Boolean).join(' ');

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    return (
      <nav ref={ref} className={rootClasses} aria-label="Pagination">
        {/* Previous buttons */}
        <div className="pagination__nav">
          <button
            className="pagination__button"
            type="button"
            aria-label="First page"
            disabled={isFirstPage}
            onClick={() => onPageChange(1)}
          >
            <ChevronLeftDouble />
          </button>
          <button
            className="pagination__button"
            type="button"
            aria-label="Previous page"
            disabled={isFirstPage}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft />
          </button>
        </div>

        {/* Page numbers */}
        <div className="pagination__pages">
          {pages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="pagination__ellipsis"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;
            const pageClasses = [
              'pagination__page',
              isActive && 'pagination__page--active',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={page}
                className={pageClasses}
                type="button"
                aria-label={`Page ${page}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next buttons */}
        <div className="pagination__nav">
          <button
            className="pagination__button"
            type="button"
            aria-label="Next page"
            disabled={isLastPage}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight />
          </button>
          <button
            className="pagination__button"
            type="button"
            aria-label="Last page"
            disabled={isLastPage}
            onClick={() => onPageChange(totalPages)}
          >
            <ChevronRightDouble />
          </button>
        </div>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
