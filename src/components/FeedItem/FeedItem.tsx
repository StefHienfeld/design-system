import React from 'react';
import './FeedItem.css';

export interface PropertyChange {
  label: string;
  oldValue?: string;
  newValue: string;
}

export interface FeedItemProps {
  /** Color variant for the status dot. */
  type?: 'neutral' | 'success' | 'warning' | 'error' | 'brand';
  /** User who performed the action. */
  user: { name: string; avatar?: string };
  /** Description of the activity (shown after user name). */
  description: string;
  /** When the activity occurred. */
  timestamp: string;
  /** Property changes to display in the card. */
  changes?: PropertyChange[];
  /** Show the vertical connector line below the dot. */
  showConnector?: boolean;
  /** Additional CSS class. */
  className?: string;
}

/** Arrow-right icon used between old and new values. */
const ArrowRightIcon: React.FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (
    (parts[0][0]?.toUpperCase() ?? '') +
    (parts[parts.length - 1][0]?.toUpperCase() ?? '')
  );
}

export const FeedItem: React.FC<FeedItemProps> = ({
  type = 'neutral',
  user,
  description,
  timestamp,
  changes,
  showConnector = false,
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);
  const showImage = user.avatar && !imgError;
  const initials = getInitials(user.name);

  const rootClasses = [
    'feed-item',
    `feed-item--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {/* Left column: dot + connector */}
      <div className="feed-item__indicator">
        <span className="feed-item__dot" aria-hidden="true">
          <span className="feed-item__dot-inner" />
        </span>
        {showConnector && <span className="feed-item__connector" />}
      </div>

      {/* Right column: content */}
      <div className="feed-item__content">
        <div className="feed-item__header">
          {/* User + description + timestamp */}
          <div className="feed-item__meta">
            <div className="feed-item__user">
              <span className="feed-item__avatar">
                {showImage ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="feed-item__avatar-fallback">
                    {initials}
                  </span>
                )}
              </span>
              <span className="feed-item__user-name">{user.name}</span>
              <span className="feed-item__description">{description}</span>
            </div>
            <span className="feed-item__timestamp">{timestamp}</span>
          </div>

          {/* Property changes card */}
          {changes && changes.length > 0 && (
            <div className="feed-item__changes">
              <ul className="feed-item__changes-list">
                {changes.map((change, index) => (
                  <li className="feed-item__change" key={index}>
                    <span className="feed-item__change-label">
                      {change.label}
                    </span>
                    <span className="feed-item__change-values">
                      {change.oldValue && (
                        <>
                          <span className="feed-item__change-old">
                            {change.oldValue}
                          </span>
                          <span className="feed-item__change-arrow">
                            <ArrowRightIcon />
                          </span>
                        </>
                      )}
                      <span className="feed-item__change-new">
                        {change.newValue}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FeedItem.displayName = 'FeedItem';
