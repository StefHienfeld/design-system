import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/* ----------------------------------------------------------------
   Default states
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: { checked: true },
};

/* ----------------------------------------------------------------
   Indeterminate
   ---------------------------------------------------------------- */
export const Indeterminate: Story = {
  args: { indeterminate: true },
};

/* ----------------------------------------------------------------
   With label
   ---------------------------------------------------------------- */
export const WithLabel: Story = {
  args: { label: 'Remember me' },
};

/* ----------------------------------------------------------------
   With label and description
   ---------------------------------------------------------------- */
export const WithLabelAndDescription: Story = {
  args: {
    label: 'Terms and conditions',
    description: 'I agree to the terms and conditions of this service.',
  },
};

/* ----------------------------------------------------------------
   Size sm vs md
   ---------------------------------------------------------------- */
export const SizeSmall: Story = {
  args: { size: 'sm', label: 'Small checkbox' },
};

export const SizeMedium: Story = {
  args: { size: 'md', label: 'Medium checkbox' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="sm" label="Small checked" defaultChecked />
      <Checkbox size="md" label="Medium checked" defaultChecked />
    </div>
  ),
};

/* ----------------------------------------------------------------
   Disabled states
   ---------------------------------------------------------------- */
export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: 'Disabled checked' },
};

export const DisabledIndeterminate: Story = {
  args: {
    disabled: true,
    indeterminate: true,
    label: 'Disabled indeterminate',
  },
};

export const AllDisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox disabled label="Disabled unchecked" />
      <Checkbox disabled checked label="Disabled checked" />
      <Checkbox disabled indeterminate label="Disabled indeterminate" />
    </div>
  ),
};

/* ----------------------------------------------------------------
   Controlled example
   ---------------------------------------------------------------- */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          label="Controlled checkbox"
          description="Toggle this checkbox to see the state update below."
        />
        <span style={{ fontSize: 14, color: '#717680' }}>
          State: <strong>{checked ? 'checked' : 'unchecked'}</strong>
        </span>
      </div>
    );
  },
};

/* ----------------------------------------------------------------
   Kitchen sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md'] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            Size: {size}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox size={size} label="Unchecked" />
            <Checkbox size={size} label="Checked" defaultChecked />
            <Checkbox size={size} label="Indeterminate" indeterminate />
            <Checkbox
              size={size}
              label="With description"
              description="This is a helpful description."
            />
            <Checkbox size={size} label="Disabled" disabled />
            <Checkbox size={size} label="Disabled checked" disabled checked />
            <Checkbox
              size={size}
              label="Disabled indeterminate"
              disabled
              indeterminate
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
