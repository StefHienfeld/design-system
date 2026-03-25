import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineCTA } from './InlineCTA';
import { Button } from '../Button';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof InlineCTA> = {
  title: 'Components/InlineCTA',
  component: InlineCTA,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'text' },
  },
  args: {
    title: "We've just released a new update!",
    description:
      'Check out the all new dashboard view. Pages and now load faster.',
  },
};

export default meta;
type Story = StoryObj<typeof InlineCTA>;

/* ----------------------------------------------------------------
   Placeholder image (Figma reference)
   ---------------------------------------------------------------- */
const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=480&h=320&fit=crop&auto=format';

/* ----------------------------------------------------------------
   Default (interactive playground)
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {
    actions: (
      <>
        <Button size="sm" hierarchy="secondary">
          Dismiss
        </Button>
        <Button size="sm" hierarchy="primary">
          Changelog
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   With Image
   ---------------------------------------------------------------- */
export const WithImage: Story = {
  args: {
    image: SAMPLE_IMAGE,
    actions: (
      <>
        <Button size="sm" hierarchy="secondary">
          Dismiss
        </Button>
        <Button size="sm" hierarchy="primary">
          Changelog
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   With Actions only (no image)
   ---------------------------------------------------------------- */
export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button size="sm" hierarchy="secondary">
          Dismiss
        </Button>
        <Button size="sm" hierarchy="primary">
          Changelog
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   With custom children (email subscription field)
   ---------------------------------------------------------------- */
export const WithEmailField: Story = {
  args: {
    title: "We've just released a new update!",
    description:
      'Check out the all new dashboard view. Pages and now load faster.',
    children: (
      <div style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', flex: 1 }}>
          <label
            style={{
              fontSize: 'var(--font-size-text-sm)',
              lineHeight: 'var(--line-height-text-sm)',
              fontWeight: 'var(--font-weight-medium)' as unknown as number,
              color: 'var(--text-secondary)',
            }}
          >
            Subscribe to updates
          </label>
          <input
            type="email"
            placeholder="you@company.com"
            style={{
              padding: '10px 14px',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-xxs)',
              fontSize: 'var(--font-size-text-md)',
              lineHeight: 'var(--line-height-text-md)',
              fontFamily: 'var(--font-family-body)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-xs)',
              outline: 'none',
              width: '100%',
              minWidth: 200,
            }}
          />
        </div>
        <Button size="md" hierarchy="primary">
          Subscribe
        </Button>
      </div>
    ),
  },
};

/* ----------------------------------------------------------------
   Title only (minimal)
   ---------------------------------------------------------------- */
export const TitleOnly: Story = {
  args: {
    description: undefined,
    actions: (
      <Button size="sm" hierarchy="primary">
        Learn more
      </Button>
    ),
  },
};

/* ----------------------------------------------------------------
   Image variant — mobile preview (narrow container)
   ---------------------------------------------------------------- */
export const ImageMobilePreview: Story = {
  args: {
    image: SAMPLE_IMAGE,
    actions: (
      <>
        <Button size="sm" hierarchy="primary">
          Changelog
        </Button>
        <Button size="sm" hierarchy="secondary">
          Dismiss
        </Button>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375 }}>
        <Story />
      </div>
    ),
  ],
};

/* ----------------------------------------------------------------
   Kitchen Sink — all variants
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 768 }}>
      {/* With image */}
      <InlineCTA
        title="We've just released a new update!"
        description="Check out the all new dashboard view. Pages and now load faster."
        image={SAMPLE_IMAGE}
        actions={
          <>
            <Button size="sm" hierarchy="secondary">
              Dismiss
            </Button>
            <Button size="sm" hierarchy="primary">
              Changelog
            </Button>
          </>
        }
      />

      {/* Actions only */}
      <InlineCTA
        title="We've just released a new update!"
        description="Check out the all new dashboard view. Pages and now load faster."
        actions={
          <>
            <Button size="sm" hierarchy="secondary">
              Dismiss
            </Button>
            <Button size="sm" hierarchy="primary">
              Changelog
            </Button>
          </>
        }
      />

      {/* With email field */}
      <InlineCTA
        title="We've just released a new update!"
        description="Check out the all new dashboard view. Pages and now load faster."
      >
        <div style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', flex: 1 }}>
            <label
              style={{
                fontSize: 'var(--font-size-text-sm)',
                lineHeight: 'var(--line-height-text-sm)',
                fontWeight: 'var(--font-weight-medium)' as unknown as number,
                color: 'var(--text-secondary)',
              }}
            >
              Subscribe to updates
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              style={{
                padding: '10px 14px',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-xxs)',
                fontSize: 'var(--font-size-text-md)',
                lineHeight: 'var(--line-height-text-md)',
                fontFamily: 'var(--font-family-body)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-xs)',
                outline: 'none',
                width: '100%',
                minWidth: 200,
              }}
            />
          </div>
          <Button size="md" hierarchy="primary">
            Subscribe
          </Button>
        </div>
      </InlineCTA>

      {/* Title only */}
      <InlineCTA
        title="Your latest receipt is available"
        description="Download receipt for January 2025."
        actions={
          <>
            <Button size="sm" hierarchy="secondary">
              Download
            </Button>
            <Button size="sm" hierarchy="primary">
              View
            </Button>
          </>
        }
      />
    </div>
  ),
};
