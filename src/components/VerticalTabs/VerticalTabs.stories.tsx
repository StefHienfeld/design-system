import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerticalTabs } from './VerticalTabs';
import type { VerticalTabsProps } from './VerticalTabs';
import type { TabItem } from '../Tabs/Tabs';

/* ----------------------------------------------------------------
   Sample tab data
   ---------------------------------------------------------------- */
const settingsTabs: TabItem[] = [
  { key: 'details', label: 'My details' },
  { key: 'profile', label: 'Profile' },
  { key: 'password', label: 'Password' },
  { key: 'team', label: 'Team' },
  { key: 'plan', label: 'Plan' },
  { key: 'billing', label: 'Billing' },
  { key: 'email', label: 'Email' },
  { key: 'notifications', label: 'Notifications', count: 2 },
  { key: 'integrations', label: 'Integrations' },
  { key: 'api', label: 'API' },
];

const tabsWithDisabled: TabItem[] = [
  { key: 'details', label: 'My details' },
  { key: 'profile', label: 'Profile' },
  { key: 'password', label: 'Password', disabled: true },
  { key: 'team', label: 'Team' },
];

/* ----------------------------------------------------------------
   Controlled wrapper
   ---------------------------------------------------------------- */
const VerticalTabsDemo: React.FC<
  Omit<VerticalTabsProps, 'activeKey' | 'onChange'> & { defaultKey?: string }
> = ({ items, defaultKey, ...rest }) => {
  const [active, setActive] = React.useState(defaultKey || items[0]?.key || '');
  return (
    <VerticalTabs
      items={items}
      activeKey={active}
      onChange={setActive}
      {...rest}
    />
  );
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof VerticalTabs> = {
  title: 'Components/VerticalTabs',
  component: VerticalTabs,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['button-primary', 'button-gray', 'line', 'button-border', 'button-minimal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof VerticalTabs>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */
export const ButtonPrimary: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="button-primary" size="sm" />
    </div>
  ),
};

export const ButtonPrimaryMd: Story = {
  name: 'Button Primary (md)',
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="button-primary" size="md" />
    </div>
  ),
};

export const ButtonGray: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="button-gray" size="sm" />
    </div>
  ),
};

export const ButtonGrayMd: Story = {
  name: 'Button Gray (md)',
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="button-gray" size="md" />
    </div>
  ),
};

export const Line: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="line" size="sm" />
    </div>
  ),
};

export const LineMd: Story = {
  name: 'Line (md)',
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="line" size="md" />
    </div>
  ),
};

export const ButtonBorder: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="button-border" size="sm" />
    </div>
  ),
};

export const ButtonBorderMd: Story = {
  name: 'Button Border (md)',
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="button-border" size="md" />
    </div>
  ),
};

export const ButtonMinimal: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="button-minimal" size="sm" />
    </div>
  ),
};

export const ButtonMinimalMd: Story = {
  name: 'Button Minimal (md)',
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={settingsTabs} type="button-minimal" size="md" />
    </div>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <VerticalTabsDemo items={tabsWithDisabled} type="button-primary" size="sm" />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
      {(['button-primary', 'button-gray', 'line', 'button-border', 'button-minimal'] as const).map(
        (type) => (
          <div key={type} style={{ width: 180 }}>
            <div
              style={{
                marginBottom: 8,
                fontWeight: 600,
                fontSize: 12,
                textTransform: 'uppercase',
                color: '#717680',
              }}
            >
              {type}
            </div>
            <VerticalTabsDemo items={settingsTabs} type={type} size="sm" />
          </div>
        ),
      )}
    </div>
  ),
};

export const AllTypesMd: Story = {
  name: 'All Types (md)',
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
      {(['button-primary', 'button-gray', 'line', 'button-border', 'button-minimal'] as const).map(
        (type) => (
          <div key={type} style={{ width: 200 }}>
            <div
              style={{
                marginBottom: 8,
                fontWeight: 600,
                fontSize: 12,
                textTransform: 'uppercase',
                color: '#717680',
              }}
            >
              {type}
            </div>
            <VerticalTabsDemo items={settingsTabs} type={type} size="md" />
          </div>
        ),
      )}
    </div>
  ),
};
