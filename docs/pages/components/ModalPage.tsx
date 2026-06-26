import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'open', type: 'boolean', description: 'Whether the modal is visible.' },
  { name: 'onClose', type: '() => void', description: 'Called when the modal should close.' },
  { name: 'title', type: 'ReactNode', description: 'Modal title shown in the header.' },
  { name: 'children', type: 'ReactNode', description: 'Modal body content.' },
  { name: 'footer', type: 'ReactNode', description: 'Optional footer section for actions.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Maximum width of the modal panel.' },
  { name: 'closeOnBackdropClick', type: 'boolean', default: 'true', description: 'Close when the backdrop is clicked.' },
  { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close when Escape is pressed.' },
  { name: 'className', type: 'string', description: 'Additional CSS class on the dialog panel.' },
];

export function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState<'sm' | 'md' | 'lg' | null>(null);

  return (
    <div className="componentPage">
      <Heading level="h1">Modal</Heading>
      <Text className="pageDescription">
        Friendly overlay dialogs for confirmations, forms, and focused content.
      </Text>

      <DemoBlock title="Basic">
        <Button onClick={() => setBasicOpen(true)}>Open Modal</Button>
        <Modal
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="Welcome back!"
        >
          <Text>Ready to continue your adventure? Tap outside or press Escape to close.</Text>
        </Modal>
      </DemoBlock>

      <DemoBlock title="With Footer">
        <Button onClick={() => setFooterOpen(true)}>Delete Item</Button>
        <Modal
          open={footerOpen}
          onClose={() => setFooterOpen(false)}
          title="Are you sure?"
          footer={
            <>
              <Button variant="ghost" onClick={() => setFooterOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" onClick={() => setFooterOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <Text>This action cannot be undone. Do you want to continue?</Text>
        </Modal>
      </DemoBlock>

      <DemoBlock title="Sizes">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Button variant="secondary" size="sm" onClick={() => setSizeOpen('sm')}>
            Small
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setSizeOpen('md')}>
            Medium
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setSizeOpen('lg')}>
            Large
          </Button>
        </div>
        {sizeOpen && (
          <Modal
            open={sizeOpen !== null}
            onClose={() => setSizeOpen(null)}
            title={`${sizeOpen} modal`}
            size={sizeOpen}
          >
            <Text>
              This modal uses the <strong>{sizeOpen}</strong> size preset.
            </Text>
          </Modal>
        )}
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Welcome back!"
  footer={<Button onClick={() => setOpen(false)}>Got it</Button>}
>
  <Text>Ready to continue your adventure?</Text>
</Modal>`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize modal layering, shape, and
        surface styling.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-z-modal: 1000;
  --wonder-radius-xl: 24px;
  --wonder-shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.08);
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.modal} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
