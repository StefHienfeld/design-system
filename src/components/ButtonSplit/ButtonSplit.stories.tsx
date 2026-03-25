import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonSplit } from './ButtonSplit';
import { MenuItem, MenuDivider } from '../Menu';

/* ----------------------------------------------------------------
   Placeholder icons for menu items
   ---------------------------------------------------------------- */
const EditIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.333 2 14 4.667 5.333 13.333H2.667v-2.666L11.333 2z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CopyIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="5.333"
      y="5.333"
      width="8"
      height="8"
      rx="1.333"
      stroke="currentColor"
      strokeWidth="1.33"
    />
    <path
      d="M10.667 5.333V4a1.333 1.333 0 0 0-1.334-1.333H4A1.333 1.333 0 0 0 2.667 4v5.333A1.333 1.333 0 0 0 4 10.667h1.333"
      stroke="currentColor"
      strokeWidth="1.33"
    />
  </svg>
);

const TrashIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4M6.667 7.333v4M9.333 7.333v4"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.333 4h9.334l-.667 9.333a1.333 1.333 0 0 1-1.333 1.334H5.333A1.333 1.333 0 0 1 4 13.333L3.333 4z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Shared menu items
   ---------------------------------------------------------------- */
const sampleMenuItems = (
  <>
    <MenuItem icon={EditIcon} label="Edit" onClick={() => alert('Edit')} />
    <MenuItem icon={CopyIcon} label="Duplicate" onClick={() => alert('Duplicate')} />
    <MenuDivider />
    <MenuItem icon={TrashIcon} label="Delete" onClick={() => alert('Delete')} />
  </>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof ButtonSplit> = {
  title: 'Components/ButtonSplit',
  component: ButtonSplit,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    hierarchy: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Save changes',
    size: 'md',
    hierarchy: 'primary',
    menuItems: sampleMenuItems,
    onClick: () => alert('Main action clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof ButtonSplit>;

/* ----------------------------------------------------------------
   Hierarchy variants
   ---------------------------------------------------------------- */
export const Primary: Story = {
  args: { hierarchy: 'primary' },
};

export const Secondary: Story = {
  args: { hierarchy: 'secondary' },
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
      <ButtonSplit size="sm" menuItems={sampleMenuItems}>Small</ButtonSplit>
      <ButtonSplit size="md" menuItems={sampleMenuItems}>Medium</ButtonSplit>
      <ButtonSplit size="lg" menuItems={sampleMenuItems}>Large</ButtonSplit>
      <ButtonSplit size="xl" menuItems={sampleMenuItems}>X-Large</ButtonSplit>
    </div>
  ),
};

/* ----------------------------------------------------------------
   All hierarchies side-by-side
   ---------------------------------------------------------------- */
export const AllHierarchies: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ButtonSplit hierarchy="primary" menuItems={sampleMenuItems}>Primary</ButtonSplit>
      <ButtonSplit hierarchy="secondary" menuItems={sampleMenuItems}>Secondary</ButtonSplit>
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
   Kitchen sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['primary', 'secondary'] as const).map((hierarchy) => (
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
            <ButtonSplit size="sm" hierarchy={hierarchy} menuItems={sampleMenuItems}>
              Small
            </ButtonSplit>
            <ButtonSplit size="md" hierarchy={hierarchy} menuItems={sampleMenuItems}>
              Medium
            </ButtonSplit>
            <ButtonSplit size="lg" hierarchy={hierarchy} menuItems={sampleMenuItems}>
              Large
            </ButtonSplit>
            <ButtonSplit size="xl" hierarchy={hierarchy} menuItems={sampleMenuItems}>
              X-Large
            </ButtonSplit>
            <ButtonSplit hierarchy={hierarchy} disabled menuItems={sampleMenuItems}>
              Disabled
            </ButtonSplit>
            <ButtonSplit hierarchy={hierarchy} loading menuItems={sampleMenuItems}>
              Loading
            </ButtonSplit>
          </div>
        </div>
      ))}
    </div>
  ),
};
