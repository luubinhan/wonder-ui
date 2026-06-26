import { Input } from '@/components/Input';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'label', type: 'string', description: 'Label text displayed above the input.' },
  { name: 'helperText', type: 'string', description: 'Helper text shown below the input.' },
  { name: 'error', type: 'string', description: 'Error message. Turns the field red.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
];

export function InputPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Input</Heading>
      <Text className="pageDescription">
        Large, rounded text fields with labels, helper text, and error states.
      </Text>

      <DemoBlock title="Default">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <Input label="Your Name" placeholder="Type your name..." helperText="What should we call you?" />
        </div>
      </DemoBlock>

      <DemoBlock title="Error">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <Input label="Email" placeholder="you@example.com" error="Please enter a valid email." />
        </div>
      </DemoBlock>

      <DemoBlock title="Disabled">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <Input label="Locked Field" value="Can't edit this" disabled />
        </div>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Input
  label="Your Name"
  placeholder="Type your name..."
  helperText="What should we call you?"
/>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Input borders, focus ring,
        and error states.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-border: #d0d5dd;
  --wonder-color-primary: #7b5ea7;
  --wonder-radius-lg: 16px;
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.input} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
