import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerificationCode } from './VerificationCode';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof VerificationCode> = {
  title: 'Components/VerificationCode',
  component: VerificationCode,
  tags: ['autodocs'],
  argTypes: {
    digits: {
      control: 'select',
      options: [4, 6],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    digits: 6,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof VerificationCode>;

/* ----------------------------------------------------------------
   4-digit variants
   ---------------------------------------------------------------- */
export const FourDigitSmall: Story = {
  args: { digits: 4, size: 'sm' },
};

export const FourDigitMedium: Story = {
  args: { digits: 4, size: 'md' },
};

export const FourDigitLarge: Story = {
  args: { digits: 4, size: 'lg' },
};

/* ----------------------------------------------------------------
   6-digit variants
   ---------------------------------------------------------------- */
export const SixDigitSmall: Story = {
  args: { digits: 6, size: 'sm' },
};

export const SixDigitMedium: Story = {
  args: { digits: 6, size: 'md' },
};

export const SixDigitLarge: Story = {
  args: { digits: 6, size: 'lg' },
};

/* ----------------------------------------------------------------
   With label and hint
   ---------------------------------------------------------------- */
export const WithLabelAndHint: Story = {
  args: {
    digits: 6,
    size: 'md',
    label: 'Verification code',
    hint: 'We sent a 6-digit code to your email address.',
  },
};

/* ----------------------------------------------------------------
   With error
   ---------------------------------------------------------------- */
export const WithError: Story = {
  args: {
    digits: 6,
    size: 'md',
    label: 'Verification code',
    error: 'The code you entered is incorrect. Please try again.',
    value: '83',
  },
};

/* ----------------------------------------------------------------
   Pre-filled value
   ---------------------------------------------------------------- */
export const PreFilled4Digit: Story = {
  args: {
    digits: 4,
    size: 'md',
    value: '7291',
    label: 'Enter PIN',
  },
};

export const PreFilled6Digit: Story = {
  args: {
    digits: 6,
    size: 'md',
    value: '482901',
    label: 'Enter code',
  },
};

/* ----------------------------------------------------------------
   Controlled example
   ---------------------------------------------------------------- */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <VerificationCode
          digits={6}
          size="md"
          label="Enter your verification code"
          hint="Type or paste your 6-digit code."
          value={value}
          onChange={setValue}
        />
        <div
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-text-sm)',
            color: 'var(--text-tertiary)',
          }}
        >
          Current value: <code>{value || '(empty)'}</code>
          {value.length === 6 && (
            <span style={{ color: 'var(--color-success-600)', marginLeft: 8 }}>
              Complete!
            </span>
          )}
        </div>
      </div>
    );
  },
};

/* ----------------------------------------------------------------
   All sizes side-by-side (4-digit)
   ---------------------------------------------------------------- */
export const AllSizes4Digit: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            {size}
          </div>
          <VerificationCode digits={4} size={size} value="38" />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   All sizes side-by-side (6-digit)
   ---------------------------------------------------------------- */
export const AllSizes6Digit: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            {size}
          </div>
          <VerificationCode digits={6} size={size} value="482" />
        </div>
      ))}
    </div>
  ),
};
