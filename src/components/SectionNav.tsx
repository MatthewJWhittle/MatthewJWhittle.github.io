import { useEffect, useState } from 'react';
import { sections } from '../data/site';
import '../styles/section-nav.css';

const SECTION_IDS = sections.map((s) => s.id);

export default function SectionNav() {
  const [active, setActive] = useState<string>(SECTION_IDS[0] ?? 'about');

  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="section-nav" aria-label="On this page">
      <p className="section-nav__name">
        <a href="#about">Matthew Whittle</a>
      </p>
      <ul className="section-nav__list">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={active === section.id ? 'is-active' : undefined}
              aria-current={active === section.id ? 'location' : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
