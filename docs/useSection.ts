import { useCallback, useEffect, useState } from 'react';
import { getSectionFromUrl, navigateToSection, type Section } from './routing';

export function useSection() {
  const [section, setSection] = useState<Section>(getSectionFromUrl);

  useEffect(() => {
    const onPopState = () => setSection(getSectionFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((next: Section) => {
    navigateToSection(next);
    setSection(next);
  }, []);

  return { section, navigate };
}
