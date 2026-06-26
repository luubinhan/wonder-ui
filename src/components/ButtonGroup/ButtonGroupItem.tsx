import { useCallback, useId } from 'react';
import { Badge } from '../Badge';
import { useButtonGroupContext } from './ButtonGroupContext';
import styles from './ButtonGroup.module.css';

export type ButtonGroupItemProps = {
  value?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'>;

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function ButtonGroupItem({
  value,
  icon,
  badge,
  children,
  className,
  disabled = false,
  onClick,
  ...props
}: ButtonGroupItemProps) {
  const autoId = useId();
  const itemId = value ?? autoId;
  const {
    selectionEnabled,
    selectedValue,
    selectValue,
    registerItem,
    getItems,
  } = useButtonGroupContext();

  const isSelected = selectionEnabled && selectedValue === itemId;
  const iconOnly = Boolean(icon && !children && badge === undefined);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (selectionEnabled && value !== undefined) {
      selectValue(value);
    }
    onClick?.(event);
  }

  const orderedItems = getItems();
  const tabIndex =
    selectionEnabled && orderedItems.length > 0
      ? isSelected
        ? 0
        : -1
      : undefined;

  const setItemRef = useCallback(
    (element: HTMLButtonElement | null) => {
      registerItem(itemId, element, disabled);
    },
    [disabled, itemId, registerItem],
  );

  return (
    <button
      type="button"
      ref={setItemRef}
      role={selectionEnabled ? 'radio' : undefined}
      aria-checked={selectionEnabled ? isSelected : undefined}
      tabIndex={tabIndex}
      className={cx(
        styles.item,
        iconOnly && styles.iconOnly,
        isSelected && styles.itemSelected,
        className,
      )}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children && <span className={styles.label}>{children}</span>}
      {badge !== undefined && <Badge variant="default">{badge}</Badge>}
    </button>
  );
}
