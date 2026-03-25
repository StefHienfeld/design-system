import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentDivider } from './ContentDivider';

/* ----------------------------------------------------------------
   Placeholder icons
   ---------------------------------------------------------------- */
const PlusIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeftIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.833 10H4.167m0 0L10 4.167M4.167 10L10 15.833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.167 10h11.666m0 0L10 4.167M15.833 10L10 15.833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ----------------------------------------------------------------
   Placeholder action components
   ---------------------------------------------------------------- */
const buttonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  padding: '10px 14px',
  border: '1px solid var(--border-primary)',
  borderRadius: 'var(--radius-xxs)',
  background: '#ffffff',
  fontFamily: 'var(--font-family-body)',
  fontSize: 'var(--font-size-text-sm)',
  lineHeight: 'var(--line-height-text-sm)',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  boxShadow: '0px 1px 2px 0px rgba(10, 13, 18, 0.05)',
};

const iconButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  padding: 10,
  gap: 0,
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'inline-flex',
  border: '1px solid var(--border-primary)',
  borderRadius: 'var(--radius-xxs)',
  overflow: 'hidden',
  boxShadow: '0px 1px 2px 0px rgba(10, 13, 18, 0.05)',
};

const buttonGroupItemStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  padding: '8px 16px',
  border: 'none',
  borderRight: '1px solid var(--border-primary)',
  background: '#ffffff',
  fontFamily: 'var(--font-family-body)',
  fontSize: 'var(--font-size-text-sm)',
  lineHeight: 'var(--line-height-text-sm)',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  minHeight: 40,
};

const buttonGroupItemActiveStyle: React.CSSProperties = {
  ...buttonGroupItemStyle,
  background: 'var(--bg-active)',
  color: 'var(--text-secondary-hover)',
};

const buttonGroupIconItemStyle: React.CSSProperties = {
  ...buttonGroupItemStyle,
  padding: '8px 12px',
};

const AddButton = <button style={buttonStyle}>Add</button>;
const AddIconButton = <button style={iconButtonStyle}>{PlusIcon}</button>;

const TextButtonGroup = (
  <div style={buttonGroupStyle}>
    <button style={buttonGroupItemActiveStyle}>View all</button>
    <button style={buttonGroupItemStyle}>Active</button>
    <button style={{ ...buttonGroupItemStyle, borderRight: 'none' }}>Inactive</button>
  </div>
);

const IconButtonGroup = (
  <div style={buttonGroupStyle}>
    <button style={buttonGroupIconItemStyle}>{ArrowLeftIcon}</button>
    <button style={buttonGroupIconItemStyle}>{PlusIcon}</button>
    <button style={{ ...buttonGroupIconItemStyle, borderRight: 'none' }}>{ArrowRightIcon}</button>
  </div>
);

/* ----------------------------------------------------------------
   Styles array
   ---------------------------------------------------------------- */
const STYLES = ['single-line', 'dual-line', 'background-fill'] as const;

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof ContentDivider> = {
  title: 'Components/ContentDivider',
  component: ContentDivider,
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: [...STYLES],
    },
    label: { control: 'text' },
    supportingText: { control: 'text' },
  },
  args: {
    style: 'single-line',
    label: 'Notifications',
  },
};

export default meta;
type Story = StoryObj<typeof ContentDivider>;

/* ----------------------------------------------------------------
   Default
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Heading — all styles
   ---------------------------------------------------------------- */
export const HeadingAllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {STYLES.map((s) => (
        <div key={s}>
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
            {s}
          </div>
          <ContentDivider style={s} label="Notifications" />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Text — all styles
   ---------------------------------------------------------------- */
export const TextAllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {STYLES.map((s) => (
        <div key={s}>
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
            {s}
          </div>
          <ContentDivider style={s} supportingText="Today" />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Button — all styles
   ---------------------------------------------------------------- */
export const ButtonAllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {STYLES.map((s) => (
        <div key={s}>
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
            {s}
          </div>
          <ContentDivider style={s} actions={AddButton} />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Button Icon — all styles
   ---------------------------------------------------------------- */
export const ButtonIconAllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {STYLES.map((s) => (
        <div key={s}>
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
            {s}
          </div>
          <ContentDivider style={s} actions={AddIconButton} />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Button Group — all styles
   ---------------------------------------------------------------- */
export const ButtonGroupAllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {STYLES.map((s) => (
        <div key={s}>
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
            {s}
          </div>
          <ContentDivider style={s} actions={TextButtonGroup} />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Button Group Icon — all styles
   ---------------------------------------------------------------- */
export const ButtonGroupIconAllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {STYLES.map((s) => (
        <div key={s}>
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
            {s}
          </div>
          <ContentDivider style={s} actions={IconButtonGroup} />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Kitchen Sink — all types across all styles
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {STYLES.map((s) => (
        <div key={s}>
          <div
            style={{
              marginBottom: 16,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            {s}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ContentDivider style={s} label="Notifications" />
            <ContentDivider style={s} supportingText="Today" />
            <ContentDivider style={s} actions={AddButton} />
            <ContentDivider style={s} actions={IconButtonGroup} />
            <ContentDivider style={s} actions={TextButtonGroup} />
            <ContentDivider style={s} actions={AddIconButton} />
          </div>
        </div>
      ))}
    </div>
  ),
};
