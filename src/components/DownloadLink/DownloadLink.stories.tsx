import type { Meta, StoryObj } from '@storybook/react-vite';
import { DownloadLink } from './DownloadLink';

const meta: Meta<typeof DownloadLink> = {
  title: 'Part 3 — Website/DownloadLink',
  component: DownloadLink,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DownloadLink>;

export const Default: Story = {
  args: {
    label: 'Algemene voorwaarden autoverzekering (PDF)',
    href: '/docs/algemene-voorwaarden-auto.pdf',
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DownloadLink
        label="Algemene voorwaarden autoverzekering (PDF)"
        href="/docs/algemene-voorwaarden-auto.pdf"
      />
      <DownloadLink
        label="Polisblad reisverzekering 2026 (PDF)"
        href="/docs/polisblad-reis-2026.pdf"
      />
      <DownloadLink
        label="Productinformatiedocument inboedel (PDF)"
        href="/docs/pid-inboedel.pdf"
      />
    </div>
  ),
};
