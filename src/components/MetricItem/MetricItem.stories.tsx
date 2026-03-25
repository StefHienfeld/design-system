import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricItem } from './MetricItem';

/* ----------------------------------------------------------------
   Placeholder icons
   ---------------------------------------------------------------- */
const TrendUpIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 7 13.5 15.5 8.5 10.5 2 17M22 7h-6m6 0v6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DotsVerticalIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM10 5.833A.833.833 0 1 0 10 4.167a.833.833 0 0 0 0 1.666ZM10 15.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666Z"
      stroke="currentColor"
      strokeWidth="1.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* A simple placeholder sparkline for the chart variant stories */
const SparklinePlaceholder = (
  <svg width="112" height="56" viewBox="0 0 112 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 45 15 38 28 42 42 30 56 34 70 20 84 24 98 12 111 8"
      stroke="#17b26a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 45 15 38 28 42 42 30 56 34 70 20 84 24 98 12 111 8V56H1Z"
      fill="url(#sparkGrad)"
      opacity="0.12"
    />
    <defs>
      <linearGradient id="sparkGrad" x1="56" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#17b26a" />
        <stop offset="1" stopColor="#17b26a" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="98" cy="12" r="4" fill="#fff" stroke="#17b26a" strokeWidth="2" />
  </svg>
);

/* Reusable dropdown button for stories */
const DropdownButton = (
  <button className="metric-item__dropdown" type="button" aria-label="More options">
    {DotsVerticalIcon}
  </button>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof MetricItem> = {
  title: 'Components/MetricItem',
  component: MetricItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    trend: { control: 'object' },
    trendDescription: { control: 'text' },
  },
  args: {
    label: 'Views 24 hours',
    value: '2,000',
  },
};

export default meta;
type Story = StoryObj<typeof MetricItem>;

/* ----------------------------------------------------------------
   Simple — default
   ---------------------------------------------------------------- */
export const Simple: Story = {
  args: {
    trend: { value: '100%', positive: true },
    dropdown: DropdownButton,
  },
};

/* ----------------------------------------------------------------
   Simple — without trend
   ---------------------------------------------------------------- */
export const SimpleNoTrend: Story = {
  args: {
    dropdown: DropdownButton,
  },
};

/* ----------------------------------------------------------------
   Simple — negative trend
   ---------------------------------------------------------------- */
export const SimpleNegativeTrend: Story = {
  args: {
    trend: { value: '12%', positive: false },
    dropdown: DropdownButton,
  },
};

/* ----------------------------------------------------------------
   Simple — with actions
   ---------------------------------------------------------------- */
export const SimpleWithActions: Story = {
  args: {
    trend: { value: '100%', positive: true },
    dropdown: DropdownButton,
    actions: (
      <button
        type="button"
        style={{
          all: 'unset',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-body)',
          fontWeight: 'var(--font-weight-semibold)' as any,
          fontSize: 'var(--font-size-text-sm)',
          lineHeight: 'var(--line-height-text-sm)',
          color: 'var(--text-brand-secondary)',
        }}
      >
        View report
      </button>
    ),
  },
};

/* ----------------------------------------------------------------
   Icon variant
   ---------------------------------------------------------------- */
export const WithIcon: Story = {
  args: {
    icon: TrendUpIcon,
    trend: { value: '100%', positive: true },
    dropdown: DropdownButton,
  },
};

/* ----------------------------------------------------------------
   Icon variant — with actions
   ---------------------------------------------------------------- */
export const WithIconAndActions: Story = {
  args: {
    icon: TrendUpIcon,
    trend: { value: '100%', positive: true },
    dropdown: DropdownButton,
    actions: (
      <button
        type="button"
        style={{
          all: 'unset',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-body)',
          fontWeight: 'var(--font-weight-semibold)' as any,
          fontSize: 'var(--font-size-text-sm)',
          lineHeight: 'var(--line-height-text-sm)',
          color: 'var(--text-brand-secondary)',
        }}
      >
        View report
      </button>
    ),
  },
};

/* ----------------------------------------------------------------
   Chart variant
   ---------------------------------------------------------------- */
export const WithChart: Story = {
  args: {
    trend: { value: '100%', positive: true },
    trendDescription: 'vs last month',
    chart: SparklinePlaceholder,
    dropdown: DropdownButton,
  },
};

/* ----------------------------------------------------------------
   Chart variant — negative
   ---------------------------------------------------------------- */
export const WithChartNegative: Story = {
  args: {
    trend: { value: '8%', positive: false },
    trendDescription: 'vs last month',
    chart: SparklinePlaceholder,
    dropdown: DropdownButton,
  },
};

/* ----------------------------------------------------------------
   Chart variant — with actions
   ---------------------------------------------------------------- */
export const WithChartAndActions: Story = {
  args: {
    trend: { value: '100%', positive: true },
    trendDescription: 'vs last month',
    chart: SparklinePlaceholder,
    dropdown: DropdownButton,
    actions: (
      <button
        type="button"
        style={{
          all: 'unset',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-body)',
          fontWeight: 'var(--font-weight-semibold)' as any,
          fontSize: 'var(--font-size-text-sm)',
          lineHeight: 'var(--line-height-text-sm)',
          color: 'var(--text-brand-secondary)',
        }}
      >
        View report
      </button>
    ),
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink — all variants together
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 388 }}>
      {/* Simple */}
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
          Simple
        </div>
        <MetricItem
          label="Views 24 hours"
          value="2,000"
          trend={{ value: '100%', positive: true }}
          dropdown={DropdownButton}
        />
      </div>

      {/* Simple with actions */}
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
          Simple with actions
        </div>
        <MetricItem
          label="Views 24 hours"
          value="2,000"
          trend={{ value: '100%', positive: true }}
          dropdown={DropdownButton}
          actions={
            <button
              type="button"
              style={{
                all: 'unset',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-semibold)' as any,
                fontSize: 'var(--font-size-text-sm)',
                lineHeight: 'var(--line-height-text-sm)',
                color: 'var(--text-brand-secondary)',
              }}
            >
              View report
            </button>
          }
        />
      </div>

      {/* Icon variant */}
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
          Icon variant
        </div>
        <MetricItem
          label="Views 24 hours"
          value="2,000"
          icon={TrendUpIcon}
          trend={{ value: '100%', positive: true }}
          dropdown={DropdownButton}
        />
      </div>

      {/* Icon with actions */}
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
          Icon with actions
        </div>
        <MetricItem
          label="Views 24 hours"
          value="2,000"
          icon={TrendUpIcon}
          trend={{ value: '100%', positive: true }}
          dropdown={DropdownButton}
          actions={
            <button
              type="button"
              style={{
                all: 'unset',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-semibold)' as any,
                fontSize: 'var(--font-size-text-sm)',
                lineHeight: 'var(--line-height-text-sm)',
                color: 'var(--text-brand-secondary)',
              }}
            >
              View report
            </button>
          }
        />
      </div>

      {/* Chart variant */}
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
          Chart variant
        </div>
        <MetricItem
          label="Views 24 hours"
          value="2,000"
          trend={{ value: '100%', positive: true }}
          trendDescription="vs last month"
          chart={SparklinePlaceholder}
          dropdown={DropdownButton}
        />
      </div>

      {/* Chart with actions */}
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
          Chart with actions
        </div>
        <MetricItem
          label="Views 24 hours"
          value="2,000"
          trend={{ value: '100%', positive: true }}
          trendDescription="vs last month"
          chart={SparklinePlaceholder}
          dropdown={DropdownButton}
          actions={
            <button
              type="button"
              style={{
                all: 'unset',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-semibold)' as any,
                fontSize: 'var(--font-size-text-sm)',
                lineHeight: 'var(--line-height-text-sm)',
                color: 'var(--text-brand-secondary)',
              }}
            >
              View report
            </button>
          }
        />
      </div>

      {/* Negative trend */}
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
          Negative trend
        </div>
        <MetricItem
          label="Bounce rate"
          value="48.2%"
          trend={{ value: '8%', positive: false }}
          dropdown={DropdownButton}
        />
      </div>
    </div>
  ),
};
