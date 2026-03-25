import { useState, useCallback } from 'react';
import './Accordion.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className={`accordion__item${isOpen ? ' accordion__item--open' : ''}`}>
            <button
              className="accordion__trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
            >
              <span>{item.title}</span>
              <span className={`accordion__chevron${isOpen ? ' accordion__chevron--open' : ''}`}>
                <svg viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 0.5L5.5 5.5L0.5 0.5H10.5Z" fill="currentColor" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="accordion__panel" id={`accordion-panel-${item.id}`} role="region">
                <div className="accordion__panel-content">{item.content}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
