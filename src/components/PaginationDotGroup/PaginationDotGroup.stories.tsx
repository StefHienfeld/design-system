import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaginationDotGroup } from './PaginationDotGroup';

/* ----------------------------------------------------------------
   Constants
   ---------------------------------------------------------------- */
const STYLES = ['dot', 'line'] as const;
const SIZES = ['md', 'lg'] as const;

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof PaginationDotGroup> = {
  title: 'Components/PaginationDotGroup',
  component: PaginationDotGroup,
  tags: ['autodocs'],
  argTypes: {
    total: { control: { type: 'number', min: 1, max: 10 } },
    current: { control: { type: 'number', min: 0, max: 9 } },
    style: { control: 'select', options: [...STYLES] },
    size: { control: 'select', options: [...SIZES] },
    framed: { control: 'boolean' },
  },
  args: {
    total: 3,
    current: 0,
    style: 'dot',
    size: 'md',
    framed: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PaginationDotGroup>;

/* ----------------------------------------------------------------
   Default
   ---------------------------------------------------------------- */
export const Default: Story = {};

/* ----------------------------------------------------------------
   Dot style — both sizes
   ---------------------------------------------------------------- */
export const DotSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
          <PaginationDotGroup total={3} current={0} style="dot" size={size} />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Line style — both sizes
   ---------------------------------------------------------------- */
export const LineSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
          <PaginationDotGroup total={3} current={0} style="line" size={size} />
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Framed variants
   ---------------------------------------------------------------- */
export const Framed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {STYLES.map((style) =>
        SIZES.map((size) => (
          <div key={`${style}-${size}`} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                width: 60,
                fontSize: 11,
                color: '#a4a7ae',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              {style} / {size}
            </span>
            <PaginationDotGroup total={3} current={0} style={style} size={size} framed />
          </div>
        )),
      )}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Interactive — controlled with onChange
   ---------------------------------------------------------------- */
export const Interactive: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <PaginationDotGroup
          total={5}
          current={current}
          style="dot"
          size="lg"
          framed
          onChange={setCurrent}
        />
        <div
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-text-sm)',
            color: 'var(--text-secondary)',
          }}
        >
          Current page: {current + 1} of 5
        </div>
      </div>
    );
  },
};

/* ----------------------------------------------------------------
   Interactive Lines
   ---------------------------------------------------------------- */
export const InteractiveLines: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <PaginationDotGroup
          total={3}
          current={current}
          style="line"
          size="lg"
          framed
          onChange={setCurrent}
        />
        <div
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-text-sm)',
            color: 'var(--text-secondary)',
          }}
        >
          Current page: {current + 1} of 3
        </div>
      </div>
    );
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink — all style x size x framed combinations
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {STYLES.map((style) => (
        <div key={style}>
          <div
            style={{
              marginBottom: 12,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            {style}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SIZES.map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span
                    style={{
                      width: 80,
                      fontSize: 11,
                      color: '#a4a7ae',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {size} / bare
                  </span>
                  <PaginationDotGroup total={3} current={0} style={style} size={size} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span
                    style={{
                      width: 80,
                      fontSize: 11,
                      color: '#a4a7ae',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {size} / framed
                  </span>
                  <PaginationDotGroup total={3} current={0} style={style} size={size} framed />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
