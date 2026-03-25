import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { Logo } from '../Logo';
import { Button } from '../Button';

/* ----------------------------------------------------------------
   Placeholder icons
   ---------------------------------------------------------------- */
const PlusIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4v12m-6-6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    onBack: { action: 'onBack' },
  },
  args: {
    title: 'Add insured items',
  },
  decorators: [
    (Story) => (
      <div style={{ margin: -16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */

/** Default header matching the Figma design: back button, logo, centered title, and a primary action button. */
export const Default: Story = {
  args: {
    title: 'Add insured items',
    onBack: () => {},
    logo: <Logo width={74} />,
    actions: (
      <Button hierarchy="primary" size="md" iconLeading={PlusIcon}>
        Add 1 item to policy
      </Button>
    ),
  },
};

/** Header with only a title and back button. */
export const TitleOnly: Story = {
  args: {
    title: 'Policy details',
    onBack: () => {},
  },
};

/** Header with logo and back button but no actions. */
export const WithLogo: Story = {
  args: {
    title: 'Dashboard',
    onBack: () => {},
    logo: <Logo width={74} />,
  },
};

/** Header without a back button. */
export const NoBackButton: Story = {
  args: {
    title: 'Overview',
    logo: <Logo width={74} />,
    actions: (
      <Button hierarchy="secondary" size="md">
        Settings
      </Button>
    ),
  },
};

/** Header with multiple action buttons. */
export const MultipleActions: Story = {
  args: {
    title: 'Edit policy',
    onBack: () => {},
    logo: <Logo width={74} />,
    actions: (
      <>
        <Button hierarchy="secondary" size="md">
          Cancel
        </Button>
        <Button hierarchy="primary" size="md">
          Save changes
        </Button>
      </>
    ),
  },
};

/** Minimal header with no title, logo, or actions. */
export const Minimal: Story = {
  args: {
    onBack: () => {},
  },
};
