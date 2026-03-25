import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTALink } from './CTALink';

const ArrowRightIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
    <path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof CTALink> = {
  title: 'Part 3 — Website/CTALink',
  component: CTALink,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CTALink>;

export const Default: Story = {
  args: {
    children: 'Meer informatie over autoverzekering',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Bekijk alle verzekeringen',
    icon: ArrowRightIcon,
  },
};

export const AsLink: Story = {
  args: {
    children: 'Ga naar onze verzekeringsoverzicht',
    href: '#verzekeringen',
    icon: ArrowRightIcon,
  },
};
