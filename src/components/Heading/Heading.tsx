import styles from './Heading.module.css';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

export type HeadingProps = {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Heading({ level = 'h2', children, className }: HeadingProps) {
  const Tag = level;

  return (
    <Tag className={cx(styles.heading, styles[level], className)}>{children}</Tag>
  );
}
