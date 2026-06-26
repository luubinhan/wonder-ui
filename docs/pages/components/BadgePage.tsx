import { Badge } from '@/components/Badge';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'variant', type: "'default' | 'success' | 'warning' | 'danger'", default: "'default'", description: 'Badge color variant.' },
  { name: 'children', type: 'ReactNode', description: 'Badge label.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

export function BadgePage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Badge</Heading>
      <Text className="pageDescription">
        Small pill-shaped labels for status, categories, or fun tags.
      </Text>

      <DemoBlock title="Variants">
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Badge variant="success">Level Complete!</Badge>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Badge colors and pill shape.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-primary-light: #ede7f6;
  --wonder-color-primary-deep: #5c3d8f;
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.badge} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
