import './WebsiteFooter.css';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface WebsiteFooterProps {
  columns: FooterColumn[];
  logo?: React.ReactNode;
  copyrightText?: string;
  barLinks?: { label: string; href: string }[];
  className?: string;
}

export function WebsiteFooter({
  columns,
  logo,
  copyrightText,
  barLinks = [],
  className = '',
}: WebsiteFooterProps) {
  return (
    <footer className={`website-footer ${className}`}>
      <div className="website-footer__columns">
        {columns.map((col) => (
          <div key={col.title} className="website-footer__column">
            <h3 className="website-footer__column-title">{col.title}</h3>
            <ul className="website-footer__column-list">
              {col.links.map((link) => (
                <li key={link.href}>
                  <a className="website-footer__column-link" href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="website-footer__bar">
        <div className="website-footer__bar-inner">
          {logo && <div className="website-footer__bar-logo">{logo}</div>}
          {copyrightText && <span className="website-footer__bar-text">{copyrightText}</span>}
          {barLinks.length > 0 && (
            <div className="website-footer__bar-links">
              {barLinks.map((link) => (
                <a key={link.href} className="website-footer__bar-link" href={link.href}>{link.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
