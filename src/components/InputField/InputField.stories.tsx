import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputField } from './InputField';

/* ----------------------------------------------------------------
   Placeholder icons — simple inline SVGs
   ---------------------------------------------------------------- */
const MailIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.667 5.833l7.127 4.276a2.167 2.167 0 0 0 2.246-.036L18.333 5.5M4.167 16.667h11.666c1.381 0 2.5-1.12 2.5-2.5V5.833c0-1.38-1.119-2.5-2.5-2.5H4.167c-1.381 0-2.5 1.12-2.5 2.5v8.334c0 1.38 1.119 2.5 2.5 2.5Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HelpCircleIcon = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.06 6a2 2 0 0 1 3.887.667c0 1.333-2 2-2 2M8 11.333h.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    destructive: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter a value...',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

/* ----------------------------------------------------------------
   Default states
   ---------------------------------------------------------------- */
export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 320 }}>
      <InputField placeholder="Placeholder" />
      <InputField defaultValue="Filled value" />
      <InputField placeholder="Focus me" autoFocus />
      <InputField placeholder="Disabled" disabled />
    </div>
  ),
};

/* ----------------------------------------------------------------
   With label and hint
   ---------------------------------------------------------------- */
export const WithLabelAndHint: Story = {
  args: {
    label: 'Email',
    hint: 'This is a hint text to help the user.',
    placeholder: 'olivia@untitledui.com',
  },
};

/* ----------------------------------------------------------------
   Error state with error message
   ---------------------------------------------------------------- */
export const ErrorState: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address.',
    placeholder: 'olivia@untitledui.com',
    defaultValue: 'not-an-email',
  },
};

/* ----------------------------------------------------------------
   With leading icon (mail)
   ---------------------------------------------------------------- */
export const WithLeadingIcon: Story = {
  args: {
    label: 'Email',
    iconLeading: MailIcon,
    placeholder: 'olivia@untitledui.com',
  },
};

/* ----------------------------------------------------------------
   With trailing icon (help-circle)
   ---------------------------------------------------------------- */
export const WithTrailingIcon: Story = {
  args: {
    label: 'Email',
    iconTrailing: HelpCircleIcon,
    placeholder: 'olivia@untitledui.com',
  },
};

/* ----------------------------------------------------------------
   With leading text
   ---------------------------------------------------------------- */
export const WithLeadingText: Story = {
  args: {
    label: 'Website',
    leadingText: 'https://',
    placeholder: 'www.example.com',
  },
};

/* ----------------------------------------------------------------
   Required field
   ---------------------------------------------------------------- */
export const Required: Story = {
  args: {
    label: 'Email',
    hint: 'This field is required.',
    required: true,
    placeholder: 'olivia@untitledui.com',
  },
};

/* ----------------------------------------------------------------
   Size sm vs md comparison
   ---------------------------------------------------------------- */
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <InputField
          size="sm"
          label="Small (sm)"
          placeholder="Small input"
          hint="Height: 40px"
        />
      </div>
      <div style={{ flex: 1 }}>
        <InputField
          size="md"
          label="Medium (md)"
          placeholder="Medium input"
          hint="Height: 44px"
        />
      </div>
    </div>
  ),
};

/* ----------------------------------------------------------------
   Trailing button
   ---------------------------------------------------------------- */
export const TrailingButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    trailingButton: {
      label: 'Search',
      onClick: () => alert('Search clicked'),
    },
  },
};

/* ----------------------------------------------------------------
   Leading dropdown
   ---------------------------------------------------------------- */
export const LeadingDropdown: Story = {
  args: {
    label: 'Phone number',
    placeholder: '(555) 000-0000',
    leadingDropdown: {
      value: 'US',
      options: [
        { value: 'US', label: 'US' },
        { value: 'UK', label: 'UK' },
        { value: 'DE', label: 'DE' },
        { value: 'FR', label: 'FR' },
      ],
      onChange: (value: string) => console.log('Country changed:', value),
    },
  },
};

/* ----------------------------------------------------------------
   Trailing dropdown
   ---------------------------------------------------------------- */
export const TrailingDropdown: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    trailingDropdown: {
      value: 'USD',
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'JPY', label: 'JPY' },
      ],
      onChange: (value: string) => console.log('Currency changed:', value),
    },
  },
};

/* ----------------------------------------------------------------
   Kitchen sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
      <InputField label="Default" placeholder="Placeholder text" />
      <InputField label="With hint" hint="Helpful hint text." placeholder="Enter text..." />
      <InputField
        label="Required"
        required
        placeholder="Required field"
      />
      <InputField
        label="With leading icon"
        iconLeading={MailIcon}
        placeholder="olivia@untitledui.com"
      />
      <InputField
        label="With trailing icon"
        iconTrailing={HelpCircleIcon}
        placeholder="Enter text..."
      />
      <InputField
        label="With leading text"
        leadingText="https://"
        placeholder="www.example.com"
      />
      <InputField
        label="Error"
        error="This is an error message."
        defaultValue="Bad value"
      />
      <InputField
        label="Destructive"
        destructive
        iconTrailing={HelpCircleIcon}
        defaultValue="Destructive styling"
      />
      <InputField label="Disabled" placeholder="Cannot edit" disabled />
      <InputField
        label="Trailing button"
        placeholder="Search..."
        trailingButton={{ label: 'Search' }}
      />
      <InputField
        label="Leading dropdown"
        placeholder="(555) 000-0000"
        leadingDropdown={{
          value: 'US',
          options: [
            { value: 'US', label: 'US' },
            { value: 'UK', label: 'UK' },
          ],
        }}
      />
      <InputField
        label="Trailing dropdown"
        placeholder="0.00"
        trailingDropdown={{
          value: 'USD',
          options: [
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
          ],
        }}
      />
    </div>
  ),
};
