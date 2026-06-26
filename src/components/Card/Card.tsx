import styles from './Card.module.css';

export type CardVariant = 'default' | 'sky' | 'butter' | 'blush' | 'mint';

export type CardProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Card({
  children,
  header,
  footer,
  variant = 'default',
  className,
}: CardProps) {
  return (
    <div className={cx(styles.card, styles[variant], className)}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
