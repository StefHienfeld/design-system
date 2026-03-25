import React from 'react';
import './ProgressSteps.css';

export interface ProgressStep {
  label: string;
  description?: string;
}

export interface ProgressStepsProps {
  steps: ProgressStep[];
  currentStep: number; // 0-based index
  layout?: 'horizontal' | 'horizontal-centered' | 'vertical';
  type?: 'number' | 'check' | 'icon';
  size?: 'sm' | 'md';
  className?: string;
}

/* ----------------------------------------------------------------
   SVG: Checkmark icon (inline to avoid external asset dependency)
   ---------------------------------------------------------------- */
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Helpers
   ---------------------------------------------------------------- */
type StepState = 'complete' | 'current' | 'incomplete';

function getStepState(index: number, currentStep: number): StepState {
  if (index < currentStep) return 'complete';
  if (index === currentStep) return 'current';
  return 'incomplete';
}

/* ----------------------------------------------------------------
   Step icon (circle with number, check, or dot)
   ---------------------------------------------------------------- */
interface StepIconProps {
  state: StepState;
  type: 'number' | 'check' | 'icon';
  stepNumber: number;
}

const StepIcon: React.FC<StepIconProps> = ({ state, type, stepNumber }) => {
  const iconModifier =
    type === 'check' || type === 'icon' ? 'check' : 'number';

  const classes = [
    'progress-steps__icon',
    `progress-steps__icon--${state}`,
    `progress-steps__icon--${iconModifier}`,
  ].join(' ');

  return (
    <div className={classes} aria-hidden="true">
      {/* Complete: always show checkmark */}
      {state === 'complete' && (
        <CheckIcon className="progress-steps__check-svg" />
      )}

      {/* Current + check/icon type: filled dot */}
      {state === 'current' && (type === 'check' || type === 'icon') && (
        <span className="progress-steps__dot" />
      )}

      {/* Incomplete + check/icon type: gray dot */}
      {state === 'incomplete' && (type === 'check' || type === 'icon') && (
        <span className="progress-steps__dot" />
      )}

      {/* Current + number type: number */}
      {state === 'current' && type === 'number' && (
        <span className="progress-steps__number">{stepNumber}</span>
      )}

      {/* Incomplete + number type: number */}
      {state === 'incomplete' && type === 'number' && (
        <span className="progress-steps__number">{stepNumber}</span>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------
   Layout: Horizontal (left-aligned labels)
   ---------------------------------------------------------------- */
const HorizontalLayout: React.FC<{
  steps: ProgressStep[];
  currentStep: number;
  type: 'number' | 'check' | 'icon';
}> = ({ steps, currentStep, type }) => (
  <>
    {steps.map((step, index) => {
      const state = getStepState(index, currentStep);
      return (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              className={[
                'progress-steps__connector',
                index <= currentStep
                  ? 'progress-steps__connector--complete'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          )}
          <div
            className={[
              'progress-steps__step',
              `progress-steps__step--${state}`,
            ].join(' ')}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <StepIcon state={state} type={type} stepNumber={index + 1} />
            <span
              className={[
                'progress-steps__label',
                `progress-steps__label--${state}`,
              ].join(' ')}
            >
              {step.label}
            </span>
          </div>
        </React.Fragment>
      );
    })}
  </>
);

/* ----------------------------------------------------------------
   Layout: Horizontal Centered (labels + descriptions below)
   ---------------------------------------------------------------- */
const HorizontalCenteredLayout: React.FC<{
  steps: ProgressStep[];
  currentStep: number;
  type: 'number' | 'check' | 'icon';
}> = ({ steps, currentStep, type }) => (
  <>
    {steps.map((step, index) => {
      const state = getStepState(index, currentStep);
      const isFirst = index === 0;
      const isLast = index === steps.length - 1;

      return (
        <React.Fragment key={index}>
          <div
            className="progress-steps__step-wrapper"
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <div className="progress-steps__step-row">
              {/* Left connector (not on first step) */}
              {!isFirst && (
                <div
                  className={[
                    'progress-steps__connector',
                    'progress-steps__connector--flex',
                    index <= currentStep
                      ? 'progress-steps__connector--complete'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              )}

              <StepIcon state={state} type={type} stepNumber={index + 1} />

              {/* Right connector (not on last step) */}
              {!isLast && (
                <div
                  className={[
                    'progress-steps__connector',
                    'progress-steps__connector--flex',
                    index < currentStep
                      ? 'progress-steps__connector--complete'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              )}
            </div>

            <div
              className={[
                'progress-steps__label-group',
                state === 'incomplete'
                  ? 'progress-steps__step--incomplete'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                className={[
                  'progress-steps__label',
                  `progress-steps__label--${state}`,
                ].join(' ')}
              >
                {step.label}
              </span>
              {step.description && (
                <span className="progress-steps__description">
                  {step.description}
                </span>
              )}
            </div>
          </div>
        </React.Fragment>
      );
    })}
  </>
);

/* ----------------------------------------------------------------
   Layout: Vertical
   ---------------------------------------------------------------- */
const VerticalLayout: React.FC<{
  steps: ProgressStep[];
  currentStep: number;
  type: 'number' | 'check' | 'icon';
}> = ({ steps, currentStep, type }) => (
  <>
    {steps.map((step, index) => {
      const state = getStepState(index, currentStep);
      const isLast = index === steps.length - 1;

      return (
        <div
          key={index}
          className="progress-steps__vertical-step"
          aria-current={state === 'current' ? 'step' : undefined}
        >
          <div className="progress-steps__vertical-track">
            <StepIcon state={state} type={type} stepNumber={index + 1} />
            {!isLast && (
              <div
                className={[
                  'progress-steps__connector--vertical',
                  index < currentStep
                    ? 'progress-steps__connector--complete'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            )}
          </div>

          <div
            className={[
              'progress-steps__vertical-content',
              state === 'incomplete'
                ? 'progress-steps__step--incomplete'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span
              className={[
                'progress-steps__vertical-label',
                `progress-steps__vertical-label--${state}`,
              ].join(' ')}
            >
              {step.label}
            </span>
            {step.description && (
              <span className="progress-steps__vertical-description">
                {step.description}
              </span>
            )}
          </div>
        </div>
      );
    })}
  </>
);

/* ----------------------------------------------------------------
   Main component
   ---------------------------------------------------------------- */
export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  layout = 'horizontal',
  type = 'number',
  size = 'sm',
  className,
}) => {
  const rootClasses = [
    'progress-steps',
    `progress-steps--${layout}`,
    `progress-steps--${size}`,
    `progress-steps--${type === 'icon' ? 'check' : type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={rootClasses} aria-label="Progress">
      {layout === 'horizontal' && (
        <HorizontalLayout
          steps={steps}
          currentStep={currentStep}
          type={type}
        />
      )}
      {layout === 'horizontal-centered' && (
        <HorizontalCenteredLayout
          steps={steps}
          currentStep={currentStep}
          type={type}
        />
      )}
      {layout === 'vertical' && (
        <VerticalLayout
          steps={steps}
          currentStep={currentStep}
          type={type}
        />
      )}
    </nav>
  );
};

ProgressSteps.displayName = 'ProgressSteps';
