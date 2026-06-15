import styles from './Text.module.css';

export type TextProps = {
  variant?: 'default' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Text({
  variant = 'default',
  size = 'md',
  children,
  className,
  as: Tag = 'p',
}: TextProps) {
  return (
    <Tag
      className={cx(
        styles.text,
        variant === 'muted' && styles.muted,
        size !== 'md' && styles[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
