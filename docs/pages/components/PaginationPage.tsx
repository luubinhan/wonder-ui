import { useState } from 'react';
import { Pagination, PaginationGoTo } from '@/components/Pagination';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const paginationProps = [
  { name: 'page', type: 'number', description: 'Current page (1-based, controlled).' },
  { name: 'totalPages', type: 'number', description: 'Total number of pages.' },
  { name: 'onPageChange', type: '(page: number) => void', description: 'Called when the user selects a page or navigates with arrows.' },
  { name: 'activeShape', type: "'circle' | 'rounded'", default: "'circle'", description: 'Shape of the active page indicator.' },
  { name: 'siblingCount', type: 'number', default: '1', description: 'Number of pages shown on each side of the current page.' },
  { name: 'boundaryCount', type: 'number', default: '1', description: 'Number of pages shown at the start and end of the range.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all pagination controls.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the root nav element.' },
  { name: 'aria-label', type: 'string', default: "'Pagination'", description: 'Accessible label for the nav landmark.' },
];

const goToProps = [
  { name: 'totalPages', type: 'number', description: 'Maximum page number for validation.' },
  { name: 'onGoToPage', type: '(page: number) => void', description: 'Called when the user submits a valid page number.' },
  { name: 'defaultValue', type: 'number', description: 'Initial value in the input field.' },
  { name: 'variant', type: "'pill' | 'minimal'", default: "'pill'", description: 'Visual style of the go-to control.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input and submit button.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the root form element.' },
  { name: 'label', type: 'string', default: "'Go to page'", description: 'Label text shown before the input.' },
];

function PaginationDemo({
  initialPage,
  totalPages,
  activeShape,
  disabled,
}: {
  initialPage: number;
  totalPages: number;
  activeShape?: 'circle' | 'rounded';
  disabled?: boolean;
}) {
  const [page, setPage] = useState(initialPage);

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      activeShape={activeShape}
      disabled={disabled}
      onPageChange={setPage}
    />
  );
}

function GoToDemo({ variant }: { variant: 'pill' | 'minimal' }) {
  const [page, setPage] = useState(43);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <PaginationGoTo
        totalPages={274}
        defaultValue={page}
        variant={variant}
        onGoToPage={setPage}
      />
      <Text size="sm" variant="muted">
        Current page: {page}
      </Text>
    </div>
  );
}

export function PaginationPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Pagination</Heading>
      <Text className="pageDescription">
        Navigate large datasets with a pill-shaped page bar and optional direct page entry.
        Supports ellipsis truncation, circle or rounded active indicators, and a companion go-to control.
      </Text>

      <DemoBlock title="Start of list">
        <PaginationDemo initialPage={4} totalPages={274} activeShape="circle" />
      </DemoBlock>

      <DemoBlock title="Middle of list">
        <PaginationDemo initialPage={245} totalPages={274} />
      </DemoBlock>

      <DemoBlock title="Rounded active shape">
        <PaginationDemo initialPage={4} totalPages={274} activeShape="rounded" />
      </DemoBlock>

      <DemoBlock title="Disabled">
        <PaginationDemo initialPage={4} totalPages={274} disabled />
      </DemoBlock>

      <DemoBlock title="Go to page (pill)">
        <GoToDemo variant="pill" />
      </DemoBlock>

      <DemoBlock title="Go to page (minimal)">
        <GoToDemo variant="minimal" />
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`const [page, setPage] = useState(4);

<Pagination
  page={page}
  totalPages={274}
  onPageChange={setPage}
  activeShape="circle"
/>

<PaginationGoTo
  totalPages={274}
  defaultValue={43}
  variant="pill"
  onGoToPage={setPage}
/>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Pagination colors and typography.
      </Text>
      <CssVarsTable vars={componentCssVars.pagination} />

      <Heading level="h3">Pagination Props</Heading>
      <PropsTable props={paginationProps} />

      <Heading level="h3">PaginationGoTo Props</Heading>
      <PropsTable props={goToProps} />
    </div>
  );
}
