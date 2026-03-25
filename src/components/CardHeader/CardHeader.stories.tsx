import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardHeader } from './CardHeader';
import { Badge } from '../Badge';
import { Button } from '../Button';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof CardHeader> = {
  title: 'Components/CardHeader',
  component: CardHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    supportingText: { control: 'text' },
    divider: { control: 'boolean' },
    dropdown: { control: 'boolean' },
  },
  args: {
    title: 'Team members',
    supportingText: 'Manage your team members and their account permissions here.',
    divider: true,
    dropdown: true,
  },
};

export default meta;
type Story = StoryObj<typeof CardHeader>;

/* ----------------------------------------------------------------
   Default — title + badge + supporting text + actions + dropdown + divider
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    badge: <Badge size="sm" color="brand">10/20 seats</Badge>,
    actions: (
      <>
        <Button hierarchy="tertiary" size="md">Tertiary</Button>
        <Button hierarchy="secondary" size="md">Secondary</Button>
        <Button hierarchy="secondary" size="md">Secondary</Button>
        <Button hierarchy="primary" size="md">Primary</Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   Title only
   ---------------------------------------------------------------- */
export const TitleOnly: Story = {
  args: {
    supportingText: undefined,
    divider: false,
    dropdown: false,
  },
};

/* ----------------------------------------------------------------
   With Badge
   ---------------------------------------------------------------- */
export const WithBadge: Story = {
  args: {
    badge: <Badge size="sm" color="brand">10/20 seats</Badge>,
    divider: false,
    dropdown: false,
  },
};

/* ----------------------------------------------------------------
   With Supporting Text
   ---------------------------------------------------------------- */
export const WithSupportingText: Story = {
  args: {
    divider: false,
    dropdown: false,
  },
};

/* ----------------------------------------------------------------
   With Divider
   ---------------------------------------------------------------- */
export const WithDivider: Story = {
  args: {
    divider: true,
    dropdown: false,
  },
};

/* ----------------------------------------------------------------
   With Dropdown
   ---------------------------------------------------------------- */
export const WithDropdown: Story = {
  args: {
    dropdown: true,
    divider: false,
    onDropdownClick: () => alert('Dropdown clicked'),
  },
};

/* ----------------------------------------------------------------
   With Actions
   ---------------------------------------------------------------- */
export const WithActions: Story = {
  args: {
    dropdown: false,
    divider: true,
    actions: (
      <>
        <Button hierarchy="tertiary" size="md">Tertiary</Button>
        <Button hierarchy="secondary" size="md">Secondary</Button>
        <Button hierarchy="primary" size="md">Primary</Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   With Avatar
   ---------------------------------------------------------------- */
export const WithAvatar: Story = {
  args: {
    title: 'Olivia Rhye',
    supportingText: 'olivia@untitledui.com',
    badge: <Badge size="sm" color="brand">New user</Badge>,
    avatar: {
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      name: 'Olivia Rhye',
    },
    actions: (
      <>
        <Button hierarchy="tertiary" size="md">Tertiary</Button>
        <Button hierarchy="secondary" size="md">Secondary</Button>
        <Button hierarchy="secondary" size="md">Secondary</Button>
        <Button hierarchy="primary" size="md">Primary</Button>
      </>
    ),
    divider: true,
    dropdown: true,
  },
};

/* ----------------------------------------------------------------
   Avatar without actions
   ---------------------------------------------------------------- */
export const AvatarMinimal: Story = {
  args: {
    title: 'Olivia Rhye',
    supportingText: 'olivia@untitledui.com',
    avatar: {
      name: 'Olivia Rhye',
    },
    divider: false,
    dropdown: false,
  },
};

/* ----------------------------------------------------------------
   Without divider
   ---------------------------------------------------------------- */
export const NoDivider: Story = {
  args: {
    badge: <Badge size="sm" color="brand">10/20 seats</Badge>,
    actions: (
      <>
        <Button hierarchy="secondary" size="md">Secondary</Button>
        <Button hierarchy="primary" size="md">Primary</Button>
      </>
    ),
    divider: false,
    dropdown: true,
  },
};

/* ----------------------------------------------------------------
   Kitchen sink — all features enabled
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <CardHeader
        title="Team members"
        badge={<Badge size="sm" color="brand">10/20 seats</Badge>}
        supportingText="Manage your team members and their account permissions here."
        actions={
          <>
            <Button hierarchy="tertiary" size="md">Tertiary</Button>
            <Button hierarchy="secondary" size="md">Secondary</Button>
            <Button hierarchy="secondary" size="md">Secondary</Button>
            <Button hierarchy="primary" size="md">Primary</Button>
          </>
        }
        dropdown
        divider
      />
      <CardHeader
        title="Olivia Rhye"
        badge={<Badge size="sm" color="brand">New user</Badge>}
        supportingText="olivia@untitledui.com"
        avatar={{
          src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
          name: 'Olivia Rhye',
        }}
        actions={
          <>
            <Button hierarchy="tertiary" size="md">Tertiary</Button>
            <Button hierarchy="secondary" size="md">Secondary</Button>
            <Button hierarchy="secondary" size="md">Secondary</Button>
            <Button hierarchy="primary" size="md">Primary</Button>
          </>
        }
        dropdown
        divider
      />
      <CardHeader
        title="Simple header"
        divider
      />
      <CardHeader
        title="No divider"
        supportingText="This header has no bottom divider."
        dropdown
      />
    </div>
  ),
};
