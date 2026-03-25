import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionContainer } from './SectionContainer';

const meta: Meta<typeof SectionContainer> = {
  title: 'Part 3 — Website/SectionContainer',
  component: SectionContainer,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SectionContainer>;

const GridChildren = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
    }}
  >
    {['Autoverzekering', 'Reisverzekering', 'Inboedelverzekering'].map((label) => (
      <div
        key={label}
        style={{
          background: '#e8f4fd',
          borderRadius: 8,
          padding: '32px 24px',
          textAlign: 'center',
          fontWeight: 600,
          color: '#1a73e8',
        }}
      >
        {label}
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    children: <GridChildren />,
    noPadding: false,
  },
};

export const NoPadding: Story = {
  args: {
    children: <GridChildren />,
    noPadding: true,
  },
};
