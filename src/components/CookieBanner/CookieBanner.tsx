import './CookieBanner.css';
import { Button } from '../Button';

export interface CookieBannerProps {
  text: React.ReactNode;
  onAccept: () => void;
  onDecline: () => void;
  acceptLabel?: string;
  declineLabel?: string;
  className?: string;
}

export function CookieBanner({
  text,
  onAccept,
  onDecline,
  acceptLabel = 'Accepteer alle cookies',
  declineLabel = 'Ik wil geen cookies',
  className = '',
}: CookieBannerProps) {
  return (
    <div className={`cookie-banner ${className}`} role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">{text}</div>
        <div className="cookie-banner__actions">
          <Button hierarchy="secondary" size="md" onClick={onDecline}>{declineLabel}</Button>
          <Button hierarchy="primary" size="md" onClick={onAccept}>{acceptLabel}</Button>
        </div>
      </div>
    </div>
  );
}
