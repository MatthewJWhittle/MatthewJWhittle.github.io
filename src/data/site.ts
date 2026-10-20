/** Editable site copy — grounded in Notion Master CV; do not invent claims. */
export const site = {
  name: 'Matthew Whittle',
  title: 'Matthew Whittle',
  description:
    'Geospatial ML and data tools for environmental work. Ecology background; applied data science and engineering.',
  email: 'matthewjwhittle@gmail.com',
  github: 'https://github.com/MatthewJWhittle',
  linkedin: 'https://www.linkedin.com/in/matthewjwhittle/',
  location: 'West Yorkshire, UK',
  /** High-confidence positioning: what he builds / for whom. */
  headline: 'Geospatial ML and data tools for environmental work.',
  about:
    "I started in ecological survey and assessment, moved into applied geospatial machine learning and software, and now lead SLR's Data Warehouse & Analytics function on an interim basis — still hands-on. Based in West Yorkshire, UK.",
  /** Selected experience only — not a full CV. From Notion Master CV. */
  timeline: [
    {
      org: 'SLR Consulting',
      role: 'Interim Head of Data Warehouse & Analytics',
      period: 'Jan 2026–present',
    },
    {
      org: 'SLR Consulting',
      role: 'Data Science Lead, Europe — Geospatial',
      period: 'Sep 2023–Jan 2026',
    },
    {
      org: 'Jacobs',
      role: 'Senior Data Scientist; earlier ecology and ecology data science roles',
      period: '2017–2023',
    },
  ],
} as const;

/** Nav order matches page section order. */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
  { id: 'work', label: 'Work' },
  { id: 'notes', label: 'Notes' },
] as const;
