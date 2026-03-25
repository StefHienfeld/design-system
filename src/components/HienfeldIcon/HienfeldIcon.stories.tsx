import type { Meta, StoryObj } from '@storybook/react-vite';
import { HienfeldIcon } from './HienfeldIcon';
import { hienfeldIconNames } from './icons';

const meta: Meta<typeof HienfeldIcon> = {
  title: 'Components/HienfeldIcon',
  component: HienfeldIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: hienfeldIconNames,
    },
    size: { control: 'number' },
    color: { control: 'color' },
  },
  args: {
    name: 'fire',
    size: 24,
    color: 'currentColor',
  },
};

export default meta;
type Story = StoryObj<typeof HienfeldIcon>;

/* ----------------------------------------------------------------
   All icons grid
   ---------------------------------------------------------------- */
export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: 16,
      }}
    >
      {hienfeldIconNames.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: 12,
            borderRadius: 8,
            border: '1px solid #e0e0e0',
          }}
        >
          <HienfeldIcon name={name} size={32} />
          <span
            style={{
              fontSize: 10,
              color: '#717680',
              textAlign: 'center',
              wordBreak: 'break-all',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Individual icon stories
   ---------------------------------------------------------------- */
export const Fire: Story = {
  args: { name: 'fire', size: 48 },
};

export const HouseLocked: Story = {
  args: { name: 'house-locked', size: 48 },
};

export const Calculator: Story = {
  args: { name: 'calculator', size: 48 },
};

export const Casco: Story = {
  args: { name: 'casco', size: 48 },
};

export const Network: Story = {
  args: { name: 'network', size: 48 },
};

/* ----------------------------------------------------------------
   Sizes
   ---------------------------------------------------------------- */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <HienfeldIcon name="fire" size={16} />
      <HienfeldIcon name="fire" size={24} />
      <HienfeldIcon name="fire" size={32} />
      <HienfeldIcon name="fire" size={48} />
      <HienfeldIcon name="fire" size={64} />
    </div>
  ),
};

/* ----------------------------------------------------------------
   Custom color
   ---------------------------------------------------------------- */
export const CustomColor: Story = {
  args: { name: 'fire', size: 48, color: '#e53e3e' },
};
