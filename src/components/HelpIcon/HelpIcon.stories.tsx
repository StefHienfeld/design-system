import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelpIcon } from './HelpIcon';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof HelpIcon> = {
  title: 'Components/HelpIcon',
  component: HelpIcon,
  tags: ['autodocs'],
  argTypes: {
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    size: { control: 'number' },
    tooltip: { control: 'text' },
    supportingText: { control: 'text' },
  },
  args: {
    tooltip: 'This is a helpful tooltip.',
    tooltipPosition: 'top',
  },
  /* Center stories so tooltips have room to render in all directions */
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
          padding: 80,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HelpIcon>;

/* ----------------------------------------------------------------
   Default (top position)
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   All positions
   ---------------------------------------------------------------- */
export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#535862' }}>Top</span>
        <HelpIcon tooltip="Tooltip on top" tooltipPosition="top" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#535862' }}>Bottom</span>
        <HelpIcon tooltip="Tooltip on bottom" tooltipPosition="bottom" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#535862' }}>Left</span>
        <HelpIcon tooltip="Tooltip on left" tooltipPosition="left" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#535862' }}>Right</span>
        <HelpIcon tooltip="Tooltip on right" tooltipPosition="right" />
      </div>
    </div>
  ),
};

/* ----------------------------------------------------------------
   With supporting text
   ---------------------------------------------------------------- */
export const WithSupportingText: Story = {
  args: {
    tooltip: 'Help center',
    supportingText:
      'Visit our help center to find answers to common questions and contact support.',
  },
};

/* ----------------------------------------------------------------
   Custom size (24px)
   ---------------------------------------------------------------- */
export const CustomSize: Story = {
  args: {
    tooltip: 'Larger help icon',
    size: 24,
  },
};

/* ----------------------------------------------------------------
   In context (next to label text)
   ---------------------------------------------------------------- */
export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <label
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--text-secondary)',
          }}
        >
          Email address
        </label>
        <HelpIcon
          tooltip="Primary email"
          supportingText="We'll use this email for account notifications and password resets."
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <label
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--text-secondary)',
          }}
        >
          API key
        </label>
        <HelpIcon tooltip="Your unique API key for authentication." tooltipPosition="right" />
      </div>
    </div>
  ),
};
