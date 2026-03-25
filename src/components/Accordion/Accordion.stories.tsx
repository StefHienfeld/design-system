import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Part 3 — Website/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const sampleItems = [
  {
    id: 'item-1',
    title: 'Wat is er gedekt bij mijn autoverzekering?',
    content:
      'Uw autoverzekering dekt schade aan uw eigen voertuig bij aanrijdingen, brand en diefstal. Schade aan derden wordt gedekt via de wettelijk verplichte aansprakelijkheidsverzekering (WA).',
  },
  {
    id: 'item-2',
    title: 'Hoe meld ik een schade?',
    content:
      'U kunt een schade melden via ons online schadeformulier, telefonisch via 020 – 123 45 67 of persoonlijk bij een van onze kantoren. Zorg dat u het polisnummer en een foto van de schade bij de hand heeft.',
  },
  {
    id: 'item-3',
    title: 'Kan ik mijn verzekering tussentijds wijzigen?',
    content:
      'Ja, u kunt uw verzekering op ieder gewenst moment wijzigen. Wijzigingen gaan in op de datum die u aangeeft, mits dit in de toekomst ligt. Neem contact op met ons voor de mogelijkheden.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    allowMultiple: false,
  },
};

export const AllowMultiple: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
  },
};
