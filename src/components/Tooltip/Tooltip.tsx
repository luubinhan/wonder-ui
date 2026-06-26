import { cloneElement, useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement<{ 'aria-describedby'?: string }>;
  placement?: TooltipPlacement;
  delay?: number;
  hideDelay?: number;
  disabled?: boolean;
  className?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function mergeDescribedBy(existing?: string, tooltipId?: string): string | undefined {
  if (!tooltipId) return existing || undefined;
  if (!existing) return tooltipId;
  if (existing.split(/\s+/).includes(tooltipId)) return existing;
  return `${existing} ${tooltipId}`;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 200,
  hideDelay = 0,
  disabled = false,
  className,
}: TooltipProps) {
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [isVisible, setIsVisible] = useState(false);

  const clearShowTimeout = useCallback(() => {
    if (showTimeoutRef.current !== undefined) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = undefined;
    }
  }, []);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current !== undefined) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }
  }, []);

  const hide = useCallback(() => {
    clearShowTimeout();
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  }, [clearHideTimeout, clearShowTimeout, hideDelay]);

  const show = useCallback(() => {
    if (disabled) return;

    clearHideTimeout();
    clearShowTimeout();
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [clearHideTimeout, clearShowTimeout, delay, disabled]);

  useEffect(() => {
    return () => {
      clearShowTimeout();
      clearHideTimeout();
    };
  }, [clearHideTimeout, clearShowTimeout]);

  useEffect(() => {
    if (!isVisible) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      clearShowTimeout();
      clearHideTimeout();
      setIsVisible(false);

      const focusable = wrapperRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearHideTimeout, clearShowTimeout, isVisible]);

  const child = cloneElement(children, {
    'aria-describedby': isVisible
      ? mergeDescribedBy(children.props['aria-describedby'], tooltipId)
      : children.props['aria-describedby'],
  });

  return (
    <span
      ref={wrapperRef}
      className={cx(styles.wrapper, className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {child}
      {isVisible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cx(styles.tooltip, styles[placement], styles.visible)}
        >
          {content}
        </span>
      )}
    </span>
  );
}
