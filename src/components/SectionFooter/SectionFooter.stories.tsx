import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionFooter } from './SectionFooter';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

/* ----------------------------------------------------------------
   Placeholder icon — plus icon for the ButtonGroup "Custom" segment
   ---------------------------------------------------------------- */
const PlusIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4v12m-6-6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ----------------------------------------------------------------
   Shared helpers for stories
   ---------------------------------------------------------------- */
const sampleButtonGroup = (
  <ButtonGroup
    items={[
      { label: '12 months' },
      { label: '30 days' },
      { label: '7 days' },
      { icon: PlusIcon, label: 'Custom' },
    ]}
  />
);

const sampleActions = (
  <>
    <Button hierarchy="tertiary" size="md">Tertiary</Button>
    <Button hierarchy="secondary" size="md">Secondary</Button>
    <Button hierarchy="primary" size="md">Primary</Button>
  </>
);

const sampleSecondaryAction = {
  label: 'Learn more',
  onClick: () => console.log('Secondary action clicked'),
};

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof SectionFooter> = {
  title: 'Components/SectionFooter',
  component: SectionFooter,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['section', 'card'],
    },
    divider: { control: 'boolean' },
  },
  args: {
    type: 'section',
    divider: true,
  },
};

export default meta;
type Story = StoryObj<typeof SectionFooter>;

/* ----------------------------------------------------------------
   Section — all slots
   ---------------------------------------------------------------- */
export const SectionWithAll: Story = {
  args: {
    type: 'section',
    divider: true,
    buttonGroup: sampleButtonGroup,
    secondaryAction: sampleSecondaryAction,
    actions: sampleActions,
  },
};

/* ----------------------------------------------------------------
   Section — without button group
   ---------------------------------------------------------------- */
export const SectionWithoutButtonGroup: Story = {
  args: {
    type: 'section',
    divider: true,
    secondaryAction: sampleSecondaryAction,
    actions: sampleActions,
  },
};

/* ----------------------------------------------------------------
   Section — actions only
   ---------------------------------------------------------------- */
export const SectionActionsOnly: Story = {
  args: {
    type: 'section',
    divider: true,
    actions: sampleActions,
  },
};

/* ----------------------------------------------------------------
   Section — without divider
   ---------------------------------------------------------------- */
export const SectionNoDivider: Story = {
  args: {
    type: 'section',
    divider: false,
    buttonGroup: sampleButtonGroup,
    secondaryAction: sampleSecondaryAction,
    actions: sampleActions,
  },
};

/* ----------------------------------------------------------------
   Card — all slots
   ---------------------------------------------------------------- */
export const CardWithAll: Story = {
  args: {
    type: 'card',
    divider: true,
    buttonGroup: sampleButtonGroup,
    secondaryAction: sampleSecondaryAction,
    actions: sampleActions,
  },
};

/* ----------------------------------------------------------------
   Card — without button group
   ---------------------------------------------------------------- */
export const CardWithoutButtonGroup: Story = {
  args: {
    type: 'card',
    divider: true,
    secondaryAction: sampleSecondaryAction,
    actions: sampleActions,
  },
};

/* ----------------------------------------------------------------
   Card — actions only
   ---------------------------------------------------------------- */
export const CardActionsOnly: Story = {
  args: {
    type: 'card',
    divider: true,
    actions: sampleActions,
  },
};

/* ----------------------------------------------------------------
   Card — without divider
   ---------------------------------------------------------------- */
export const CardNoDivider: Story = {
  args: {
    type: 'card',
    divider: false,
    buttonGroup: sampleButtonGroup,
    secondaryAction: sampleSecondaryAction,
    actions: sampleActions,
  },
};

/* ----------------------------------------------------------------
   All variants side-by-side
   ---------------------------------------------------------------- */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Section — with button group + secondary + actions
        </div>
        <SectionFooter
          type="section"
          divider
          buttonGroup={sampleButtonGroup}
          secondaryAction={sampleSecondaryAction}
          actions={sampleActions}
        />
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Section — secondary + actions (no button group)
        </div>
        <SectionFooter
          type="section"
          divider
          secondaryAction={sampleSecondaryAction}
          actions={sampleActions}
        />
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Card — with button group + secondary + actions
        </div>
        <div style={{ border: '1px solid #e9eaeb', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px 0' }}>
            <p style={{ color: '#717680', fontSize: 14 }}>Card content area</p>
          </div>
          <SectionFooter
            type="card"
            divider
            buttonGroup={sampleButtonGroup}
            secondaryAction={sampleSecondaryAction}
            actions={sampleActions}
          />
        </div>
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Card — secondary + actions (no button group, no divider)
        </div>
        <div style={{ border: '1px solid #e9eaeb', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px 0' }}>
            <p style={{ color: '#717680', fontSize: 14 }}>Card content area</p>
          </div>
          <SectionFooter
            type="card"
            divider={false}
            secondaryAction={sampleSecondaryAction}
            actions={sampleActions}
          />
        </div>
      </div>
    </div>
  ),
};
