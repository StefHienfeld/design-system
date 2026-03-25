import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLayout } from './PageLayout';
import { ItemsSidebar } from '../ItemsSidebar';
import { PageHeader } from '../PageHeader';
import { Button } from '../Button';
import type { SidebarItem } from '../ItemsSidebar';

/* ----------------------------------------------------------------
   Placeholder icon — anchor (16 x 16)
   ---------------------------------------------------------------- */
const AnchorIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 4.667a2 2 0 100-4 2 2 0 000 4zM8 4.667v8.666M8 13.333A5.333 5.333 0 012.667 8H1.333M8 13.333A5.333 5.333 0 0013.333 8h1.334"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Sample sidebar items
   ---------------------------------------------------------------- */
const sidebarItems: SidebarItem[] = [
  { key: 'boat-1', icon: AnchorIcon, label: 'Boat', count: 1, active: true },
  { key: 'boat-2', icon: AnchorIcon, label: 'Boat', count: 1, active: true },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof PageLayout> = {
  title: 'Components/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', fontFamily: 'var(--font-family-body)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

/* ----------------------------------------------------------------
   Default — sidebar + header + content
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    sidebar: (
      <ItemsSidebar
        items={sidebarItems}
        onSelectItem={(key) => console.log('Select:', key)}
        onAddItem={() => console.log('Add item')}
        onCopyItem={(key) => console.log('Copy:', key)}
        onDeleteItem={(key) => console.log('Delete:', key)}
      />
    ),
    header: (
      <PageHeader
        title="Team members"
        description="Manage your team members and their account permissions here."
        actions={
          <>
            <Button hierarchy="tertiary">Tertiary</Button>
            <Button hierarchy="secondary">Secondary</Button>
            <Button hierarchy="primary">Primary</Button>
          </>
        }
      />
    ),
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-quaternary)',
          fontSize: 'var(--font-size-text-md)',
        }}
      >
        Content area
      </div>
    ),
  },
};

/* ----------------------------------------------------------------
   Without sidebar
   ---------------------------------------------------------------- */
export const WithoutSidebar: Story = {
  args: {
    header: (
      <PageHeader
        title="Dashboard"
        description="Overview of your account activity."
        actions={
          <>
            <Button hierarchy="secondary">Export</Button>
            <Button hierarchy="primary">Add member</Button>
          </>
        }
      />
    ),
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-quaternary)',
          fontSize: 'var(--font-size-text-md)',
        }}
      >
        Full-width content area
      </div>
    ),
  },
};

/* ----------------------------------------------------------------
   Without header
   ---------------------------------------------------------------- */
export const WithoutHeader: Story = {
  args: {
    sidebar: (
      <ItemsSidebar
        items={sidebarItems}
        onSelectItem={(key) => console.log('Select:', key)}
        onAddItem={() => console.log('Add item')}
      />
    ),
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-quaternary)',
          fontSize: 'var(--font-size-text-md)',
        }}
      >
        Content only (no header)
      </div>
    ),
  },
};

/* ----------------------------------------------------------------
   Content only — minimal layout
   ---------------------------------------------------------------- */
export const ContentOnly: Story = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-quaternary)',
          fontSize: 'var(--font-size-text-md)',
        }}
      >
        Minimal layout — content only
      </div>
    ),
  },
};
