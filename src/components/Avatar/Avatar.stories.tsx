import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    online: { control: 'boolean' },
  },
  args: {
    name: 'Jan de Vries',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    name: 'Jan de Vries',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=jan',
    name: 'Jan de Vries',
  },
};

export const Initials: Story = {
  args: {
    name: 'Sophie Bakker',
  },
};

export const SingleName: Story = {
  args: {
    name: 'Admin',
  },
};

export const Online: Story = {
  args: {
    name: 'Jan de Vries',
    online: true,
  },
};

export const Offline: Story = {
  args: {
    name: 'Jan de Vries',
    online: false,
  },
};

export const OnlineWithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=sophie',
    name: 'Sophie Bakker',
    online: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar size="xs" name="XS" />
      <Avatar size="sm" name="Small User" />
      <Avatar size="md" name="Medium User" />
      <Avatar size="lg" name="Large User" />
      <Avatar size="xl" name="Extra Large" />
    </div>
  ),
};

export const AllSizesWithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar size="xs" src="https://i.pravatar.cc/150?u=a" name="User A" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=b" name="User B" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=c" name="User C" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=d" name="User D" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?u=e" name="User E" />
    </div>
  ),
};

export const AllSizesOnline: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar size="xs" name="XS" online />
      <Avatar size="sm" name="Small User" online />
      <Avatar size="md" name="Medium User" online />
      <Avatar size="lg" name="Large User" online />
      <Avatar size="xl" name="Extra Large" online />
    </div>
  ),
};

export const BrokenImage: Story = {
  args: {
    src: 'https://invalid-url.example/broken.jpg',
    name: 'Fallback User',
  },
};

export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Initials (all sizes)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size="xs" name="AB" />
          <Avatar size="sm" name="CD Ef" />
          <Avatar size="md" name="Jan de Vries" />
          <Avatar size="lg" name="Sophie Bakker" />
          <Avatar size="xl" name="Thomas Mulder" />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          With images
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size="sm" src="https://i.pravatar.cc/150?u=1" name="User 1" />
          <Avatar size="md" src="https://i.pravatar.cc/150?u=2" name="User 2" />
          <Avatar size="lg" src="https://i.pravatar.cc/150?u=3" name="User 3" />
          <Avatar size="xl" src="https://i.pravatar.cc/150?u=4" name="User 4" online />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Online / Offline indicators
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size="md" name="Online User" online />
          <Avatar size="md" name="Offline User" online={false} />
          <Avatar size="md" src="https://i.pravatar.cc/150?u=5" name="Photo Online" online />
          <Avatar size="md" src="https://i.pravatar.cc/150?u=6" name="Photo Offline" online={false} />
        </div>
      </div>
    </div>
  ),
};
