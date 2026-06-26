import { ProgressBar } from '@/components/ProgressBar';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'value', type: 'number', description: 'Current progress value. Omit for indeterminate mode.' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track height.' },
  { name: 'color', type: "'primary' | 'secondary' | 'accent'", default: "'primary'", description: 'Fill color.' },
  { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage label (determinate only).' },
  { name: 'label', type: 'string', default: "'Progress'", description: 'Accessible label for screen readers.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

export function ProgressBarPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Progress Bar</Heading>
      <Text className="pageDescription">
        Linear progress indicator for determinate and indeterminate loading states.
      </Text>

      <DemoBlock title="Sizes">
        <ProgressBar value={60} size="sm" />
        <ProgressBar value={60} size="md" />
        <ProgressBar value={60} size="lg" />
      </DemoBlock>

      <DemoBlock title="Colors">
        <ProgressBar value={75} color="primary" />
        <ProgressBar value={75} color="secondary" />
        <ProgressBar value={75} color="accent" />
      </DemoBlock>

      <DemoBlock title="Determinate values">
        <ProgressBar value={0} showValue />
        <ProgressBar value={50} showValue />
        <ProgressBar value={100} showValue />
      </DemoBlock>

      <DemoBlock title="Indeterminate">
        <ProgressBar />
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<ProgressBar value={65} showValue label="Upload progress" />
<ProgressBar color="secondary" label="Loading..." />`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to change Progress Bar colors and shape.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-primary: #5b9fe3;
  --wonder-color-secondary: #6ecba0;
  --wonder-color-accent: #ff8b9a;
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.progressBar} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
