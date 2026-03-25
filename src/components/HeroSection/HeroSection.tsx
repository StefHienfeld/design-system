import './HeroSection.css';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  image?: React.ReactNode;
  background?: React.ReactNode;
  className?: string;
}

export function HeroSection({ title, subtitle, actions, image, background, className = '' }: HeroSectionProps) {
  return (
    <section className={`hero-section ${className}`}>
      {background && <div className="hero-section__background">{background}</div>}
      <div className="hero-section__content">
        <div className="hero-section__text">
          <h1 className="hero-section__title">{title}</h1>
          {subtitle && <p className="hero-section__subtitle">{subtitle}</p>}
          {actions && <div className="hero-section__actions">{actions}</div>}
        </div>
        {image && <div className="hero-section__image">{image}</div>}
      </div>
    </section>
  );
}
