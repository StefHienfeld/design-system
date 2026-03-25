import './SectionContainer.css';

export interface SectionContainerProps {
  children: React.ReactNode;
  noPadding?: boolean;
  as?: 'section' | 'div' | 'main';
  className?: string;
}

export function SectionContainer({
  children,
  noPadding = false,
  as: Tag = 'section',
  className = '',
}: SectionContainerProps) {
  return (
    <Tag className={`section-container${noPadding ? ' section-container--no-padding' : ''} ${className}`}>
      <div className="section-container__inner">{children}</div>
    </Tag>
  );
}
