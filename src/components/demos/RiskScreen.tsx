import { useEffect, useMemo, useState } from 'react';

type Risk = 'low' | 'watch' | 'elevated';

function scoreFor(lat: number, lon: number): { risk: Risk; label: string; detail: string } {
  const seed = Math.abs(Math.sin(lat * 12.9898 + lon * 78.233) * 43758.5453);
  const n = seed - Math.floor(seed);
  if (n < 0.45) {
    return {
      risk: 'low',
      label: 'Lower indicated risk',
      detail: 'Demo signal only — real screening uses validated geolocation and GFW-style layers.',
    };
  }
  if (n < 0.75) {
    return {
      risk: 'watch',
      label: 'Needs review',
      detail: 'Borderline demo score. In production this would route to human due diligence.',
    };
  }
  return {
    risk: 'elevated',
    label: 'Elevated indicated risk',
    detail: 'Illustrative only. Book Chain integrates authenticated API checks — not this toy.',
  };
}

export default function RiskScreen() {
  const [lat, setLat] = useState('1.35');
  const [lon, setLon] = useState('103.82');
  const [query, setQuery] = useState({ lat: 1.35, lon: 103.82 });
  const [mounted, setMounted] = useState(false);
  const result = useMemo(() => scoreFor(query.lat, query.lon), [query]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`rs ${mounted ? 'rs--ready' : ''}`}>
      <p className="rs__meta">Toy geocheck inspired by deforestation-risk API work — not live screening</p>
      <form
        className="rs__form"
        onSubmit={(event) => {
          event.preventDefault();
          const nextLat = Number(lat);
          const nextLon = Number(lon);
          if (Number.isFinite(nextLat) && Number.isFinite(nextLon)) {
            setQuery({ lat: nextLat, lon: nextLon });
          }
        }}
      >
        <label>
          Lat
          <input value={lat} onChange={(e) => setLat(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          Lon
          <input value={lon} onChange={(e) => setLon(e.target.value)} inputMode="decimal" />
        </label>
        <button type="submit">Screen point</button>
      </form>
      <div className={`rs__result is-${result.risk}`} role="status">
        <strong>{result.label}</strong>
        <span>{result.detail}</span>
      </div>
      <style>{`
        .rs {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), max-height 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rs--ready { opacity: 1; max-height: 24rem; }
        .rs__meta {
          margin: 0 0 0.85rem;
          color: var(--ink-muted);
          font-size: 0.875rem;
        }
        .rs__form {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 0.65rem;
          margin-bottom: 1rem;
          align-items: end;
        }
        .rs__form label {
          display: grid;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: var(--ink-muted);
        }
        .rs__form input {
          border: 1px solid var(--line);
          background: var(--bg-elevated);
          color: var(--ink);
          font: inherit;
          padding: 0.55rem 0.65rem;
        }
        .rs__form button {
          appearance: none;
          border: none;
          background: var(--accent);
          color: #fff;
          font: inherit;
          font-weight: 500;
          padding: 0.65rem 0.9rem;
          cursor: pointer;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
        }
        .rs__result {
          display: grid;
          gap: 0.35rem;
          padding: 1rem 1.1rem;
          border-left: 4px solid var(--accent);
          background: var(--accent-soft);
        }
        .rs__result.is-watch { border-color: var(--warm); background: #f7ecdf; }
        .rs__result.is-elevated { border-color: #9b3d2e; background: #f6e6e2; }
        .rs__result strong {
          font-family: var(--font-display);
          font-size: 1.15rem;
        }
        .rs__result span {
          color: var(--ink-muted);
          font-size: 0.95rem;
        }
        @media (max-width: 640px) {
          .rs__form { grid-template-columns: 1fr 1fr; }
          .rs__form button { grid-column: 1 / -1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rs { opacity: 1; max-height: none; transition: none; }
        }
      `}</style>
    </div>
  );
}
