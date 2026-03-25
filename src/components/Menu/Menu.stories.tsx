import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, MenuItem, MenuDivider, MenuHeader } from './Menu';

/* ----------------------------------------------------------------
   Placeholder icons — simple inline SVGs (16px)
   ---------------------------------------------------------------- */
const UserIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 13.5c0-2.5 2.2-4 5-4s5 1.5 5 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 8a1.1 1.1 0 0 0 .2-1.2l-.5-1.1a1.1 1.1 0 0 0-1-.6h-.2a1 1 0 0 1-.9-.5 1 1 0 0 1 0-1l.1-.2a1.1 1.1 0 0 0-.2-1.2l-.3-.3a1.1 1.1 0 0 0-1.2-.2l-.1.1a1 1 0 0 1-1 0 1 1 0 0 1-.5-.9V1a1.1 1.1 0 0 0-1.1-1h-.5a1.1 1.1 0 0 0-1.1 1.1 1 1 0 0 1-.5.9 1 1 0 0 1-1 0l-.2-.1a1.1 1.1 0 0 0-1.2.2L1.9 2a1.1 1.1 0 0 0-.2 1.2v.2a1 1 0 0 1-.5.9 1 1 0 0 1-1 0A1.1 1.1 0 0 0 0 5.4v.5a1.1 1.1 0 0 0 1.1 1.1 1 1 0 0 1 .9.5 1 1 0 0 1 0 1 1.1 1.1 0 0 0 .2 1.2l.4.4a1.1 1.1 0 0 0 1.2.2 1 1 0 0 1 1 0 1 1 0 0 1 .5.9 1.1 1.1 0 0 0 1.1 1.1h.5a1.1 1.1 0 0 0 1.1-1.1 1 1 0 0 1 .5-.9 1 1 0 0 1 1 0 1.1 1.1 0 0 0 1.2-.2l.4-.4a1.1 1.1 0 0 0 .2-1.2 1 1 0 0 1 0-1 1 1 0 0 1 .9-.5A1.1 1.1 0 0 0 13 8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogOutIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 14H3.3c-.4 0-.7-.1-.9-.4-.3-.2-.4-.5-.4-.9V3.3c0-.4.1-.7.4-.9.2-.3.5-.4.9-.4H6M10.7 11.3 14 8l-3.3-3.3M14 8H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
  },
  args: {
    width: 248,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 32 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Menu>;

/* ----------------------------------------------------------------
   Basic — four items with shortcuts
   ---------------------------------------------------------------- */
export const Basic: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem label="Undo" shortcut="Ctrl+Z" onClick={() => {}} />
      <MenuItem label="Redo" shortcut="Ctrl+Y" onClick={() => {}} />
      <MenuItem label="Cut" shortcut="Ctrl+X" onClick={() => {}} />
      <MenuItem label="Copy" shortcut="Ctrl+C" onClick={() => {}} />
    </Menu>
  ),
};

/* ----------------------------------------------------------------
   WithHeader — header, dividers, and items
   ---------------------------------------------------------------- */
export const WithHeader: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuHeader
        name="Olivia Rhye"
        email="olivia@untitledui.com"
        avatar="https://i.pravatar.cc/80?u=olivia"
        online
      />
      <MenuItem label="View profile" onClick={() => {}} />
      <MenuItem label="Settings" onClick={() => {}} />
      <MenuItem label="Keyboard shortcuts" onClick={() => {}} />
      <MenuDivider />
      <MenuItem label="Company profile" onClick={() => {}} />
      <MenuItem label="Team" onClick={() => {}} />
      <MenuItem label="Invite colleagues" onClick={() => {}} />
      <MenuDivider />
      <MenuItem label="Changelog" onClick={() => {}} />
      <MenuItem label="Slack Community" onClick={() => {}} />
      <MenuItem label="Support" onClick={() => {}} />
      <MenuDivider />
      <MenuItem label="Log out" onClick={() => {}} />
    </Menu>
  ),
};

/* ----------------------------------------------------------------
   WithIcons — items with leading icons
   ---------------------------------------------------------------- */
export const WithIcons: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuHeader
        name="Olivia Rhye"
        email="olivia@untitledui.com"
        avatar="https://i.pravatar.cc/80?u=olivia"
        online
      />
      <MenuItem icon={UserIcon} label="View profile" onClick={() => {}} />
      <MenuItem icon={SettingsIcon} label="Settings" onClick={() => {}} />
      <MenuDivider />
      <MenuItem icon={LogOutIcon} label="Log out" onClick={() => {}} />
    </Menu>
  ),
};
