import styles from './Spinner.module.css';

export type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
  label?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Spinner({
  size = 'md',
  color = 'primary',
  className,
  label = 'Loading',
}: SpinnerProps) {
  return (
    <span
      className={cx(styles.spinner, styles[size], styles[color], className)}
      role="status"
      aria-label={label}
    />
  );
}
