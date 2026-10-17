import { useEffect, useMemo, useState } from 'react';

type Clip = {
  id: string;
  label: string;
  score: number;
};

const CLIPS: Clip[] = [
  { id: 'v01', label: 'Cam 12 · dusk', score: 0.91 },
  { id: 'v02', label: 'Cam 04 · canopy', score: 0.18 },
  { id: 'v03', label: 'Cam 19 · trail', score: 0.74 },
  { id: 'v04', label: 'Cam 07 · rain', score: 0.22 },
  { id: 'v05', label: 'Cam 21 · clearing', score: 0.86 },
  { id: 'v06', label: 'Cam 02 · night', score: 0.41 },
  { id: 'v07', label: 'Cam 15 · understorey', score: 0.63 },
  { id: 'v08', label: 'Cam 09 · empty', score: 0.09 },
];

export default function TriageBoard() {
  const [threshold, setThreshold] = useState(0.55);
  const [mounted, setMounted] = useState(false);
  const kept = useMemo(() => CLIPS.filter((clip) => clip.score >= threshold), [threshold]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`tb ${mounted ? 'tb--ready' : ''}`}>
      <p className="tb__meta">
        Demo triage — mirrors camera-trap review: keep likely animal clips for experts
      </p>
      <label className="tb__slider">
        <span>
          Keep score ≥ <strong>{threshold.toFixed(2)}</strong>
        </span>
        <input
          type="range"
          min={0.05}
          max={0.95}
          step={0.05}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </label>
      <p className="tb__count">
        {kept.length} of {CLIPS.length} clips shortlisted
      </p>
      <ul className="tb__list">
        {CLIPS.map((clip) => {
          const on = clip.score >= threshold;
          return (
            <li key={clip.id} className={`tb__item${on ? ' is-on' : ''}`}>
              <span>{clip.label}</span>
              <span className="tb__score">{clip.score.toFixed(2)}</span>
            </li>
          );
        })}
      </ul>
      <style>{`
        .tb {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), max-height 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .tb--ready { opacity: 1; max-height: 36rem; }
        .tb__meta {
          margin: 0 0 0.85rem;
          color: var(--ink-muted);
          font-size: 0.875rem;
        }
        .tb__slider {
          display: grid;
          gap: 0.45rem;
          margin-bottom: 0.75rem;
          color: var(--ink-muted);
          font-size: 0.9rem;
        }
        .tb__slider strong { color: var(--accent); }
        .tb__slider input { width: 100%; accent-color: var(--accent); }
        .tb__count {
          margin: 0 0 0.75rem;
          font-family: var(--font-display);
          font-size: 1.05rem;
        }
        .tb__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.35rem;
        }
        .tb__item {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.55rem 0.15rem;
          border-bottom: 1px solid var(--line);
          color: var(--ink-muted);
          opacity: 0.55;
          transition: opacity 180ms cubic-bezier(0.22, 1, 0.36, 1), color 180ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .tb__item.is-on {
          opacity: 1;
          color: var(--ink);
        }
        .tb__score {
          font-family: var(--font-mono);
          font-size: 0.8rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .tb { opacity: 1; max-height: none; transition: none; }
        }
      `}</style>
    </div>
  );
}
