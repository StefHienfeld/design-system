import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './tokens/tokens.css'
import './fonts/fonts.css'
import { Showcase } from './Showcase'
import { ShowcasePart2 } from './ShowcasePart2'
import { ShowcasePart3 } from './ShowcasePart3'

function App() {
  const [view, setView] = useState<'part1' | 'part2' | 'part3'>('part3');

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        display: 'flex',
        gap: 0,
        background: '#0c0e12',
        padding: '0 24px',
        fontFamily: 'var(--font-family-body)',
      }}>
        <button
          onClick={() => setView('part1')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: view === 'part1' ? 'var(--color-brand-600)' : 'transparent',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'inherit',
            cursor: 'pointer',
            borderBottom: view === 'part1' ? '2px solid var(--color-brand-200)' : '2px solid transparent',
          }}
        >
          Part 1 — Primitives
        </button>
        <button
          onClick={() => setView('part2')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: view === 'part2' ? 'var(--color-brand-600)' : 'transparent',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'inherit',
            cursor: 'pointer',
            borderBottom: view === 'part2' ? '2px solid var(--color-brand-200)' : '2px solid transparent',
          }}
        >
          Part 2 — Composed
        </button>
        <button
          onClick={() => setView('part3')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: view === 'part3' ? 'var(--color-brand-600)' : 'transparent',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'inherit',
            cursor: 'pointer',
            borderBottom: view === 'part3' ? '2px solid var(--color-brand-200)' : '2px solid transparent',
          }}
        >
          Part 3 — Website
        </button>
      </nav>
      {view === 'part1' && <Showcase />}
      {view === 'part2' && <ShowcasePart2 />}
      {view === 'part3' && <ShowcasePart3 />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
