import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

/* ----------------------------------------------------------------
   Icon SVGs for featured-icon stories
   ---------------------------------------------------------------- */
const CheckIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertTriangleIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XCircleIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 9l-6 6m0-6l6 6m7-3a10 10 0 11-20 0 10 10 0 0120 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 16v-4m0-4h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ----------------------------------------------------------------
   Helper wrapper for interactive stories
   ---------------------------------------------------------------- */
const ModalDemo: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  title?: string;
  description?: string;
  children?: React.ReactNode;
  buttonLabel?: string;
  icon?: React.ReactNode;
  iconColor?: 'brand' | 'success' | 'warning' | 'error';
  footer?: React.ReactNode;
  showFooter?: boolean;
}> = ({
  size = 'md',
  title = 'Modal title',
  description,
  children,
  buttonLabel = 'Open Modal',
  icon,
  iconColor,
  footer,
  showFooter = false,
}) => {
  const [open, setOpen] = React.useState(false);

  const defaultFooter = showFooter ? (
    <>
      <Button hierarchy="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button hierarchy="primary" onClick={() => setOpen(false)}>
        Confirm
      </Button>
    </>
  ) : undefined;

  return (
    <>
      <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        size={size}
        icon={icon}
        iconColor={iconColor}
        footer={footer ?? defaultFooter}
      >
        {children || (
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: '20px' }}>
            This is the modal content area. You can place any content here,
            including forms, text, images, or other components.
          </p>
        )}
      </Modal>
    </>
  );
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    iconColor: {
      control: 'select',
      options: ['brand', 'success', 'warning', 'error'],
    },
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/* ----------------------------------------------------------------
   Stories — Sizes
   ---------------------------------------------------------------- */
export const Default: Story = {
  render: () => <ModalDemo showFooter />,
};

export const Small: Story = {
  render: () => (
    <ModalDemo
      size="sm"
      title="Delete item?"
      description="This action cannot be undone. Are you sure you want to proceed?"
      buttonLabel="Open Small"
      showFooter
    />
  ),
};

export const Medium: Story = {
  render: () => (
    <ModalDemo
      size="md"
      title="Edit policy"
      description="Update the policy details below."
      buttonLabel="Open Medium"
      showFooter
    />
  ),
};

export const Large: Story = {
  render: () => (
    <ModalDemo
      size="lg"
      title="Policy overview"
      description="Review all policy information before submitting."
      buttonLabel="Open Large"
      showFooter
    />
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <ModalDemo
      size="xl"
      title="Detailed report"
      description="Review the detailed report data below before exporting."
      buttonLabel="Open XL"
      showFooter
    />
  ),
};

export const TwoExtraLarge: Story = {
  render: () => (
    <ModalDemo
      size="2xl"
      title="Comprehensive overview"
      description="This wider modal is suited for complex content such as tables, comparisons, or multi-column layouts."
      buttonLabel="Open 2XL"
      showFooter
    />
  ),
};

/* ----------------------------------------------------------------
   Stories — Icon header variants
   ---------------------------------------------------------------- */
export const IconSuccess: Story = {
  render: () => (
    <ModalDemo
      title="Blog post published"
      description="This blog post has been published. Team members will be able to edit this post and republish changes."
      icon={CheckIcon}
      iconColor="success"
      buttonLabel="Open Success"
      showFooter
    />
  ),
};

export const IconWarning: Story = {
  render: () => (
    <ModalDemo
      title="Unsaved changes"
      description="You have unsaved changes that will be lost if you navigate away. Do you want to save before leaving?"
      icon={AlertTriangleIcon}
      iconColor="warning"
      buttonLabel="Open Warning"
      showFooter
    />
  ),
};

export const IconError: Story = {
  render: () => (
    <ModalDemo
      title="Delete account"
      description="Are you sure you want to delete your account? This action is permanent and cannot be undone."
      icon={XCircleIcon}
      iconColor="error"
      buttonLabel="Open Error"
      showFooter
    />
  ),
};

export const IconBrand: Story = {
  render: () => (
    <ModalDemo
      title="New feature available"
      description="We have added a new feature to help you manage your policies more efficiently. Click below to learn more."
      icon={InfoIcon}
      iconColor="brand"
      buttonLabel="Open Brand"
      showFooter
    />
  ),
};

/* ----------------------------------------------------------------
   Stories — Footer
   ---------------------------------------------------------------- */
export const WithFooter: Story = {
  render: () => (
    <ModalDemo
      title="Confirm submission"
      description="Please review all details before confirming. This action will send the application for processing."
      buttonLabel="Open with Footer"
      showFooter
    />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ModalDemo
      title="Confirm submission"
      description="Please review all details before confirming. This action will send the application for processing."
    />
  ),
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (no title)</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <Button hierarchy="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          }
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: '20px' }}>
            A modal without a title or description, just content.
          </p>
        </Modal>
      </>
    );
  },
};

/* ----------------------------------------------------------------
   Stories — Combined / Kitchen Sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <ModalDemo size="sm" title="Small modal" buttonLabel="Small" showFooter />
      <ModalDemo size="md" title="Medium modal" description="With a description." buttonLabel="Medium" showFooter />
      <ModalDemo size="lg" title="Large modal" description="Large with more room." buttonLabel="Large" showFooter />
      <ModalDemo size="xl" title="XL modal" description="Extra large layout." buttonLabel="XL" showFooter />
      <ModalDemo size="2xl" title="2XL modal" description="Widest available." buttonLabel="2XL" showFooter />
    </div>
  ),
};

export const IconWithXLSize: Story = {
  render: () => (
    <ModalDemo
      size="xl"
      title="Blog post published"
      description="This blog post has been published. Team members will be able to edit this post and republish changes."
      icon={CheckIcon}
      iconColor="success"
      buttonLabel="XL + Icon"
      showFooter
    />
  ),
};
