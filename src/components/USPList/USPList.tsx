import './USPList.css';

export interface USPListProps {
  items: string[];
  icon?: React.ReactNode;
  className?: string;
}

export function USPList({ items, icon, className = '' }: USPListProps) {
  const defaultIcon = (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <ul className={`usp-list ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="usp-list__item">
          <span className="usp-list__icon">{icon || defaultIcon}</span>
          <span className="usp-list__text">{item}</span>
        </li>
      ))}
    </ul>
  );
}
