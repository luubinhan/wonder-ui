import { useState } from 'react';
import { Alert } from '@/components/Alert';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Alert style and icon.' },
  { name: 'children', type: 'ReactNode', description: 'Alert message content.' },
  { name: 'onDismiss', type: '() => void', description: 'If provided, shows a dismiss button.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

export function AlertPage() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="componentPage">
      <Heading level="h1">Alert</Heading>
      <Text className="pageDescription">
        Friendly notification banners with emoji icons and optional dismiss.
      </Text>

      <DemoBlock title="Variants">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Alert variant="info">Here's a helpful tip for you!</Alert>
          <Alert variant="success">Great job! You earned 10 stars!</Alert>
          <Alert variant="warning">Don't forget to save your progress.</Alert>
          <Alert variant="error">Oops! Something went wrong.</Alert>
        </div>
      </DemoBlock>

      <DemoBlock title="Dismissible">
        <div style={{ width: '100%' }}>
          {visible ? (
            <Alert variant="info" onDismiss={() => setVisible(false)}>
              Tap the × to dismiss this alert.
            </Alert>
          ) : (
            <Button onClick={() => setVisible(true)}>Show Alert Again</Button>
          )}
        </div>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Alert variant="success" onDismiss={() => setVisible(false)}>
  Great job! You earned 10 stars!
</Alert>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Alert background tints and
        typography.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-info-light: #e8f4ff;
  --wonder-color-success-light: #e0f5ec;
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.alert} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}

function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        border: '2px solid var(--wonder-color-primary)',
        background: 'transparent',
        color: 'var(--wonder-color-primary)',
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
