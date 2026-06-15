import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';

const colors = [
  { name: 'Primary', var: '--wonder-color-primary', value: '#5B9FE3' },
  { name: 'Primary Deep', var: '--wonder-color-primary-deep', value: '#3D84C5' },
  { name: 'Secondary', var: '--wonder-color-secondary', value: '#6ECBA0' },
  { name: 'Accent', var: '--wonder-color-accent', value: '#FF8B9A' },
  { name: 'Sky', var: '--wonder-color-sky', value: '#D8ECFF' },
  { name: 'Butter', var: '--wonder-color-butter', value: '#FFF4C8' },
  { name: 'Blush', var: '--wonder-color-blush', value: '#FFE8EF' },
  { name: 'Mint', var: '--wonder-color-mint', value: '#DFF5EE' },
  { name: 'Background', var: '--wonder-color-bg', value: '#F7F4EF' },
  { name: 'Surface', var: '--wonder-color-surface', value: '#FFFFFF' },
  { name: 'Text', var: '--wonder-color-text', value: '#2C3E50' },
  { name: 'Text Muted', var: '--wonder-color-text-muted', value: '#7F8C9A' },
];

const spacing = [
  { name: 'space-1', value: '8px', var: '--wonder-space-1' },
  { name: 'space-2', value: '12px', var: '--wonder-space-2' },
  { name: 'space-3', value: '16px', var: '--wonder-space-3' },
  { name: 'space-4', value: '24px', var: '--wonder-space-4' },
  { name: 'space-5', value: '32px', var: '--wonder-space-5' },
  { name: 'space-6', value: '48px', var: '--wonder-space-6' },
];

const radii = [
  { name: 'sm', value: '16px', var: '--wonder-radius-sm' },
  { name: 'md', value: '20px', var: '--wonder-radius-md' },
  { name: 'lg', value: '28px', var: '--wonder-radius-lg' },
  { name: 'xl', value: '32px', var: '--wonder-radius-xl' },
  { name: 'full', value: 'pill', var: '--wonder-radius-full' },
];

const depth = [
  { name: 'depth-sm', value: '3px', var: '--wonder-depth-sm' },
  { name: 'depth-md', value: '4px', var: '--wonder-depth-md' },
  { name: 'depth-lg', value: '6px', var: '--wonder-depth-lg' },
];

export function TokensPage() {
  return (
    <div className="page">
      <Heading level="h1">Design Tokens</Heading>
      <Text variant="muted">
        All design decisions are defined as CSS custom properties in tokens.css.
      </Text>

      <section className="section">
        <Heading level="h2">Colors</Heading>
        <div className="tokenGrid">
          {colors.map((color) => (
            <div key={color.name} className="colorSwatch">
              <div
                className="colorPreview"
                style={{ backgroundColor: `var(${color.var})` }}
              />
              <div className="colorInfo">
                <div className="colorName">{color.name}</div>
                <div className="colorValue">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <Heading level="h2">3D Depth</Heading>
        <Text variant="muted" size="sm">
          Buttons use bottom-edge shadows to create a chunky 3D press effect.
        </Text>
        {depth.map((d) => (
          <div key={d.name} className="spacingRow">
            <div style={{ width: 100, fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {d.name}
            </div>
            <div
              className="spacingBar"
              style={{ width: `var(${d.var})`, height: 32 }}
            />
            <div style={{ color: 'var(--wonder-color-text-muted)', fontSize: '0.875rem' }}>
              {d.value}
            </div>
          </div>
        ))}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--wonder-radius-full)',
              background: 'linear-gradient(180deg, #6eb0eb 0%, var(--wonder-color-primary) 100%)',
              color: 'white',
              fontWeight: 700,
              boxShadow: 'var(--wonder-shadow-3d-primary)',
            }}
          >
            3D Primary
          </div>
          <div
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--wonder-radius-full)',
              background: 'linear-gradient(180deg, #ffa5b0 0%, var(--wonder-color-accent) 100%)',
              color: 'white',
              fontWeight: 700,
              boxShadow: 'var(--wonder-shadow-3d-accent)',
            }}
          >
            3D Accent
          </div>
        </div>
      </section>

      <section className="section">
        <Heading level="h2">Typography</Heading>
        <div className="typeSample" style={{ fontSize: 'var(--wonder-font-size-2xl)', fontWeight: 700 }}>
          Heading 2XL — 2.5rem
        </div>
        <div className="typeSample" style={{ fontSize: 'var(--wonder-font-size-xl)', fontWeight: 700 }}>
          Heading XL — 2rem
        </div>
        <div className="typeSample" style={{ fontSize: 'var(--wonder-font-size-lg)', fontWeight: 700 }}>
          Heading LG — 1.5rem
        </div>
        <div className="typeSample" style={{ fontSize: 'var(--wonder-font-size-md)' }}>
          Body MD — 1.125rem (Nunito)
        </div>
        <div className="typeSample" style={{ fontSize: 'var(--wonder-font-size-sm)' }}>
          Body SM — 1rem
        </div>
      </section>

      <section className="section">
        <Heading level="h2">Spacing</Heading>
        {spacing.map((space) => (
          <div key={space.name} className="spacingRow">
            <div style={{ width: 80, fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {space.name}
            </div>
            <div
              className="spacingBar"
              style={{ width: `var(${space.var})` }}
            />
            <div style={{ color: 'var(--wonder-color-text-muted)', fontSize: '0.875rem' }}>
              {space.value}
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <Heading level="h2">Border Radius</Heading>
        <div className="radiusDemo">
          {radii.map((radius) => (
            <div key={radius.name}>
              <div
                className="radiusBox"
                style={{ borderRadius: `var(${radius.var})` }}
              >
                {radius.name}
              </div>
              <Text size="sm" variant="muted">
                {radius.value}
              </Text>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
