import type { Meta, StoryObj } from '@storybook/react-vite';
import { WebsiteNav } from './WebsiteNav';

const meta: Meta<typeof WebsiteNav> = {
  title: 'Part 3 — Website/WebsiteNav',
  component: WebsiteNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof WebsiteNav>;

const baseLinks = [
  { label: 'Verzekeringen', href: '#verzekeringen' },
  { label: 'Schade melden', href: '#schade' },
  { label: 'Over ons', href: '#over-ons' },
  { label: 'Contact', href: '#contact' },
];

const logo = <strong style={{ fontSize: 20 }}>Hienfeld</strong>;

export const Default: Story = {
  args: {
    logo,
    links: baseLinks,
    actions: [
      { label: 'Mijn Hienfeld', href: '#login' },
    ],
  },
};

export const WithActiveLink: Story = {
  args: {
    logo,
    links: [
      { label: 'Verzekeringen', href: '#verzekeringen', active: true },
      { label: 'Schade melden', href: '#schade' },
      { label: 'Over ons', href: '#over-ons' },
      { label: 'Contact', href: '#contact' },
    ],
    actions: [
      { label: 'Mijn Hienfeld', href: '#login' },
    ],
  },
};
