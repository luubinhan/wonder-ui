import { useId } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxProps = {
  label: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Checkbox({ label, className, id, disabled, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      className={cx(styles.wrapper, disabled && styles.wrapperDisabled, className)}
      htmlFor={inputId}
    >
      <input
        type="checkbox"
        id={inputId}
        className={styles.input}
        disabled={disabled}
        {...props}
      />
      <span className={styles.box} aria-hidden="true">
        <svg className={styles.checkmark} viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7.5L5.5 10.5L11.5 3.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
