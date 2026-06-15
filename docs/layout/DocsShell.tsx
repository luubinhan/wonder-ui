import type { ReactNode } from 'react';
import { sectionHref, type Section } from '../routing';
import styles from './DocsShell.module.css';

const componentLinks: { section: Section; label: string }[] = [
  { section: 'components/button', label: 'Button' },
  { section: 'components/input', label: 'Input' },
  { section: 'components/card', label: 'Card' },
  { section: 'components/badge', label: 'Badge' },
  { section: 'components/alert', label: 'Alert' },
  { section: 'components/heading', label: 'Heading' },
  { section: 'components/text', label: 'Text' },
  { section: 'components/checkbox', label: 'Checkbox' },
  { section: 'components/spinner', label: 'Spinner' },
];

type DocsShellProps = {
  section: Section;
  navigate: (section: Section) => void;
  children: ReactNode;
};

function navLinkClass(isActive: boolean) {
  return [styles.navLink, isActive && styles.navLinkActive].filter(Boolean).join(' ');
}

function NavItem({
  section,
  label,
  current,
  navigate,
}: {
  section: Section;
  label: string;
  current: Section;
  navigate: (section: Section) => void;
}) {
  return (
    <a
      href={sectionHref(section)}
      className={navLinkClass(current === section)}
      onClick={(event) => {
        event.preventDefault();
        navigate(section);
      }}
    >
      {label}
    </a>
  );
}

export function DocsShell({ section, navigate, children }: DocsShellProps) {
  return (
    <div className={styles.docsShell}>
      <aside className={styles.sidebar}>
        <a
          href={sectionHref('home')}
          className={styles.logo}
          onClick={(event) => {
            event.preventDefault();
            navigate('home');
          }}
        >
          <span className={styles.logoIcon} aria-hidden="true">
            ✨
          </span>
          <span className={styles.logoText}>Wonder UI</span>
        </a>

        <nav className={styles.navSection}>
          <div className={styles.navTitle}>Getting Started</div>
          <NavItem section="home" label="Home" current={section} navigate={navigate} />
          <NavItem section="tokens" label="Design Tokens" current={section} navigate={navigate} />
        </nav>

        <nav className={styles.navSection}>
          <div className={styles.navTitle}>Components</div>
          {componentLinks.map((link) => (
            <NavItem
              key={link.section}
              section={link.section}
              label={link.label}
              current={section}
              navigate={navigate}
            />
          ))}
        </nav>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
