import styles from './Pagination.module.css';
import { getPaginationItems } from './getPaginationItems';

export type PaginationActiveShape = 'circle' | 'rounded';

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  activeShape?: PaginationActiveShape;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function ChevronLeftIcon() {
  return (
    <svg className={styles.chevron} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M9 3L5 7l4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className={styles.chevron} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  activeShape = 'circle',
  siblingCount = 1,
  boundaryCount = 1,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Pagination',
}: PaginationProps) {
  if (totalPages <= 0) {
    return null;
  }

  const clampedPage = Math.min(Math.max(page, 1), totalPages);
  const items = getPaginationItems(clampedPage, totalPages, siblingCount, boundaryCount);
  const isPrevDisabled = disabled || clampedPage <= 1;
  const isNextDisabled = disabled || clampedPage >= totalPages;

  function handlePageChange(nextPage: number) {
    if (disabled || nextPage < 1 || nextPage > totalPages || nextPage === clampedPage) {
      return;
    }
    onPageChange(nextPage);
  }

  return (
    <nav
      className={cx(styles.bar, disabled && styles.barDisabled, className)}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={styles.navButton}
        aria-label="Previous page"
        disabled={isPrevDisabled}
        onClick={() => handlePageChange(clampedPage - 1)}
      >
        <ChevronLeftIcon />
      </button>

      <ol className={styles.pageList}>
        {items.map((item) => {
          if (item.type === 'ellipsis') {
            return (
              <li key={`ellipsis-${item.key}`} className={styles.pageItem}>
                <span className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              </li>
            );
          }

          const isActive = item.page === clampedPage;

          return (
            <li key={`page-${item.page}`} className={styles.pageItem}>
              <button
                type="button"
                className={cx(
                  styles.pageButton,
                  isActive && styles.pageButtonActive,
                  isActive && activeShape === 'circle' && styles.pageButtonActiveCircle,
                  isActive && activeShape === 'rounded' && styles.pageButtonActiveRounded,
                )}
                aria-current={isActive ? 'page' : undefined}
                disabled={disabled}
                onClick={() => handlePageChange(item.page)}
              >
                {item.page}
              </button>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        className={styles.navButton}
        aria-label="Next page"
        disabled={isNextDisabled}
        onClick={() => handlePageChange(clampedPage + 1)}
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
