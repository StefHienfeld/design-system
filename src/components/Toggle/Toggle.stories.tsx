import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    type: {
      control: 'select',
      options: ['default', 'slim'],
    },
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    size: 'md',
    type: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/* ----------------------------------------------------------------
   Default states
   ---------------------------------------------------------------- */
export const DefaultOff: Story = {
  args: {},
};

export const DefaultOn: Story = {
  args: { defaultChecked: true },
};

/* ----------------------------------------------------------------
   With label
   ---------------------------------------------------------------- */
export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
};

/* ----------------------------------------------------------------
   With label and description
   ---------------------------------------------------------------- */
export const WithLabelAndDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive email alerts when important events occur.',
  },
};

/* ----------------------------------------------------------------
   Size comparison
   ---------------------------------------------------------------- */
export const SizeSmall: Story = {
  args: { size: 'sm', label: 'Small' },
};

export const SizeMedium: Story = {
  args: { size: 'md', label: 'Medium' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle size="sm" label="Small toggle" defaultChecked />
      <Toggle size="md" label="Medium toggle" defaultChecked />
    </div>
  ),
};

/* ----------------------------------------------------------------
   Disabled states
   ---------------------------------------------------------------- */
export const DisabledOff: Story = {
  args: {
    disabled: true,
    label: 'Disabled (off)',
  },
};

export const DisabledOn: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'Disabled (on)',
  },
};

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle disabled label="Disabled off" />
      <Toggle disabled defaultChecked label="Disabled on" />
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
        <Toggle
          checked={checked}
          onChange={setChecked}
          label="Controlled toggle"
          description="State is managed externally."
        />
        <span style={{ fontSize: 14, color: '#535862' }}>
          Current value: <strong>{checked ? 'ON' : 'OFF'}</strong>
        </span>
      </div>
    );
  },
};

/* ----------------------------------------------------------------
   Slim variant
   ---------------------------------------------------------------- */
export const SlimSmall: Story = {
  args: { type: 'slim', size: 'sm', label: 'Slim small' },
};

export const SlimMedium: Story = {
  args: { type: 'slim', size: 'md', label: 'Slim medium' },
};

export const SlimOn: Story = {
  args: { type: 'slim', defaultChecked: true, label: 'Slim on' },
};

export const SlimDisabled: Story = {
  args: { type: 'slim', disabled: true, label: 'Slim disabled' },
};

export const SlimAllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle type="slim" size="sm" label="Slim small off" />
      <Toggle type="slim" size="sm" label="Slim small on" defaultChecked />
      <Toggle type="slim" size="md" label="Slim medium off" />
      <Toggle type="slim" size="md" label="Slim medium on" defaultChecked />
      <Toggle type="slim" disabled label="Slim disabled off" />
      <Toggle type="slim" disabled defaultChecked label="Slim disabled on" />
    </div>
  ),
};

/* ----------------------------------------------------------------
   Kitchen sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Sizes
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Toggle size="sm" label="Small" />
          <Toggle size="md" label="Medium" />
        </div>
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          States
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Toggle label="Off" />
          <Toggle label="On" defaultChecked />
          <Toggle label="Disabled off" disabled />
          <Toggle label="Disabled on" disabled defaultChecked />
        </div>
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          With description
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Toggle
            label="Auto-save"
            description="Automatically save changes every 30 seconds."
            defaultChecked
          />
          <Toggle
            label="Dark mode"
            description="Switch to a darker color scheme."
          />
        </div>
      </div>
    </div>
  ),
};
