import { useState } from 'react';

type SpeciesKey = 'daubenton' | 'pip' | 'noctule';

const SPECIES: Record<
  SpeciesKey,
  { label: string; activity: string; note: string; src: string; alt: string }
> = {
  daubenton: {
    label: "Daubenton's bat",
    activity: 'In flight',
    note: 'Higher suitability along many waterways',
    src: '/images/hsm/panel-daubenton-if.png',
    alt: "Predicted relative suitability for Daubenton's bat in flight across Yorkshire.",
  },
  pip: {
    label: 'Common pipistrelle',
    activity: 'Roost',
    note: 'A more scattered pattern of suitable areas',
    src: '/images/hsm/panel-pip-roost.png',
    alt: 'Predicted relative roost suitability for common pipistrelle across Yorkshire.',
  },
  noctule: {
    label: 'Noctule',
    activity: 'Roost',
    note: 'Broader areas of predicted suitability',
    src: '/images/hsm/panel-noctule-roost.png',
    alt: 'Predicted relative roost suitability for noctule across Yorkshire.',
  },
};

const ORDER: SpeciesKey[] = ['daubenton', 'pip', 'noctule'];

export default function HsmAtlasSwitcher() {
  const [active, setActive] = useState<SpeciesKey>('daubenton');
  const current = SPECIES[active];

  return (
    <div className="hsm-atlas">
      <div className="hsm-atlas__controls" role="group" aria-label="Choose a species and activity">
        {ORDER.map((key) => {
          const item = SPECIES[key];
          const selected = key === active;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              className={selected ? 'hsm-atlas__tab is-active' : 'hsm-atlas__tab'}
              onClick={() => setActive(key)}
            >
              <span className="hsm-atlas__tab-name">{item.label}</span>
              <span className="hsm-atlas__tab-meta">{item.activity}</span>
            </button>
          );
        })}
      </div>

      <div className="hsm-atlas__stage">
        <p className="hsm-atlas__stage-label">
          {current.label}
          <span> · {current.activity}</span>
        </p>
        <p className="hsm-atlas__stage-note">{current.note}</p>
        <img
          src={current.src}
          alt={current.alt}
          width={960}
          height={840}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Non-JS / print fallback: all three remain available as links */}
      <noscript>
        <ul className="hsm-atlas__fallback">
          {ORDER.map((key) => (
            <li key={key}>
              <a href={SPECIES[key].src}>
                {SPECIES[key].label} ({SPECIES[key].activity})
              </a>
            </li>
          ))}
        </ul>
      </noscript>
    </div>
  );
}
