import styles from './ProgressBar.module.css';

export type ProgressBarColor = 'primary' | 'secondary' | 'accent';

export type ProgressBarProps = {
  value?: number;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: ProgressBarColor;
  showValue?: boolean;
  label?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ProgressBar({
  value,
  min = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  showValue = false,
  label = 'Progress',
  className,
  ...props
}: ProgressBarProps) {
  const isDeterminate = value !== undefined;
  const percent = isDeterminate
    ? ((clamp(value, min, max) - min) / (max - min)) * 100
    : 0;

  return (
    <div
      className={cx(styles.root, styles[size], !isDeterminate && styles.indeterminate, className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={isDeterminate ? min : undefined}
      aria-valuemax={isDeterminate ? max : undefined}
      aria-valuenow={isDeterminate ? clamp(value, min, max) : undefined}
      {...props}
    >
      {showValue && isDeterminate && (
        <span className={styles.valueLabel} aria-hidden="true">
          {Math.round(percent)}%
        </span>
      )}
      <div className={styles.track}>
        <div
          className={cx(styles.fill, styles[color])}
          style={isDeterminate ? { width: `${percent}%` } : undefined}
        />
      </div>
    </div>
  );
}
