import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';

/* ----------------------------------------------------------------
   Inline placeholder menu items — self-contained, no Menu import
   ---------------------------------------------------------------- */
const menuItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: 'calc(100% - 12px)',
  padding: '8px 10px',
  margin: '1px 6px',
  borderRadius: 2,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  textAlign: 'left' as const,
  boxSizing: 'border-box' as const,
};

const dividerStyle: React.CSSProperties = {
  height: 1,
  background: 'var(--border-secondary)',
  margin: '4px 0',
};

const PlaceholderItem: React.FC<{ label: string }> = ({ label }) => (
  <button
    role="menuitem"
    style={menuItemStyle}
    onMouseEnter={(e) => {
      (e.target as HTMLButtonElement).style.background = 'var(--bg-active)';
    }}
    onMouseLeave={(e) => {
      (e.target as HTMLButtonElement).style.background = 'none';
    }}
    onClick={() => {}}
  >
    {label}
  </button>
);

const PlaceholderDivider: React.FC = () => <div style={dividerStyle} />;

const SampleMenuContent = () => (
  <>
    <PlaceholderItem label="View profile" />
    <PlaceholderItem label="Settings" />
    <PlaceholderItem label="Keyboard shortcuts" />
    <PlaceholderDivider />
    <PlaceholderItem label="Company profile" />
    <PlaceholderItem label="Team" />
    <PlaceholderDivider />
    <PlaceholderItem label="Sign out" />
  </>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: 'select',
      options: ['button', 'icon', 'avatar'],
    },
    label: { control: 'text' },
    avatar: { control: 'text' },
  },
  args: {
    trigger: 'button',
    label: 'Options',
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
type Story = StoryObj<typeof Dropdown>;

/* ----------------------------------------------------------------
   Button trigger
   ---------------------------------------------------------------- */
export const ButtonTrigger: Story = {
  args: {
    trigger: 'button',
    label: 'Options',
  },
  render: (args) => (
    <Dropdown {...args}>
      <SampleMenuContent />
    </Dropdown>
  ),
};

/* ----------------------------------------------------------------
   Icon trigger (dots-vertical)
   ---------------------------------------------------------------- */
export const IconTrigger: Story = {
  args: {
    trigger: 'icon',
  },
  render: (args) => (
    <Dropdown {...args}>
      <SampleMenuContent />
    </Dropdown>
  ),
};

/* ----------------------------------------------------------------
   Avatar trigger
   ---------------------------------------------------------------- */
export const AvatarTrigger: Story = {
  args: {
    trigger: 'avatar',
    avatar: 'https://i.pravatar.cc/80?u=olivia',
    label: 'Olivia Rhye',
  },
  render: (args) => (
    <Dropdown {...args}>
      <SampleMenuContent />
    </Dropdown>
  ),
};

/* ----------------------------------------------------------------
   Avatar trigger — fallback initials (no image)
   ---------------------------------------------------------------- */
export const AvatarFallback: Story = {
  args: {
    trigger: 'avatar',
    label: 'Olivia Rhye',
  },
  render: (args) => (
    <Dropdown {...args}>
      <SampleMenuContent />
    </Dropdown>
  ),
};

/* ----------------------------------------------------------------
   Open state — button trigger rendered already open
   ---------------------------------------------------------------- */
export const OpenState: Story = {
  args: {
    trigger: 'button',
    label: 'Options',
  },
  render: (args) => (
    <Dropdown {...args}>
      <SampleMenuContent />
    </Dropdown>
  ),
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector(
      '.dropdown__trigger',
    ) as HTMLButtonElement;
    button?.click();
  },
};

/* ----------------------------------------------------------------
   All triggers side-by-side
   ---------------------------------------------------------------- */
export const AllTriggers: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
      <Dropdown trigger="button" label="Options">
        <SampleMenuContent />
      </Dropdown>
      <Dropdown trigger="icon">
        <SampleMenuContent />
      </Dropdown>
      <Dropdown trigger="avatar" avatar="https://i.pravatar.cc/80?u=olivia" label="Olivia Rhye">
        <SampleMenuContent />
      </Dropdown>
    </div>
  ),
};
