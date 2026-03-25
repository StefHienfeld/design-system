import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePickerModal } from './DatePickerModal';
import { Button } from '../Button/Button';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof DatePickerModal> = {
  title: 'Components/DatePickerModal',
  component: DatePickerModal,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'range'],
    },
    title: { control: 'text' },
  },
  args: {
    type: 'single',
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerModal>;

/* ----------------------------------------------------------------
   Single date — interactive (controlled)
   ---------------------------------------------------------------- */
const SingleControlledTemplate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date | null>(new Date(2025, 0, 10));

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Select date</Button>
      <DatePickerModal
        open={open}
        onClose={() => setOpen(false)}
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

export const SingleDate: Story = {
  render: () => <SingleControlledTemplate />,
};

/* ----------------------------------------------------------------
   Single date — open by default (visual testing)
   ---------------------------------------------------------------- */
export const SingleDateOpen: Story = {
  args: {
    open: true,
    onClose: () => {},
    type: 'single',
    value: new Date(2025, 0, 10),
  },
};

/* ----------------------------------------------------------------
   Range — interactive (controlled)
   ---------------------------------------------------------------- */
const RangeControlledTemplate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState<Date | null>(new Date(2025, 0, 10));
  const [end, setEnd] = useState<Date | null>(new Date(2025, 1, 14));

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Select date range</Button>
      <DatePickerModal
        open={open}
        onClose={() => setOpen(false)}
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

export const RangeDate: Story = {
  render: () => <RangeControlledTemplate />,
};

/* ----------------------------------------------------------------
   Range — open by default (visual testing)
   ---------------------------------------------------------------- */
export const RangeDateOpen: Story = {
  args: {
    open: true,
    onClose: () => {},
    type: 'range',
    value: new Date(2025, 0, 10),
    endValue: new Date(2025, 1, 14),
  },
};

/* ----------------------------------------------------------------
   With title
   ---------------------------------------------------------------- */
const WithTitleTemplate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Pick a date</Button>
      <DatePickerModal
        open={open}
        onClose={() => setOpen(false)}
        type="single"
        title="Select inception date"
        value={value}
        onChange={(date) => setValue(date)}
      />
      <p style={{ marginTop: 16, fontSize: 14, color: 'var(--text-tertiary)' }}>
        Selected: {value ? value.toLocaleDateString() : 'none'}
      </p>
    </div>
  );
};

export const WithTitle: Story = {
  render: () => <WithTitleTemplate />,
};

/* ----------------------------------------------------------------
   Range — no initial value
   ---------------------------------------------------------------- */
const RangeEmptyTemplate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Select date range</Button>
      <DatePickerModal
        open={open}
        onClose={() => setOpen(false)}
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

export const RangeEmpty: Story = {
  render: () => <RangeEmptyTemplate />,
};
