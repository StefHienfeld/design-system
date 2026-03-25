import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import type { TabItem, TabsType, TabsSize } from './Tabs';

/* ----------------------------------------------------------------
   Placeholder icons
   ---------------------------------------------------------------- */
const HomeIcon = (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M2 8l6-6 6 6M4 7v5.5a.5.5 0 0 0 .5.5h2V10h3v3h2a.5.5 0 0 0 .5-.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 14c0-2.5 2.5-4 5.5-4s5.5 1.5 5.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = (
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1v2m0 10v2M1 8h2m10 0h2M3.05 3.05l1.41 1.41m7.08 7.08l1.41 1.41M3.05 12.95l1.41-1.41m7.08-7.08l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ----------------------------------------------------------------
   Sample tabs
   ---------------------------------------------------------------- */
const basicTabs: TabItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'policies', label: 'Policies' },
  { key: 'claims', label: 'Claims' },
  { key: 'documents', label: 'Documents' },
];

const tabsWithCounts: TabItem[] = [
  { key: 'all', label: 'All', count: 42 },
  { key: 'active', label: 'Active', count: 28 },
  { key: 'pending', label: 'Pending', count: 8 },
  { key: 'closed', label: 'Closed', count: 6 },
];

const tabsWithIcons: TabItem[] = [
  { key: 'home', label: 'Home', icon: HomeIcon },
  { key: 'profile', label: 'Profile', icon: UserIcon },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
];

const tabsWithDisabled: TabItem[] = [
  { key: 'general', label: 'General' },
  { key: 'security', label: 'Security' },
  { key: 'billing', label: 'Billing', disabled: true },
  { key: 'advanced', label: 'Advanced' },
];

/* ----------------------------------------------------------------
   Controlled wrapper
   ---------------------------------------------------------------- */
const TabsDemo: React.FC<{
  items: TabItem[];
  defaultKey?: string;
  type?: TabsType;
  size?: TabsSize;
  fullWidth?: boolean;
}> = ({ items, defaultKey, type, size, fullWidth }) => {
  const [active, setActive] = React.useState(defaultKey || items[0]?.key || '');
  return (
    <Tabs
      items={items}
      activeKey={active}
      onChange={setActive}
      type={type}
      size={size}
      fullWidth={fullWidth}
    />
  );
};

/* ----------------------------------------------------------------
   Section label helper
   ---------------------------------------------------------------- */
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
    {children}
  </div>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['underline', 'button-brand', 'button-gray', 'button-border', 'button-minimal'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */

/* === Defaults (underline / sm) === */
export const Default: Story = {
  render: () => <TabsDemo items={basicTabs} />,
};

export const WithCounts: Story = {
  render: () => <TabsDemo items={tabsWithCounts} />,
};

export const WithIcons: Story = {
  render: () => <TabsDemo items={tabsWithIcons} />,
};

export const WithDisabledTab: Story = {
  render: () => <TabsDemo items={tabsWithDisabled} />,
};

export const IconsAndCounts: Story = {
  render: () => (
    <TabsDemo
      items={[
        { key: 'home', label: 'Home', icon: HomeIcon, count: 5 },
        { key: 'profile', label: 'Profile', icon: UserIcon, count: 12 },
        { key: 'settings', label: 'Settings', icon: SettingsIcon },
      ]}
    />
  ),
};

/* === Type variants === */
export const Underline: Story = {
  render: () => <TabsDemo items={basicTabs} type="underline" />,
};

export const ButtonBrand: Story = {
  render: () => <TabsDemo items={tabsWithCounts} type="button-brand" />,
};

export const ButtonGray: Story = {
  render: () => <TabsDemo items={tabsWithCounts} type="button-gray" />,
};

export const ButtonBorder: Story = {
  render: () => <TabsDemo items={tabsWithCounts} type="button-border" />,
};

export const ButtonMinimal: Story = {
  render: () => <TabsDemo items={tabsWithCounts} type="button-minimal" />,
};

/* === Size: md === */
export const MediumUnderline: Story = {
  name: 'Size md — Underline',
  render: () => <TabsDemo items={basicTabs} type="underline" size="md" />,
};

export const MediumButtonBrand: Story = {
  name: 'Size md — Button Brand',
  render: () => <TabsDemo items={tabsWithCounts} type="button-brand" size="md" />,
};

export const MediumButtonBorder: Story = {
  name: 'Size md — Button Border',
  render: () => <TabsDemo items={tabsWithCounts} type="button-border" size="md" />,
};

/* === Full width === */
export const FullWidthUnderline: Story = {
  name: 'Full Width — Underline',
  render: () => <TabsDemo items={basicTabs} type="underline" fullWidth />,
};

export const FullWidthButtonBrand: Story = {
  name: 'Full Width — Button Brand',
  render: () => <TabsDemo items={basicTabs} type="button-brand" fullWidth />,
};

export const FullWidthButtonBorder: Story = {
  name: 'Full Width — Button Border',
  render: () => <TabsDemo items={basicTabs} type="button-border" fullWidth />,
};

export const FullWidthButtonMinimal: Story = {
  name: 'Full Width — Button Minimal',
  render: () => <TabsDemo items={basicTabs} type="button-minimal" fullWidth />,
};

/* === All Variants overview === */
export const KitchenSink: Story = {
  render: () => {
    const types: TabsType[] = ['underline', 'button-brand', 'button-gray', 'button-border', 'button-minimal'];
    const sizes: TabsSize[] = ['sm', 'md'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {types.map((type) => (
          <div key={type}>
            <SectionLabel>{type}</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {sizes.map((size) => (
                <div key={`${type}-${size}`}>
                  <div style={{ marginBottom: 4, fontSize: 11, color: '#a4a7ae' }}>
                    size: {size}
                  </div>
                  <TabsDemo items={tabsWithCounts} type={type} size={size} />
                </div>
              ))}
              <div>
                <div style={{ marginBottom: 4, fontSize: 11, color: '#a4a7ae' }}>
                  size: sm, full width
                </div>
                <TabsDemo items={basicTabs} type={type} size="sm" fullWidth />
              </div>
            </div>
          </div>
        ))}

        {/* Icons + counts across types */}
        <div>
          <SectionLabel>With Icons &amp; Counts</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {types.map((type) => (
              <TabsDemo
                key={type}
                items={[
                  { key: 'home', label: 'Home', icon: HomeIcon, count: 5 },
                  { key: 'profile', label: 'Profile', icon: UserIcon, count: 12 },
                  { key: 'settings', label: 'Settings', icon: SettingsIcon },
                ]}
                type={type}
              />
            ))}
          </div>
        </div>

        {/* Disabled across types */}
        <div>
          <SectionLabel>With Disabled Tab</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {types.map((type) => (
              <TabsDemo key={type} items={tabsWithDisabled} type={type} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};
