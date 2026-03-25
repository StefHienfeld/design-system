import './SpecialistCard.css';

export interface SpecialistCardProps {
  name: string;
  role?: string;
  photoSrc?: string;
  phone?: string;
  email?: string;
  className?: string;
}

export function SpecialistCard({ name, role, photoSrc, phone, email, className = '' }: SpecialistCardProps) {
  return (
    <div className={`specialist-card ${className}`}>
      {photoSrc && (
        <div className="specialist-card__photo-wrap">
          <img className="specialist-card__photo" src={photoSrc} alt={name} loading="lazy" />
        </div>
      )}
      <h3 className="specialist-card__name">{name}</h3>
      {role && <p className="specialist-card__role">{role}</p>}
      <div className="specialist-card__contact">
        {phone && <a className="specialist-card__link" href={`tel:${phone}`}>{phone}</a>}
        {email && <a className="specialist-card__link" href={`mailto:${email}`}>{email}</a>}
      </div>
    </div>
  );
}
