import type { Meta, StoryObj } from '@storybook/react-vite';
import { WebsiteFooter } from './WebsiteFooter';

const meta: Meta<typeof WebsiteFooter> = {
  title: 'Part 3 — Website/WebsiteFooter',
  component: WebsiteFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof WebsiteFooter>;

const columns = [
  {
    title: 'Verzekeringen',
    links: [
      { label: 'Autoverzekering', href: '#auto' },
      { label: 'Reisverzekering', href: '#reis' },
      { label: 'Inboedelverzekering', href: '#inboedel' },
      { label: 'Zorgverzekering', href: '#zorg' },
    ],
  },
  {
    title: 'Klantenservice',
    links: [
      { label: 'Schade melden', href: '#schade' },
      { label: 'Veelgestelde vragen', href: '#faq' },
      { label: 'Contact opnemen', href: '#contact' },
    ],
  },
  {
    title: 'Over ons',
    links: [
      { label: 'Ons verhaal', href: '#over-ons' },
      { label: 'Werken bij Hienfeld', href: '#vacatures' },
      { label: 'Nieuws', href: '#nieuws' },
    ],
  },
  {
    title: 'Zakelijk',
    links: [
      { label: 'Bedrijfsverzekeringen', href: '#zakelijk' },
      { label: 'Risicobeheer', href: '#risico' },
      { label: 'Partners', href: '#partners' },
    ],
  },
];

export const Default: Story = {
  args: {
    columns,
    logo: <strong style={{ fontSize: 20 }}>Hienfeld</strong>,
    copyrightText: '© 2026 Hienfeld B.V. Alle rechten voorbehouden.',
    barLinks: [
      { label: 'Privacyverklaring', href: '#privacy' },
      { label: 'Cookiebeleid', href: '#cookies' },
      { label: 'Algemene voorwaarden', href: '#voorwaarden' },
    ],
  },
};
