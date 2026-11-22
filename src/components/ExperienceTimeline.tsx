import { useLayoutEffect, useRef, useState } from 'react';
import { site, type TimelineEntry } from '../data/site';
import '../styles/experience-timeline.css';

const entries = site.timeline as readonly TimelineEntry[];

type Spacing = 'even' | 'time';

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function hasNote(entry: TimelineEntry): entry is TimelineEntry & { note: string } {
  return 'note' in entry && typeof entry.note === 'string' && entry.note.length > 0;
}

/** Months since year 0, so gaps can follow the calendar. */
function startMonthIndex(entry: TimelineEntry): number {
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(entry.startLabel);
  if (!match) return entry.startYear * 12;
  const month = MONTH_INDEX[match[1].slice(0, 3).toLowerCase()];
  const year = Number(match[2]);
  if (month === undefined || Number.isNaN(year)) return entry.startYear * 12;
  return year * 12 + month;
}

function gapWeights(mode: Spacing): number[] {
  const gaps = entries.length - 1;
  if (gaps <= 0) return [];
  switch (mode) {
    case 'even':
      return Array.from({ length: gaps }, () => 1);
    case 'time': {
      const stamps = entries.map(startMonthIndex);
      return stamps.slice(0, -1).map((stamp, index) => {
        const delta = stamp - stamps[index + 1];
        return delta > 0 ? delta : 1;
      });
    }
    default: {
      const unreachable: never = mode;
      return unreachable;
    }
  }
}

function SpacingIcon({ mode }: { mode: Spacing }) {
  const marks = mode === 'even' ? [2.6, 8, 13.4] : [2.6, 5, 13.4];
  return (
    <svg className="xtl__spacing-icon" viewBox="0 0 10 16" aria-hidden="true">
      <line x1="5" y1="1.2" x2="5" y2="14.8" />
      {marks.map((y) => (
        <circle key={y} cx="5" cy={y} r="1.7" />
      ))}
    </svg>
  );
}

function gapPixels(mode: Spacing): number[] {
  const weights = gapWeights(mode);
  const base = 22;
  if (!weights.length) return [];
  switch (mode) {
    case 'even':
      return weights.map(() => base);
    case 'time': {
      const average = weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
      return weights.map((weight) => Math.max(8, Math.round(base * (weight / average))));
    }
    default: {
      const unreachable: never = mode;
      return unreachable;
    }
  }
}

export default function ExperienceTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [spacing, setSpacing] = useState<Spacing>('even');

  useLayoutEffect(() => {
    const items = itemRefs.current.filter((el): el is HTMLLIElement => Boolean(el));
    const gaps = gapPixels(spacing);
    items.forEach((el, index) => {
      el.style.marginBottom = index < gaps.length ? `${gaps[index]}px` : '0px';
    });
  }, [spacing, openIndex]);

  const openRole = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="xtl">
      <div className="xtl__toolbar">
        <div className="xtl__spacing" role="group" aria-label="Timeline spacing">
          <button
            type="button"
            className="xtl__icon-button"
            aria-pressed={spacing === 'even'}
            aria-label="Consistent spacing"
            title="Consistent spacing"
            onClick={() => setSpacing('even')}
          >
            <SpacingIcon mode="even" />
          </button>
          <button
            type="button"
            className="xtl__icon-button"
            aria-pressed={spacing === 'time'}
            aria-label="Time spacing"
            title="Time spacing"
            onClick={() => setSpacing('time')}
          >
            <SpacingIcon mode="time" />
          </button>
        </div>
      </div>
      <div className="xtl__viewport">
        <ol className="xtl__list" ref={listRef} aria-label="Experience timeline">
          <li className="xtl__now">
            <span className="xtl__marker" aria-hidden="true" />
            <span className="xtl__now-label">Now</span>
          </li>
          {entries.map((item, index) => {
            const isOpen = openIndex === index;
            const isCurrent = index === 0;
            return (
              <li
                key={`${item.org}-${item.startYear}-${item.role}`}
                className={`xtl__item ${isOpen ? 'is-full is-open' : 'is-compact'}${isCurrent ? ' is-current' : ''}`}
                data-index={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                <button
                  type="button"
                  className="xtl__hit"
                  aria-expanded={isOpen}
                  onClick={() => openRole(index)}
                >
                  <div className="xtl__marker" aria-hidden="true" />
                  <div className="xtl__body">
                    <div className="xtl__full" aria-hidden={!isOpen}>
                      <p className="xtl__start">{item.startLabel}</p>
                      <p className="xtl__role">{item.role}</p>
                      <p className="xtl__org">{item.org}</p>
                      {hasNote(item) ? <p className="xtl__note">{item.note}</p> : null}
                    </div>
                    <div className="xtl__compact" aria-hidden={isOpen}>
                      <p className="xtl__compact-line">
                        <span className="xtl__compact-role">{item.role}</span>
                        <span className="xtl__compact-meta">{item.startYear}</span>
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
