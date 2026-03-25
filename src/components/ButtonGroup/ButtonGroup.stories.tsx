import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './ButtonGroup';

/* ----------------------------------------------------------------
   Placeholder icons — simple inline SVGs
   ---------------------------------------------------------------- */
const BoldIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3h6a4 4 0 0 1 0 8H5V3ZM5 11h7a4 4 0 0 1 0 8H5v-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ItalicIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 17h2m2-14h2M12 3 8 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnderlineIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3v6a5 5 0 0 0 10 0V3M4 17h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StrikethroughIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10h14M6 6a4 4 0 0 1 4-4 4 4 0 0 1 4 4M14 14a4 4 0 0 1-4 4 4 4 0 0 1-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlignLeftIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4h14M3 8h10M3 12h14M3 16h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AlignCenterIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4h14M5 8h10M3 12h14M5 16h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AlignRightIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4h14M7 8h10M3 12h14M7 16h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/* ----------------------------------------------------------------
   Text-only (icon variant: "False")
   ---------------------------------------------------------------- */
export const TextOnly: Story = {
  args: {
    items: [
      { label: 'Day' },
      { label: 'Week' },
      { label: 'Month' },
      { label: 'Year' },
    ],
  },
};

/* ----------------------------------------------------------------
   Icon + Text (icon variant: "Leading")
   ---------------------------------------------------------------- */
export const IconLeading: Story = {
  args: {
    items: [
      { icon: AlignLeftIcon, label: 'Left' },
      { icon: AlignCenterIcon, label: 'Center' },
      { icon: AlignRightIcon, label: 'Right' },
    ],
  },
};

/* ----------------------------------------------------------------
   Icon-only (icon variant: "Only")
   ---------------------------------------------------------------- */
export const IconOnly: Story = {
  args: {
    items: [
      { icon: BoldIcon },
      { icon: ItalicIcon },
      { icon: UnderlineIcon },
      { icon: StrikethroughIcon },
    ],
  },
};

/* ----------------------------------------------------------------
   Two buttons
   ---------------------------------------------------------------- */
export const TwoButtons: Story = {
  args: {
    items: [
      { label: 'Yes' },
      { label: 'No' },
    ],
  },
};

/* ----------------------------------------------------------------
   With disabled segment
   ---------------------------------------------------------------- */
export const WithDisabled: Story = {
  args: {
    items: [
      { label: 'Copy' },
      { label: 'Paste', disabled: true },
      { label: 'Cut' },
    ],
  },
};

/* ----------------------------------------------------------------
   All variants side-by-side
   ---------------------------------------------------------------- */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
          Text-only
        </div>
        <ButtonGroup
          items={[
            { label: 'Day' },
            { label: 'Week' },
            { label: 'Month' },
            { label: 'Year' },
          ]}
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
          Icon + Text
        </div>
        <ButtonGroup
          items={[
            { icon: AlignLeftIcon, label: 'Left' },
            { icon: AlignCenterIcon, label: 'Center' },
            { icon: AlignRightIcon, label: 'Right' },
          ]}
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
          Icon-only
        </div>
        <ButtonGroup
          items={[
            { icon: BoldIcon },
            { icon: ItalicIcon },
            { icon: UnderlineIcon },
            { icon: StrikethroughIcon },
          ]}
        />
      </div>
    </div>
  ),
};
