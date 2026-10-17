import { useEffect, useState } from 'react';

type Habitat = {
  id: string;
  label: string;
  note: string;
  tone: string;
};

const HABITATS: Habitat[] = [
  {
    id: 'grassland',
    label: 'Grassland',
    note: 'Open mosaic — often mixed with scrub edges in upland sites.',
    tone: '#c5d4a4',
  },
  {
    id: 'woodland',
    label: 'Woodland',
    note: 'Canopy and understorey cues from aerial imagery + height models.',
    tone: '#5f8f6a',
  },
  {
    id: 'wetland',
    label: 'Wetland',
    note: 'Moisture-sensitive classes where specialist QA matters most.',
    tone: '#7aa0b8',
  },
  {
    id: 'heath',
    label: 'Heath / scrub',
    note: 'Fine texture classes — model suggestions, not final survey truth.',
    tone: '#c9a56a',
  },
];

export default function HabitatExplorer() {
  const [active, setActive] = useState(HABITATS[1]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`hx ${mounted ? 'hx--ready' : ''}`}>
      <p className="hx__meta">
        Interactive sketch — not production model output
      </p>
      <div className="hx__palette" role="listbox" aria-label="Habitat classes">
        {HABITATS.map((habitat) => {
          const selected = habitat.id === active.id;
          return (
            <button
              key={habitat.id}
              type="button"
              role="option"
              aria-selected={selected}
              className={`hx__swatch${selected ? ' is-active' : ''}`}
              style={{ ['--tone' as string]: habitat.tone }}
              onClick={() => setActive(habitat)}
            >
              {habitat.label}
            </button>
          );
        })}
      </div>
      <div className="hx__canvas" style={{ ['--tone' as string]: active.tone }} aria-live="polite">
        <div className="hx__patch hx__patch--a" />
        <div className="hx__patch hx__patch--b" />
        <div className="hx__patch hx__patch--c" />
        <p className="hx__caption">
          <strong>{active.label}</strong>
          <span>{active.note}</span>
        </p>
      </div>
      <style>{`
        .hx {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), max-height 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hx--ready {
          opacity: 1;
          max-height: 32rem;
        }
        .hx__meta {
          margin: 0 0 0.85rem;
          color: var(--ink-muted);
          font-size: 0.875rem;
        }
        .hx__palette {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .hx__swatch {
          appearance: none;
          border: 1px solid var(--line);
          background: var(--bg-elevated);
          color: var(--ink);
          font: inherit;
          font-size: 0.9rem;
          padding: 0.45rem 0.8rem;
          cursor: pointer;
          border-left: 4px solid var(--tone);
        }
        .hx__swatch.is-active,
        .hx__swatch:hover {
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .hx__canvas {
          position: relative;
          min-height: 11rem;
          padding: 1.25rem;
          background: color-mix(in srgb, var(--tone) 28%, #f4f1ea);
          overflow: hidden;
        }
        .hx__patch {
          position: absolute;
          border-radius: 40% 60% 55% 45%;
          background: color-mix(in srgb, var(--tone) 70%, #2a4030);
          opacity: 0.55;
          transition: background 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hx__patch--a { width: 46%; height: 58%; left: -4%; top: 18%; }
        .hx__patch--b { width: 38%; height: 48%; right: 8%; top: 8%; opacity: 0.4; }
        .hx__patch--c { width: 28%; height: 36%; right: 18%; bottom: 10%; opacity: 0.5; }
        .hx__caption {
          position: relative;
          z-index: 1;
          margin: 0;
          max-width: 18rem;
          display: grid;
          gap: 0.35rem;
          color: var(--ink);
        }
        .hx__caption strong {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
        }
        .hx__caption span {
          color: var(--ink-muted);
          font-size: 0.95rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .hx { opacity: 1; max-height: none; transition: none; }
        }
      `}</style>
    </div>
  );
}
