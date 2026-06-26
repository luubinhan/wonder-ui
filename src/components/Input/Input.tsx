import { useId } from 'react';
import styles from './Input.module.css';

export type InputProps = {
  label?: string;
  helperText?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Input({ label, helperText, error, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cx(styles.input, error && styles.inputError, className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : undefined, helperText ? helperId : undefined]
            .filter(Boolean)
            .join(' ') || undefined
        }
        {...props}
      />
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={helperId} className={styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  );
}
