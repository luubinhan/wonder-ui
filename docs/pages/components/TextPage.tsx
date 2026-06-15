import { Text } from '@/components/Text';
import { Heading } from '@/components/Heading';
import { CodeBlock, DemoBlock, PropsTable } from '../../layout/CodeBlock';

const props = [
  { name: 'variant', type: "'default' | 'muted'", default: "'default'", description: 'Text color variant.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Text size.' },
  { name: 'as', type: "'p' | 'span' | 'div'", default: "'p'", description: 'HTML element to render.' },
  { name: 'children', type: 'ReactNode', description: 'Text content.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

export function TextPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Text</Heading>
      <Text className="pageDescription">
        Body copy with default and muted variants.
      </Text>

      <DemoBlock title="Variants">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Text>Default body text for paragraphs and descriptions.</Text>
          <Text variant="muted">Muted text for secondary information.</Text>
        </div>
      </DemoBlock>

      <DemoBlock title="Sizes">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Text size="sm">Small text</Text>
          <Text size="md">Medium text (default)</Text>
          <Text size="lg">Large text</Text>
        </div>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Text variant="muted" size="sm">Secondary info</Text>`}</CodeBlock>

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
