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
  /**
   * Full role chronology from Notion Master CV (career chronology).
   * startLabel = when the role began (no end dates in the UI).
   */
  timeline: [
    {
      org: 'SLR Consulting',
      role: 'Interim Head of Data Warehouse & Analytics',
      startLabel: 'Jan 2026',
      startYear: 2026,
      note: 'Interim functional role',
    },
    {
      org: 'SLR Consulting',
      role: 'Data Science Lead, Europe — Geospatial',
      startLabel: 'Sep 2023',
      startYear: 2023,
    },
    {
      org: 'Jacobs',
      role: 'Senior Data Scientist',
      startLabel: 'Jul 2022',
      startYear: 2022,
    },
    {
      org: 'Jacobs',
      role: 'Senior Ecologist / Ecology Data Science Lead',
      startLabel: 'Sep 2021',
      startYear: 2021,
    },
    {
      org: 'Jacobs',
      role: 'Ecologist',
      startLabel: 'Jan 2021',
      startYear: 2021,
    },
    {
      org: 'Jacobs',
      role: 'Graduate Ecologist',
      startLabel: 'Aug 2017',
      startYear: 2017,
    },
    {
      org: 'Jacobs',
      role: 'Seasonal Ecologist',
      startLabel: 'Apr 2017',
      startYear: 2017,
    },
    {
      org: 'Total Ecology',
      role: 'Assistant Ecologist',
      startLabel: 'May 2016',
      startYear: 2016,
    },
  ],
} as const;

export type TimelineEntry = (typeof site.timeline)[number];

/** Nav order matches page section order. */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
  { id: 'work', label: 'Work' },
  { id: 'notes', label: 'Notes' },
] as const;
