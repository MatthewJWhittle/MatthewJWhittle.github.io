import { useEffect, useMemo, useState } from 'react';

type Focus = 'all' | 'systems' | 'data' | 'product';

const ITEMS: Array<{ id: string; label: string; focus: Exclude<Focus, 'all'> }> = [
  { id: '1', label: 'API contracts', focus: 'systems' },
  { id: '2', label: 'Observability', focus: 'systems' },
  { id: '3', label: 'ETL shapes', focus: 'data' },
  { id: '4', label: 'Experiment design', focus: 'data' },
  { id: '5', label: 'Roadmap cuts', focus: 'product' },
  { id: '6', label: 'UX critique', focus: 'product' },
  { id: '7', label: 'Queue backpressure', focus: 'systems' },
  { id: '8', label: 'Metric hygiene', focus: 'data' },
];

const FILTERS: Array<{ id: Focus; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'systems', label: 'Systems' },
  { id: 'data', label: 'Data' },
  { id: 'product', label: 'Product' },
];

export default function FocusFilter() {
  const [focus, setFocus] = useState<Focus>('all');
  const [mounted, setMounted] = useState(false);
  const visible = useMemo(
    () => (focus === 'all' ? ITEMS : ITEMS.filter((item) => item.focus === focus)),
    [focus],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`focus ${mounted ? 'focus--ready' : ''}`}>
      <div className="focus__filters" role="tablist" aria-label="Focus areas">
        {FILTERS.map((filter) => {
          const selected = focus === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`focus__chip${selected ? ' is-active' : ''}`}
              onClick={() => setFocus(filter.id)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      <ul className="focus__list">
        {visible.map((item, index) => (
          <li
            key={item.id}
            className="focus__item"
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <span className="focus__tag">{item.focus}</span>
            {item.label}
          </li>
        ))}
      </ul>
      <style>{`
        .focus {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition:
            opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
            max-height 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .focus--ready {
          opacity: 1;
          max-height: 28rem;
        }
        .focus__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .focus__chip {
          appearance: none;
          border: 1px solid var(--line);
          background: var(--bg-elevated);
          color: var(--ink-muted);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.4rem 0.7rem;
          cursor: pointer;
        }
        .focus__chip.is-active,
        .focus__chip:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-soft);
        }
        .focus__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.5rem;
        }
        .focus__item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0;
          border-bottom: 1px solid var(--line);
          color: var(--ink);
          opacity: 0;
          transform: translateY(0.4rem);
          animation: focus-in 180ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .focus__tag {
          min-width: 4.5rem;
          color: var(--ink-muted);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        @keyframes focus-in {
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .focus {
            opacity: 1;
            max-height: none;
            transition: none;
          }
          .focus__item {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
