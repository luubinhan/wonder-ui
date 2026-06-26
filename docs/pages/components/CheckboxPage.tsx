import { useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'label', type: 'string', description: 'Checkbox label text.' },
  { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
  { name: 'onChange', type: 'ChangeEventHandler', description: 'Change handler.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
];

export function CheckboxPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="componentPage">
      <Heading level="h1">Checkbox</Heading>
      <Text className="pageDescription">
        Oversized checkboxes with a big tap area — easy for little fingers!
      </Text>

      <DemoBlock title="Interactive">
        <Checkbox
          label="I want to go on an adventure!"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </DemoBlock>

      <DemoBlock title="Disabled">
        <Checkbox label="This option is locked" disabled />
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Checkbox
  label="I want to go on an adventure!"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Checkbox size, colors, and
        3D press effect.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-primary: #7b5ea7;
  --wonder-radius-sm: 12px;
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.checkbox} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
