import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeedItem } from './FeedItem';
import type { FeedItemProps } from './FeedItem';

/* ----------------------------------------------------------------
   Constants
   ---------------------------------------------------------------- */
const TYPES = ['neutral', 'success', 'warning', 'error', 'brand'] as const;

const sampleUser = { name: 'Olivia Rhye' };

const sampleUserWithAvatar = {
  name: 'Olivia Rhye',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

const sampleChanges = [
  { label: 'Name', oldValue: 'Old name', newValue: 'Blue Horizon' },
  { label: 'Trailer brand', oldValue: 'Volvo', newValue: 'Yamaha' },
  { label: 'Trailer type', oldValue: 'Flatbed', newValue: 'Reefer' },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof FeedItem> = {
  title: 'Components/FeedItem',
  component: FeedItem,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [...TYPES],
    },
    showConnector: { control: 'boolean' },
  },
  args: {
    type: 'neutral',
    user: sampleUserWithAvatar,
    description: 'changed 2 item values',
    timestamp: '17/03 at 09:45',
    showConnector: true,
  },
};

export default meta;
type Story = StoryObj<typeof FeedItem>;

/* ----------------------------------------------------------------
   Default
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   With property changes
   ---------------------------------------------------------------- */
export const WithChanges: Story = {
  args: {
    changes: sampleChanges,
  },
};

/* ----------------------------------------------------------------
   Without connector
   ---------------------------------------------------------------- */
export const WithoutConnector: Story = {
  args: {
    showConnector: false,
    changes: sampleChanges,
  },
};

/* ----------------------------------------------------------------
   Fallback avatar (no image)
   ---------------------------------------------------------------- */
export const FallbackAvatar: Story = {
  args: {
    user: sampleUser,
    changes: sampleChanges,
  },
};

/* ----------------------------------------------------------------
   All type variants
   ---------------------------------------------------------------- */
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      {TYPES.map((type) => (
        <FeedItem
          key={type}
          type={type}
          user={sampleUserWithAvatar}
          description={`performed an action (${type})`}
          timestamp="17/03 at 09:45"
          showConnector
          changes={[
            { label: 'Status', oldValue: 'Pending', newValue: 'Approved' },
          ]}
        />
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Activity feed — multiple items chained
   ---------------------------------------------------------------- */
const feedItems: FeedItemProps[] = [
  {
    type: 'brand',
    user: { name: 'Olivia Rhye', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    description: 'changed 3 item values',
    timestamp: '17/03 at 09:45',
    showConnector: true,
    changes: sampleChanges,
  },
  {
    type: 'success',
    user: { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    description: 'approved the request',
    timestamp: '16/03 at 14:22',
    showConnector: true,
  },
  {
    type: 'warning',
    user: { name: 'Anna Smith' },
    description: 'flagged for review',
    timestamp: '15/03 at 11:00',
    showConnector: true,
    changes: [
      { label: 'Priority', oldValue: 'Low', newValue: 'High' },
    ],
  },
  {
    type: 'error',
    user: { name: 'Mike Brown', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
    description: 'rejected the submission',
    timestamp: '14/03 at 09:12',
    showConnector: false,
  },
];

export const ActivityFeed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      {feedItems.map((item, i) => (
        <FeedItem key={i} {...item} />
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   New value only (no old value)
   ---------------------------------------------------------------- */
export const NewValueOnly: Story = {
  args: {
    type: 'success',
    description: 'created a new entry',
    changes: [
      { label: 'Name', newValue: 'Blue Horizon' },
      { label: 'Category', newValue: 'Marine' },
    ],
  },
};

/* ----------------------------------------------------------------
   Kitchen sink — all features at once
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      {TYPES.map((type, index) => (
        <FeedItem
          key={type}
          type={type}
          user={
            index % 2 === 0
              ? sampleUserWithAvatar
              : { name: 'Jane van Bergen' }
          }
          description={`performed a ${type} action`}
          timestamp={`${17 - index}/03 at 09:${String(45 - index * 10).padStart(2, '0')}`}
          showConnector={index < TYPES.length - 1}
          changes={
            index % 2 === 0
              ? [
                  { label: 'Field A', oldValue: 'Before', newValue: 'After' },
                  { label: 'Field B', newValue: 'Created' },
                ]
              : undefined
          }
        />
      ))}
    </div>
  ),
};
