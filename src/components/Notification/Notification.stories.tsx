import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notification } from './Notification';

/* ----------------------------------------------------------------
   Placeholder icons for gray variant
   ---------------------------------------------------------------- */
const CodepenIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 1.667 18.333 7v6L10 18.333 1.667 13V7L10 1.667Zm0 0v5.416M10 12.917v5.416M1.667 7 10 12.917 18.333 7"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Shared action links (mimic Figma design)
   ---------------------------------------------------------------- */
const DismissChangelogActions = (
  <>
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 'var(--font-weight-semibold)' as unknown as number,
        fontSize: 'var(--font-size-text-sm)',
        lineHeight: 'var(--line-height-text-sm)',
        color: 'var(--text-tertiary)',
        padding: 0,
      }}
    >
      Dismiss
    </button>
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 'var(--font-weight-semibold)' as unknown as number,
        fontSize: 'var(--font-size-text-sm)',
        lineHeight: 'var(--line-height-text-sm)',
        color: 'var(--text-brand-secondary)',
        padding: 0,
      }}
    >
      Changelog
    </button>
  </>
);

const DismissViewChangesActions = (
  <>
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 'var(--font-weight-semibold)' as unknown as number,
        fontSize: 'var(--font-size-text-sm)',
        lineHeight: 'var(--line-height-text-sm)',
        color: 'var(--text-tertiary)',
        padding: 0,
      }}
    >
      Dismiss
    </button>
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 'var(--font-weight-semibold)' as unknown as number,
        fontSize: 'var(--font-size-text-sm)',
        lineHeight: 'var(--line-height-text-sm)',
        color: 'var(--text-brand-secondary)',
        padding: 0,
      }}
    >
      View changes
    </button>
  </>
);

const UndoAction = (
  <button
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-family-body)',
      fontWeight: 'var(--font-weight-semibold)' as unknown as number,
      fontSize: 'var(--font-size-text-sm)',
      lineHeight: 'var(--line-height-text-sm)',
      color: 'var(--text-brand-secondary)',
      padding: 0,
    }}
  >
    Undo action
  </button>
);

const LaterInstallActions = (
  <>
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 'var(--font-weight-semibold)' as unknown as number,
        fontSize: 'var(--font-size-text-sm)',
        lineHeight: 'var(--line-height-text-sm)',
        color: 'var(--text-tertiary)',
        padding: 0,
      }}
    >
      Later
    </button>
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 'var(--font-weight-semibold)' as unknown as number,
        fontSize: 'var(--font-size-text-sm)',
        lineHeight: 'var(--line-height-text-sm)',
        color: 'var(--text-brand-secondary)',
        padding: 0,
      }}
    >
      Install now
    </button>
  </>
);

const CancelUploadActions = (
  <>
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 'var(--font-weight-semibold)' as unknown as number,
        fontSize: 'var(--font-size-text-sm)',
        lineHeight: 'var(--line-height-text-sm)',
        color: 'var(--text-tertiary)',
        padding: 0,
      }}
    >
      Cancel
    </button>
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family-body)',
        fontWeight: 'var(--font-weight-semibold)' as unknown as number,
        fontSize: 'var(--font-size-text-sm)',
        lineHeight: 'var(--line-height-text-sm)',
        color: 'var(--text-brand-secondary)',
        padding: 0,
      }}
    >
      Upload another
    </button>
  </>
);

/* ----------------------------------------------------------------
   Constants
   ---------------------------------------------------------------- */
const TYPES = [
  'primary',
  'image',
  'gray',
  'error',
  'warning',
  'success',
  'plain',
  'progress',
] as const;

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [...TYPES],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    onClose: { action: 'close' },
  },
  args: {
    title: "We've just released a new update!",
    description:
      'Check out the all new dashboard view. Pages and exports now load faster.',
    type: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

/* ----------------------------------------------------------------
   Default (interactive with controls)
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Primary Icon
   ---------------------------------------------------------------- */
export const PrimaryIcon: Story = {
  args: {
    type: 'primary',
    title: "We've just released a new update!",
    description:
      'Check out the all new dashboard view. Pages and exports now load faster.',
    actions: DismissChangelogActions,
  },
};

/* ----------------------------------------------------------------
   Image
   ---------------------------------------------------------------- */
export const Image: Story = {
  args: {
    type: 'image',
    title: "We've just released a new update!",
    description:
      'Check out the all new dashboard view. Pages and exports now load faster.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320&h=320&fit=crop',
    actions: DismissChangelogActions,
  },
};

/* ----------------------------------------------------------------
   Gray Icon
   ---------------------------------------------------------------- */
export const GrayIcon: Story = {
  args: {
    type: 'gray',
    title: 'Version 1.4.1 is now available',
    description:
      'Includes the all new dashboard view. Pages and exports will now load faster.',
    icon: CodepenIcon,
    actions: LaterInstallActions,
  },
};

/* ----------------------------------------------------------------
   Error Icon
   ---------------------------------------------------------------- */
export const ErrorIcon: Story = {
  args: {
    type: 'error',
    title: 'This project has been unpublished',
    description:
      'Removing all users has unpublished this project. Add users to republish.',
    actions: UndoAction,
  },
};

/* ----------------------------------------------------------------
   Warning Icon
   ---------------------------------------------------------------- */
export const WarningIcon: Story = {
  args: {
    type: 'warning',
    title: 'This project has been unpublished',
    description:
      'Removing all users has unpublished this project. Add users to republish.',
    actions: UndoAction,
  },
};

/* ----------------------------------------------------------------
   Success Icon
   ---------------------------------------------------------------- */
export const SuccessIcon: Story = {
  args: {
    type: 'success',
    title: 'Successfully updated profile',
    description:
      'Your changes have been saved and your profile is live. Your team can make edits.',
    actions: DismissViewChangesActions,
  },
};

/* ----------------------------------------------------------------
   No Icon (plain)
   ---------------------------------------------------------------- */
export const NoIcon: Story = {
  args: {
    type: 'plain',
    title: 'Updates have been made to your profile',
    description:
      'Your team has made changes to your company profile since you last logged in.',
    actions: DismissViewChangesActions,
  },
};

/* ----------------------------------------------------------------
   Progress Indicator
   ---------------------------------------------------------------- */
export const ProgressIndicator: Story = {
  args: {
    type: 'progress',
    title: "Uploading 'website-FINAL06.fig'",
    description: 'Please wait while we upload your file.',
    progress: 60,
    actions: CancelUploadActions,
  },
};

/* ----------------------------------------------------------------
   Without Description
   ---------------------------------------------------------------- */
export const WithoutDescription: Story = {
  args: {
    type: 'primary',
    title: "We've just released a new update!",
    description: undefined,
  },
};

/* ----------------------------------------------------------------
   Without Close Button
   ---------------------------------------------------------------- */
export const WithoutCloseButton: Story = {
  args: {
    type: 'success',
    title: 'Successfully updated profile',
    description: 'Your changes have been saved.',
    onClose: undefined,
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink — all types
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 440 }}>
      <Notification
        type="primary"
        title="We've just released a new update!"
        description="Check out the all new dashboard view. Pages and exports now load faster."
        actions={DismissChangelogActions}
        onClose={args.onClose}
      />
      <Notification
        type="image"
        title="We've just released a new update!"
        description="Check out the all new dashboard view. Pages and exports now load faster."
        image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320&h=320&fit=crop"
        actions={DismissChangelogActions}
        onClose={args.onClose}
      />
      <Notification
        type="gray"
        title="Version 1.4.1 is now available"
        description="Includes the all new dashboard view. Pages and exports will now load faster."
        icon={CodepenIcon}
        actions={LaterInstallActions}
        onClose={args.onClose}
      />
      <Notification
        type="error"
        title="This project has been unpublished"
        description="Removing all users has unpublished this project. Add users to republish."
        actions={UndoAction}
        onClose={args.onClose}
      />
      <Notification
        type="warning"
        title="This project has been unpublished"
        description="Removing all users has unpublished this project. Add users to republish."
        actions={UndoAction}
        onClose={args.onClose}
      />
      <Notification
        type="success"
        title="Successfully updated profile"
        description="Your changes have been saved and your profile is live. Your team can make edits."
        actions={DismissViewChangesActions}
        onClose={args.onClose}
      />
      <Notification
        type="plain"
        title="Updates have been made to your profile"
        description="Your team has made changes to your company profile since you last logged in."
        actions={DismissViewChangesActions}
        onClose={args.onClose}
      />
      <Notification
        type="progress"
        title="Uploading 'website-FINAL06.fig'"
        description="Please wait while we upload your file."
        progress={60}
        actions={CancelUploadActions}
        onClose={args.onClose}
      />
    </div>
  ),
};
