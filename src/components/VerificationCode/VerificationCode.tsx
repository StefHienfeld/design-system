import React, { useRef, useCallback, useEffect } from 'react';
import './VerificationCode.css';

export interface VerificationCodeProps {
  /** Number of digit inputs. */
  digits?: 4 | 6;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Label displayed above the inputs. */
  label?: string;
  /** Hint text displayed below the inputs. */
  hint?: string;
  /** Error message displayed below the inputs (replaces hint). */
  error?: string;
  /** Controlled value string (e.g. "1234" or "123456"). */
  value?: string;
  /** Called with the full value string on every change. */
  onChange?: (value: string) => void;
}

export const VerificationCode: React.FC<VerificationCodeProps> = ({
  digits = 6,
  size = 'md',
  label,
  hint,
  error,
  value,
  onChange,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  /* Derive per-box values from the controlled value string. */
  const chars = (value ?? '').split('').slice(0, digits);

  /* Keep refs array in sync with digit count. */
  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, digits);
  }, [digits]);

  const setRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      inputsRef.current[index] = el;
    },
    [],
  );

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const emitChange = (newChars: string[]) => {
    onChange?.(newChars.join(''));
  };

  const handleChange = (index: number, inputValue: string) => {
    /* Accept only a single digit. */
    const digit = inputValue.replace(/\D/g, '').slice(-1);
    const next = [...chars];

    /* Pad with empty strings so the array is the right length. */
    while (next.length < digits) next.push('');

    next[index] = digit;
    emitChange(next);

    /* Auto-advance on valid digit entry. */
    if (digit && index < digits - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace') {
      const next = [...chars];
      while (next.length < digits) next.push('');

      if (next[index]) {
        /* Clear current box. */
        next[index] = '';
        emitChange(next);
      } else if (index > 0) {
        /* Move to previous box and clear it. */
        next[index - 1] = '';
        emitChange(next);
        focusInput(index - 1);
      }
      e.preventDefault();
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
      e.preventDefault();
    }

    if (e.key === 'ArrowRight' && index < digits - 1) {
      focusInput(index + 1);
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text/plain')
      .replace(/\D/g, '')
      .slice(0, digits);
    const next = pasted.split('');
    while (next.length < digits) next.push('');
    emitChange(next);

    /* Focus the last filled input, or the next empty one. */
    const focusIdx = Math.min(pasted.length, digits - 1);
    focusInput(focusIdx);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    /* Select content on focus so typing replaces it. */
    e.target.select();
  };

  /* --- build input elements with optional dash for 6-digit layout --- */
  const inputs: React.ReactNode[] = [];
  for (let i = 0; i < digits; i++) {
    /* Insert dash separator between index 2 and 3 for 6-digit layout. */
    if (digits === 6 && i === 3) {
      inputs.push(
        <span
          key="dash"
          className="verification-code__dash"
          aria-hidden="true"
        >
          -
        </span>,
      );
    }

    inputs.push(
      <input
        key={i}
        ref={setRef(i)}
        className="verification-code__input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        autoComplete="one-time-code"
        aria-label={`Digit ${i + 1} of ${digits}`}
        placeholder="0"
        value={chars[i] ?? ''}
        onChange={(e) => handleChange(i, e.target.value)}
        onKeyDown={(e) => handleKeyDown(i, e)}
        onPaste={handlePaste}
        onFocus={handleFocus}
      />,
    );
  }

  const rootClasses = [
    'verification-code',
    `verification-code--${size}`,
    error && 'verification-code--error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {label && <label className="verification-code__label">{label}</label>}
      <div className="verification-code__inputs">{inputs}</div>
      {error ? (
        <span className="verification-code__error" role="alert">
          {error}
        </span>
      ) : (
        hint && <span className="verification-code__hint">{hint}</span>
      )}
    </div>
  );
};

VerificationCode.displayName = 'VerificationCode';
