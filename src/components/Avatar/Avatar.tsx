import React from 'react';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  className?: string;
}

const SIZE_MAP: Record<NonNullable<AvatarProps['size']>, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (
    (parts[0][0]?.toUpperCase() ?? '') +
    (parts[parts.length - 1][0]?.toUpperCase() ?? '')
  );
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  online,
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);
  const showImage = src && !imgError;
  const initials = name ? getInitials(name) : '';
  const px = SIZE_MAP[size];

  const classes = [
    'avatar',
    `avatar--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      style={{ width: px, height: px }}
      role="img"
      aria-label={name || 'Avatar'}
    >
      {showImage ? (
        <img
          className="avatar__image"
          src={src}
          alt={name || 'Avatar'}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="avatar__fallback">{initials}</span>
      )}
      {online !== undefined && (
        <span
          className={[
            'avatar__indicator',
            online ? 'avatar__indicator--online' : 'avatar__indicator--offline',
          ].join(' ')}
          aria-label={online ? 'Online' : 'Offline'}
        />
      )}
    </span>
  );
};

Avatar.displayName = 'Avatar';
