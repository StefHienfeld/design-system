import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'on-dark', 'bw'],
    },
    width: { control: 'number' },
  },
  args: {
    variant: 'default',
    width: 160,
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const OnDark: Story = {
  args: { variant: 'on-dark' },
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#10069F',
          padding: 32,
          borderRadius: 8,
          display: 'inline-block',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const BW: Story = {
  args: { variant: 'bw' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Default
        </div>
        <Logo variant="default" />
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          On Dark
        </div>
        <div
          style={{
            background: '#10069F',
            padding: 24,
            borderRadius: 8,
            display: 'inline-block',
          }}
        >
          <Logo variant="on-dark" />
        </div>
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Black &amp; White
        </div>
        <Logo variant="bw" />
      </div>
    </div>
  ),
};

export const CustomWidth: Story = {
  args: { width: 240 },
};
