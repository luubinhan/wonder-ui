import { NavLink, Outlet } from 'react-router-dom';
import styles from './DocsShell.module.css';

const componentLinks = [
  { to: '/components/button', label: 'Button' },
  { to: '/components/input', label: 'Input' },
  { to: '/components/card', label: 'Card' },
  { to: '/components/badge', label: 'Badge' },
  { to: '/components/alert', label: 'Alert' },
  { to: '/components/heading', label: 'Heading' },
  { to: '/components/text', label: 'Text' },
  { to: '/components/checkbox', label: 'Checkbox' },
  { to: '/components/spinner', label: 'Spinner' },
];

export function DocsShell() {
  return (
    <div className={styles.docsShell}>
      <aside className={styles.sidebar}>
        <NavLink to="/" className={styles.logo} end>
          <span className={styles.logoIcon} aria-hidden="true">
            ✨
          </span>
          <span className={styles.logoText}>Wonder UI</span>
        </NavLink>

        <nav className={styles.navSection}>
          <div className={styles.navTitle}>Getting Started</div>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [styles.navLink, isActive && styles.navLinkActive].filter(Boolean).join(' ')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tokens"
            className={({ isActive }) =>
              [styles.navLink, isActive && styles.navLinkActive].filter(Boolean).join(' ')
            }
          >
            Design Tokens
          </NavLink>
        </nav>

        <nav className={styles.navSection}>
          <div className={styles.navTitle}>Components</div>
          {componentLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [styles.navLink, isActive && styles.navLinkActive].filter(Boolean).join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
