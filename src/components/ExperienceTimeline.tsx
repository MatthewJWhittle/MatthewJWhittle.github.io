import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { site, type TimelineEntry } from '../data/site';
import '../styles/experience-timeline.css';

const entries = site.timeline as readonly TimelineEntry[];

/** How many roles show full detail in the viewport at once. */
const FULL_SLOTS = 3;

function hasNote(entry: TimelineEntry): entry is TimelineEntry & { note: string } {
  return 'note' in entry && typeof entry.note === 'string' && entry.note.length > 0;
}

export default function ExperienceTimeline() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const focusRef = useRef(0);
  const pendingAnchor = useRef<{ index: number; offset: number } | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  /** Extra bottom space so the last roles can scroll into the focus band. */
  const [endPad, setEndPad] = useState(120);

  const fullEnd = Math.min(focusIndex + FULL_SLOTS, entries.length);

  useLayoutEffect(() => {
    const root = viewportRef.current;
    if (!root) return;
    // Always keep enough overflow for wheel scroll, even with a tall viewport
    // that already shows full roles + a compressed stack.
    setEndPad(Math.max(160, Math.round(root.clientHeight * 0.85)));
  }, []);

  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    let frame = 0;

    const readFocus = () => {
      const focusY = root.scrollTop + root.clientHeight * 0.22;
      let next = 0;
      for (let i = 0; i < entries.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const mid = el.offsetTop + el.offsetHeight * 0.35;
        if (mid <= focusY) next = i;
        else break;
      }

      const prev = focusRef.current;
      if (next === prev) return;

      // Mild hysteresis near boundaries
      const prevEl = itemRefs.current[prev];
      const nextEl = itemRefs.current[next];
      if (prevEl && nextEl && Math.abs(next - prev) === 1) {
        const boundary = next > prev ? nextEl.offsetTop : prevEl.offsetTop;
        if (Math.abs(focusY - boundary) < 20) return;
      }

      const anchor = itemRefs.current[next];
      if (anchor) {
        pendingAnchor.current = {
          index: next,
          offset: anchor.offsetTop - root.scrollTop,
        };
      }

      focusRef.current = next;
      setFocusIndex(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(readFocus);
    };

    const onResize = () => {
      setEndPad(Math.max(160, Math.round(root.clientHeight * 0.85)));
    };

    root.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    readFocus();

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useLayoutEffect(() => {
    const root = viewportRef.current;
    const pending = pendingAnchor.current;
    if (!root || !pending) return;
    const el = itemRefs.current[pending.index];
    if (!el) return;
    const nextTop = el.offsetTop - pending.offset;
    // Only compensate when it actually moves; avoid pinning scrollTop to 0.
    if (Math.abs(root.scrollTop - nextTop) > 1) {
      root.scrollTop = nextTop;
    }
    pendingAnchor.current = null;
  }, [focusIndex]);

  return (
    <div className="xtl">
      <div
        className="xtl__viewport"
        ref={viewportRef}
        tabIndex={0}
        aria-label="Experience timeline"
      >
        <ol className="xtl__list">
          {entries.map((item, index) => {
            const isFull = index >= focusIndex && index < fullEnd;
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
                  <div className="xtl__full" aria-hidden={!isFull}>
                    <p className="xtl__start">{item.startLabel}</p>
                    <p className="xtl__role">{item.role}</p>
                    <p className="xtl__org">{item.org}</p>
                    {hasNote(item) ? <p className="xtl__note">{item.note}</p> : null}
                  </div>
                  <div className="xtl__compact" aria-hidden={isFull}>
                    <p className="xtl__compact-line">
                      {item.role} ({item.startYear})
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="xtl__end-pad" style={{ height: endPad }} aria-hidden="true" />
      </div>
    </div>
  );
}
