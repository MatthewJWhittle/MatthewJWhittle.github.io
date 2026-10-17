import { useEffect, useId, useState } from 'react';

const COLS = 12;
const ROWS = 8;

type Cell = {
  active: boolean;
  delay: number;
};

function buildCells(seed: number): Cell[] {
  return Array.from({ length: COLS * ROWS }, (_, i) => {
    const x = i % COLS;
    const y = Math.floor(i / COLS);
    const wave = Math.sin((x + seed) * 0.55) + Math.cos((y - seed) * 0.4);
    return {
      active: wave > 0.35,
      delay: (x + y) * 12,
    };
  });
}

export default function SignalLattice() {
  const labelId = useId();
  const [seed, setSeed] = useState(2);
  const [cells, setCells] = useState<Cell[]>(() => buildCells(2));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    setCells(buildCells(seed));
  }, [seed]);

  const activeCount = cells.filter((cell) => cell.active).length;

  return (
    <div className={`demo ${mounted ? 'demo--ready' : ''}`}>
      <div className="demo__toolbar">
        <p id={labelId} className="demo__meta">
          Live nodes <strong>{activeCount}</strong> / {cells.length}
        </p>
        <button
          type="button"
          className="demo__btn"
          onClick={() => setSeed((value) => value + 1)}
          aria-describedby={labelId}
        >
          Resample grid
        </button>
      </div>
      <div
        className="demo__grid"
        role="img"
        aria-label={`Signal lattice with ${activeCount} active cells`}
      >
        {cells.map((cell, index) => (
          <span
            key={`${seed}-${index}`}
            className={`demo__cell${cell.active ? ' is-on' : ''}`}
            style={{ transitionDelay: `${cell.delay}ms` }}
          />
        ))}
      </div>
      <style>{`
        .demo {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition:
            opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
            max-height 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .demo--ready {
          opacity: 1;
          max-height: 28rem;
        }
        .demo__toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .demo__meta {
          margin: 0;
          color: var(--ink-muted);
          font-family: var(--font-mono);
          font-size: 0.8125rem;
        }
        .demo__meta strong {
          color: var(--accent);
          font-weight: 500;
        }
        .demo__btn {
          appearance: none;
          border: 1px solid var(--line);
          background: var(--bg-elevated);
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 0.875rem;
          padding: 0.45rem 0.8rem;
          cursor: pointer;
        }
        .demo__btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .demo__grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 0.35rem;
        }
        .demo__cell {
          aspect-ratio: 1;
          background: #e4e9ee;
          transition:
            background 180ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .demo__cell.is-on {
          background: var(--accent);
          transform: scale(0.92);
        }
        @media (prefers-reduced-motion: reduce) {
          .demo,
          .demo__cell {
            transition: none;
          }
          .demo {
            opacity: 1;
            max-height: none;
          }
        }
      `}</style>
    </div>
  );
}
