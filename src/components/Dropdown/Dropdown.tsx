import { useEffect, useId, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

export type DropdownItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type DropdownProps = {
  items: DropdownItem[];
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function getSelectedItem(items: DropdownItem[], selectedValue?: string): DropdownItem | undefined {
  if (!selectedValue) return undefined;
  return items.find((item) => item.value === selectedValue);
}

function getInitialValue(items: DropdownItem[], preferredValue?: string): string | undefined {
  const item = getSelectedItem(items, preferredValue);
  if (item && !item.disabled) return item.value;
  return undefined;
}

export function Dropdown({
  items,
  label,
  placeholder = 'Select an option...',
  helperText,
  error,
  value,
  defaultValue,
  onChange,
  disabled = false,
  className,
  id,
}: DropdownProps) {
  const generatedId = useId();
  const dropdownId = id ?? generatedId;
  const listboxId = `${dropdownId}-listbox`;
  const helperId = `${dropdownId}-helper`;
  const errorId = `${dropdownId}-error`;
  const labelId = `${dropdownId}-label`;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(() =>
    getInitialValue(items, defaultValue),
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedItem = getSelectedItem(items, selectedValue);
  const hasSelection = selectedItem !== undefined;

  function closeDropdown() {
    setIsOpen(false);
    setFocusedIndex(-1);
  }

  function openDropdown() {
    if (disabled) return;
    setIsOpen(true);

    const selectedIndex = items.findIndex((item) => item.value === selectedValue);
    if (selectedIndex !== -1 && !items[selectedIndex]?.disabled) {
      setFocusedIndex(selectedIndex);
      return;
    }

    const firstEnabledIndex = items.findIndex((item) => !item.disabled);
    setFocusedIndex(firstEnabledIndex);
  }

  function selectItem(itemValue: string) {
    const item = items.find((entry) => entry.value === itemValue);
    if (!item || item.disabled) return;

    if (!isControlled) {
      setInternalValue(itemValue);
    }
    onChange?.(itemValue);
    closeDropdown();
    triggerRef.current?.focus();
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

  function focusOption(index: number) {
    optionRefs.current[index]?.focus();
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        }
        break;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          closeDropdown();
        }
        break;
      default:
        break;
    }
  }

  function handleListboxKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (focusedIndex === -1 && items.length > 0) {
      const firstEnabledIndex = items.findIndex((item) => !item.disabled);
      if (firstEnabledIndex !== -1) {
        setFocusedIndex(firstEnabledIndex);
      }
    }

    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowDown':
        nextIndex = getNextEnabledIndex(focusedIndex === -1 ? 0 : focusedIndex, 1);
        break;
      case 'ArrowUp':
        nextIndex = getNextEnabledIndex(focusedIndex === -1 ? items.length - 1 : focusedIndex, -1);
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
        if (focusedIndex !== -1) {
          selectItem(items[focusedIndex].value);
        }
        return;
      case 'Escape':
        event.preventDefault();
        closeDropdown();
        triggerRef.current?.focus();
        return;
      case 'Tab':
        closeDropdown();
        return;
      default:
        return;
    }

    if (nextIndex === -1) return;

    event.preventDefault();
    setFocusedIndex(nextIndex);
    focusOption(nextIndex);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      focusOption(focusedIndex);
    }
  }, [isOpen, focusedIndex]);

  return (
    <div ref={rootRef} className={cx(styles.wrapper, className)}>
      {label && (
        <label id={labelId} className={styles.label} htmlFor={dropdownId}>
          {label}
        </label>
      )}

      <div className={styles.control}>
        <button
          ref={triggerRef}
          id={dropdownId}
          type="button"
          className={cx(
            styles.trigger,
            error && styles.triggerError,
            isOpen && styles.triggerOpen,
          )}
          aria-labelledby={label ? labelId : undefined}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [error ? errorId : undefined, helperText ? helperId : undefined]
              .filter(Boolean)
              .join(' ') || undefined
          }
          disabled={disabled}
          onClick={() => {
            if (isOpen) {
              closeDropdown();
            } else {
              openDropdown();
            }
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          <span
            className={cx(
              styles.triggerLabel,
              !hasSelection && styles.triggerPlaceholder,
            )}
          >
            {hasSelection ? selectedItem.label : placeholder}
          </span>
          <span
            className={cx(styles.chevron, isOpen && styles.chevronOpen)}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path
                d="m6 9 6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div
            id={listboxId}
            role="listbox"
            className={styles.listbox}
            aria-labelledby={label ? labelId : dropdownId}
            tabIndex={-1}
            onKeyDown={handleListboxKeyDown}
          >
            {items.map((item, index) => {
              const isSelected = item.value === selectedValue;
              const isFocused = index === focusedIndex;

              return (
                <button
                  key={item.value}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  className={cx(
                    styles.option,
                    isSelected && styles.optionSelected,
                    isFocused && styles.optionFocused,
                    item.disabled && styles.optionDisabled,
                  )}
                  aria-selected={isSelected}
                  disabled={item.disabled}
                  tabIndex={-1}
                  onClick={() => selectItem(item.value)}
                  onMouseEnter={() => {
                    if (!item.disabled) {
                      setFocusedIndex(index);
                    }
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={helperId} className={styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  );
}
