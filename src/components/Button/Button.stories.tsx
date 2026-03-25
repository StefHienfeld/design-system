import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

/* ----------------------------------------------------------------
   Placeholder icons — simple inline SVGs
   ---------------------------------------------------------------- */
const PlusIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4v12m-6-6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ArrowRightIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.5L10 14.7 5.1 17.2l.9-5.5-4-3.9 5.5-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    hierarchy: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'link-color', 'link-gray'],
    },
    iconOnly: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button CTA',
    size: 'md',
    hierarchy: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ----------------------------------------------------------------
   Hierarchy variants
   ---------------------------------------------------------------- */
export const Primary: Story = {
  args: { hierarchy: 'primary' },
};

export const Secondary: Story = {
  args: { hierarchy: 'secondary' },
};

export const Tertiary: Story = {
  args: { hierarchy: 'tertiary' },
};

export const LinkColor: Story = {
  args: { hierarchy: 'link-color' },
};

export const LinkGray: Story = {
  args: { hierarchy: 'link-gray' },
};

/* ----------------------------------------------------------------
   Size variants
   ---------------------------------------------------------------- */
export const SizeSmall: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const SizeMedium: Story = {
  args: { size: 'md', children: 'Medium' },
};

export const SizeLarge: Story = {
  args: { size: 'lg', children: 'Large' },
};

export const SizeXLarge: Story = {
  args: { size: 'xl', children: 'X-Large' },
};

/* ----------------------------------------------------------------
   All sizes side-by-side
   ---------------------------------------------------------------- */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">X-Large</Button>
    </div>
  ),
};

/* ----------------------------------------------------------------
   All hierarchies side-by-side
   ---------------------------------------------------------------- */
export const AllHierarchies: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button hierarchy="primary">Primary</Button>
      <Button hierarchy="secondary">Secondary</Button>
      <Button hierarchy="tertiary">Tertiary</Button>
      <Button hierarchy="link-color">Link Color</Button>
      <Button hierarchy="link-gray">Link Gray</Button>
    </div>
  ),
};

/* ----------------------------------------------------------------
   States
   ---------------------------------------------------------------- */
export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledSecondary: Story = {
  args: { hierarchy: 'secondary', disabled: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const LoadingSecondary: Story = {
  args: { hierarchy: 'secondary', loading: true },
};

/* ----------------------------------------------------------------
   With icons
   ---------------------------------------------------------------- */
export const WithLeadingIcon: Story = {
  args: { iconLeading: PlusIcon, children: 'Add item' },
};

export const WithTrailingIcon: Story = {
  args: { iconTrailing: ArrowRightIcon, children: 'Continue' },
};

export const WithBothIcons: Story = {
  args: { iconLeading: PlusIcon, iconTrailing: ArrowRightIcon, children: 'Action' },
};

/* ----------------------------------------------------------------
   Icon only
   ---------------------------------------------------------------- */
export const IconOnly: Story = {
  args: {
    iconOnly: true,
    iconLeading: PlusIcon,
    'aria-label': 'Add',
  },
};

export const IconOnlyAllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="sm" iconOnly iconLeading={StarIcon} aria-label="Favourite" />
      <Button size="md" iconOnly iconLeading={StarIcon} aria-label="Favourite" />
      <Button size="lg" iconOnly iconLeading={StarIcon} aria-label="Favourite" />
      <Button size="xl" iconOnly iconLeading={StarIcon} aria-label="Favourite" />
    </div>
  ),
};

export const IconOnlySecondary: Story = {
  args: {
    hierarchy: 'secondary',
    iconOnly: true,
    iconLeading: PlusIcon,
    'aria-label': 'Add',
  },
};

export const IconOnlyLoading: Story = {
  args: {
    iconOnly: true,
    iconLeading: PlusIcon,
    loading: true,
    'aria-label': 'Loading',
  },
};

/* ----------------------------------------------------------------
   Kitchen sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['primary', 'secondary', 'tertiary', 'link-color', 'link-gray'] as const).map(
        (hierarchy) => (
          <div key={hierarchy}>
            <div
              style={{
                marginBottom: 8,
                fontWeight: 600,
                fontSize: 12,
                textTransform: 'uppercase',
                color: '#717680',
              }}
            >
              {hierarchy}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Button size="sm" hierarchy={hierarchy}>
                Small
              </Button>
              <Button size="md" hierarchy={hierarchy}>
                Medium
              </Button>
              <Button size="lg" hierarchy={hierarchy} iconLeading={PlusIcon}>
                Large + icon
              </Button>
              <Button size="xl" hierarchy={hierarchy} iconTrailing={ArrowRightIcon}>
                X-Large + icon
              </Button>
              <Button hierarchy={hierarchy} disabled>
                Disabled
              </Button>
              <Button hierarchy={hierarchy} loading>
                Loading
              </Button>
              <Button hierarchy={hierarchy} iconOnly iconLeading={StarIcon} aria-label="Star" />
            </div>
          </div>
        ),
      )}
    </div>
  ),
};
