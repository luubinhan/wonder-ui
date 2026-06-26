import styles from './Stepper.module.css';

export type StepperStep = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export type StepperProps = {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
};

type StepStatus = 'completed' | 'active' | 'pending';

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function getStepStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'active';
  return 'pending';
}

function CheckmarkIcon() {
  return (
    <svg className={styles.checkmark} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7.5L5.5 10.5L11.5 3.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  const lastIndex = steps.length - 1;

  return (
    <nav className={cx(styles.stepper, className)} aria-label="Progress">
      <ol className={styles.stepList}>
        {steps.map((step, index) => {
          const status = getStepStatus(index, currentStep);
          const previousStatus = index > 0 ? getStepStatus(index - 1, currentStep) : null;

          return (
            <li
              key={step.id}
              className={styles.step}
              aria-current={status === 'active' ? 'step' : undefined}
            >
              <div className={styles.stepHeader}>
                {index > 0 && (
                  <div
                    className={cx(
                      styles.connector,
                      previousStatus === 'completed'
                        ? styles.connectorCompleted
                        : styles.connectorIncomplete,
                    )}
                    aria-hidden="true"
                  />
                )}
                <div
                  className={cx(
                    styles.iconWrapper,
                    status === 'completed' && styles.iconWrapperRingCompleted,
                    status === 'active' && styles.iconWrapperRing,
                  )}
                >
                  <div className={cx(styles.icon, styles[status])}>
                    {status === 'completed' ? (
                      <CheckmarkIcon />
                    ) : (
                      <span className={styles.stepIcon} aria-hidden="true">
                        {step.icon}
                      </span>
                    )}
                  </div>
                </div>
                {index < lastIndex && (
                  <div
                    className={cx(
                      styles.connector,
                      status === 'completed'
                        ? styles.connectorCompleted
                        : styles.connectorIncomplete,
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span className={styles.label}>{step.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
