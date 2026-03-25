import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroSection } from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Part 3 — Website/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    title: 'Verzeker wat u dierbaar is',
    subtitle:
      'Hienfeld biedt betrouwbare verzekeringen voor particulieren en bedrijven. Vergelijk eenvoudig en sluit direct online af.',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Vind de juiste verzekering voor u',
    subtitle: 'Meer dan 200.000 tevreden klanten gingen u voor. Ontdek ons aanbod en bereken uw premie.',
    actions: (
      <div style={{ display: 'flex', gap: 12 }}>
        <a
          href="#berekenen"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#1a73e8',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Bereken uw premie
        </a>
        <a
          href="#meer-info"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            border: '1.5px solid #1a73e8',
            color: '#1a73e8',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Meer informatie
        </a>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    title: 'Beschermd onderweg, thuis en overal',
    subtitle: 'Sluit vandaag nog uw autoverzekering af en rijd morgen al volledig verzekerd.',
    actions: (
      <a
        href="#afsluiten"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#1a73e8',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Direct afsluiten
      </a>
    ),
    image: (
      <img
        src="https://placehold.co/560x400/e8f4fd/1a73e8?text=Verzekering"
        alt="Verzekering illustratie"
        style={{ width: '100%', borderRadius: 12 }}
      />
    ),
  },
};
