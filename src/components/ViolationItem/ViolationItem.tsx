import React from 'react';
import './ViolationItem.css';

export interface ViolationItemProps {
  /** Comparison operator variant. */
  variant: 'OR' | 'GTE' | 'EQ' | 'GT' | 'LT';
  /** Field name displayed on the left. */
  field: string;
  /** Comparison value displayed in the badge. */
  value: string;
  /** Optional label shown before the value badge (defaults to "Actual"). */
  label?: string;
  /** Status determines the item border/background color. */
  status?: 'pass' | 'fail' | 'neutral';
  /** Additional CSS class names. */
  className?: string;
}

/** Maps variant keys to the operator symbols shown in the rule badge. */
const OPERATOR_MAP: Record<ViolationItemProps['variant'], string> = {
  OR: 'Value || Value',
  GTE: '>= Value',
  EQ: '= Value',
  GT: '> Value',
  LT: '< Value',
};

/**
 * Formats the rule badge text. For single-symbol operators the value is
 * appended after the symbol; for OR the display is the fixed "Value || Value"
 * string as shown in the Figma spec.
 */
const formatOperator = (variant: ViolationItemProps['variant'], value: string): string => {
  switch (variant) {
    case 'OR':
      return `${value} || ${value}`;
    case 'GTE':
      return `>= ${value}`;
    case 'EQ':
      return `= ${value}`;
    case 'GT':
      return `> ${value}`;
    case 'LT':
      return `< ${value}`;
    default:
      return value;
  }
};

export const ViolationItem: React.FC<ViolationItemProps> = ({
  variant,
  field,
  value,
  label = 'Actual',
  status = 'neutral',
  className,
}) => {
  const classes = [
    'violation-item',
    status !== 'neutral' && `violation-item--${status}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {/* Field name */}
      <p className="violation-item__field">{field}</p>

      {/* Actual value section */}
      <div className="violation-item__actual">
        <p className="violation-item__actual-label">{label}</p>
        <span className="violation-item__value-badge">
          <span className="violation-item__value-badge-text">{value}</span>
        </span>
      </div>

      {/* Rule / operator section */}
      <div className="violation-item__rule">
        <p className="violation-item__rule-label">Rule</p>
        <span className="violation-item__operator-badge">
          <span className="violation-item__operator-badge-text">
            {formatOperator(variant, value)}
          </span>
        </span>
      </div>
    </div>
  );
};

ViolationItem.displayName = 'ViolationItem';
