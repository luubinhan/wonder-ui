import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { CodeBlock } from '../layout/CodeBlock';

export function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <h1 className="heroTitle">Wonder UI</h1>
        <p className="heroSubtitle">
          A playful, kid-friendly React design system with soft pastels and chunky 3D buttons.
          Built with TypeScript and CSS only.
        </p>
      </section>

      <section className="section">
        <Heading level="h2">Install</Heading>
        <CodeBlock>{`npm install @wonder-ui/react`}</CodeBlock>
      </section>

      <section className="section">
        <Heading level="h2">Quick Start</Heading>
        <CodeBlock>{`import { Button, Card, Heading } from '@wonder-ui/react';
import '@wonder-ui/react/styles.css';

function App() {
  return (
    <Card variant="sky" header="Hello!">
      <Heading level="h2">Welcome to Wonder UI</Heading>
      <Button variant="primary">Let's Go!</Button>
    </Card>
  );
}`}</CodeBlock>
      </section>

      <section className="section">
        <Heading level="h2">Why Wonder UI?</Heading>
        <div className="featureGrid">
          <div className="featureCard">
            <div className="featureIcon">🎨</div>
            <div className="featureTitle">Soft Pastels</div>
            <Text size="sm">Sky blue, coral, mint, and butter tints for a gentle kid-app feel.</Text>
          </div>
          <div className="featureCard">
            <div className="featureIcon">🔘</div>
            <div className="featureTitle">3D Buttons</div>
            <Text size="sm">Chunky press-down effect with CSS-only depth shadows.</Text>
          </div>
          <div className="featureCard">
            <div className="featureIcon">📦</div>
            <div className="featureTitle">CSS Only</div>
            <Text size="sm">No Tailwind or CSS-in-JS. Just CSS Modules and tokens.</Text>
          </div>
          <div className="featureCard">
            <div className="featureIcon">👆</div>
            <div className="featureTitle">Big Tap Targets</div>
            <Text size="sm">48px minimum height on interactive elements.</Text>
          </div>
        </div>
      </section>

      <section className="section">
        <Heading level="h2">Try It</Heading>
        <Card variant="sky" header="Today's good habit">
          <div style={{ marginBottom: '1rem' }}>
            <Text>Be kind to everyone you meet today!</Text>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Play</Button>
            <Button variant="secondary">Numbers</Button>
            <Button variant="accent">Close</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
