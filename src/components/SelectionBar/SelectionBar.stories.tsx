import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectionBar } from './SelectionBar';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof SelectionBar> = {
  title: 'Components/SelectionBar',
  component: SelectionBar,
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 0 },
    },
  },
  args: {
    count: 3,
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SelectionBar>;

/* ----------------------------------------------------------------
   Default — count only, no actions
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   With single action
   ---------------------------------------------------------------- */
export const WithSingleAction: Story = {
  args: {
    count: 5,
    actions: [
      { key: 'mark-sold', label: 'Mark as sold', onClick: () => {} },
    ],
  },
};

/* ----------------------------------------------------------------
   With multiple actions
   ---------------------------------------------------------------- */
export const WithMultipleActions: Story = {
  args: {
    count: 12,
    actions: [
      { key: 'mark-sold', label: 'Mark as sold', onClick: () => {} },
      { key: 'delete', label: 'Delete', onClick: () => {} },
      { key: 'export', label: 'Export', onClick: () => {} },
    ],
  },
};

/* ----------------------------------------------------------------
   Single item selected
   ---------------------------------------------------------------- */
export const SingleItem: Story = {
  args: {
    count: 1,
    actions: [
      { key: 'mark-sold', label: 'Mark as sold', onClick: () => {} },
    ],
  },
};

/* ----------------------------------------------------------------
   Large count
   ---------------------------------------------------------------- */
export const LargeCount: Story = {
  args: {
    count: 1048,
    actions: [
      { key: 'mark-sold', label: 'Mark as sold', onClick: () => {} },
      { key: 'archive', label: 'Archive', onClick: () => {} },
    ],
  },
};
