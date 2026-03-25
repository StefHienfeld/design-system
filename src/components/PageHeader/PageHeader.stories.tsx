import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader } from './PageHeader';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Breadcrumb } from '../Breadcrumb';
import { InputField } from '../InputField';

/* ----------------------------------------------------------------
   Placeholder icon for search
   ---------------------------------------------------------------- */
const SearchIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 17.5l-3.625-3.625m1.958-4.708a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Shared breadcrumb items
   ---------------------------------------------------------------- */
const breadcrumbItems = [
  { label: 'Settings', href: '#' },
  { label: 'Team', href: '#' },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    divider: { control: 'boolean' },
  },
  args: {
    title: 'Team members',
    description:
      'Manage your team members and their account permissions here.',
    divider: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1216, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

/* ----------------------------------------------------------------
   Default — full example matching Figma design
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    breadcrumbs: <Breadcrumb items={breadcrumbItems} />,
    actions: (
      <>
        <Button hierarchy="tertiary">Tertiary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="primary">Primary</Button>
      </>
    ),
    search: <InputField placeholder="Search" iconLeading={SearchIcon} />,
  },
};

/* ----------------------------------------------------------------
   Simple — title + description only
   ---------------------------------------------------------------- */
export const Simple: Story = {
  args: {
    breadcrumbs: undefined,
    actions: undefined,
    search: undefined,
  },
};

/* ----------------------------------------------------------------
   With breadcrumbs only
   ---------------------------------------------------------------- */
export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: <Breadcrumb items={breadcrumbItems} />,
  },
};

/* ----------------------------------------------------------------
   With actions only
   ---------------------------------------------------------------- */
export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button hierarchy="secondary">Export</Button>
        <Button hierarchy="primary">Add member</Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   With badges
   ---------------------------------------------------------------- */
export const WithBadges: Story = {
  args: {
    breadcrumbs: <Breadcrumb items={breadcrumbItems} />,
    badges: (
      <>
        <Badge type="badge-modern" color="gray" size="md">
          CL 520933
        </Badge>
        <Badge type="badge-modern" color="gray" size="md">
          Broker name
        </Badge>
        <Badge type="badge-modern" color="gray" size="md" dot>
          Stock inventory
        </Badge>
      </>
    ),
    actions: (
      <>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="primary">Primary</Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   With search
   ---------------------------------------------------------------- */
export const WithSearch: Story = {
  args: {
    actions: (
      <>
        <Button hierarchy="secondary">Export</Button>
        <Button hierarchy="primary">Add member</Button>
      </>
    ),
    search: <InputField placeholder="Search" iconLeading={SearchIcon} />,
  },
};

/* ----------------------------------------------------------------
   No divider
   ---------------------------------------------------------------- */
export const NoDivider: Story = {
  args: {
    divider: false,
    breadcrumbs: <Breadcrumb items={breadcrumbItems} />,
    actions: (
      <>
        <Button hierarchy="secondary">Cancel</Button>
        <Button hierarchy="primary">Save</Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   Title only — minimal
   ---------------------------------------------------------------- */
export const TitleOnly: Story = {
  args: {
    title: 'Dashboard',
    description: undefined,
    divider: false,
  },
};

/* ----------------------------------------------------------------
   Kitchen sink — all slots filled
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  args: {
    breadcrumbs: <Breadcrumb items={breadcrumbItems} />,
    badges: (
      <>
        <Badge type="badge-modern" color="gray" size="md">
          CL 520933
        </Badge>
        <Badge type="badge-modern" color="gray" size="md">
          Broker name
        </Badge>
        <Badge type="badge-modern" color="gray" size="md" dot>
          Stock inventory
        </Badge>
      </>
    ),
    actions: (
      <>
        <Button hierarchy="tertiary">Tertiary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="primary">Primary</Button>
      </>
    ),
    search: <InputField placeholder="Search" iconLeading={SearchIcon} />,
  },
};
