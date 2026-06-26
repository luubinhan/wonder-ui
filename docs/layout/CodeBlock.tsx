import { useMemo, type ReactNode } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism-tomorrow.css';
import styles from './CodeBlock.module.css';

type CodeBlockProps = {
  children: string;
  language?: 'tsx' | 'bash';
};

export function CodeBlock({ children, language = 'tsx' }: CodeBlockProps) {
  const code = children.trim();
  const highlighted = useMemo(() => {
    const grammar = Prism.languages[language];
    if (!grammar) return code;
    return Prism.highlight(code, grammar, language);
  }, [code, language]);

  return (
    <pre className={styles.codeBlock}>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
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

type CssVarEntry = {
  name: string;
  value: string;
  description: string;
};

type CssVarsTableProps = {
  vars: CssVarEntry[];
};

export function CssVarsTable({ vars }: CssVarsTableProps) {
  return (
    <table className={styles.propsTable}>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {vars.map((v) => (
          <tr key={v.name}>
            <td>
              <code>{v.name}</code>
            </td>
            <td>
              <code>{v.value}</code>
            </td>
            <td>{v.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
