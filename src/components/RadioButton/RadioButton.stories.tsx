import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './RadioButton';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

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
   With label
   ---------------------------------------------------------------- */
export const WithLabel: Story = {
  args: { label: 'Option A' },
};

/* ----------------------------------------------------------------
   With label and description
   ---------------------------------------------------------------- */
export const WithLabelAndDescription: Story = {
  args: {
    label: 'Standard plan',
    description: 'Best for small teams with basic needs.',
  },
};

/* ----------------------------------------------------------------
   Size sm vs md
   ---------------------------------------------------------------- */
export const SizeSmall: Story = {
  args: { size: 'sm', label: 'Small radio' },
};

export const SizeMedium: Story = {
  args: { size: 'md', label: 'Medium radio' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <RadioButton size="sm" label="Small" name="sizes" value="sm" />
      <RadioButton size="md" label="Medium" name="sizes" value="md" />
      <RadioButton size="sm" label="Small checked" checked name="sizes-checked" value="sm" />
      <RadioButton size="md" label="Medium checked" checked name="sizes-checked" value="md" />
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

export const AllDisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <RadioButton disabled label="Disabled unchecked" />
      <RadioButton disabled checked label="Disabled checked" />
    </div>
  ),
};

/* ----------------------------------------------------------------
   Controlled example (radio group)
   ---------------------------------------------------------------- */
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RadioButton
          checked={selected === 'option1'}
          onChange={setSelected}
          name="controlled-group"
          value="option1"
          label="Option 1"
          description="First option in the group."
        />
        <RadioButton
          checked={selected === 'option2'}
          onChange={setSelected}
          name="controlled-group"
          value="option2"
          label="Option 2"
          description="Second option in the group."
        />
        <RadioButton
          checked={selected === 'option3'}
          onChange={setSelected}
          name="controlled-group"
          value="option3"
          label="Option 3"
          description="Third option in the group."
        />
        <span style={{ fontSize: 14, color: '#717680' }}>
          Selected: <strong>{selected}</strong>
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
            <RadioButton size={size} label="Unchecked" name={`ks-${size}`} value="unchecked" />
            <RadioButton size={size} label="Checked" checked name={`ks-${size}-c`} value="checked" />
            <RadioButton
              size={size}
              label="With description"
              description="This is a helpful description."
              name={`ks-${size}-d`}
              value="desc"
            />
            <RadioButton size={size} label="Disabled" disabled name={`ks-${size}-dis`} value="disabled" />
            <RadioButton size={size} label="Disabled checked" disabled checked name={`ks-${size}-disc`} value="disabled-checked" />
          </div>
        </div>
      ))}
    </div>
  ),
};
