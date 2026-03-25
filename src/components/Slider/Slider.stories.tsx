import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    label: {
      control: 'select',
      options: ['none', 'bottom', 'top-floating'],
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    label: 'none',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '60px 40px', maxWidth: 440 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

/* ----------------------------------------------------------------
   Default range (0-100)
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    defaultValue: [25, 75],
  },
};

/* ----------------------------------------------------------------
   With bottom labels
   ---------------------------------------------------------------- */
export const WithBottomLabels: Story = {
  args: {
    defaultValue: [20, 80],
    label: 'bottom',
  },
};

/* ----------------------------------------------------------------
   With floating labels
   ---------------------------------------------------------------- */
export const WithFloatingLabels: Story = {
  args: {
    defaultValue: [30, 70],
    label: 'top-floating',
  },
};

/* ----------------------------------------------------------------
   Custom range (min=0, max=1000, step=50)
   ---------------------------------------------------------------- */
export const CustomRange: Story = {
  args: {
    min: 0,
    max: 1000,
    step: 50,
    defaultValue: [200, 800],
    label: 'bottom',
    formatLabel: (v: number) => `$${v}`,
  },
};

/* ----------------------------------------------------------------
   Controlled example
   ---------------------------------------------------------------- */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([30, 70]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Slider
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={setValue}
          label="top-floating"
        />
        <div
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-text-sm)',
            color: 'var(--text-secondary)',
          }}
        >
          Value: [{value[0]}, {value[1]}]
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => setValue([0, 100])}
            style={{ padding: '4px 12px', cursor: 'pointer' }}
          >
            Reset to [0, 100]
          </button>
          <button
            type="button"
            onClick={() => setValue([40, 60])}
            style={{ padding: '4px 12px', cursor: 'pointer' }}
          >
            Set [40, 60]
          </button>
        </div>
      </div>
    );
  },
};
