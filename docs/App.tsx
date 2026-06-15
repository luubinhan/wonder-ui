import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <Routes>
        <Route element={<DocsShell />}>
          <Route index element={<HomePage />} />
          <Route path="tokens" element={<TokensPage />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/badge" element={<BadgePage />} />
          <Route path="components/alert" element={<AlertPage />} />
          <Route path="components/heading" element={<HeadingPage />} />
          <Route path="components/text" element={<TextPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/spinner" element={<SpinnerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
