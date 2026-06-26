import { useCallback, useRef, useState } from 'react';
import {
  ButtonGroupContext,
  type ButtonGroupOrientation,
  type ButtonGroupSize,
  type ButtonGroupVariant,
  type RegisteredButtonGroupItem,
} from './ButtonGroupContext';
import styles from './ButtonGroup.module.css';

export type ButtonGroupProps = {
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  orientation?: ButtonGroupOrientation;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>;

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function getDefaultValue(
  items: RegisteredButtonGroupItem[],
  preferredValue?: string,
): string | undefined {
  if (preferredValue && items.some((item) => item.id === preferredValue && !item.disabled)) {
    return preferredValue;
  }

  const firstEnabled = items.find((item) => !item.disabled);
  return firstEnabled?.id;
}

export function ButtonGroup({
  variant = 'ghost',
  size = 'md',
  orientation = 'horizontal',
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  ...props
}: ButtonGroupProps) {
  const itemsRef = useRef<Map<string, RegisteredButtonGroupItem>>(new Map());
  const [, forceUpdate] = useState(0);
  const selectionEnabled = value !== undefined || defaultValue !== undefined || onValueChange !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const registerItem = useCallback(
    (id: string, element: HTMLButtonElement | null, disabled: boolean) => {
      if (element === null) {
        if (itemsRef.current.has(id)) {
          itemsRef.current.delete(id);
          forceUpdate((count) => count + 1);
        }
        return;
      }

      const existing = itemsRef.current.get(id);
      if (existing?.element === element && existing.disabled === disabled) {
        return;
      }

      itemsRef.current.set(id, { id, element, disabled });
      forceUpdate((count) => count + 1);
    },
    [],
  );

  const getItems = useCallback(() => Array.from(itemsRef.current.values()), []);

  const selectValue = useCallback(
    (nextValue: string) => {
      const item = itemsRef.current.get(nextValue);
      if (!item || item.disabled) return;

      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  function getNextEnabledIndex(startIndex: number, direction: 1 | -1): number {
    const orderedItems = getItems();
    if (orderedItems.length === 0) return -1;

    let index = startIndex;
    for (let step = 0; step < orderedItems.length; step += 1) {
      index = (index + direction + orderedItems.length) % orderedItems.length;
      if (!orderedItems[index]?.disabled) return index;
    }

    return -1;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!selectionEnabled) return;

    const orderedItems = getItems();
    const currentIndex = orderedItems.findIndex((item) => item.id === selectedValue);
    if (currentIndex === -1) return;

    const isVertical = orientation === 'vertical';
    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        if (!isVertical) nextIndex = getNextEnabledIndex(currentIndex, 1);
        break;
      case 'ArrowDown':
        if (isVertical) nextIndex = getNextEnabledIndex(currentIndex, 1);
        break;
      case 'ArrowLeft':
        if (!isVertical) nextIndex = getNextEnabledIndex(currentIndex, -1);
        break;
      case 'ArrowUp':
        if (isVertical) nextIndex = getNextEnabledIndex(currentIndex, -1);
        break;
      case 'Home':
        nextIndex = orderedItems.findIndex((item) => !item.disabled);
        break;
      case 'End':
        nextIndex =
          orderedItems.length -
          1 -
          [...orderedItems].reverse().findIndex((item) => !item.disabled);
        break;
      case 'Enter':
      case ' ':
        if (selectedValue) {
          event.preventDefault();
          selectValue(selectedValue);
        }
        return;
      default:
        return;
    }

    if (nextIndex === -1) return;

    event.preventDefault();
    const nextItem = orderedItems[nextIndex];
    nextItem.element?.focus();
    selectValue(nextItem.id);
  }

  const resolvedSelectedValue =
    selectionEnabled && selectedValue === undefined
      ? getDefaultValue(getItems(), defaultValue)
      : selectedValue;

  return (
    <ButtonGroupContext.Provider
      value={{
        variant,
        size,
        orientation,
        selectionEnabled,
        selectedValue: resolvedSelectedValue,
        selectValue,
        registerItem,
        getItems,
      }}
    >
      <div
        role={selectionEnabled ? 'radiogroup' : 'group'}
        className={cx(
          styles.group,
          styles[variant],
          styles[size],
          styles[orientation],
          className,
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}
