import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavItemBase } from './NavItemBase';

/* ----------------------------------------------------------------
   Placeholder icon — bar-chart-square (20 x 20)
   ---------------------------------------------------------------- */
const BarChartIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.5"
      y="2.5"
      width="15"
      height="15"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.667 12.5V10M10 12.5V7.5M13.333 12.5V9.167"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Dot indicator (8 x 8)
   ---------------------------------------------------------------- */
const DotIndicator = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill="var(--color-success-500)" />
  </svg>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof NavItemBase> = {
  title: 'Components/NavItemBase',
  component: NavItemBase,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    count: { control: 'number' },
    badge: { control: 'text' },
    active: { control: 'boolean' },
    collapsed: { control: 'boolean' },
  },
  args: {
    label: 'Dashboard',
    icon: BarChartIcon,
    active: false,
    collapsed: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 272, fontFamily: 'var(--font-family-body)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavItemBase>;

/* ----------------------------------------------------------------
   Default
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Active
   ---------------------------------------------------------------- */
export const Active: Story = {
  args: {
    active: true,
  },
};

/* ----------------------------------------------------------------
   With Count
   ---------------------------------------------------------------- */
export const WithCount: Story = {
  args: {
    count: 10,
  },
};

/* ----------------------------------------------------------------
   With Badge
   ---------------------------------------------------------------- */
export const WithBadge: Story = {
  args: {
    badge: 'New',
  },
};

/* ----------------------------------------------------------------
   With Chevron (onClick)
   ---------------------------------------------------------------- */
export const WithChevron: Story = {
  args: {
    count: 10,
    onClick: () => {},
  },
};

/* ----------------------------------------------------------------
   With Dot
   ---------------------------------------------------------------- */
export const WithDot: Story = {
  args: {
    dot: DotIndicator,
  },
};

/* ----------------------------------------------------------------
   Collapsed
   ---------------------------------------------------------------- */
export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 44 }}>
        <Story />
      </div>
    ),
  ],
};

/* ----------------------------------------------------------------
   Collapsed Active
   ---------------------------------------------------------------- */
export const CollapsedActive: Story = {
  args: {
    collapsed: true,
    active: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 44 }}>
        <Story />
      </div>
    ),
  ],
};

/* ----------------------------------------------------------------
   As Link
   ---------------------------------------------------------------- */
export const AsLink: Story = {
  args: {
    href: '#dashboard',
    count: 10,
  },
};

/* ----------------------------------------------------------------
   All States — expanded
   ---------------------------------------------------------------- */
export const AllStatesExpanded: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 272 }}>
      <div
        style={{
          marginBottom: 4,
          fontWeight: 600,
          fontSize: 12,
          textTransform: 'uppercase',
          color: '#717680',
        }}
      >
        Default
      </div>
      <NavItemBase label="Dashboard" icon={BarChartIcon} count={10} onClick={() => {}} />

      <div
        style={{
          marginTop: 12,
          marginBottom: 4,
          fontWeight: 600,
          fontSize: 12,
          textTransform: 'uppercase',
          color: '#717680',
        }}
      >
        Active
      </div>
      <NavItemBase label="Dashboard" icon={BarChartIcon} count={10} active onClick={() => {}} />

      <div
        style={{
          marginTop: 12,
          marginBottom: 4,
          fontWeight: 600,
          fontSize: 12,
          textTransform: 'uppercase',
          color: '#717680',
        }}
      >
        No count / no chevron
      </div>
      <NavItemBase label="Dashboard" icon={BarChartIcon} href="#" />

      <div
        style={{
          marginTop: 12,
          marginBottom: 4,
          fontWeight: 600,
          fontSize: 12,
          textTransform: 'uppercase',
          color: '#717680',
        }}
      >
        With dot
      </div>
      <NavItemBase label="Dashboard" icon={BarChartIcon} dot={DotIndicator} count={10} onClick={() => {}} />
    </div>
  ),
};

/* ----------------------------------------------------------------
   All States — collapsed
   ---------------------------------------------------------------- */
export const AllStatesCollapsed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 44, alignItems: 'center' }}>
        <div
          style={{
            marginBottom: 4,
            fontWeight: 600,
            fontSize: 10,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Default
        </div>
        <NavItemBase label="Dashboard" icon={BarChartIcon} collapsed />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 44, alignItems: 'center' }}>
        <div
          style={{
            marginBottom: 4,
            fontWeight: 600,
            fontSize: 10,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Active
        </div>
        <NavItemBase label="Dashboard" icon={BarChartIcon} collapsed active />
      </div>
    </div>
  ),
};
