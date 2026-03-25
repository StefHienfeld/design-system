import { forwardRef } from 'react';
import './DownloadLink.css';

export interface DownloadLinkProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
}

export const DownloadLink = forwardRef<HTMLAnchorElement, DownloadLinkProps>(
  ({ label, href, icon, className = '' }, ref) => {
    const defaultIcon = (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3v10m0 0l-4-4m4 4l4-4M3 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

    return (
      <a ref={ref} className={`download-link ${className}`} href={href} download>
        <span className="download-link__text">{label}</span>
        <span className="download-link__icon">{icon || defaultIcon}</span>
      </a>
    );
  },
);

DownloadLink.displayName = 'DownloadLink';
