import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';
import type { SidebarSection } from './Sidebar';

/* ----------------------------------------------------------------
   Inline SVG icons (20px) — navigation set
   ---------------------------------------------------------------- */

const HomeIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 10L10 2.5L17.5 10M4.16667 8.33333V16.25C4.16667 16.5952 4.44648 16.875 4.79167 16.875H8.125V12.5C8.125 12.1548 8.40482 11.875 8.75 11.875H11.25C11.5952 11.875 11.875 12.1548 11.875 12.5V16.875H15.2083C15.5535 16.875 15.8333 16.5952 15.8333 16.25V8.33333M6.875 16.875H13.75"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClipboardIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3333 3.33333H14.1667C14.6087 3.33333 15.0326 3.50893 15.3452 3.82149C15.6577 4.13405 15.8333 4.55797 15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.39131 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16667 17.1087 4.16667 16.6667V5C4.16667 4.55797 4.34226 4.13405 4.65482 3.82149C4.96738 3.50893 5.39131 3.33333 5.83333 3.33333H6.66667M7.5 5.83333H12.5C12.9602 5.83333 13.3333 5.46024 13.3333 5V3.33333C13.3333 2.8731 12.9602 2.5 12.5 2.5H7.5C7.03976 2.5 6.66667 2.8731 6.66667 3.33333V5C6.66667 5.46024 7.03976 5.83333 7.5 5.83333Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChangelogIcon = (
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

const UsersIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5652 12.8512 11.7174 12.5 10.8333 12.5H4.16667C3.28261 12.5 2.43476 12.8512 1.80964 13.4763C1.18452 14.1014 0.833333 14.9493 0.833333 15.8333V17.5M19.1667 17.5V15.8333C19.1661 15.0948 18.9203 14.3773 18.4678 13.7936C18.0153 13.2099 17.3818 12.793 16.6667 12.6083M13.3333 2.60833C14.0504 2.79192 14.6859 3.20892 15.1397 3.79359C15.5935 4.37827 15.8399 5.09736 15.8399 5.8375C15.8399 6.57764 15.5935 7.29673 15.1397 7.88141C14.6859 8.46608 14.0504 8.88308 13.3333 9.06667M10.8333 5.83333C10.8333 7.67428 9.34095 9.16667 7.5 9.16667C5.65905 9.16667 4.16667 7.67428 4.16667 5.83333C4.16667 3.99238 5.65905 2.5 7.5 2.5C9.34095 2.5 10.8333 3.99238 10.8333 5.83333Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0302 16.0716 13.3005C16.1206 13.5708 16.2495 13.8203 16.4417 14.0167L16.4917 14.0667C16.6466 14.2215 16.7695 14.4053 16.8534 14.6076C16.9373 14.81 16.9805 15.0268 16.9805 15.2458C16.9805 15.4649 16.9373 15.6817 16.8534 15.884C16.7695 16.0864 16.6466 16.2702 16.4917 16.425C16.3368 16.5799 16.1531 16.7028 15.9507 16.7867C15.7484 16.8706 15.5316 16.9138 15.3125 16.9138C15.0934 16.9138 14.8766 16.8706 14.6743 16.7867C14.4719 16.7028 14.2882 16.5799 14.1333 16.425L14.0833 16.375C13.887 16.1828 13.6375 16.0539 13.3672 16.0049C13.0968 15.9559 12.818 15.989 12.5667 16.1C12.3203 16.2056 12.1124 16.3831 11.9692 16.6094C11.826 16.8357 11.7541 17.1004 11.7333 17.3667V17.5C11.7333 17.942 11.5577 18.366 11.2452 18.6785C10.9326 18.9911 10.5087 19.1667 10.0667 19.1667C9.62464 19.1667 9.20072 18.9911 8.88816 18.6785C8.57559 18.366 8.4 17.942 8.4 17.5V17.4167C8.37354 17.1423 8.29094 16.8713 8.13536 16.6439C7.97979 16.4165 7.75925 16.2438 7.5 16.15C7.24869 16.039 6.96981 16.0059 6.69949 16.0549C6.42917 16.1039 6.17966 16.2328 5.98333 16.425L5.93333 16.475C5.77849 16.6299 5.59471 16.7528 5.39235 16.8367C5.18999 16.9206 4.97317 16.9638 4.75417 16.9638C4.53516 16.9638 4.31834 16.9206 4.11598 16.8367C3.91362 16.7528 3.72984 16.6299 3.575 16.475C3.42009 16.3202 3.29717 16.1364 3.21327 15.934C3.12938 15.7317 3.08616 15.5149 3.08616 15.2958C3.08616 15.0768 3.12938 14.86 3.21327 14.6576C3.29717 14.4553 3.42009 14.2715 3.575 14.1167L3.625 14.0667C3.81718 13.8703 3.94613 13.6208 3.99513 13.3505C4.04414 13.0802 4.01097 12.8013 3.9 12.55C3.79444 12.3036 3.61685 12.0957 3.39058 11.9526C3.16431 11.8094 2.89962 11.7374 2.63333 11.7167H2.5C2.05797 11.7167 1.63405 11.5411 1.32149 11.2285C1.00893 10.916 0.833333 10.492 0.833333 10.05C0.833333 9.60797 1.00893 9.18405 1.32149 8.87149C1.63405 8.55893 2.05797 8.38333 2.5 8.38333H2.58333C2.85773 8.35688 3.12874 8.27427 3.35614 8.1187C3.58354 7.96312 3.75625 7.74258 3.85 7.48333C3.96097 7.23202 3.99414 6.95315 3.94513 6.68283C3.89613 6.41251 3.76718 6.163 3.575 5.96667L3.525 5.91667C3.37009 5.76182 3.24717 5.57805 3.16327 5.37569C3.07938 5.17333 3.03616 4.9565 3.03616 4.7375C3.03616 4.5185 3.07938 4.30167 3.16327 4.09931C3.24717 3.89695 3.37009 3.71318 3.525 3.55833C3.67984 3.40342 3.86362 3.28051 4.06598 3.19661C4.26834 3.11271 4.48516 3.0695 4.70417 3.0695C4.92317 3.0695 5.13999 3.11271 5.34235 3.19661C5.54471 3.28051 5.72849 3.40342 5.88333 3.55833L5.93333 3.60833C6.12966 3.80051 6.37917 3.92947 6.64949 3.97847C6.91981 4.02747 7.19869 3.99431 7.45 3.88333H7.5C7.74637 3.77778 7.95425 3.60018 8.09744 3.37392C8.24064 3.14765 8.31258 2.88295 8.33333 2.61667V2.5C8.33333 2.05797 8.50893 1.63405 8.82149 1.32149C9.13405 1.00893 9.55797 0.833333 10 0.833333C10.442 0.833333 10.866 1.00893 11.1785 1.32149C11.4911 1.63405 11.6667 2.05797 11.6667 2.5V2.58333C11.6874 2.84962 11.7594 3.11431 11.9026 3.34058C12.0457 3.56685 12.2536 3.74444 12.5 3.85C12.7513 3.96097 13.0302 3.99414 13.3005 3.94513C13.5708 3.89613 13.8203 3.76718 14.0167 3.575L14.0667 3.525C14.2215 3.37009 14.4053 3.24717 14.6076 3.16327C14.81 3.07938 15.0268 3.03616 15.2458 3.03616C15.4649 3.03616 15.6817 3.07938 15.884 3.16327C16.0864 3.24717 16.2702 3.37009 16.425 3.525C16.5799 3.67984 16.7028 3.86362 16.7867 4.06598C16.8706 4.26834 16.9138 4.48516 16.9138 4.70417C16.9138 4.92317 16.8706 5.13999 16.7867 5.34235C16.7028 5.54471 16.5799 5.72849 16.425 5.88333L16.375 5.93333C16.1828 6.12966 16.0539 6.37917 16.0049 6.64949C15.9559 6.91981 15.989 7.19869 16.1 7.45V7.5C16.2056 7.74637 16.3831 7.95425 16.6094 8.09744C16.8357 8.24064 17.1004 8.31258 17.3667 8.33333H17.5C17.942 8.33333 18.366 8.50893 18.6785 8.82149C18.9911 9.13405 19.1667 9.55797 19.1667 10C19.1667 10.442 18.9911 10.866 18.6785 11.1785C18.366 11.4911 17.942 11.6667 17.5 11.6667H17.4167C17.1504 11.6874 16.8857 11.7594 16.6594 11.9026C16.4332 12.0457 16.2556 12.2536 16.15 12.5L16.1667 12.5Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Hienfeld logo placeholder (inline SVG "H")
   ---------------------------------------------------------------- */
const HienfeldLogo = (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#10069F" />
      <path d="M8 8V20M20 8V20M8 14H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    <span style={{ fontSize: 16, fontWeight: 500, color: '#181d27' }}>Hienfeld</span>
  </div>
);

const HienfeldLogoIcon = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#10069F" />
    <path d="M8 8V20M20 8V20M8 14H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* ----------------------------------------------------------------
   Navigation configurations per role
   ---------------------------------------------------------------- */

const adminSections: SidebarSection[] = [
  {
    items: [
      { key: 'tasks', label: 'Tasks', icon: ClipboardIcon, count: 12, active: true },
      { key: 'changelog', label: 'Changelog', icon: ChangelogIcon },
    ],
  },
  {
    label: 'Management',
    items: [
      { key: 'companies', label: 'Companies', icon: BuildingIcon },
      { key: 'all-policies', label: 'All Policies', icon: FileIcon },
      { key: 'recent-policies', label: 'Recent Policies', icon: FileIcon },
    ],
  },
  {
    label: 'System',
    items: [
      { key: 'users', label: 'Users', icon: UsersIcon },
      { key: 'settings', label: 'Settings', icon: SettingsIcon },
    ],
  },
];

const brokerSections: SidebarSection[] = [
  {
    label: 'Management',
    items: [
      { key: 'companies', label: 'Companies', icon: BuildingIcon },
      { key: 'all-policies', label: 'All Policies', icon: FileIcon, active: true },
      { key: 'recent-policies', label: 'Recent Policies', icon: FileIcon },
    ],
  },
  {
    label: 'System',
    items: [
      { key: 'users', label: 'Users', icon: UsersIcon },
      { key: 'settings', label: 'Settings', icon: SettingsIcon },
    ],
  },
];

const clientSections: SidebarSection[] = [
  {
    items: [
      { key: 'all-policies', label: 'All Policies', icon: FileIcon, active: true },
      { key: 'recent-policies', label: 'Recent Policies', icon: FileIcon },
    ],
  },
  {
    label: 'System',
    items: [
      { key: 'users', label: 'Users', icon: UsersIcon, disabled: false },
      { key: 'settings', label: 'Settings', icon: SettingsIcon, disabled: false },
    ],
  },
];

const sampleUser = {
  name: 'Tristan de Vries',
  email: 'tristan@hienfeld.nl',
  avatar: 'https://i.pravatar.cc/80?u=tristan',
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Story />
        <div style={{ marginLeft: 280, padding: 32, flex: 1 }}>
          <h2 style={{ margin: '0 0 8px' }}>Page Content</h2>
          <p style={{ color: '#535862' }}>
            This area represents the main content next to the sidebar.
          </p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/* ----------------------------------------------------------------
   Default — Admin nav with all features
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    logo: HienfeldLogo,
    sections: adminSections,
    user: sampleUser,
    onSignOut: () => alert('Sign out clicked'),
    onToggleCollapse: () => {},
  },
};

/* ----------------------------------------------------------------
   Collapsed — icon-only sidebar
   ---------------------------------------------------------------- */
export const Collapsed: Story = {
  args: {
    logo: HienfeldLogoIcon,
    sections: adminSections,
    user: sampleUser,
    collapsed: true,
    onToggleCollapse: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Story />
        <div style={{ marginLeft: 64, padding: 32, flex: 1 }}>
          <h2 style={{ margin: '0 0 8px' }}>Page Content</h2>
          <p style={{ color: '#535862' }}>
            The sidebar is collapsed to icon-only mode (64px).
          </p>
        </div>
      </div>
    ),
  ],
};

/* ----------------------------------------------------------------
   WithUser — show user section at bottom
   ---------------------------------------------------------------- */
export const WithUser: Story = {
  args: {
    logo: HienfeldLogo,
    sections: adminSections,
    user: sampleUser,
    onSignOut: () => alert('Sign out clicked'),
  },
};

/* ----------------------------------------------------------------
   AdminNav — Full admin navigation
   ---------------------------------------------------------------- */
export const AdminNav: Story = {
  args: {
    logo: HienfeldLogo,
    sections: adminSections,
    user: { ...sampleUser, name: 'Admin User', email: 'admin@hienfeld.nl' },
    onSignOut: () => {},
    onToggleCollapse: () => {},
  },
};

/* ----------------------------------------------------------------
   BrokerNav — Broker-specific navigation
   ---------------------------------------------------------------- */
export const BrokerNav: Story = {
  args: {
    logo: HienfeldLogo,
    sections: brokerSections,
    user: { name: 'Maaike Janssen', email: 'maaike@broker.nl' },
    onSignOut: () => {},
    onToggleCollapse: () => {},
  },
};

/* ----------------------------------------------------------------
   ClientNav — Client-specific navigation
   ---------------------------------------------------------------- */
export const ClientNav: Story = {
  args: {
    logo: HienfeldLogo,
    sections: clientSections,
    user: { name: 'Marcel de Boer', email: 'marcel@client.nl' },
    onSignOut: () => {},
    onToggleCollapse: () => {},
  },
};
