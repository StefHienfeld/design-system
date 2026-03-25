import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SlideoutMenu } from './SlideoutMenu';
import { Button } from '../Button/Button';

/* ----------------------------------------------------------------
   Helper wrapper for interactive stories
   ---------------------------------------------------------------- */
const SlideoutDemo: React.FC<{
  title?: string;
  width?: number | string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  buttonLabel?: string;
}> = ({
  title = 'Panel heading',
  width,
  footer,
  children,
  buttonLabel = 'Open Slideout',
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>
      <SlideoutMenu
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        width={width}
        footer={
          footer ?? (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button hierarchy="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button hierarchy="primary" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </div>
          )
        }
      >
        {children || (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <p style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', color: 'var(--text-primary)', marginBottom: 4 }}>
                Example content section
              </p>
              <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
                1 day
              </p>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border-secondary)', margin: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', color: 'var(--text-primary)', marginBottom: 4 }}>
                  Policy
                </p>
                <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--text-primary)' }}>
                  Company name
                </p>
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', color: 'var(--text-primary)', marginBottom: 4 }}>
                  Value
                </p>
                <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
                  &euro;0,00
                </p>
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', color: 'var(--text-primary)', marginBottom: 4 }}>
                  Time in status
                </p>
                <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
                  1 day
                </p>
              </div>
            </div>
          </div>
        )}
      </SlideoutMenu>
    </>
  );
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof SlideoutMenu> = {
  title: 'Components/SlideoutMenu',
  component: SlideoutMenu,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    width: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SlideoutMenu>;

/* ----------------------------------------------------------------
   Stories
   ---------------------------------------------------------------- */
export const Default: Story = {
  render: () => <SlideoutDemo />,
};

export const CustomWidth: Story = {
  render: () => (
    <SlideoutDemo
      title="Wide panel"
      width={640}
      buttonLabel="Open Wide (640px)"
    />
  ),
};

export const WithoutFooter: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (no footer)</Button>
        <SlideoutMenu
          open={open}
          onClose={() => setOpen(false)}
          title="No footer panel"
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: '20px' }}>
            This slideout panel has no footer. The content area fills all
            available space below the header.
          </p>
        </SlideoutMenu>
      </>
    );
  },
};

export const WithScrollableContent: Story = {
  render: () => (
    <SlideoutDemo title="Scrollable content" buttonLabel="Open Scrollable">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>
            <p style={{ fontWeight: 500, fontSize: 14, lineHeight: '20px', color: 'var(--text-primary)', marginBottom: 4 }}>
              Section {i + 1}
            </p>
            <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--text-tertiary)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    </SlideoutDemo>
  ),
};

export const WithoutTitle: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (no title)</Button>
        <SlideoutMenu
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button hierarchy="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          }
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: '20px' }}>
            A slideout panel without a title, just content and a close button.
          </p>
        </SlideoutMenu>
      </>
    );
  },
};

export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <SlideoutDemo title="Default width" buttonLabel="Default" />
      <SlideoutDemo title="Narrow panel" width={360} buttonLabel="Narrow (360px)" />
      <SlideoutDemo title="Wide panel" width={640} buttonLabel="Wide (640px)" />
    </div>
  ),
};
