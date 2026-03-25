import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: 'select',
      options: ['none', 'dot', 'avatar'],
    },
    action: {
      control: 'select',
      options: ['text-only', 'x-close', 'count'],
    },
    checkbox: { control: 'boolean' },
    checked: { control: 'boolean' },
    count: { control: 'number' },
    avatar: { control: 'text' },
  },
  args: {
    children: 'Tag',
    size: 'md',
    icon: 'none',
    action: 'text-only',
    checkbox: false,
    checked: false,
    count: 5,
    avatar: 'https://i.pravatar.cc/40?u=tag',
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

/* ----------------------------------------------------------------
   Placeholder avatar URL
   ---------------------------------------------------------------- */
const AVATAR_URL = 'https://i.pravatar.cc/40?u=tag';

/* ----------------------------------------------------------------
   Basic variants
   ---------------------------------------------------------------- */
export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

/* ----------------------------------------------------------------
   Icon variants
   ---------------------------------------------------------------- */
export const WithDot: Story = {
  args: { icon: 'dot', children: 'Status' },
};

export const WithAvatar: Story = {
  args: { icon: 'avatar', avatar: AVATAR_URL, children: 'User' },
};

/* ----------------------------------------------------------------
   Action variants
   ---------------------------------------------------------------- */
export const WithClose: Story = {
  args: { action: 'x-close', children: 'Removable' },
};

export const WithCount: Story = {
  args: { action: 'count', count: 12, children: 'Messages' },
};

/* ----------------------------------------------------------------
   Checkbox
   ---------------------------------------------------------------- */
export const Checkbox: Story = {
  args: { checkbox: true, children: 'Selectable' },
};

export const CheckboxChecked: Story = {
  args: { checkbox: true, checked: true, children: 'Selected' },
};

/* ----------------------------------------------------------------
   All sizes
   ---------------------------------------------------------------- */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

/* ----------------------------------------------------------------
   All icons across sizes
   ---------------------------------------------------------------- */
export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            Size: {size}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag size={size} icon="none">No icon</Tag>
            <Tag size={size} icon="dot">Dot</Tag>
            <Tag size={size} icon="avatar" avatar={AVATAR_URL}>Avatar</Tag>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   All actions across sizes
   ---------------------------------------------------------------- */
export const AllActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            Size: {size}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag size={size} action="text-only">Text only</Tag>
            <Tag size={size} action="x-close">Close</Tag>
            <Tag size={size} action="count" count={5}>Count</Tag>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Checkbox variants
   ---------------------------------------------------------------- */
export const CheckboxStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#717680',
            }}
          >
            Size: {size}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag size={size} checkbox>Unchecked</Tag>
            <Tag size={size} checkbox checked>Checked</Tag>
            <Tag size={size} checkbox icon="dot">Dot + checkbox</Tag>
            <Tag size={size} checkbox checked icon="dot">Dot + checked</Tag>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ----------------------------------------------------------------
   Kitchen sink — all combinations
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    const icons = ['none', 'dot', 'avatar'] as const;
    const actions = ['text-only', 'x-close', 'count'] as const;
    const checkboxStates = [false, true] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {sizes.map((size) => (
          <div key={size}>
            <div
              style={{
                marginBottom: 12,
                fontWeight: 700,
                fontSize: 14,
                textTransform: 'uppercase',
                color: '#414651',
                borderBottom: '1px solid #e9eaeb',
                paddingBottom: 8,
              }}
            >
              Size: {size}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {icons.map((icon) => (
                <div key={icon}>
                  <div
                    style={{
                      marginBottom: 8,
                      fontWeight: 600,
                      fontSize: 12,
                      textTransform: 'uppercase',
                      color: '#717680',
                    }}
                  >
                    Icon: {icon}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {actions.map((action) =>
                      checkboxStates.map((cb) => (
                        <Tag
                          key={`${action}-cb${cb}`}
                          size={size}
                          icon={icon}
                          action={action}
                          checkbox={cb}
                          checked={cb}
                          count={7}
                          avatar={AVATAR_URL}
                        >
                          {[
                            size,
                            icon !== 'none' ? icon : null,
                            action !== 'text-only' ? action : null,
                            cb ? 'chk' : null,
                          ]
                            .filter(Boolean)
                            .join(' / ') || size}
                        </Tag>
                      )),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
