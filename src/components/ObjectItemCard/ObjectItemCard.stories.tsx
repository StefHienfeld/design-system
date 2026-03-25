import type { Meta, StoryObj } from '@storybook/react-vite';
import { ObjectItemCard } from './ObjectItemCard';

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
   Placeholder icon — home (16 x 16)
   ---------------------------------------------------------------- */
const HomeIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 6l6-4.667L14 6v7.333A1.333 1.333 0 0112.667 14.667H3.333A1.333 1.333 0 012 13.333V6z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 14.667V8h4v6.667"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof ObjectItemCard> = {
  title: 'Components/ObjectItemCard',
  component: ObjectItemCard,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    count: { control: 'number' },
    active: { control: 'boolean' },
  },
  args: {
    label: 'Boat',
    icon: AnchorIcon,
    count: 1,
    active: false,
    onCopy: () => console.log('Copy'),
    onDelete: () => console.log('Delete'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 268, fontFamily: 'var(--font-family-body)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ObjectItemCard>;

/* ----------------------------------------------------------------
   Default
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Active
   ---------------------------------------------------------------- */
export const Active: Story = {
  args: {
    active: true,
  },
};

/* ----------------------------------------------------------------
   Without Count
   ---------------------------------------------------------------- */
export const WithoutCount: Story = {
  args: {
    count: undefined,
  },
};

/* ----------------------------------------------------------------
   Without Icon
   ---------------------------------------------------------------- */
export const WithoutIcon: Story = {
  args: {
    icon: undefined,
  },
};

/* ----------------------------------------------------------------
   Without Actions
   ---------------------------------------------------------------- */
export const WithoutActions: Story = {
  args: {
    onCopy: undefined,
    onDelete: undefined,
  },
};

/* ----------------------------------------------------------------
   Copy Only
   ---------------------------------------------------------------- */
export const CopyOnly: Story = {
  args: {
    onDelete: undefined,
  },
};

/* ----------------------------------------------------------------
   All States
   ---------------------------------------------------------------- */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 268 }}>
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
          Default (hover to see actions)
        </div>
        <ObjectItemCard
          label="Boat"
          icon={AnchorIcon}
          count={1}
          onCopy={() => console.log('Copy')}
          onDelete={() => console.log('Delete')}
        />
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
          Active
        </div>
        <ObjectItemCard
          label="Boat"
          icon={AnchorIcon}
          count={1}
          active
          onCopy={() => console.log('Copy')}
          onDelete={() => console.log('Delete')}
        />
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
          Without Count
        </div>
        <ObjectItemCard
          label="Boat"
          icon={AnchorIcon}
          onCopy={() => console.log('Copy')}
          onDelete={() => console.log('Delete')}
        />
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
          Different Icon
        </div>
        <ObjectItemCard
          label="Property"
          icon={HomeIcon}
          count={5}
          onCopy={() => console.log('Copy')}
          onDelete={() => console.log('Delete')}
        />
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
          No Actions
        </div>
        <ObjectItemCard
          label="Boat"
          icon={AnchorIcon}
          count={3}
        />
      </div>
    </div>
  ),
};
