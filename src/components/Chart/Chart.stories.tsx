import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart } from './Chart';

/* ----------------------------------------------------------------
   Placeholder SVG charts for demo purposes
   ---------------------------------------------------------------- */

/** Simple line chart placeholder with three series */
const PlaceholderLineChart = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 200"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Grid lines */}
    {[0, 40, 80, 120, 160, 200].map((y) => (
      <line
        key={y}
        x1="0"
        y1={y}
        x2="800"
        y2={y}
        stroke="#e9eaeb"
        strokeWidth="1"
      />
    ))}
    {/* Series 1 — fill */}
    <path
      d="M0 80 67 75 133 70 200 60 267 55 333 50 400 45 467 40 533 35 600 30 667 25 733 20 800 10"
      stroke="none"
      fill="url(#s1grad)"
      opacity="0.15"
    />
    <path
      d="M0 80 67 75 133 70 200 60 267 55 333 50 400 45 467 40 533 35 600 30 667 25 733 20 800 10 L800 200 0 200Z"
      fill="url(#s1grad)"
      opacity="0.08"
    />
    {/* Series 1 — line */}
    <path
      d="M0 80 67 75 133 70 200 60 267 55 333 50 400 45 467 40 533 35 600 30 667 25 733 20 800 10"
      stroke="#10069f"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Series 2 — line */}
    <path
      d="M0 120 67 115 133 118 200 105 267 110 333 100 400 95 467 90 533 88 600 80 667 78 733 75 800 65"
      stroke="#7cc2fe"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Series 3 — line */}
    <path
      d="M0 160 67 155 133 165 200 150 267 158 333 145 400 140 467 148 533 135 600 130 667 128 733 120 800 115"
      stroke="#1a46b8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="s1grad" x1="400" y1="10" x2="400" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10069f" />
        <stop offset="1" stopColor="#10069f" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

/** Simple bar chart placeholder */
const PlaceholderBarChart = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 200"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Grid lines */}
    {[0, 40, 80, 120, 160, 200].map((y) => (
      <line
        key={y}
        x1="0"
        y1={y}
        x2="800"
        y2={y}
        stroke="#e9eaeb"
        strokeWidth="1"
      />
    ))}
    {/* Bars — 12 months, 2 series each */}
    {[
      { x: 20, h1: 120, h2: 80 },
      { x: 86, h1: 110, h2: 90 },
      { x: 152, h1: 130, h2: 70 },
      { x: 218, h1: 100, h2: 85 },
      { x: 284, h1: 140, h2: 95 },
      { x: 350, h1: 115, h2: 75 },
      { x: 416, h1: 125, h2: 100 },
      { x: 482, h1: 135, h2: 90 },
      { x: 548, h1: 150, h2: 110 },
      { x: 614, h1: 130, h2: 95 },
      { x: 680, h1: 145, h2: 105 },
      { x: 746, h1: 160, h2: 120 },
    ].map(({ x, h1, h2 }) => (
      <g key={x}>
        <rect x={x} y={200 - h1} width="20" height={h1} rx="2" fill="#10069f" opacity="0.85" />
        <rect x={x + 22} y={200 - h2} width="20" height={h2} rx="2" fill="#7cc2fe" opacity="0.85" />
      </g>
    ))}
  </svg>
);

/* ----------------------------------------------------------------
   Default legend items
   ---------------------------------------------------------------- */
const lineChartLegend = [
  { label: 'Series 1', color: '#10069f' },
  { label: 'Series 2', color: '#7cc2fe' },
  { label: 'Series 3', color: '#1a46b8' },
];

const barChartLegend = [
  { label: 'This year', color: '#10069f' },
  { label: 'Last year', color: '#7cc2fe' },
];

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    legendPosition: {
      control: 'select',
      options: ['top', 'bottom', 'right'],
    },
    height: { control: 'number' },
  },
  args: {
    height: 240,
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

/* ----------------------------------------------------------------
   Line Chart — Legend Top (default)
   ---------------------------------------------------------------- */
export const LineChartLegendTop: Story = {
  args: {
    title: 'Active users',
    legend: lineChartLegend,
    legendPosition: 'top',
    children: PlaceholderLineChart,
  },
};

/* ----------------------------------------------------------------
   Line Chart — Legend Right
   ---------------------------------------------------------------- */
export const LineChartLegendRight: Story = {
  args: {
    title: 'Active users',
    legend: lineChartLegend,
    legendPosition: 'right',
    children: PlaceholderLineChart,
  },
};

/* ----------------------------------------------------------------
   Line Chart — Legend Bottom
   ---------------------------------------------------------------- */
export const LineChartLegendBottom: Story = {
  args: {
    title: 'Active users',
    legend: lineChartLegend,
    legendPosition: 'bottom',
    children: PlaceholderLineChart,
  },
};

/* ----------------------------------------------------------------
   Line Chart — No Legend
   ---------------------------------------------------------------- */
export const LineChartNoLegend: Story = {
  args: {
    title: 'Active users',
    children: PlaceholderLineChart,
  },
};

/* ----------------------------------------------------------------
   Bar Chart — Legend Top
   ---------------------------------------------------------------- */
export const BarChartLegendTop: Story = {
  args: {
    title: 'Revenue',
    legend: barChartLegend,
    legendPosition: 'top',
    children: PlaceholderBarChart,
  },
};

/* ----------------------------------------------------------------
   Bar Chart — Legend Right
   ---------------------------------------------------------------- */
export const BarChartLegendRight: Story = {
  args: {
    title: 'Revenue',
    legend: barChartLegend,
    legendPosition: 'right',
    children: PlaceholderBarChart,
  },
};

/* ----------------------------------------------------------------
   Bar Chart — No Legend
   ---------------------------------------------------------------- */
export const BarChartNoLegend: Story = {
  args: {
    children: PlaceholderBarChart,
    height: 200,
  },
};

/* ----------------------------------------------------------------
   Custom Height
   ---------------------------------------------------------------- */
export const CustomHeight: Story = {
  args: {
    title: 'Monthly performance',
    legend: lineChartLegend,
    legendPosition: 'top',
    height: 400,
    children: PlaceholderLineChart,
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink — all variants together
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, maxWidth: 900 }}>
      {/* Legend Top — Line */}
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
          Line chart — legend top
        </div>
        <Chart
          title="Active users"
          legend={lineChartLegend}
          legendPosition="top"
          height={240}
        >
          {PlaceholderLineChart}
        </Chart>
      </div>

      {/* Legend Right — Line */}
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
          Line chart — legend right
        </div>
        <Chart
          title="Active users"
          legend={lineChartLegend}
          legendPosition="right"
          height={240}
        >
          {PlaceholderLineChart}
        </Chart>
      </div>

      {/* Legend Bottom — Bar */}
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
          Bar chart — legend bottom
        </div>
        <Chart
          title="Revenue"
          legend={barChartLegend}
          legendPosition="bottom"
          height={240}
        >
          {PlaceholderBarChart}
        </Chart>
      </div>

      {/* No Legend, no title */}
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
          Minimal — no legend, no title
        </div>
        <Chart height={180}>
          {PlaceholderBarChart}
        </Chart>
      </div>
    </div>
  ),
};
