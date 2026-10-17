import { useEffect, useMemo, useState } from 'react';

function sampleSeries(tick: number): number[] {
  return Array.from({ length: 24 }, (_, i) => {
    const base = 42 + Math.sin((i + tick) * 0.45) * 18;
    const bump = ((i + tick) % 7 === 0 ? 22 : 0);
    return Math.max(8, Math.round(base + bump));
  });
}

export default function LatencySpark() {
  const [tick, setTick] = useState(0);
  const [mounted, setMounted] = useState(false);
  const values = useMemo(() => sampleSeries(tick), [tick]);
  const max = Math.max(...values);
  const avg = Math.round(values.reduce((sum, n) => sum + n, 0) / values.length);
  const width = 320;
  const height = 96;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - (value / (max || 1)) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`spark ${mounted ? 'spark--ready' : ''}`}>
      <div className="spark__toolbar">
        <p className="spark__meta">
          Avg latency <strong>{avg} ms</strong>
        </p>
        <button type="button" className="spark__btn" onClick={() => setTick((n) => n + 1)}>
          Next window
        </button>
      </div>
      <svg
        className="spark__chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Latency sparkline averaging ${avg} milliseconds`}
      >
        <polyline
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />
        {values.map((value, index) => {
          const x = (index / (values.length - 1)) * width;
          const y = height - (value / (max || 1)) * (height - 8) - 4;
          return <circle key={`${tick}-${index}`} cx={x} cy={y} r="2.2" fill="var(--ink)" opacity="0.35" />;
        })}
      </svg>
      <style>{`
        .spark {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition:
            opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
            max-height 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .spark--ready {
          opacity: 1;
          max-height: 16rem;
        }
        .spark__toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }
        .spark__meta {
          margin: 0;
          color: var(--ink-muted);
          font-family: var(--font-mono);
          font-size: 0.8125rem;
        }
        .spark__meta strong {
          color: var(--accent);
          font-weight: 500;
        }
        .spark__btn {
          appearance: none;
          border: 1px solid var(--line);
          background: var(--bg-elevated);
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 0.875rem;
          padding: 0.45rem 0.8rem;
          cursor: pointer;
        }
        .spark__btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .spark__chart {
          width: 100%;
          height: auto;
          background: linear-gradient(180deg, var(--accent-soft), transparent 70%);
        }
        @media (prefers-reduced-motion: reduce) {
          .spark {
            opacity: 1;
            max-height: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
