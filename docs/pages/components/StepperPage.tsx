import { Stepper } from '@/components/Stepper';
import type { StepperStep } from '@/components/Stepper';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock, DemoBlock, PropsTable, CssVarsTable } from '../../layout/CodeBlock';
import { componentCssVars } from '../../data/tokens';

const props = [
  { name: 'steps', type: 'StepperStep[]', description: 'Ordered list of steps with id, label, and icon.' },
  { name: 'currentStep', type: 'number', description: '0-based index of the active step.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

const referenceSteps: StepperStep[] = [
  {
    id: 'contact',
    label: 'Contact Number',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
        <path
          d="M6.5 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5l1.5-2 5 1.5v3a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3 8a1.5 1.5 0 0 1 1.5-5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'detail',
    label: 'Detail Store',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
        <path
          d="M4 9.5 12 4l8 5.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1V9.5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'address',
    label: 'Address Store',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
        <path
          d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'verification',
    label: 'Verification',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1" fill="currentColor" />
        <rect x="14" y="4" width="6" height="6" rx="1" fill="currentColor" />
        <rect x="4" y="14" width="6" height="6" rx="1" fill="currentColor" />
        <path d="M14 14h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 4h2v2h-2v-2Zm4 0h2v2h-2v-2Z" fill="currentColor" />
      </svg>
    ),
  },
];

export function StepperPage() {
  return (
    <div className="componentPage">
      <Heading level="h1">Stepper</Heading>
      <Text className="pageDescription">
        Horizontal progress stepper with completed, active, and pending states — great for multi-step flows.
      </Text>

      <DemoBlock title="Reference (step 3 active)">
        <Stepper steps={referenceSteps} currentStep={2} />
      </DemoBlock>

      <DemoBlock title="First step active">
        <Stepper steps={referenceSteps} currentStep={0} />
      </DemoBlock>

      <DemoBlock title="All completed">
        <Stepper steps={referenceSteps} currentStep={referenceSteps.length} />
      </DemoBlock>

      <Heading level="h3">Usage</Heading>
      <CodeBlock>{`const steps = [
  { id: 'contact', label: 'Contact Number', icon: <PhoneIcon /> },
  { id: 'detail', label: 'Detail Store', icon: <StoreIcon /> },
  { id: 'address', label: 'Address Store', icon: <PinIcon /> },
  { id: 'verification', label: 'Verification', icon: <QrIcon /> },
];

<Stepper steps={steps} currentStep={2} />`}</CodeBlock>

      <Heading level="h3">CSS Variables</Heading>
      <Text size="sm" variant="muted">
        Override these CSS custom properties to customize Stepper colors and typography.
      </Text>
      <CodeBlock language="bash">{`:root {
  --wonder-color-primary: #5b9fe3;
  --wonder-color-success: #6ecba0;
}`}</CodeBlock>
      <CssVarsTable vars={componentCssVars.stepper} />

      <Heading level="h3">Props</Heading>
      <PropsTable props={props} />
    </div>
  );
}
