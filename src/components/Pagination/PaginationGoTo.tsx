import { useId, useState } from 'react';
import styles from './Pagination.module.css';

export type PaginationGoToVariant = 'pill' | 'minimal';

export type PaginationGoToProps = {
  totalPages: number;
  onGoToPage: (page: number) => void;
  defaultValue?: number;
  variant?: PaginationGoToVariant;
  disabled?: boolean;
  className?: string;
  label?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
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

function clampPage(value: number, totalPages: number): number {
  return Math.min(Math.max(value, 1), totalPages);
}

export function PaginationGoTo({
  totalPages,
  onGoToPage,
  defaultValue,
  variant = 'pill',
  disabled = false,
  className,
  label = 'Go to page',
}: PaginationGoToProps) {
  const inputId = useId();
  const [inputValue, setInputValue] = useState(
    defaultValue !== undefined ? String(defaultValue) : '',
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled || totalPages <= 0) {
      return;
    }

    const parsed = Number.parseInt(inputValue, 10);
    if (Number.isNaN(parsed)) {
      return;
    }

    onGoToPage(clampPage(parsed, totalPages));
  }

  return (
    <form
      className={cx(
        styles.goTo,
        variant === 'pill' && styles.goToPill,
        variant === 'minimal' && styles.goToMinimal,
        disabled && styles.goToDisabled,
        className,
      )}
      onSubmit={handleSubmit}
    >
      <label className={styles.goToLabel} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.goToInput}
        type="number"
        min={1}
        max={totalPages > 0 ? totalPages : undefined}
        value={inputValue}
        disabled={disabled || totalPages <= 0}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        type="submit"
        className={styles.goToSubmit}
        aria-label="Go to page"
        disabled={disabled || totalPages <= 0}
      >
        <ChevronRightIcon />
      </button>
    </form>
  );
}
