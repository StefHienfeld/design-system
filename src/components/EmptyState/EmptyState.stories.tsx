import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';

/* ----------------------------------------------------------------
   Placeholder icon — search magnifying glass
   ---------------------------------------------------------------- */
const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 21l-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 5v14m-7-7h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Constants
   ---------------------------------------------------------------- */
const SIZES = ['sm', 'md', 'lg'] as const;

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [...SIZES],
    },
  },
  args: {
    size: 'sm',
    title: 'No projects found',
    description:
      'Your search "Landing page design" did not match any projects. Please try again.',
    icon: SearchIcon,
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/* ----------------------------------------------------------------
   Default
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   With actions
   ---------------------------------------------------------------- */
export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button hierarchy="secondary" size="sm">
          Clear search
        </Button>
        <Button hierarchy="primary" size="sm">
          New project
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   Small
   ---------------------------------------------------------------- */
export const Small: Story = {
  args: {
    size: 'sm',
    actions: (
      <>
        <Button hierarchy="secondary" size="sm">
          Clear search
        </Button>
        <Button hierarchy="primary" size="sm">
          New project
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   Medium
   ---------------------------------------------------------------- */
export const Medium: Story = {
  args: {
    size: 'md',
    actions: (
      <>
        <Button hierarchy="secondary" size="sm">
          Clear search
        </Button>
        <Button hierarchy="primary" size="sm">
          New project
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   Large
   ---------------------------------------------------------------- */
export const Large: Story = {
  args: {
    size: 'lg',
    actions: (
      <>
        <Button hierarchy="secondary" size="md">
          Clear search
        </Button>
        <Button hierarchy="primary" size="md">
          New project
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   Without icon
   ---------------------------------------------------------------- */
export const WithoutIcon: Story = {
  args: {
    icon: undefined,
    actions: (
      <>
        <Button hierarchy="secondary" size="sm">
          Go back
        </Button>
        <Button hierarchy="primary" size="sm">
          Try again
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   Without description
   ---------------------------------------------------------------- */
export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};

/* ----------------------------------------------------------------
   Different icon
   ---------------------------------------------------------------- */
export const WithCustomIcon: Story = {
  args: {
    icon: PlusIcon,
    title: 'No items yet',
    description: 'Get started by creating your first item.',
    actions: (
      <Button hierarchy="primary" size="sm">
        Create item
      </Button>
    ),
  },
};

/* ----------------------------------------------------------------
   All sizes — side by side
   ---------------------------------------------------------------- */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ flex: 1, maxWidth: 512 }}>
          <div
            style={{
              marginBottom: 16,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            {size}
          </div>
          <EmptyState
            size={size}
            icon={SearchIcon}
            title="No projects found"
            description='Your search "Landing page design" did not match any projects. Please try again.'
            actions={
              <>
                <Button
                  hierarchy="secondary"
                  size={size === 'lg' ? 'md' : 'sm'}
                >
                  Clear search
                </Button>
                <Button
                  hierarchy="primary"
                  size={size === 'lg' ? 'md' : 'sm'}
                >
                  New project
                </Button>
              </>
            }
          />
        </div>
      ))}
    </div>
  ),
};
