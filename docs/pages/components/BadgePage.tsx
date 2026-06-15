import { Badge } from '@/components/Badge';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable } from '../../layout/CodeBlock';

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

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
