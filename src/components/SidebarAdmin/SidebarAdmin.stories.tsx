import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarAdmin } from './SidebarAdmin';
import type { SidebarAdminSection } from './SidebarAdmin';
import { Logo } from '../Logo';

/* ----------------------------------------------------------------
   Inline SVG icons (20px)
   ---------------------------------------------------------------- */

const ClipboardCheckIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3333 3.33333H14.1667C14.6087 3.33333 15.0326 3.50893 15.3452 3.82149C15.6577 4.13405 15.8333 4.55797 15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.39131 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16667 17.1087 4.16667 16.6667V5C4.16667 4.55797 4.34226 4.13405 4.65482 3.82149C4.96738 3.50893 5.39131 3.33333 5.83333 3.33333H6.66667M7.5 10L9.16667 11.6667L12.5 8.33333M7.5 5.83333H12.5C12.9602 5.83333 13.3333 5.46024 13.3333 5V3.33333C13.3333 2.8731 12.9602 2.5 12.5 2.5H7.5C7.03976 2.5 6.66667 2.8731 6.66667 3.33333V5C6.66667 5.46024 7.03976 5.83333 7.5 5.83333Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 5V10L13.3333 11.6667M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BuildingIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.33333 17.5H16.6667M5 17.5V4.16667C5 3.72464 5.17559 3.30072 5.48816 2.98816C5.80072 2.67559 6.22464 2.5 6.66667 2.5H13.3333C13.7754 2.5 14.1993 2.67559 14.5118 2.98816C14.8244 3.30072 15 3.72464 15 4.16667V17.5M8.33333 6.66667H8.34167M11.6667 6.66667H11.675M8.33333 10H8.34167M11.6667 10H11.675M8.33333 13.3333H8.34167M11.6667 13.3333H11.675"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 18.3333C10 18.3333 16.6667 15 16.6667 10V4.16667L10 1.66667L3.33333 4.16667V10C3.33333 15 10 18.3333 10 18.3333Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.6667 2.5H5.83333C5.39131 2.5 4.96738 2.67559 4.65482 2.98816C4.34226 3.30072 4.16667 3.72464 4.16667 4.16667V15.8333C4.16667 16.2754 4.34226 16.6993 4.65482 17.0118C4.96738 17.3244 5.39131 17.5 5.83333 17.5H14.1667C14.6087 17.5 15.0326 17.3244 15.3452 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333V6.66667L11.6667 2.5Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.6667 2.5V6.66667H15.8333"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Sample data
   ---------------------------------------------------------------- */

const mainSections: SidebarAdminSection[] = [
  {
    items: [
      { key: 'tasks', label: 'Tasks', icon: ClipboardCheckIcon, count: 3 },
      { key: 'changelog', label: 'Changelog', icon: ClockIcon },
      { key: 'companies', label: 'Companies', icon: BuildingIcon },
      { key: 'policies', label: 'Policies', icon: ShieldIcon },
      { key: 'rule-templates', label: 'Rule templates', icon: FileIcon },
    ],
  },
  {
    label: 'Recent Policies',
    items: [
      { key: 'technova', label: 'TechNova', badge: 'CL 520933', dot: true },
      { key: 'greenleaf', label: 'GreenLeaf', badge: 'CL 678123', dot: true },
      { key: 'bluesky', label: 'BlueSky', badge: 'CL 987456', dot: true },
      { key: 'suydersee', label: 'Suydersee', badge: 'CL 123789', dot: true },
      {
        key: 'pinnacle',
        label: 'Pinnacle Ventures',
        badge: 'CL 456321',
        dot: true,
      },
      {
        key: 'starlight',
        label: 'Starlight Tech',
        badge: 'CL 654987',
        dot: true,
      },
    ],
  },
];

const sampleUser = {
  name: 'James Fletcher',
  email: 'j.fletcher@hienfeld.nl',
  avatar: 'https://i.pravatar.cc/80?u=james-fletcher',
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof SidebarAdmin> = {
  title: 'Components/SidebarAdmin',
  component: SidebarAdmin,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SidebarAdmin>;

/* ----------------------------------------------------------------
   Expanded (default desktop)
   ---------------------------------------------------------------- */
export const Expanded: Story = {
  args: {
    logo: <Logo width={74} />,
    sections: mainSections,
    user: sampleUser,
    onSearch: () => alert('Search clicked'),
    onToggleCollapse: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Story />
        <div style={{ marginLeft: 310, padding: 32, flex: 1 }}>
          <h2 style={{ margin: '0 0 8px' }}>Page Content</h2>
          <p style={{ color: '#535862' }}>
            Admin sidebar in expanded state (310px).
          </p>
        </div>
      </div>
    ),
  ],
};

/* ----------------------------------------------------------------
   Collapsed (icon-only desktop)
   ---------------------------------------------------------------- */
export const Collapsed: Story = {
  args: {
    logo: <Logo width={74} />,
    sections: mainSections,
    user: sampleUser,
    collapsed: true,
    onSearch: () => alert('Search clicked'),
    onToggleCollapse: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Story />
        <div style={{ marginLeft: 80, padding: 32, flex: 1 }}>
          <h2 style={{ margin: '0 0 8px' }}>Page Content</h2>
          <p style={{ color: '#535862' }}>
            Admin sidebar in collapsed state (80px).
          </p>
        </div>
      </div>
    ),
  ],
};

/* ----------------------------------------------------------------
   Interactive — toggle between expanded and collapsed
   ---------------------------------------------------------------- */
const InteractiveSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarAdmin
        logo={<Logo width={74} />}
        sections={mainSections}
        user={sampleUser}
        collapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        onSearch={() => alert('Search clicked')}
      />
      <div
        style={{
          marginLeft: isCollapsed ? 80 : 310,
          padding: 32,
          flex: 1,
          transition: 'margin-left 200ms ease',
        }}
      >
        <h2 style={{ margin: '0 0 8px' }}>Page Content</h2>
        <p style={{ color: '#535862' }}>
          Click the chevron in the sidebar header to toggle between expanded and
          collapsed states.
        </p>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveSidebar />,
};

/* ----------------------------------------------------------------
   Mobile Open — slide-in overlay
   ---------------------------------------------------------------- */
export const MobileOpen: Story = {
  args: {
    logo: <Logo width={74} />,
    sections: mainSections,
    user: sampleUser,
    mobileOpen: true,
    onMobileClose: () => {},
    onSearch: () => alert('Search clicked'),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Story />
        <div style={{ padding: 32 }}>
          <h2 style={{ margin: '0 0 8px' }}>Page Content</h2>
          <p style={{ color: '#535862' }}>
            Mobile sidebar is open with overlay backdrop.
          </p>
        </div>
      </div>
    ),
  ],
};

/* ----------------------------------------------------------------
   Mobile Interactive — toggle open/close
   ---------------------------------------------------------------- */
const MobileInteractiveSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Mobile header bar with hamburger */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'white',
          borderBottom: '1px solid #e9eaeb',
        }}
      >
        <Logo width={74} />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
          }}
          aria-label="Open navigation"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="#181d27"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <SidebarAdmin
        logo={<Logo width={74} />}
        sections={mainSections}
        user={sampleUser}
        mobileOpen={isOpen}
        onMobileClose={() => setIsOpen(false)}
        onSearch={() => alert('Search clicked')}
      />

      <div style={{ padding: 32 }}>
        <h2 style={{ margin: '0 0 8px' }}>Page Content</h2>
        <p style={{ color: '#535862' }}>
          Click the hamburger menu to open the mobile sidebar. Click the
          backdrop or X button to close it.
        </p>
      </div>
    </div>
  );
};

export const MobileInteractive: Story = {
  render: () => <MobileInteractiveSidebar />,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
