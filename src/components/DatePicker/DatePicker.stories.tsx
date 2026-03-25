import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'range'],
    },
    placeholder: { control: 'text' },
  },
  args: {
    type: 'single',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 64, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/* ----------------------------------------------------------------
   Single date — placeholder
   ---------------------------------------------------------------- */
export const SinglePlaceholder: Story = {
  args: {
    type: 'single',
    placeholder: 'Select date',
  },
};

/* ----------------------------------------------------------------
   Single date — with value
   ---------------------------------------------------------------- */
export const SingleWithValue: Story = {
  args: {
    type: 'single',
    value: new Date(2025, 0, 10),
  },
};

/* ----------------------------------------------------------------
   Single date — interactive (controlled)
   ---------------------------------------------------------------- */
const SingleControlledTemplate: React.FC = () => {
  const [value, setValue] = useState<Date | null>(new Date(2025, 0, 10));

  return (
    <div>
      <DatePicker
        type="single"
        value={value}
        onChange={(date) => setValue(date)}
      />
      <p style={{ marginTop: 16, fontSize: 14, color: 'var(--text-tertiary)' }}>
        Selected: {value ? value.toLocaleDateString() : 'none'}
      </p>
    </div>
  );
};

export const SingleControlled: Story = {
  render: () => <SingleControlledTemplate />,
};

/* ----------------------------------------------------------------
   Range — placeholder
   ---------------------------------------------------------------- */
export const RangePlaceholder: Story = {
  args: {
    type: 'range',
    placeholder: 'Select dates',
  },
};

/* ----------------------------------------------------------------
   Range — with values
   ---------------------------------------------------------------- */
export const RangeWithValues: Story = {
  args: {
    type: 'range',
    value: new Date(2025, 0, 10),
    endValue: new Date(2025, 0, 24),
  },
};

/* ----------------------------------------------------------------
   Range — interactive (controlled)
   ---------------------------------------------------------------- */
const RangeControlledTemplate: React.FC = () => {
  const [start, setStart] = useState<Date | null>(new Date(2025, 0, 10));
  const [end, setEnd] = useState<Date | null>(new Date(2025, 0, 24));

  return (
    <div>
      <DatePicker
        type="range"
        value={start}
        endValue={end}
        onChange={(date, endDate) => {
          setStart(date);
          setEnd(endDate ?? null);
        }}
      />
      <p style={{ marginTop: 16, fontSize: 14, color: 'var(--text-tertiary)' }}>
        Range: {start ? start.toLocaleDateString() : 'none'} –{' '}
        {end ? end.toLocaleDateString() : 'none'}
      </p>
    </div>
  );
};

export const RangeControlled: Story = {
  render: () => <RangeControlledTemplate />,
};

/* ----------------------------------------------------------------
   Open by default (for visual testing)
   ---------------------------------------------------------------- */
export const OpenByDefault: Story = {
  args: {
    type: 'single',
    value: new Date(2025, 0, 10),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '64px 64px 400px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector(
      '.date-picker__trigger',
    ) as HTMLButtonElement;
    button?.click();
  },
};

/* ----------------------------------------------------------------
   Range — open by default (for visual testing)
   ---------------------------------------------------------------- */
export const RangeOpenByDefault: Story = {
  args: {
    type: 'range',
    value: new Date(2025, 0, 10),
    endValue: new Date(2025, 0, 24),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '64px 64px 400px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector(
      '.date-picker__trigger',
    ) as HTMLButtonElement;
    button?.click();
  },
};
