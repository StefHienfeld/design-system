import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Part 3 — Website/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    label: 'Autoverzekering',
    imageSrc: 'https://placehold.co/400x300/e8f4fd/1a73e8?text=Auto',
    imageAlt: 'Autoverzekering afbeelding',
    href: '#autoverzekering',
  },
};

export const WithColorDot: Story = {
  args: {
    label: 'Reisverzekering',
    imageSrc: 'https://placehold.co/400x300/fdf4e8/e8871a?text=Reis',
    imageAlt: 'Reisverzekering afbeelding',
    href: '#reisverzekering',
    colorDot: '#e8871a',
  },
};
