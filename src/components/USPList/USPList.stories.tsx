import type { Meta, StoryObj } from '@storybook/react-vite';
import { USPList } from './USPList';

const meta: Meta<typeof USPList> = {
  title: 'Part 3 — Website/USPList',
  component: USPList,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof USPList>;

export const Default: Story = {
  args: {
    items: [
      'Meer dan 25 jaar ervaring in verzekeringsadvies',
      'Altijd bereikbaar via telefoon, e-mail of chat',
      'Snelle schadeafhandeling binnen 5 werkdagen',
      'Geen verborgen kosten of ingewikkelde polisvoorwaarden',
      'Erkend door het Verbond van Verzekeraars',
    ],
  },
};

export const ThreeItems: Story = {
  args: {
    items: [
      'Persoonlijk advies van onze specialisten',
      'Direct online afsluiten, geen papierwerk',
      'Gratis wijzigingen doorvoeren via Mijn Hienfeld',
    ],
  },
};
