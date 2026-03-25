import React from 'react';
import './InlineCTA.css';

export interface InlineCTAProps {
  /** Title text displayed prominently. */
  title: string;
  /** Optional supporting description text. */
  description?: string;
  /** URL of the image rendered on the left side. */
  image?: string;
  /** Action buttons rendered on the right side. */
  actions?: React.ReactNode;
  /** Custom content rendered below the text (email field, plan selector, etc.). */
  children?: React.ReactNode;
  /** Additional CSS class name(s). */
  className?: string;
}

export const InlineCTA: React.FC<InlineCTAProps> = ({
  title,
  description,
  image,
  actions,
  children,
  className,
}) => {
  const hasImage = Boolean(image);

  const classes = [
    'inline-cta',
    !hasImage && 'inline-cta--no-image',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes}>
      {hasImage && (
        <div className="inline-cta__image-wrap">
          <img className="inline-cta__image" src={image} alt="" />
        </div>
      )}

      <div className="inline-cta__body">
        <div className="inline-cta__text">
          <p className="inline-cta__title">{title}</p>
          {description && (
            <p className="inline-cta__description">{description}</p>
          )}
        </div>

        {actions && <div className="inline-cta__actions">{actions}</div>}
        {children && <div className="inline-cta__children">{children}</div>}
      </div>
    </section>
  );
};

InlineCTA.displayName = 'InlineCTA';
