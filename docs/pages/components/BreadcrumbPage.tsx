import { Breadcrumb } from '@/components/Breadcrumb';
import type { BreadcrumbItem } from '@/components/Breadcrumb';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'items', type: 'BreadcrumbItem[]', description: 'Ordered trail of breadcrumb segments with id, label, and optional icon.' },
  { name: 'separator', type: "'chevron' | 'arrow' | ReactNode", description: "Separator between items. Defaults to 'chevron'." },
  { name: 'maxItems', type: 'number', description: 'Max visible items before collapsing the middle with an ellipsis. Defaults to 4.' },
  { name: 'onItemClick', type: '(item, index) => void', description: 'Called when a non-current item is clicked. Renders buttons when provided.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the root nav element.' },
  { name: 'aria-label', type: 'string', description: "Accessible label for the nav landmark. Defaults to 'Breadcrumb'." },
];

const basicItems: BreadcrumbItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports', label: 'Reports' },
];

const multiLevelItems: BreadcrumbItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports', label: 'Reports' },
  { id: 'export', label: 'Export' },
];

const deepItems: BreadcrumbItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports', label: 'Reports' },
  { id: 'social', label: 'Social' },
  { id: 'export', label: 'Export' },
];

const collapsedItems: BreadcrumbItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'social', label: 'Social' },
  { id: 'export', label: 'Export' },
];

const homeIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
    <path
      d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
);

const cartIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
    <path
      d="M6 6h15l-1.5 9H7.5L6 6Zm0 0L5 3H2"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="20" r="1" fill="currentColor" />
    <circle cx="18" cy="20" r="1" fill="currentColor" />
  </svg>
);

const folderIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
    <path
      d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
);

const iconItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', icon: homeIcon },
  { id: 'products', label: 'Products', icon: cartIcon },
  { id: 'category', label: 'Category', icon: folderIcon },
];

function handleItemClick(item: BreadcrumbItem) {
  console.log('Navigate to:', item.label);
}

export function BreadcrumbPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Breadcrumb</Heading>
      <Text className="pageDescription">
        Secondary navigation trail showing the user&apos;s location in a hierarchy — with optional icons,
        separators, and collapsed middle segments.
      </Text>

      <DemoBlock title="Basic">
        <Breadcrumb items={basicItems} onItemClick={handleItemClick} />
      </DemoBlock>

      <DemoBlock title="Multi-level">
        <Breadcrumb items={multiLevelItems} onItemClick={handleItemClick} />
      </DemoBlock>

      <DemoBlock title="Deep hierarchy">
        <Breadcrumb items={deepItems} onItemClick={handleItemClick} />
      </DemoBlock>

      <DemoBlock title="Collapsed (ellipsis)">
        <Breadcrumb items={collapsedItems} maxItems={4} onItemClick={handleItemClick} />
      </DemoBlock>

      <DemoBlock title="Alternative separator">
        <Breadcrumb items={multiLevelItems} separator="arrow" onItemClick={handleItemClick} />
      </DemoBlock>

      <DemoBlock title="With icons">
        <Breadcrumb items={iconItems} onItemClick={handleItemClick} />
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`const items = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports', label: 'Reports' },
  { id: 'export', label: 'Export' },
];

<Breadcrumb
  items={items}
  separator="chevron"
  maxItems={4}
  onItemClick={(item, index) => navigate(item.id)}
/>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Breadcrumb colors and typography.
      </Text>
      <CssVarsTable vars={componentCssVars.breadcrumb} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
