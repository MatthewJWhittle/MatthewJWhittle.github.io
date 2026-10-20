import { useEffect, useRef, useState } from 'react';
import { site, type TimelineEntry } from '../data/site';
import '../styles/experience-timeline.css';

const entries = site.timeline as readonly TimelineEntry[];

function hasNote(entry: TimelineEntry): entry is TimelineEntry & { note: string } {
  return 'note' in entry && typeof entry.note === 'string' && entry.note.length > 0;
}

export default function ExperienceTimeline() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [expanded, setExpanded] = useState<boolean[]>(() =>
    entries.map((_, i) => i < 3),
  );

  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    const ratios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (obsEntries) => {
        for (const entry of obsEntries) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(index)) continue;
          ratios.set(index, entry.intersectionRatio);
        }

        setExpanded((prev) => {
          const next = entries.map((_, i) => {
            const ratio = ratios.get(i) ?? 0;
            // In view → full treatment; mostly out → compress
            return ratio >= 0.45;
          });
          // Keep at least one expanded if nothing clears the threshold yet
          if (!next.some(Boolean) && prev.some(Boolean)) return prev;
          if (!next.some(Boolean)) {
            next[0] = true;
          }
          const changed = next.some((v, i) => v !== prev[i]);
          return changed ? next : prev;
        });
      },
      {
        root,
        threshold: [0, 0.25, 0.45, 0.6, 0.8, 1],
        rootMargin: '-8% 0px -8% 0px',
      },
    );

    for (const node of itemRefs.current) {
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="xtl">
      <p className="xtl__hint">Scroll the timeline — roles in view expand; others compress.</p>
      <div
        className="xtl__viewport"
        ref={viewportRef}
        tabIndex={0}
        aria-label="Experience timeline"
      >
        <ol className="xtl__list">
          {entries.map((item, index) => {
            const isFull = expanded[index] ?? false;
            const isCurrent = index === 0;
            return (
              <li
                key={`${item.org}-${item.startYear}-${item.role}`}
                className={`xtl__item ${isFull ? 'is-full' : 'is-compact'}${isCurrent ? ' is-current' : ''}`}
                data-index={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                <div className="xtl__marker" aria-hidden="true" />
                <div className="xtl__body">
                  <div className="xtl__full">
                    <p className="xtl__start">{item.startLabel}</p>
                    <p className="xtl__role">{item.role}</p>
                    <p className="xtl__org">{item.org}</p>
                    {hasNote(item) ? <p className="xtl__note">{item.note}</p> : null}
                  </div>
                  <div className="xtl__compact">
                    <p className="xtl__compact-line">
                      {item.role} ({item.startYear})
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
