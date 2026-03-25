import React from 'react';
import './Badge.css';

export interface BadgeProps {
  /** Badge size. */
  size?: 'sm' | 'md' | 'lg';
  /** Color theme. */
  color?:
    | 'brand'
    | 'gray'
    | 'error'
    | 'warning'
    | 'success'
    | 'gray-blue'
    | 'blue-light'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink'
    | 'orange';
  /** Visual type. */
  type?: 'pill-color' | 'pill-outline' | 'badge-color' | 'badge-modern';
  /** Icon rendered before the label. */
  icon?: React.ReactNode;
  /** Show a colored dot indicator before the label. */
  dot?: boolean;
  /** Badge label content. */
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  size = 'md',
  color = 'brand',
  type = 'pill-color',
  icon,
  dot = false,
  children,
}) => {
  const classes = [
    'badge',
    `badge--${size}`,
    `badge--${type}`,
    `badge--${color}`,
  ]
    .join(' ');

  return (
    <span className={classes}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {icon && <span className="badge__icon" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
