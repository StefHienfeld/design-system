import type { Meta, StoryObj } from '@storybook/react-vite';
import { CookieBanner } from './CookieBanner';

const meta: Meta<typeof CookieBanner> = {
  title: 'Part 3 — Website/CookieBanner',
  component: CookieBanner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof CookieBanner>;

export const Default: Story = {
  args: {
    text: (
      <p>
        Wij gebruiken cookies om uw ervaring op onze website te verbeteren en om ons verkeer te analyseren.
        Lees meer in ons{' '}
        <a href="#cookiebeleid" style={{ color: 'inherit', textDecoration: 'underline' }}>
          cookiebeleid
        </a>
        .
      </p>
    ),
    acceptLabel: 'Accepteer alle cookies',
    declineLabel: 'Ik wil geen cookies',
    onAccept: () => alert('Cookies geaccepteerd'),
    onDecline: () => alert('Cookies geweigerd'),
  },
};
