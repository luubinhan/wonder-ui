import { useState } from 'react';
import { Dropdown } from '@/components/Dropdown';
import type { DropdownItem } from '@/components/Dropdown';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'items', type: 'DropdownItem[]', description: 'Options with value, label, and optional disabled.' },
  { name: 'label', type: 'string', description: 'Label text displayed above the dropdown.' },
  { name: 'placeholder', type: 'string', default: "'Select an option...'", description: 'Text shown when no option is selected.' },
  { name: 'helperText', type: 'string', description: 'Helper text shown below the dropdown.' },
  { name: 'error', type: 'string', description: 'Error message. Turns the field red.' },
  { name: 'value', type: 'string', description: 'Controlled selected value.' },
  { name: 'defaultValue', type: 'string', description: 'Initial selected value in uncontrolled mode.' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the selected value changes.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the dropdown trigger.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the root element.' },
  { name: 'id', type: 'string', description: 'Custom id for the trigger button.' },
];

const fruitItems: DropdownItem[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragonfruit' },
  { value: 'elderberry', label: 'Elderberry' },
];

const countryItems: DropdownItem[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'jp', label: 'Japan', disabled: true },
  { value: 'de', label: 'Germany' },
];

function ControlledDropdownDemo() {
  const [value, setValue] = useState('banana');

  return (
    <Dropdown
      label="Favorite Fruit"
      value={value}
      onChange={setValue}
      items={fruitItems}
      helperText={`Selected: ${value}`}
    />
  );
}

export function DropdownPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Dropdown</Heading>
      <Text className="pageDescription">
        Select-style dropdown with label, placeholder, helper text, and error states.
        Supports keyboard navigation and controlled or uncontrolled usage.
      </Text>

      <DemoBlock title="Default">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <Dropdown
            label="Favorite Fruit"
            placeholder="Pick a fruit..."
            helperText="Choose your favorite from the list."
            items={fruitItems}
          />
        </div>
      </DemoBlock>

      <DemoBlock title="Pre-selected">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <Dropdown
            label="Favorite Fruit"
            defaultValue="cherry"
            items={fruitItems}
          />
        </div>
      </DemoBlock>

      <DemoBlock title="Controlled">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <ControlledDropdownDemo />
        </div>
      </DemoBlock>

      <DemoBlock title="Error">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <Dropdown
            label="Country"
            placeholder="Select a country..."
            error="Please select a country."
            items={countryItems}
          />
        </div>
      </DemoBlock>

      <DemoBlock title="Disabled">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <Dropdown
            label="Locked Field"
            defaultValue="apple"
            disabled
            items={fruitItems}
          />
        </div>
      </DemoBlock>

      <DemoBlock title="Disabled option">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <Dropdown
            label="Country"
            placeholder="Select a country..."
            helperText="Japan is currently unavailable."
            items={countryItems}
          />
        </div>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Dropdown
  label="Favorite Fruit"
  placeholder="Pick a fruit..."
  defaultValue="cherry"
  helperText="Choose your favorite from the list."
  items={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ]}
  onChange={(value) => console.log(value)}
/>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Dropdown borders, focus ring,
        panel shadow, and error states.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-border: #d0d5dd;
  --wonder-color-primary: #7b5ea7;
  --wonder-radius-lg: 16px;
  --wonder-z-dropdown: 100;
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.dropdown} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
