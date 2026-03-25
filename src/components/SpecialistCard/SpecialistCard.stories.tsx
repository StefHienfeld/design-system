import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpecialistCard } from './SpecialistCard';

const meta: Meta<typeof SpecialistCard> = {
  title: 'Part 3 — Website/SpecialistCard',
  component: SpecialistCard,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SpecialistCard>;

export const Default: Story = {
  args: {
    name: 'Marieke van den Berg',
    role: 'Verzekeringsadviseur Particulieren',
    photoSrc: 'https://placehold.co/200x200/e8f4fd/1a73e8?text=MvdB',
    phone: '020 – 123 45 67',
    email: 'marieke.vandenberg@hienfeld.nl',
  },
};

export const WithoutPhoto: Story = {
  args: {
    name: 'Jan de Vries',
    role: 'Zakelijk Risicoadviseur',
    phone: '020 – 765 43 21',
    email: 'jan.devries@hienfeld.nl',
  },
};
