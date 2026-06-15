import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable } from '../../layout/CodeBlock';

const props = [
  { name: 'level', type: "'h1' | 'h2' | 'h3' | 'h4'", default: "'h2'", description: 'Heading level (semantic + size).' },
  { name: 'children', type: 'ReactNode', description: 'Heading text.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

export function HeadingPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Heading</Heading>
      <Text className="pageDescription">
        Bold, friendly headings mapped to design token sizes.
      </Text>

      <DemoBlock title="Levels">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Heading level="h1">Heading 1</Heading>
          <Heading level="h2">Heading 2</Heading>
          <Heading level="h3">Heading 3</Heading>
          <Heading level="h4">Heading 4</Heading>
        </div>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Heading level="h1">Welcome!</Heading>`}</CodeBlock>

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
