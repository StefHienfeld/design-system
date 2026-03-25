import { forwardRef } from 'react';
import './ProductCard.css';

export interface ProductCardProps {
  label: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  onClick?: () => void;
  colorDot?: string;
  className?: string;
}

export const ProductCard = forwardRef<HTMLAnchorElement, ProductCardProps>(
  ({ label, imageSrc, imageAlt, href, onClick, colorDot, className = '' }, ref) => {
    const Tag = href ? 'a' : 'div';
    return (
      <Tag
        ref={ref as any}
        className={`product-card ${className}`}
        href={href}
        onClick={onClick}
        {...(Tag === 'div' ? { role: 'button', tabIndex: 0 } : {})}
      >
        <div className="product-card__image-wrap">
          <img className="product-card__image" src={imageSrc} alt={imageAlt || label} loading="lazy" />
        </div>
        <p className="product-card__label">
          {colorDot && <span className="product-card__color-dot" style={{ backgroundColor: colorDot }} />}
          {label}
        </p>
      </Tag>
    );
  },
);

ProductCard.displayName = 'ProductCard';
