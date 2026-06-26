import { createContext, useContext } from 'react';

export type ButtonGroupVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
export type ButtonGroupSize = 'sm' | 'md' | 'lg';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export type RegisteredButtonGroupItem = {
  id: string;
  disabled: boolean;
  element: HTMLButtonElement | null;
};

export type ButtonGroupContextValue = {
  variant: ButtonGroupVariant;
  size: ButtonGroupSize;
  orientation: ButtonGroupOrientation;
  selectionEnabled: boolean;
  selectedValue: string | undefined;
  selectValue: (value: string) => void;
  registerItem: (id: string, element: HTMLButtonElement | null, disabled: boolean) => void;
  getItems: () => RegisteredButtonGroupItem[];
};

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

export function useButtonGroupContext() {
  const context = useContext(ButtonGroupContext);
  if (!context) {
    throw new Error('ButtonGroupItem must be used within a ButtonGroup');
  }
  return context;
}
