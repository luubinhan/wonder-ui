import { useState } from 'react';
import { ButtonGroup, ButtonGroupItem } from '@/components/ButtonGroup';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const groupProps = [
  { name: 'variant', type: "'primary' | 'secondary' | 'accent' | 'ghost'", default: "'ghost'", description: 'Visual style shared by all items. Matches Button 3D variants.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size shared by all items. md meets 48px tap target.' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction of grouped items.' },
  { name: 'value', type: 'string', description: 'Controlled selected item value (enables selection mode).' },
  { name: 'defaultValue', type: 'string', description: 'Initial selected value in uncontrolled selection mode.' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Called when selection changes.' },
  { name: 'children', type: 'ReactNode', description: 'ButtonGroupItem elements.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the root element.' },
];

const itemProps = [
  { name: 'value', type: 'string', description: 'Unique id for selection mode. Required when the group uses value/onValueChange.' },
  { name: 'icon', type: 'ReactNode', description: 'Leading icon (decorative, aria-hidden).' },
  { name: 'badge', type: 'ReactNode', description: 'Trailing badge content (e.g. a count).' },
  { name: 'children', type: 'ReactNode', description: 'Item label. Omit for icon-only buttons (provide aria-label).' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables this item.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the item button.' },
];

const heartIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path
      d="M12 20.5 4.5 12.9a5.5 5.5 0 0 1 8.1-7.4L12 6.9l-.6-.4a5.5 5.5 0 1 1 8.1 7.4L12 20.5Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
);

const plusIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const downloadIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path
      d="M12 4v10m0 0 3.5-3.5M12 14l-3.5-3.5M5 18h14"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const chevronDownIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const chevronLeftIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const chevronRightIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const gridIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.75" />
    <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.75" />
    <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.75" />
    <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.75" />
  </svg>
);

const listIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const galleryIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
    <circle cx="9" cy="11" r="1.5" fill="currentColor" />
    <path d="m4 16 4-4 3 3 3-4 6 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const layoutIcons = [gridIcon, listIcon, galleryIcon, gridIcon];

const boldIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path d="M7 5h6.5a3.5 3.5 0 0 1 0 7H7V5Zm0 7h7.5a3.5 3.5 0 0 1 0 7H7v-7Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
  </svg>
);

const italicIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path d="M12 5h8M4 19h8M14 5l-4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const underlineIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path d="M6 5v6a6 6 0 0 0 12 0V5M4 19h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const moreIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

function ViewSwitcherDemo() {
  const [view, setView] = useState('list');

  return (
    <ButtonGroup variant="ghost" value={view} onValueChange={setView}>
      <ButtonGroupItem value="list" icon={listIcon}>
        List
      </ButtonGroupItem>
      <ButtonGroupItem value="grid" icon={gridIcon}>
        Grid
      </ButtonGroupItem>
      <ButtonGroupItem value="gallery" icon={galleryIcon}>
        Gallery
      </ButtonGroupItem>
    </ButtonGroup>
  );
}

function LayoutToggleDemo() {
  const [layout, setLayout] = useState('grid-1');

  return (
    <ButtonGroup variant="ghost" size="sm" value={layout} onValueChange={setLayout}>
      {['grid-1', 'grid-2', 'grid-3', 'grid-4'].map((id, index) => (
        <ButtonGroupItem key={id} value={id} icon={layoutIcons[index]} aria-label={`Layout ${index + 1}`} />
      ))}
    </ButtonGroup>
  );
}

export function ButtonGroupPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Button Group</Heading>
      <Text className="pageDescription">
        Group related actions into a single 3D control. Use selection mode for toggles and view
        switchers, or plain groups for split actions and toolbars.
      </Text>

      <DemoBlock title="Action with badge">
        <ButtonGroup variant="ghost">
          <ButtonGroupItem icon={heartIcon} badge={2}>
            Like
          </ButtonGroupItem>
        </ButtonGroup>
      </DemoBlock>

      <DemoBlock title="Primary action">
        <ButtonGroup variant="primary">
          <ButtonGroupItem icon={plusIcon}>Follow</ButtonGroupItem>
        </ButtonGroup>
      </DemoBlock>

      <DemoBlock title="Split action">
        <ButtonGroup variant="ghost">
          <ButtonGroupItem icon={downloadIcon}>Download now</ButtonGroupItem>
          <ButtonGroupItem>24K</ButtonGroupItem>
        </ButtonGroup>
        <ButtonGroup variant="ghost">
          <ButtonGroupItem>Send message</ButtonGroupItem>
          <ButtonGroupItem icon={chevronDownIcon} aria-label="More send options" />
        </ButtonGroup>
      </DemoBlock>

      <DemoBlock title="Icon toggles">
        <LayoutToggleDemo />
      </DemoBlock>

      <DemoBlock title="Navigation">
        <ButtonGroup variant="ghost" size="sm">
          <ButtonGroupItem icon={chevronLeftIcon} aria-label="Previous" />
          <ButtonGroupItem icon={chevronRightIcon} aria-label="Next" />
        </ButtonGroup>
      </DemoBlock>

      <DemoBlock title="View switcher">
        <ViewSwitcherDemo />
      </DemoBlock>

      <DemoBlock title="Toolbar">
        <ButtonGroup variant="ghost" size="sm">
          <ButtonGroupItem style={{ minWidth: '5.5rem' }}>Inter</ButtonGroupItem>
          <ButtonGroupItem icon={boldIcon} aria-label="Bold" />
          <ButtonGroupItem icon={italicIcon} aria-label="Italic" />
          <ButtonGroupItem icon={underlineIcon} aria-label="Underline" />
          <ButtonGroupItem icon={moreIcon} aria-label="More formatting" />
        </ButtonGroup>
      </DemoBlock>

      <DemoBlock title="Variants">
        <ButtonGroup variant="primary">
          <ButtonGroupItem>One</ButtonGroupItem>
          <ButtonGroupItem>Two</ButtonGroupItem>
        </ButtonGroup>
        <ButtonGroup variant="secondary">
          <ButtonGroupItem>One</ButtonGroupItem>
          <ButtonGroupItem>Two</ButtonGroupItem>
        </ButtonGroup>
        <ButtonGroup variant="accent">
          <ButtonGroupItem>One</ButtonGroupItem>
          <ButtonGroupItem>Two</ButtonGroupItem>
        </ButtonGroup>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<ButtonGroup variant="ghost" value={view} onValueChange={setView}>
  <ButtonGroupItem value="list" icon={<ListIcon />}>List</ButtonGroupItem>
  <ButtonGroupItem value="grid" icon={<GridIcon />}>Grid</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup variant="primary">
  <ButtonGroupItem icon={<PlusIcon />}>Follow</ButtonGroupItem>
</ButtonGroup>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        ButtonGroup reuses the same design tokens as Button for colors, shadows, and sizing.
      </Text>
      <CssVarsTable vars={componentCssVars.buttonGroup} />

      <Heading level="h3">ButtonGroup Props</Heading>
      <PropsTable props={groupProps} />

      <Heading level="h3">ButtonGroupItem Props</Heading>
      <PropsTable props={itemProps} />
    </div>
  );
}
