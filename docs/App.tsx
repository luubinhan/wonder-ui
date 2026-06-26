import type { ReactNode } from 'react';
import { DocsShell } from './layout/DocsShell';
import { HomePage } from './pages/Home';
import { TokensPage } from './pages/Tokens';
import { ButtonPage } from './pages/components/ButtonPage';
import { ButtonGroupPage } from './pages/components/ButtonGroupPage';
import { InputPage } from './pages/components/InputPage';
import { CardPage } from './pages/components/CardPage';
import { ModalPage } from './pages/components/ModalPage';
import { BadgePage } from './pages/components/BadgePage';
import { BreadcrumbPage } from './pages/components/BreadcrumbPage';
import { AlertPage } from './pages/components/AlertPage';
import { HeadingPage } from './pages/components/HeadingPage';
import { TextPage } from './pages/components/TextPage';
import { CheckboxPage } from './pages/components/CheckboxPage';
import { SpinnerPage } from './pages/components/SpinnerPage';
import { ProgressBarPage } from './pages/components/ProgressBarPage';
import { StepperPage } from './pages/components/StepperPage';
import { TabsPage } from './pages/components/TabsPage';
import { DropdownPage } from './pages/components/DropdownPage';
import { TooltipPage } from './pages/components/TooltipPage';
import { PaginationPage } from './pages/components/PaginationPage';
import { useSection } from './useSection';
import type { Section } from './routing';

const pages: Record<Section, () => ReactNode> = {
  home: () => <HomePage />,
  tokens: () => <TokensPage />,
  'components/button': () => <ButtonPage />,
  'components/button-group': () => <ButtonGroupPage />,
  'components/input': () => <InputPage />,
  'components/card': () => <CardPage />,
  'components/modal': () => <ModalPage />,
  'components/badge': () => <BadgePage />,
  'components/breadcrumb': () => <BreadcrumbPage />,
  'components/alert': () => <AlertPage />,
  'components/heading': () => <HeadingPage />,
  'components/text': () => <TextPage />,
  'components/checkbox': () => <CheckboxPage />,
  'components/spinner': () => <SpinnerPage />,
  'components/progress-bar': () => <ProgressBarPage />,
  'components/stepper': () => <StepperPage />,
  'components/tabs': () => <TabsPage />,
  'components/dropdown': () => <DropdownPage />,
  'components/tooltip': () => <TooltipPage />,
  'components/pagination': () => <PaginationPage />,
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
