import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    content: { control: 'text' },
    supportingText: { control: 'text' },
  },
  args: {
    content: 'This is a tooltip',
    position: 'top',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
          padding: 80,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/* ----------------------------------------------------------------
   Simple tooltip — each position
   ---------------------------------------------------------------- */
export const Top: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    children: <span style={{ textDecoration: 'underline', cursor: 'default' }}>Hover me (top)</span>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'bottom',
    children: <span style={{ textDecoration: 'underline', cursor: 'default' }}>Hover me (bottom)</span>,
  },
};

export const Left: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'left',
    children: <span style={{ textDecoration: 'underline', cursor: 'default' }}>Hover me (left)</span>,
  },
};

export const Right: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'right',
    children: <span style={{ textDecoration: 'underline', cursor: 'default' }}>Hover me (right)</span>,
  },
};

/* ----------------------------------------------------------------
   With supporting text
   ---------------------------------------------------------------- */
export const WithSupportingText: Story = {
  args: {
    content: 'This is a tooltip',
    supportingText:
      'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.',
    position: 'top',
    children: <span style={{ textDecoration: 'underline', cursor: 'default' }}>Hover for details</span>,
  },
};

export const SupportingTextBottom: Story = {
  args: {
    content: 'Feature info',
    supportingText: 'This feature allows you to export data in CSV or Excel format.',
    position: 'bottom',
    children: <span style={{ textDecoration: 'underline', cursor: 'default' }}>Hover for details</span>,
  },
};

/* ----------------------------------------------------------------
   On a Button
   ---------------------------------------------------------------- */
export const OnAButton: Story = {
  args: {
    content: 'Save your changes',
    position: 'top',
    children: <Button>Save</Button>,
  },
};

export const OnADisabledButton: Story = {
  render: () => (
    <Tooltip content="You do not have permission to delete" position="top">
      <span>
        <Button disabled>Delete</Button>
      </span>
    </Tooltip>
  ),
};

/* ----------------------------------------------------------------
   All arrow directions
   ---------------------------------------------------------------- */
export const AllArrowDirections: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        padding: 80,
      }}
    >
      <Tooltip content="Arrow points down" position="top">
        <Button hierarchy="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Arrow points up" position="bottom">
        <Button hierarchy="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Arrow points right" position="left">
        <Button hierarchy="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="Arrow points left" position="right">
        <Button hierarchy="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};
