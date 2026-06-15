export type Section =
  | 'home'
  | 'tokens'
  | 'components/button'
  | 'components/input'
  | 'components/card'
  | 'components/badge'
  | 'components/alert'
  | 'components/heading'
  | 'components/text'
  | 'components/checkbox'
  | 'components/spinner';

const VALID_SECTIONS = new Set<string>([
  'home',
  'tokens',
  'components/button',
  'components/input',
  'components/card',
  'components/badge',
  'components/alert',
  'components/heading',
  'components/text',
  'components/checkbox',
  'components/spinner',
]);

export function getSectionFromUrl(): Section {
  const value = new URLSearchParams(window.location.search).get('section');
  if (value && VALID_SECTIONS.has(value)) {
    return value as Section;
  }
  return 'home';
}

export function sectionHref(section: Section): string {
  if (section === 'home') {
    return window.location.pathname;
  }
  return `${window.location.pathname}?section=${section}`;
}

export function navigateToSection(section: Section): void {
  const url = new URL(window.location.href);
  if (section === 'home') {
    url.searchParams.delete('section');
  } else {
    url.searchParams.set('section', section);
  }
  window.history.pushState({}, '', url);
}
