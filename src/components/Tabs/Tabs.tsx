import { useId, useRef, useState } from 'react';
import styles from './Tabs.module.css';

export type TabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
};

export type TabVariant = 'underline' | 'pill' | 'segmented' | 'block';

export type TabsProps = {
  items: TabItem[];
  variant?: TabVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function getDefaultActiveId(items: TabItem[], preferredId?: string): string {
  if (preferredId && items.some((item) => item.id === preferredId && !item.disabled)) {
    return preferredId;
  }

  const firstEnabled = items.find((item) => !item.disabled);
  return firstEnabled?.id ?? items[0]?.id ?? '';
}

export function Tabs({
  items,
  variant = 'underline',
  value,
  defaultValue,
  onChange,
  className,
}: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [internalValue, setInternalValue] = useState(() => getDefaultActiveId(items, defaultValue));

  const isControlled = value !== undefined;
  const activeId = isControlled ? getDefaultActiveId(items, value) : internalValue;
  const hasPanels = items.some((item) => item.content !== undefined);

  function selectTab(id: string) {
    const item = items.find((tab) => tab.id === id);
    if (!item || item.disabled) return;

    if (!isControlled) {
      setInternalValue(id);
    }
    onChange?.(id);
  }

  function focusTab(index: number) {
    tabRefs.current[index]?.focus();
  }

  function getNextEnabledIndex(startIndex: number, direction: 1 | -1): number {
    if (items.length === 0) return -1;

    let index = startIndex;
    for (let step = 0; step < items.length; step += 1) {
      index = (index + direction + items.length) % items.length;
      if (!items[index]?.disabled) return index;
    }

    return -1;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const currentIndex = items.findIndex((item) => item.id === activeId);
    if (currentIndex === -1) return;

    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = getNextEnabledIndex(currentIndex, 1);
        break;
      case 'ArrowLeft':
        nextIndex = getNextEnabledIndex(currentIndex, -1);
        break;
      case 'Home':
        nextIndex = items.findIndex((item) => !item.disabled);
        break;
      case 'End':
        nextIndex = items.length - 1 - [...items].reverse().findIndex((item) => !item.disabled);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectTab(activeId);
        return;
      default:
        return;
    }

    if (nextIndex === -1) return;

    event.preventDefault();
    focusTab(nextIndex);
    selectTab(items[nextIndex].id);
  }

  return (
    <div className={cx(styles.tabs, className)}>
      <div
        role="tablist"
        className={cx(styles.tabList, styles[variant])}
        onKeyDown={handleKeyDown}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={tabId}
              className={cx(
                styles.tab,
                isActive && styles.tabActive,
                item.disabled && styles.tabDisabled,
              )}
              aria-selected={isActive}
              aria-controls={hasPanels ? panelId : undefined}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => selectTab(item.id)}
            >
              {item.icon && (
                <span className={styles.tabIcon} aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className={styles.tabLabel}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {hasPanels &&
        items.map((item) => {
          const isActive = item.id === activeId;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <div
              key={item.id}
              role="tabpanel"
              id={panelId}
              className={styles.tabPanel}
              aria-labelledby={tabId}
              hidden={!isActive}
            >
              {item.content}
            </div>
          );
        })}
    </div>
  );
}
