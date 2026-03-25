import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlowHeader } from './FlowHeader';
import { ProgressSteps } from '../ProgressSteps';
import { Logo } from '../Logo';
import { Button } from '../Button';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof FlowHeader> = {
  title: 'Components/FlowHeader',
  component: FlowHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: { control: 'text' },
    onBack: { action: 'onBack' },
    onClose: { action: 'onClose' },
  },
};

export default meta;
type Story = StoryObj<typeof FlowHeader>;

/* ----------------------------------------------------------------
   Sample stepper data
   ---------------------------------------------------------------- */
const wizardSteps = [
  { label: 'Your details' },
  { label: 'Company details' },
  { label: 'Invite your team' },
  { label: 'Review' },
];

/* ----------------------------------------------------------------
   Stories: With Stepper
   ---------------------------------------------------------------- */
export const WithStepper: Story = {
  name: 'With Stepper',
  args: {
    logo: <Logo />,
    onClose: () => {},
    stepper: (
      <ProgressSteps
        steps={wizardSteps}
        currentStep={1}
        layout="horizontal"
        type="number"
        size="sm"
      />
    ),
  },
};

export const WithStepperStep3: Story = {
  name: 'With Stepper (step 3)',
  args: {
    logo: <Logo />,
    onClose: () => {},
    stepper: (
      <ProgressSteps
        steps={wizardSteps}
        currentStep={2}
        layout="horizontal"
        type="number"
        size="sm"
      />
    ),
  },
};

/* ----------------------------------------------------------------
   Stories: With Title
   ---------------------------------------------------------------- */
export const WithTitle: Story = {
  name: 'With Title',
  args: {
    logo: <Logo />,
    title: 'Create new policy',
    onClose: () => {},
  },
};

/* ----------------------------------------------------------------
   Stories: With Back Button
   ---------------------------------------------------------------- */
export const WithBackButton: Story = {
  name: 'With Back Button',
  args: {
    onBack: () => {},
    title: 'Policy details',
    onClose: () => {},
  },
};

/* ----------------------------------------------------------------
   Stories: With Actions
   ---------------------------------------------------------------- */
export const WithActions: Story = {
  name: 'With Actions',
  args: {
    logo: <Logo />,
    title: 'Review submission',
    onClose: () => {},
    actions: (
      <>
        <Button size="sm" hierarchy="secondary">
          Save draft
        </Button>
        <Button size="sm" hierarchy="primary">
          Submit
        </Button>
      </>
    ),
  },
};

/* ----------------------------------------------------------------
   Stories: Minimal (logo + close only)
   ---------------------------------------------------------------- */
export const Minimal: Story = {
  name: 'Minimal',
  args: {
    logo: <Logo />,
    onClose: () => {},
  },
};

/* ----------------------------------------------------------------
   Stories: Logo Only (no close)
   ---------------------------------------------------------------- */
export const LogoOnly: Story = {
  name: 'Logo Only',
  args: {
    logo: <Logo />,
    title: 'Welcome',
  },
};

/* ----------------------------------------------------------------
   Kitchen Sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Logo + Stepper + Close
        </div>
        <FlowHeader
          logo={<Logo />}
          stepper={
            <ProgressSteps
              steps={wizardSteps}
              currentStep={1}
              layout="horizontal"
              type="number"
              size="sm"
            />
          }
          onClose={() => {}}
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Logo + Title + Close
        </div>
        <FlowHeader
          logo={<Logo />}
          title="Create new policy"
          onClose={() => {}}
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Back Button + Title + Close
        </div>
        <FlowHeader
          onBack={() => {}}
          title="Policy details"
          onClose={() => {}}
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Logo + Title + Actions + Close
        </div>
        <FlowHeader
          logo={<Logo />}
          title="Review submission"
          onClose={() => {}}
          actions={
            <>
              <Button size="sm" hierarchy="secondary">
                Save draft
              </Button>
              <Button size="sm" hierarchy="primary">
                Submit
              </Button>
            </>
          }
        />
      </div>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', color: '#717680' }}>
          Minimal (Logo + Close)
        </div>
        <FlowHeader
          logo={<Logo />}
          onClose={() => {}}
        />
      </div>
    </div>
  ),
};
