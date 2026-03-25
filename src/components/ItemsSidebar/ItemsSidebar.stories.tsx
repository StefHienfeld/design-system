import type { Meta, StoryObj } from '@storybook/react-vite';
import { ItemsSidebar } from './ItemsSidebar';
import type { SidebarItem } from './ItemsSidebar';

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
   Sample items
   ---------------------------------------------------------------- */
const sampleItems: SidebarItem[] = [
  { key: 'boat-1', icon: AnchorIcon, label: 'Boat', count: 1, active: true },
  { key: 'boat-2', icon: AnchorIcon, label: 'Boat', count: 1, active: true },
];

const mixedItems: SidebarItem[] = [
  { key: 'boat-1', icon: AnchorIcon, label: 'Boat', count: 3, active: true },
  { key: 'property-1', icon: HomeIcon, label: 'Property', count: 5 },
  { key: 'boat-2', icon: AnchorIcon, label: 'Yacht', count: 1 },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof ItemsSidebar> = {
  title: 'Components/ItemsSidebar',
  component: ItemsSidebar,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
  args: {
    title: 'ITEMS',
    items: sampleItems,
    onSelectItem: (key) => console.log('Select:', key),
    onAddItem: () => console.log('Add item'),
    onCopyItem: (key) => console.log('Copy:', key),
    onDeleteItem: (key) => console.log('Delete:', key),
  },
  decorators: [
    (Story) => (
      <div style={{ height: 600, fontFamily: 'var(--font-family-body)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ItemsSidebar>;

/* ----------------------------------------------------------------
   Default — matches Figma design
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Mixed items — different icons and states
   ---------------------------------------------------------------- */
export const MixedItems: Story = {
  args: {
    items: mixedItems,
  },
};

/* ----------------------------------------------------------------
   Empty — no items, just the add button
   ---------------------------------------------------------------- */
export const Empty: Story = {
  args: {
    items: [],
  },
};

/* ----------------------------------------------------------------
   Without add button
   ---------------------------------------------------------------- */
export const WithoutAddButton: Story = {
  args: {
    onAddItem: undefined,
  },
};

/* ----------------------------------------------------------------
   Without actions — no copy/delete on hover
   ---------------------------------------------------------------- */
export const WithoutActions: Story = {
  args: {
    onCopyItem: undefined,
    onDeleteItem: undefined,
  },
};

/* ----------------------------------------------------------------
   Single item
   ---------------------------------------------------------------- */
export const SingleItem: Story = {
  args: {
    items: [
      { key: 'boat-1', icon: AnchorIcon, label: 'Boat', count: 1, active: true },
    ],
  },
};

/* ----------------------------------------------------------------
   Custom title
   ---------------------------------------------------------------- */
export const CustomTitle: Story = {
  args: {
    title: 'OBJECTS',
    items: mixedItems,
  },
};
