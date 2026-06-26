import { useState } from 'react';
import { Tabs } from '@/components/Tabs';
import type { TabItem } from '@/components/Tabs';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'items', type: 'TabItem[]', description: 'Tab definitions with id, label, optional icon, content, and disabled.' },
  { name: 'variant', type: "'underline' | 'pill' | 'segmented' | 'block'", default: "'underline'", description: 'Visual style of the tab bar.' },
  { name: 'value', type: 'string', description: 'Controlled active tab id.' },
  { name: 'defaultValue', type: 'string', description: 'Initial active tab id in uncontrolled mode.' },
  { name: 'onChange', type: '(id: string) => void', description: 'Called when the active tab changes.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the root element.' },
];

const mailTabs: TabItem[] = [
  { id: 'inbox', label: 'Inbox', content: <Text>Your inbox messages appear here.</Text> },
  { id: 'snoozed', label: 'Snoozed', content: <Text>Snoozed messages you can revisit later.</Text> },
  { id: 'sent', label: 'Sent', content: <Text>Messages you have already sent.</Text> },
  { id: 'all', label: 'All Mail', content: <Text>Every message across all folders.</Text> },
  { id: 'trash', label: 'Trash', content: <Text>Deleted messages waiting to be removed.</Text> },
];

const wandIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path
      d="M4 20 14 10M14 10l-3 3M14 10l3-3M16 4l4 4M7 17l-3 3"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const codeIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path
      d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const snippetIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path
      d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

const segmentedTabs: TabItem[] = [
  {
    id: 'copilot',
    label: 'Code Copilot',
    icon: codeIcon,
    content: <Text>AI-assisted code suggestions and explanations.</Text>,
  },
  {
    id: 'completions',
    label: 'Tab Completions',
    icon: wandIcon,
    content: <Text>Inline completions triggered as you type.</Text>,
  },
  {
    id: 'snippets',
    label: 'Custom Snippets',
    icon: snippetIcon,
    content: <Text>Reusable snippets for your favorite patterns.</Text>,
  },
];

const disabledTabs: TabItem[] = [
  { id: 'inbox', label: 'Inbox', content: <Text>Inbox is available.</Text> },
  { id: 'snoozed', label: 'Snoozed', disabled: true, content: <Text>Snoozed is disabled.</Text> },
  { id: 'sent', label: 'Sent', content: <Text>Sent messages are available.</Text> },
];

function ControlledTabsDemo() {
  const [activeTab, setActiveTab] = useState('inbox');

  return (
    <Tabs
      variant="underline"
      value={activeTab}
      onChange={setActiveTab}
      items={mailTabs.slice(0, 3)}
    />
  );
}

export function TabsPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Tabs</Heading>
      <Text className="pageDescription">
        Accessible tab navigation with four visual styles — underline, pill, segmented, and block —
        plus optional content panels.
      </Text>

      <DemoBlock title="Underline">
        <Tabs variant="underline" defaultValue="snoozed" items={mailTabs} />
      </DemoBlock>

      <DemoBlock title="Pill">
        <Tabs variant="pill" defaultValue="snoozed" items={mailTabs} />
      </DemoBlock>

      <DemoBlock title="Segmented">
        <Tabs variant="segmented" defaultValue="completions" items={segmentedTabs} />
      </DemoBlock>

      <DemoBlock title="Block">
        <Tabs variant="block" defaultValue="snoozed" items={mailTabs} />
      </DemoBlock>

      <DemoBlock title="Controlled">
        <ControlledTabsDemo />
      </DemoBlock>

      <DemoBlock title="Disabled tab">
        <Tabs variant="pill" defaultValue="inbox" items={disabledTabs} />
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Tabs
  variant="pill"
  defaultValue="snoozed"
  items={[
    { id: 'inbox', label: 'Inbox', content: <InboxPanel /> },
    { id: 'snoozed', label: 'Snoozed', content: <SnoozedPanel /> },
    { id: 'sent', label: 'Sent', content: <SentPanel /> },
  ]}
/>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties on <code>:root</code> or a parent to
        customize Tabs appearance without changing component code.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-primary: #5b9fe3;
  --wonder-radius-full: 9999px;
  --wonder-radius-sm: 16px;
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.tabs} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
