import type { ReactNode } from 'react';
import { DocsShell } from './layout/DocsShell';
import { HomePage } from './pages/Home';
import { TokensPage } from './pages/Tokens';
import { ButtonPage } from './pages/components/ButtonPage';
import { InputPage } from './pages/components/InputPage';
import { CardPage } from './pages/components/CardPage';
import { BadgePage } from './pages/components/BadgePage';
import { AlertPage } from './pages/components/AlertPage';
import { HeadingPage } from './pages/components/HeadingPage';
import { TextPage } from './pages/components/TextPage';
import { CheckboxPage } from './pages/components/CheckboxPage';
import { SpinnerPage } from './pages/components/SpinnerPage';
import { useSection } from './useSection';
import type { Section } from './routing';

const pages: Record<Section, () => ReactNode> = {
  home: () => <HomePage />,
  tokens: () => <TokensPage />,
  'components/button': () => <ButtonPage />,
  'components/input': () => <InputPage />,
  'components/card': () => <CardPage />,
  'components/badge': () => <BadgePage />,
  'components/alert': () => <AlertPage />,
  'components/heading': () => <HeadingPage />,
  'components/text': () => <TextPage />,
  'components/checkbox': () => <CheckboxPage />,
  'components/spinner': () => <SpinnerPage />,
};

export function App() {
  const { section, navigate } = useSection();
  const Page = pages[section];

  return (
    <DocsShell section={section} navigate={navigate}>
      {Page()}
    </DocsShell>
  );
}
