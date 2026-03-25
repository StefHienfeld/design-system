import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressSteps } from './ProgressSteps';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof ProgressSteps> = {
  title: 'Components/ProgressSteps',
  component: ProgressSteps,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'horizontal-centered', 'vertical'],
    },
    type: {
      control: 'select',
      options: ['number', 'check', 'icon'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 5 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressSteps>;

/* ----------------------------------------------------------------
   Sample data
   ---------------------------------------------------------------- */
const basicSteps = [
  { label: 'Your details' },
  { label: 'Company details' },
  { label: 'Invite your team' },
  { label: 'Review' },
];

const stepsWithDescriptions = [
  { label: 'Your details', description: 'Please provide your name and email' },
  { label: 'Company details', description: 'A few details about your company' },
  { label: 'Invite your team', description: 'Start collaborating with your team' },
  { label: 'Review', description: 'Verify your information is correct' },
];

/* ----------------------------------------------------------------
   Stories: Horizontal (left-aligned)
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    layout: 'horizontal',
    type: 'number',
    size: 'sm',
  },
};

export const HorizontalNumberSm: Story = {
  name: 'Horizontal / Number / sm',
  args: {
    steps: basicSteps,
    currentStep: 1,
    layout: 'horizontal',
    type: 'number',
    size: 'sm',
  },
};

export const HorizontalNumberMd: Story = {
  name: 'Horizontal / Number / md',
  args: {
    steps: basicSteps,
    currentStep: 1,
    layout: 'horizontal',
    type: 'number',
    size: 'md',
  },
};

export const HorizontalCheckSm: Story = {
  name: 'Horizontal / Check / sm',
  args: {
    steps: basicSteps,
    currentStep: 1,
    layout: 'horizontal',
    type: 'check',
    size: 'sm',
  },
};

export const HorizontalCheckMd: Story = {
  name: 'Horizontal / Check / md',
  args: {
    steps: basicSteps,
    currentStep: 1,
    layout: 'horizontal',
    type: 'check',
    size: 'md',
  },
};

/* ----------------------------------------------------------------
   Stories: Horizontal Centered
   ---------------------------------------------------------------- */
export const CenteredNumberSm: Story = {
  name: 'Centered / Number / sm',
  args: {
    steps: stepsWithDescriptions,
    currentStep: 1,
    layout: 'horizontal-centered',
    type: 'number',
    size: 'sm',
  },
};

export const CenteredNumberMd: Story = {
  name: 'Centered / Number / md',
  args: {
    steps: stepsWithDescriptions,
    currentStep: 1,
    layout: 'horizontal-centered',
    type: 'number',
    size: 'md',
  },
};

export const CenteredCheckSm: Story = {
  name: 'Centered / Check / sm',
  args: {
    steps: stepsWithDescriptions,
    currentStep: 1,
    layout: 'horizontal-centered',
    type: 'check',
    size: 'sm',
  },
};

export const CenteredCheckMd: Story = {
  name: 'Centered / Check / md',
  args: {
    steps: stepsWithDescriptions,
    currentStep: 1,
    layout: 'horizontal-centered',
    type: 'check',
    size: 'md',
  },
};

/* ----------------------------------------------------------------
   Stories: Vertical
   ---------------------------------------------------------------- */
export const VerticalNumberSm: Story = {
  name: 'Vertical / Number / sm',
  args: {
    steps: stepsWithDescriptions,
    currentStep: 1,
    layout: 'vertical',
    type: 'number',
    size: 'sm',
  },
};

export const VerticalNumberMd: Story = {
  name: 'Vertical / Number / md',
  args: {
    steps: stepsWithDescriptions,
    currentStep: 1,
    layout: 'vertical',
    type: 'number',
    size: 'md',
  },
};

export const VerticalCheckSm: Story = {
  name: 'Vertical / Check / sm',
  args: {
    steps: stepsWithDescriptions,
    currentStep: 2,
    layout: 'vertical',
    type: 'check',
    size: 'sm',
  },
};

export const VerticalCheckMd: Story = {
  name: 'Vertical / Check / md',
  args: {
    steps: stepsWithDescriptions,
    currentStep: 2,
    layout: 'vertical',
    type: 'check',
    size: 'md',
  },
};

/* ----------------------------------------------------------------
   Edge cases
   ---------------------------------------------------------------- */
export const AllComplete: Story = {
  name: 'All steps complete',
  args: {
    steps: basicSteps,
    currentStep: 4,
    layout: 'horizontal',
    type: 'number',
    size: 'sm',
  },
};

export const FirstStep: Story = {
  name: 'First step (none complete)',
  args: {
    steps: basicSteps,
    currentStep: 0,
    layout: 'horizontal',
    type: 'check',
    size: 'sm',
  },
};

export const TwoSteps: Story = {
  name: 'Two steps only',
  args: {
    steps: [
      { label: 'Start' },
      { label: 'Finish' },
    ],
    currentStep: 0,
    layout: 'horizontal',
    type: 'number',
    size: 'md',
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Horizontal / Number / sm
        </div>
        <ProgressSteps
          steps={basicSteps}
          currentStep={1}
          layout="horizontal"
          type="number"
          size="sm"
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Horizontal / Number / md
        </div>
        <ProgressSteps
          steps={basicSteps}
          currentStep={1}
          layout="horizontal"
          type="number"
          size="md"
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Horizontal / Check / sm
        </div>
        <ProgressSteps
          steps={basicSteps}
          currentStep={1}
          layout="horizontal"
          type="check"
          size="sm"
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Horizontal / Check / md
        </div>
        <ProgressSteps
          steps={basicSteps}
          currentStep={1}
          layout="horizontal"
          type="check"
          size="md"
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Centered / Number / sm (with descriptions)
        </div>
        <ProgressSteps
          steps={stepsWithDescriptions}
          currentStep={1}
          layout="horizontal-centered"
          type="number"
          size="sm"
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Centered / Check / md (with descriptions)
        </div>
        <ProgressSteps
          steps={stepsWithDescriptions}
          currentStep={2}
          layout="horizontal-centered"
          type="check"
          size="md"
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Vertical / Number / sm (with descriptions)
        </div>
        <ProgressSteps
          steps={stepsWithDescriptions}
          currentStep={1}
          layout="vertical"
          type="number"
          size="sm"
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Vertical / Check / md (with descriptions)
        </div>
        <ProgressSteps
          steps={stepsWithDescriptions}
          currentStep={2}
          layout="vertical"
          type="check"
          size="md"
        />
      </div>
    </div>
  ),
};
