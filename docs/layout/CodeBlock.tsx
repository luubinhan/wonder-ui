import type { ReactNode } from 'react';
import styles from './CodeBlock.module.css';

type CodeBlockProps = {
  children: string;
};

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className={styles.codeBlock}>
      <code>{children.trim()}</code>
    </pre>
  );
}

type DemoBlockProps = {
  children: ReactNode;
  title?: string;
};

export function DemoBlock({ children, title }: DemoBlockProps) {
  return (
    <div className={styles.demoBlock}>
      {title && <div className={styles.demoTitle}>{title}</div>}
      <div className={styles.demoContent}>{children}</div>
    </div>
  );
}

type PropsTableProps = {
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
};

export function PropsTable({ props }: PropsTableProps) {
  return (
    <table className={styles.propsTable}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name}>
            <td>
              <code>{prop.name}</code>
            </td>
            <td>
              <code>{prop.type}</code>
            </td>
            <td>{prop.default ? <code>{prop.default}</code> : '—'}</td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
