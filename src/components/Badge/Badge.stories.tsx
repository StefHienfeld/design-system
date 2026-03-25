import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

/* ----------------------------------------------------------------
   Placeholder icon — simple inline SVG star
   ---------------------------------------------------------------- */
const StarIcon = (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.3L6 8.5 3 10.1l.6-3.3L1.2 4.5l3.3-.5L6 1z"
      fill="currentColor"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Constants
   ---------------------------------------------------------------- */
const COLORS = [
  'brand',
  'gray',
  'error',
  'warning',
  'success',
  'gray-blue',
  'blue-light',
  'blue',
  'indigo',
  'purple',
  'pink',
  'orange',
] as const;

const TYPES = [
  'pill-color',
  'pill-outline',
  'badge-color',
  'badge-modern',
] as const;

const SIZES = ['sm', 'md', 'lg'] as const;

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: [...COLORS],
    },
    type: {
      control: 'select',
      options: [...TYPES],
    },
    dot: { control: 'boolean' },
  },
  args: {
    children: 'Label',
    size: 'md',
    color: 'brand',
    type: 'pill-color',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/* ----------------------------------------------------------------
   Default
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   All sizes
   ---------------------------------------------------------------- */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {SIZES.map((size) => (
        <Badge key={size} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   With dot
   ---------------------------------------------------------------- */
export const WithDot: Story = {
  args: { dot: true },
};

/* ----------------------------------------------------------------
   With icon
   ---------------------------------------------------------------- */
export const WithIcon: Story = {
  args: { icon: StarIcon },
};

/* ----------------------------------------------------------------
   Pill Color — all colors
   ---------------------------------------------------------------- */
export const PillColor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {COLORS.map((color) => (
        <Badge key={color} type="pill-color" color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Pill Outline — all colors
   ---------------------------------------------------------------- */
export const PillOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {COLORS.map((color) => (
        <Badge key={color} type="pill-outline" color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Badge Color — all colors
   ---------------------------------------------------------------- */
export const BadgeColor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {COLORS.map((color) => (
        <Badge key={color} type="badge-color" color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Badge Modern — all colors
   ---------------------------------------------------------------- */
export const BadgeModern: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {COLORS.map((color) => (
        <Badge key={color} type="badge-modern" color={color} icon={StarIcon}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   All colors with dot
   ---------------------------------------------------------------- */
export const AllColorsWithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {COLORS.map((color) => (
        <Badge key={color} color={color} dot>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   All colors with icon
   ---------------------------------------------------------------- */
export const AllColorsWithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {COLORS.map((color) => (
        <Badge key={color} color={color} icon={StarIcon}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Kitchen sink — all types x all colors x all sizes
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {TYPES.map((type) => (
        <div key={type}>
          <div
            style={{
              marginBottom: 12,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            {type}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SIZES.map((size) => (
              <div key={size} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <span
                  style={{
                    width: 24,
                    fontSize: 11,
                    color: '#a4a7ae',
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  {size}
                </span>
                {COLORS.map((color) => (
                  <Badge key={color} type={type} color={color} size={size}>
                    {color}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* With dot */}
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
          With dot (pill-color, md)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.map((color) => (
            <Badge key={color} color={color} dot>
              {color}
            </Badge>
          ))}
        </div>
      </div>

      {/* With icon */}
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
          With icon (pill-color, md)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.map((color) => (
            <Badge key={color} color={color} icon={StarIcon}>
              {color}
            </Badge>
          ))}
        </div>
      </div>

      {/* Badge-modern with icon */}
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
          Badge-modern with icon (md)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.map((color) => (
            <Badge key={color} type="badge-modern" color={color} icon={StarIcon}>
              {color}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  ),
};
