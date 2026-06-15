import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable } from '../../layout/CodeBlock';

const props = [
  { name: 'variant', type: "'primary' | 'secondary' | 'accent' | 'ghost'", default: "'primary'", description: 'Visual style. primary/secondary/accent use 3D press effect.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size. md meets 48px tap target.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables interaction.' },
  { name: 'children', type: 'ReactNode', description: 'Button label content.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
];

export function ButtonPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Button</Heading>
      <Text className="pageDescription">
        Chunky 3D buttons with a physical press-down effect. Sky blue for primary actions,
        mint for secondary, and coral for accent actions like Close.
      </Text>

      <DemoBlock title="Variants">
        <Button variant="primary">Play</Button>
        <Button variant="secondary">Numbers</Button>
        <Button variant="accent">Close</Button>
        <Button variant="ghost">Ghost</Button>
      </DemoBlock>

      <DemoBlock title="3D Press">
        <div style={{ width: '100%' }}>
          <Text size="sm" variant="muted">
            Click and hold any button to see the press-down effect.
          </Text>
        </div>
        <Button variant="primary">Press Me!</Button>
        <Button variant="accent">Hold Me!</Button>
      </DemoBlock>

      <DemoBlock title="Sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </DemoBlock>

      <DemoBlock title="States">
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Button variant="primary" size="md">Play</Button>
<Button variant="accent">Close</Button>`}</CodeBlock>

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
