import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'content', type: 'ReactNode', description: 'Tooltip label shown on hover or focus.' },
  { name: 'children', type: 'ReactElement', description: 'Single trigger element wrapped by the tooltip.' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Side of the trigger where the tooltip appears.' },
  { name: 'delay', type: 'number', default: '200', description: 'Milliseconds before the tooltip is shown.' },
  { name: 'hideDelay', type: 'number', default: '0', description: 'Milliseconds before the tooltip is hidden.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, the tooltip never appears.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the root wrapper.' },
];

export function TooltipPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Tooltip</Heading>
      <Text className="pageDescription">
        Contextual labels that appear on hover or keyboard focus. Wrap any single trigger element
        to show helpful hints without cluttering the UI.
      </Text>

      <DemoBlock title="Default">
        <Tooltip content="Click to save your progress!">
          <Button variant="primary">Save</Button>
        </Tooltip>
      </DemoBlock>

      <DemoBlock title="Placements">
        <Tooltip content="Tooltip on top" placement="top">
          <Button variant="secondary">Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip on bottom" placement="bottom">
          <Button variant="secondary">Bottom</Button>
        </Tooltip>
        <Tooltip content="Tooltip on left" placement="left">
          <Button variant="secondary">Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip on right" placement="right">
          <Button variant="secondary">Right</Button>
        </Tooltip>
      </DemoBlock>

      <DemoBlock title="Disabled trigger">
        <Tooltip content="This action is unavailable right now">
          <Button variant="accent" disabled>
            Locked
          </Button>
        </Tooltip>
      </DemoBlock>

      <DemoBlock title="Custom delay">
        <Tooltip content="I appear after one second" delay={1000}>
          <Button variant="primary">Slow tooltip</Button>
        </Tooltip>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Tooltip content="Click to save!" placement="top">
  <Button variant="primary">Save</Button>
</Tooltip>`}</CodeBlock>

      <Heading level="h3">Note</Heading>
      <Text size="sm" variant="muted">
        Tooltips are positioned relative to their trigger and may clip inside containers with
        overflow hidden. Press Escape to dismiss a visible tooltip.
      </Text>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Tooltip appearance and layering.
      </Text>
      <CssVarsTable vars={componentCssVars.tooltip} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
