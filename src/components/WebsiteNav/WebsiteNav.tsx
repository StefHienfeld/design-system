import './WebsiteNav.css';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface WebsiteNavProps {
  logo: React.ReactNode;
  links: NavLink[];
  actions?: NavAction[];
  className?: string;
}

export function WebsiteNav({ logo, links, actions = [], className = '' }: WebsiteNavProps) {
  return (
    <nav className={`website-nav ${className}`}>
      <div className="website-nav__inner">
        <div className="website-nav__logo">{logo}</div>
        <div className="website-nav__links">
          {links.map((link) => (
            <a
              key={link.href}
              className={`website-nav__link${link.active ? ' website-nav__link--active' : ''}`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        {actions.length > 0 && (
          <div className="website-nav__actions">
            {actions.map((action, i) => {
              const Tag = action.href ? 'a' : 'button';
              return (
                <Tag
                  key={i}
                  className="website-nav__action"
                  href={action.href}
                  onClick={action.onClick}
                  {...(Tag === 'button' ? { type: 'button' as const } : {})}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </Tag>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
