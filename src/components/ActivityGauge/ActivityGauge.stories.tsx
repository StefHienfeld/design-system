import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityGauge } from './ActivityGauge';
import type { GaugeSegment } from './ActivityGauge';

/* ----------------------------------------------------------------
   Sample data
   ---------------------------------------------------------------- */
const defaultSegments: GaugeSegment[] = [
  { label: 'Series 1', value: 60, color: 'var(--color-brand-600)' },
  { label: 'Series 2', value: 25, color: 'var(--color-brand-400)' },
  { label: 'Series 3', value: 15, color: 'var(--color-brand-200)' },
];

const twoSegments: GaugeSegment[] = [
  { label: 'Active', value: 72, color: 'var(--color-brand-600)' },
  { label: 'Inactive', value: 28, color: 'var(--color-brand-200)' },
];

const productSegments: GaugeSegment[] = [
  { label: 'Yacht & Speciality', value: 45, color: 'var(--product-yacht-main)' },
  { label: 'Financial Lines', value: 30, color: 'var(--product-financial-main)' },
  { label: 'Accident & Travel', value: 25, color: 'var(--product-accident-main)' },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof ActivityGauge> = {
  title: 'Components/ActivityGauge',
  component: ActivityGauge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    legend: {
      control: 'select',
      options: ['none', 'bottom', 'right'],
    },
    centerLabel: { control: 'text' },
    centerValue: { control: 'text' },
  },
  args: {
    segments: defaultSegments,
    size: 'md',
    legend: 'none',
    centerLabel: 'Active users',
    centerValue: '1,000',
  },
};

export default meta;
type Story = StoryObj<typeof ActivityGauge>;

/* ----------------------------------------------------------------
   Default — Medium, no legend
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Extra Small
   ---------------------------------------------------------------- */
export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
};

/* ----------------------------------------------------------------
   Small
   ---------------------------------------------------------------- */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/* ----------------------------------------------------------------
   Large
   ---------------------------------------------------------------- */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/* ----------------------------------------------------------------
   Legend Bottom
   ---------------------------------------------------------------- */
export const LegendBottom: Story = {
  args: {
    legend: 'bottom',
  },
};

/* ----------------------------------------------------------------
   Legend Right
   ---------------------------------------------------------------- */
export const LegendRight: Story = {
  args: {
    legend: 'right',
  },
};

/* ----------------------------------------------------------------
   Two Segments
   ---------------------------------------------------------------- */
export const TwoSegments: Story = {
  args: {
    segments: twoSegments,
    centerLabel: 'Active',
    centerValue: '72%',
    legend: 'right',
  },
};

/* ----------------------------------------------------------------
   Product Line Colors
   ---------------------------------------------------------------- */
export const ProductLines: Story = {
  args: {
    segments: productSegments,
    centerLabel: 'Policies',
    centerValue: '3,450',
    legend: 'bottom',
    size: 'lg',
  },
};

/* ----------------------------------------------------------------
   No Center Text
   ---------------------------------------------------------------- */
export const NoCenterText: Story = {
  args: {
    centerLabel: undefined,
    centerValue: undefined,
    legend: 'bottom',
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink — all sizes and legend positions
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {/* Sizes without legend */}
      <div>
        <div
          style={{
            marginBottom: 12,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Sizes — no legend
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
            <ActivityGauge
              key={s}
              segments={defaultSegments}
              size={s}
              centerLabel="Active users"
              centerValue="1,000"
            />
          ))}
        </div>
      </div>

      {/* Legend bottom */}
      <div>
        <div
          style={{
            marginBottom: 12,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Legend bottom
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
            <ActivityGauge
              key={s}
              segments={defaultSegments}
              size={s}
              legend="bottom"
              centerLabel="Active users"
              centerValue="1,000"
            />
          ))}
        </div>
      </div>

      {/* Legend right */}
      <div>
        <div
          style={{
            marginBottom: 12,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Legend right
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
            <ActivityGauge
              key={s}
              segments={defaultSegments}
              size={s}
              legend="right"
              centerLabel="Active users"
              centerValue="1,000"
            />
          ))}
        </div>
      </div>

      {/* Product line colors */}
      <div>
        <div
          style={{
            marginBottom: 12,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Product line colors
        </div>
        <ActivityGauge
          segments={productSegments}
          size="lg"
          legend="right"
          centerLabel="Policies"
          centerValue="3,450"
        />
      </div>
    </div>
  ),
};
