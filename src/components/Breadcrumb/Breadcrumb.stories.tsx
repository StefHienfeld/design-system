import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    divider: {
      control: 'inline-radio',
      options: ['chevron', 'slash'],
    },
    type: {
      control: 'inline-radio',
      options: ['text', 'text-with-line', 'button'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/* ----------------------------------------------------------------
   Sample data
   ---------------------------------------------------------------- */
const sampleItems = [
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Team' },
];

const deepItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Financial Lines', href: '/products/financial' },
  { label: 'Cyber Insurance', href: '/products/financial/cyber' },
  { label: 'Policy #FL-2024-001' },
];

/* ----------------------------------------------------------------
   Stories — Divider: Chevron (default)
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const ChevronTextWithLine: Story = {
  name: 'Chevron / Text with line',
  args: {
    items: sampleItems,
    divider: 'chevron',
    type: 'text-with-line',
  },
};

export const ChevronButton: Story = {
  name: 'Chevron / Button',
  args: {
    items: sampleItems,
    divider: 'chevron',
    type: 'button',
  },
};

/* ----------------------------------------------------------------
   Stories — Divider: Slash
   ---------------------------------------------------------------- */
export const SlashText: Story = {
  name: 'Slash / Text',
  args: {
    items: sampleItems,
    divider: 'slash',
    type: 'text',
  },
};

export const SlashTextWithLine: Story = {
  name: 'Slash / Text with line',
  args: {
    items: sampleItems,
    divider: 'slash',
    type: 'text-with-line',
  },
};

export const SlashButton: Story = {
  name: 'Slash / Button',
  args: {
    items: sampleItems,
    divider: 'slash',
    type: 'button',
  },
};

/* ----------------------------------------------------------------
   Stories — Existing / general
   ---------------------------------------------------------------- */
export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Settings' },
    ],
  },
};

export const DeepNesting: Story = {
  args: {
    items: deepItems,
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => alert('Navigate: Home') },
      { label: 'Claims', onClick: () => alert('Navigate: Claims') },
      { label: 'Claim #12345' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink — all 6 combinations
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Chevron variants */}
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Chevron / Text
        </div>
        <Breadcrumb items={sampleItems} divider="chevron" type="text" />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Chevron / Text with line
        </div>
        <Breadcrumb items={sampleItems} divider="chevron" type="text-with-line" />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Chevron / Button
        </div>
        <Breadcrumb items={sampleItems} divider="chevron" type="button" />
      </div>

      {/* Slash variants */}
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Slash / Text
        </div>
        <Breadcrumb items={sampleItems} divider="slash" type="text" />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Slash / Text with line
        </div>
        <Breadcrumb items={sampleItems} divider="slash" type="text-with-line" />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Slash / Button
        </div>
        <Breadcrumb items={sampleItems} divider="slash" type="button" />
      </div>

      {/* Deep nesting examples */}
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Deep nesting — Chevron / Text
        </div>
        <Breadcrumb items={deepItems} divider="chevron" type="text" />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Deep nesting — Slash / Button
        </div>
        <Breadcrumb items={deepItems} divider="slash" type="button" />
      </div>
    </div>
  ),
};
