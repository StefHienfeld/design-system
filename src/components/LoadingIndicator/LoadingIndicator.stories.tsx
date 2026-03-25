import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingIndicator } from './LoadingIndicator';

/* ----------------------------------------------------------------
   Constants
   ---------------------------------------------------------------- */
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof LoadingIndicator> = {
  title: 'Components/LoadingIndicator',
  component: LoadingIndicator,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [...SIZES],
    },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

/* ----------------------------------------------------------------
   Default
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   With label
   ---------------------------------------------------------------- */
export const WithLabel: Story = {
  args: {
    label: 'Loading...',
  },
};

/* ----------------------------------------------------------------
   Small
   ---------------------------------------------------------------- */
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Loading...',
  },
};

/* ----------------------------------------------------------------
   Medium
   ---------------------------------------------------------------- */
export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Loading...',
  },
};

/* ----------------------------------------------------------------
   Large
   ---------------------------------------------------------------- */
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Loading...',
  },
};

/* ----------------------------------------------------------------
   Extra Large
   ---------------------------------------------------------------- */
export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    label: 'Loading...',
  },
};

/* ----------------------------------------------------------------
   All sizes
   ---------------------------------------------------------------- */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
      {SIZES.map((size) => (
        <LoadingIndicator key={size} size={size} label="Loading..." />
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   All sizes — no label
   ---------------------------------------------------------------- */
export const AllSizesNoLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      {SIZES.map((size) => (
        <LoadingIndicator key={size} size={size} />
      ))}
    </div>
  ),
};
