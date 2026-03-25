import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

/* ----------------------------------------------------------------
   Constants
   ---------------------------------------------------------------- */
const COLORS = [
  'default',
  'brand',
  'gray',
  'error',
  'warning',
  'success',
] as const;

const SIZES = ['floating', 'full-width'] as const;

/* ----------------------------------------------------------------
   Helpers — text-style action buttons
   ---------------------------------------------------------------- */
const DismissLink = (
  <button className="alert__action-link alert__action-link--secondary" type="button">
    Dismiss
  </button>
);

const ViewChangesLink = (
  <button className="alert__action-link alert__action-link--primary" type="button">
    View changes
  </button>
);

const LearnMoreLink = (
  <button className="alert__action-link alert__action-link--primary" type="button">
    Learn more
  </button>
);

const TextActions = (
  <>
    {DismissLink}
    {ViewChangesLink}
  </>
);

const ErrorWarningActions = (
  <>
    {DismissLink}
    {LearnMoreLink}
  </>
);

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [...COLORS],
    },
    size: {
      control: 'select',
      options: [...SIZES],
    },
    closable: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    color: 'default',
    size: 'floating',
    closable: true,
    title: "We've just released a new feature",
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/* ----------------------------------------------------------------
   Default (interactive playground)
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Floating — all colors
   ---------------------------------------------------------------- */
export const FloatingAllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
      {COLORS.map((color) => (
        <Alert
          key={color}
          color={color}
          size="floating"
          title={
            color === 'error'
              ? 'There was a problem with that action'
              : color === 'warning'
                ? 'Just to let you know this might be a problem'
                : color === 'success'
                  ? 'Successfully updated profile'
                  : "We've just released a new feature"
          }
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
          actions={['error', 'warning'].includes(color) ? ErrorWarningActions : TextActions}
          closable
          onClose={() => {}}
        />
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Full-width — all colors
   ---------------------------------------------------------------- */
export const FullWidthAllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {COLORS.map((color) => (
        <Alert
          key={color}
          color={color}
          size="full-width"
          title={
            color === 'error'
              ? 'There was a problem with that action'
              : color === 'warning'
                ? 'Just to let you know this might be a problem'
                : color === 'success'
                  ? 'Successfully updated profile'
                  : "We've just released a new feature"
          }
          description="Lorem ipsum dolor sit amet consectetur."
          actions={['error', 'warning', 'success'].includes(color) ? ErrorWarningActions : TextActions}
          closable
          onClose={() => {}}
        />
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Without description
   ---------------------------------------------------------------- */
export const TitleOnly: Story = {
  args: {
    description: undefined,
  },
};

/* ----------------------------------------------------------------
   Without close button
   ---------------------------------------------------------------- */
export const NotClosable: Story = {
  args: {
    closable: false,
  },
};

/* ----------------------------------------------------------------
   Without actions
   ---------------------------------------------------------------- */
export const WithActions: Story = {
  args: {
    actions: TextActions,
  },
};

/* ----------------------------------------------------------------
   Error with actions
   ---------------------------------------------------------------- */
export const ErrorWithActions: Story = {
  args: {
    color: 'error',
    title: 'There was a problem with that action',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
    actions: ErrorWarningActions,
  },
};

/* ----------------------------------------------------------------
   Success floating
   ---------------------------------------------------------------- */
export const SuccessFloating: Story = {
  args: {
    color: 'success',
    title: 'Successfully updated profile',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
    actions: TextActions,
  },
};

/* ----------------------------------------------------------------
   Warning full-width
   ---------------------------------------------------------------- */
export const WarningFullWidth: Story = {
  args: {
    color: 'warning',
    size: 'full-width',
    title: 'Just to let you know this might be a problem',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    actions: ErrorWarningActions,
  },
};

/* ----------------------------------------------------------------
   Kitchen sink — every combination
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {SIZES.map((size) => (
        <div key={size}>
          <div
            style={{
              marginBottom: 16,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            {size}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: size === 'floating' ? 16 : 0,
              maxWidth: size === 'floating' ? 600 : undefined,
            }}
          >
            {COLORS.map((color) => (
              <Alert
                key={color}
                color={color}
                size={size}
                title={
                  color === 'error'
                    ? 'There was a problem with that action'
                    : color === 'warning'
                      ? 'Just to let you know this might be a problem'
                      : color === 'success'
                        ? 'Successfully updated profile'
                        : "We've just released a new feature"
                }
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
                actions={
                  ['error', 'warning'].includes(color)
                    ? ErrorWarningActions
                    : TextActions
                }
                closable
                onClose={() => {}}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
