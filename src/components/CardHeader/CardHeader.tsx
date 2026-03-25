import React from 'react';
import { Avatar } from '../Avatar';
import './CardHeader.css';

export interface CardHeaderProps {
  /** Primary heading text. */
  title: string;
  /** Optional badge rendered next to the title. */
  badge?: React.ReactNode;
  /** Supporting description text below the title. */
  supportingText?: string;
  /** Avatar configuration. When provided, an avatar is rendered to the left of the text. */
  avatar?: { src?: string; name: string };
  /** Action buttons rendered on the right side of the header. */
  actions?: React.ReactNode;
  /** Show a vertical-dots dropdown icon on the right. */
  dropdown?: boolean;
  /** Callback fired when the dropdown icon is clicked. */
  onDropdownClick?: () => void;
  /** Show a horizontal divider at the bottom. */
  divider?: boolean;
  /** Additional CSS class name(s). */
  className?: string;
}

/* dots-vertical icon — three 2px circles stacked vertically */
const DotsVerticalIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="10" cy="4" r="2" />
    <circle cx="10" cy="10" r="2" />
    <circle cx="10" cy="16" r="2" />
  </svg>
);

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  badge,
  supportingText,
  avatar,
  actions,
  dropdown = false,
  onDropdownClick,
  divider = false,
  className,
}) => {
  const rootClasses = ['card-header', className].filter(Boolean).join(' ');

  const titleRow = (
    <div className="card-header__title-row">
      <h3 className="card-header__title">{title}</h3>
      {badge}
    </div>
  );

  const supportingTextEl = supportingText ? (
    <p className="card-header__supporting-text">{supportingText}</p>
  ) : null;

  const textGroup = (
    <div className="card-header__text-group">
      {titleRow}
      {supportingTextEl}
    </div>
  );

  return (
    <div className={rootClasses}>
      <div className="card-header__content">
        {avatar ? (
          <div className="card-header__avatar-group">
            <Avatar
              src={avatar.src}
              name={avatar.name}
              size="xl"
            />
            {textGroup}
          </div>
        ) : (
          textGroup
        )}

        {actions && (
          <div className="card-header__actions">{actions}</div>
        )}

        {dropdown && (
          <button
            type="button"
            className="card-header__dropdown"
            onClick={onDropdownClick}
            aria-label="More options"
          >
            <DotsVerticalIcon />
          </button>
        )}
      </div>

      {divider && <div className="card-header__divider" />}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';
