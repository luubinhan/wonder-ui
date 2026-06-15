import { Spinner } from '@/components/Spinner';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable } from '../../layout/CodeBlock';

const props = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner size.' },
  { name: 'color', type: "'primary' | 'secondary' | 'accent'", default: "'primary'", description: 'Spinner color.' },
  { name: 'label', type: 'string', default: "'Loading'", description: 'Accessible label for screen readers.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

export function SpinnerPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Spinner</Heading>
      <Text className="pageDescription">
        Animated loading indicator in brand colors.
      </Text>

      <DemoBlock title="Sizes">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </DemoBlock>

      <DemoBlock title="Colors">
        <Spinner color="primary" />
        <Spinner color="secondary" />
        <Spinner color="accent" />
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Spinner size="md" color="primary" label="Loading game..." />`}</CodeBlock>

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
