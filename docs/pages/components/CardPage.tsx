import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'children', type: 'ReactNode', description: 'Card body content.' },
  { name: 'header', type: 'ReactNode', description: 'Optional header section.' },
  { name: 'footer', type: 'ReactNode', description: 'Optional footer section.' },
  { name: 'variant', type: "'default' | 'sky' | 'butter' | 'blush' | 'mint'", default: "'default'", description: 'Pastel background tint.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

export function CardPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Card</Heading>
      <Text className="pageDescription">
        Soft, floating surfaces with pastel tints inspired by the reference design.
      </Text>

      <DemoBlock title="Basic">
        <div style={{ width: '100%', maxWidth: 400 }}>
          <Card>
            <Text>This is a simple card with just body content.</Text>
          </Card>
        </div>
      </DemoBlock>

      <DemoBlock title="Pastel Variants">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card variant="sky" header="Today's good habit">
            <Text>Be kind to everyone you meet today!</Text>
          </Card>
          <Card variant="butter" header="More Stories">
            <Text>The Lion and the Mouse</Text>
          </Card>
          <Card variant="blush">
            <Text>Blush tint for overlays and modals.</Text>
          </Card>
          <Card variant="mint">
            <Text>Mint tint for learning activities.</Text>
          </Card>
        </div>
      </DemoBlock>

      <DemoBlock title="With Header & Footer">
        <div style={{ width: '100%', maxWidth: 400 }}>
          <Card
            variant="sky"
            header="Adventure Card"
            footer={<Button size="sm">Start Adventure</Button>}
          >
            <Text>Ready for your next quest? Tap the button below!</Text>
          </Card>
        </div>
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`<Card variant="sky" header="Today's good habit" footer={<Button>Play</Button>}>
  <Text>Be kind to everyone you meet today!</Text>
</Card>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to change card shape, shadow, and pastel
        tint colors.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-sky: #e8f4ff;
  --wonder-radius-xl: 24px;
  --wonder-shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.08);
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.card} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
