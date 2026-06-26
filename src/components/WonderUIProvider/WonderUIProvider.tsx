import { WONDER_UI_SCOPE_CLASS } from '../../styles/scope';

export type WonderUIProviderProps = {
  children: React.ReactNode;
  className?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function WonderUIProvider({ children, className }: WonderUIProviderProps) {
  return <div className={cx(WONDER_UI_SCOPE_CLASS, className)}>{children}</div>;
}

export { WONDER_UI_SCOPE_CLASS } from '../../styles/scope';
