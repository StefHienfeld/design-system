import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';
import { Button } from '../Button';
import { Tabs } from '../Tabs';
import { ButtonGroup } from '../ButtonGroup';
import type { TabItem } from '../Tabs';


/* ----------------------------------------------------------------
   Sample tab data
   ---------------------------------------------------------------- */
const sampleTabs: TabItem[] = [
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

/* ----------------------------------------------------------------
   Controlled Tabs wrapper for stories
   ---------------------------------------------------------------- */
const ControlledTabs: React.FC = () => {
  const [active, setActive] = React.useState('details');
  return <Tabs items={sampleTabs} activeKey={active} onChange={setActive} />;
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof SectionHeader> = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  argTypes: {
    divider: { control: 'boolean' },
    dropdown: { control: 'boolean' },
    supportingText: { control: 'text' },
  },
  args: {
    title: 'Team members',
    supportingText: 'Manage your team members and their account permissions here.',
    divider: true,
    dropdown: false,
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */

/** Default section header with title and supporting text only. */
export const Default: Story = {};

/** With action buttons (Tertiary + Secondary + Primary) and a dropdown icon. */
export const WithButtons: Story = {
  args: {
    dropdown: true,
    actions: (
      <>
        <Button hierarchy="tertiary">Tertiary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="primary">Primary</Button>
      </>
    ),
  },
};

/** With a ButtonGroup in the actions slot and a dropdown icon. */
export const WithButtonGroup: Story = {
  args: {
    dropdown: true,
    actions: (
      <ButtonGroup
        items={[
          { label: 'Text' },
          { label: 'Text' },
          { label: 'Text' },
        ]}
      />
    ),
  },
};

/** Without divider. */
export const NoDivider: Story = {
  args: {
    divider: false,
  },
};

/** Title only, no supporting text. */
export const TitleOnly: Story = {
  args: {
    supportingText: undefined,
  },
};

/** With tabs below the header content. */
export const WithTabs: Story = {
  args: {
    dropdown: true,
    actions: (
      <>
        <Button hierarchy="tertiary">Tertiary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="primary">Primary</Button>
      </>
    ),
  },
  render: (args) => (
    <SectionHeader {...args} tabs={<ControlledTabs />} />
  ),
};

/** With tabs and a ButtonGroup. */
export const WithTabsAndButtonGroup: Story = {
  args: {
    dropdown: true,
    actions: (
      <ButtonGroup
        items={[
          { label: 'Text' },
          { label: 'Text' },
          { label: 'Text' },
        ]}
      />
    ),
  },
  render: (args) => (
    <SectionHeader {...args} tabs={<ControlledTabs />} />
  ),
};

/** Kitchen sink: all variants side-by-side. */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          With Buttons + Dropdown
        </div>
        <SectionHeader
          title="Team members"
          supportingText="Manage your team members and their account permissions here."
          dropdown
          actions={
            <>
              <Button hierarchy="tertiary">Tertiary</Button>
              <Button hierarchy="secondary">Secondary</Button>
              <Button hierarchy="secondary">Secondary</Button>
              <Button hierarchy="primary">Primary</Button>
            </>
          }
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          With ButtonGroup + Dropdown
        </div>
        <SectionHeader
          title="Team members"
          supportingText="Manage your team members and their account permissions here."
          dropdown
          actions={
            <ButtonGroup
              items={[
                { label: 'Text' },
                { label: 'Text' },
                { label: 'Text' },
              ]}
            />
          }
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          With Tabs + Buttons
        </div>
        <SectionHeader
          title="Team members"
          supportingText="Manage your team members and their account permissions here."
          dropdown
          tabs={<ControlledTabs />}
          actions={
            <>
              <Button hierarchy="tertiary">Tertiary</Button>
              <Button hierarchy="secondary">Secondary</Button>
              <Button hierarchy="secondary">Secondary</Button>
              <Button hierarchy="primary">Primary</Button>
            </>
          }
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Title Only — No Divider
        </div>
        <SectionHeader
          title="Team members"
          divider={false}
        />
      </div>
    </div>
  ),
};
