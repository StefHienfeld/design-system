import React from 'react';
import { hienfeldIcons } from './icons';
import './HienfeldIcon.css';

export interface HienfeldIconProps {
  /** Icon name — must match one of the filenames in the Hienfeld icon set. */
  name: string;
  /** Icon size in pixels (width & height). */
  size?: number;
  /** Icon color (applied via CSS `color`; strokes/fills use `currentColor`). */
  color?: string;
  /** Additional CSS class. */
  className?: string;
}

export const HienfeldIcon: React.FC<HienfeldIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
}) => {
  const iconContent = hienfeldIcons[name];

  if (!iconContent) {
    return null;
  }

  const classes = ['hienfeld-icon', className].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      style={{ width: size, height: size, color }}
      role="img"
      aria-label={name}
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: iconContent }}
      />
    </span>
  );
};

HienfeldIcon.displayName = 'HienfeldIcon';
