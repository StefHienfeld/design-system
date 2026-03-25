import type { Meta, StoryObj } from '@storybook/react-vite';
import { ViolationItem } from './ViolationItem';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof ViolationItem> = {
  title: 'Components/ViolationItem',
  component: ViolationItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['OR', 'GTE', 'EQ', 'GT', 'LT'],
    },
    field: { control: 'text' },
    value: { control: 'text' },
    label: { control: 'text' },
    status: {
      control: 'select',
      options: ['neutral', 'pass', 'fail'],
    },
  },
  args: {
    variant: 'GTE',
    field: 'Rule property',
    value: 'Value',
    label: 'Actual',
    status: 'neutral',
  },
};

export default meta;
type Story = StoryObj<typeof ViolationItem>;

/* ----------------------------------------------------------------
   OR variant
   ---------------------------------------------------------------- */
export const Or: Story = {
  args: {
    variant: 'OR',
    field: 'Rule property',
    value: 'Value',
  },
};

/* ----------------------------------------------------------------
   GTE variant (>=)
   ---------------------------------------------------------------- */
export const GreaterThanOrEqual: Story = {
  args: {
    variant: 'GTE',
    field: 'Rule property',
    value: 'Value',
  },
};

/* ----------------------------------------------------------------
   EQ variant (=)
   ---------------------------------------------------------------- */
export const Equal: Story = {
  args: {
    variant: 'EQ',
    field: 'Rule property',
    value: 'Value',
  },
};

/* ----------------------------------------------------------------
   GT variant (>)
   ---------------------------------------------------------------- */
export const GreaterThan: Story = {
  args: {
    variant: 'GT',
    field: 'Rule property',
    value: 'Value',
  },
};

/* ----------------------------------------------------------------
   LT variant (<)
   ---------------------------------------------------------------- */
export const LessThan: Story = {
  args: {
    variant: 'LT',
    field: 'Rule property',
    value: 'Value',
  },
};

/* ----------------------------------------------------------------
   Status — fail
   ---------------------------------------------------------------- */
export const StatusFail: Story = {
  args: {
    variant: 'GTE',
    field: 'Premium amount',
    value: '10000',
    status: 'fail',
  },
};

/* ----------------------------------------------------------------
   Status — pass
   ---------------------------------------------------------------- */
export const StatusPass: Story = {
  args: {
    variant: 'EQ',
    field: 'Coverage type',
    value: 'Full',
    status: 'pass',
  },
};

/* ----------------------------------------------------------------
   Realistic example
   ---------------------------------------------------------------- */
export const RealisticExample: Story = {
  args: {
    variant: 'GT',
    field: 'Deductible',
    value: '5000',
    label: 'Actual',
    status: 'fail',
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink — all variants together
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 577 }}>
      <div
        style={{
          marginBottom: 4,
          fontWeight: 600,
          fontSize: 12,
          textTransform: 'uppercase',
          color: '#717680',
        }}
      >
        All variants (neutral)
      </div>
      <ViolationItem variant="OR" field="Rule property" value="Value" />
      <ViolationItem variant="GTE" field="Rule property" value="Value" />
      <ViolationItem variant="EQ" field="Rule property" value="Value" />
      <ViolationItem variant="GT" field="Rule property" value="Value" />
      <ViolationItem variant="LT" field="Rule property" value="Value" />

      <div
        style={{
          marginTop: 20,
          marginBottom: 4,
          fontWeight: 600,
          fontSize: 12,
          textTransform: 'uppercase',
          color: '#717680',
        }}
      >
        Status variants
      </div>
      <ViolationItem variant="GTE" field="Premium amount" value="10000" status="fail" />
      <ViolationItem variant="EQ" field="Coverage type" value="Full" status="pass" />
      <ViolationItem variant="LT" field="Deductible" value="5000" status="neutral" />
    </div>
  ),
};
