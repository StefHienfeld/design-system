import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import type { SelectOption } from './Select';

/* ----------------------------------------------------------------
   Sample option sets
   ---------------------------------------------------------------- */
const basicOptions: SelectOption[] = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
  { value: 'option-4', label: 'Option 4' },
  { value: 'option-5', label: 'Option 5' },
];

const manyOptions: SelectOption[] = Array.from({ length: 30 }, (_, i) => ({
  value: `item-${i + 1}`,
  label: `Item ${i + 1}`,
}));

const statusOptions: SelectOption[] = [
  { value: 'active', label: 'Active', dotColor: '#17b26a' },
  { value: 'paused', label: 'Paused', dotColor: '#f79009' },
  { value: 'inactive', label: 'Inactive', dotColor: '#f04438' },
  { value: 'draft', label: 'Draft', dotColor: '#717680' },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    options: basicOptions,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/* ----------------------------------------------------------------
   Default with placeholder
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    placeholder: 'Select an option...',
  },
};

/* ----------------------------------------------------------------
   With selected value
   ---------------------------------------------------------------- */
export const WithSelectedValue: Story = {
  args: {
    placeholder: 'Select an option...',
    defaultValue: 'option-2',
  },
};

/* ----------------------------------------------------------------
   With label and hint
   ---------------------------------------------------------------- */
export const WithLabelAndHint: Story = {
  args: {
    label: 'Team member',
    hint: 'Choose the person responsible for this task.',
    placeholder: 'Select team member...',
  },
};

/* ----------------------------------------------------------------
   Error state
   ---------------------------------------------------------------- */
export const ErrorState: Story = {
  args: {
    label: 'Category',
    error: 'Please select a category.',
    placeholder: 'Select a category...',
  },
};

/* ----------------------------------------------------------------
   Disabled
   ---------------------------------------------------------------- */
export const Disabled: Story = {
  args: {
    label: 'Region',
    placeholder: 'Select a region...',
    disabled: true,
  },
};

/* ----------------------------------------------------------------
   Size sm vs md comparison
   ---------------------------------------------------------------- */
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <Select
          size="sm"
          label="Small (sm)"
          placeholder="Small select"
          hint="Height: 40px"
          options={basicOptions}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Select
          size="md"
          label="Medium (md)"
          placeholder="Medium select"
          hint="Height: 44px"
          options={basicOptions}
        />
      </div>
    </div>
  ),
};

/* ----------------------------------------------------------------
   Many options (scrollable)
   ---------------------------------------------------------------- */
export const ManyOptions: Story = {
  args: {
    label: 'Item',
    placeholder: 'Choose from 30 items...',
    options: manyOptions,
  },
};

/* ----------------------------------------------------------------
   Required
   ---------------------------------------------------------------- */
export const Required: Story = {
  args: {
    label: 'Priority',
    required: true,
    placeholder: 'Select priority...',
    hint: 'This field is required.',
  },
};

/* ----------------------------------------------------------------
   With dot color decorators
   ---------------------------------------------------------------- */
export const WithDotColors: Story = {
  args: {
    label: 'Status',
    placeholder: 'Select status...',
    options: statusOptions,
  },
};

/* ----------------------------------------------------------------
   Searchable
   ---------------------------------------------------------------- */
const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'mx', label: 'Mexico' },
  { value: 'kr', label: 'South Korea' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' },
  { value: 'no', label: 'Norway' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'sg', label: 'Singapore' },
  { value: 'za', label: 'South Africa' },
];

export const Searchable: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country...',
    searchable: true,
    searchPlaceholder: 'Search countries...',
    options: countryOptions,
    hint: 'Type to filter the list of countries.',
  },
};

/* ----------------------------------------------------------------
   Kitchen sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth: 360,
      }}
    >
      <Select placeholder="Default placeholder" options={basicOptions} />
      <Select
        label="With hint"
        hint="Helpful hint text."
        placeholder="Select..."
        options={basicOptions}
      />
      <Select
        label="Required"
        required
        placeholder="Required field"
        options={basicOptions}
      />
      <Select
        label="Pre-selected"
        defaultValue="option-3"
        options={basicOptions}
      />
      <Select
        label="Status with dots"
        placeholder="Select status..."
        options={statusOptions}
      />
      <Select
        label="Error"
        error="This is an error message."
        placeholder="Select..."
        options={basicOptions}
      />
      <Select
        label="Disabled"
        placeholder="Cannot interact"
        disabled
        options={basicOptions}
      />
    </div>
  ),
};
