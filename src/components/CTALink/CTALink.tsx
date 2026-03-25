import { forwardRef } from 'react';
import './CTALink.css';

export interface CTALinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const CTALink = forwardRef<HTMLAnchorElement, CTALinkProps>(
  ({ children, href, onClick, icon, className = '' }, ref) => {
    const Tag = href ? 'a' : 'button';
    return (
      <Tag
        ref={ref as any}
        className={`cta-link ${className}`}
        href={href}
        onClick={onClick}
        {...(Tag === 'button' ? { type: 'button' as const } : {})}
      >
        <span className="cta-link__text">{children}</span>
        {icon && <span className="cta-link__icon">{icon}</span>}
      </Tag>
    );
  },
);

CTALink.displayName = 'CTALink';
