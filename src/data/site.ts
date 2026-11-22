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
  headline: 'Nature person and data lover.',
  about:
    "I'm a data scientist based in West Yorkshire. I have a background in ecological survey, assessment and geospatial machine learning. I now lead SLR's Data Warehouse & Analytics function on an interim basis, and I am still hands-on with the data engineering, report development and architecture. This site gives an overview of my experience and a few projects I've worked on.",
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
      note: 'I lead SLR\'s internal data warehouse and analytics function on an interim basis. I am responsible for the engineering, reporting and governance across finance, operations and growth, and I am still hands-on with the data engineering, report development and architecture.',
    },
    {
      org: 'SLR Consulting',
      role: 'Data Science Lead, Europe — Geospatial',
      startLabel: 'Sep 2023',
      startYear: 2023,
      note: 'I led data science for SLR\'s geospatial work in Europe. I built machine learning for habitat mapping and camera-trap review, and I coached the GIS developers beside me into version control, testing and deployment.',
    },
    {
      org: 'Jacobs',
      role: 'Senior Data Scientist',
      startLabel: 'Jul 2022',
      startYear: 2022,
      note: 'I worked as a data scientist on ecology and infrastructure projects, building the models and the software around them. I also grew the coding community I had started the year before, and took it out to the wider Jacobs organisation.',
    },
    {
      org: 'Jacobs',
      role: 'Senior Ecologist / Ecology Data Science Lead',
      startLabel: 'Sep 2021',
      startYear: 2021,
      note: 'I was still a project ecologist, and the data work was becoming mine. I designed the surveys and data pipelines for bat habitat modelling on a large water pipeline, led a Biodiversity Net Gain tools project, and started the coding community.',
    },
    {
      org: 'Jacobs',
      role: 'Ecologist',
      startLabel: 'Jan 2021',
      startYear: 2021,
      note: 'I was deputy habitats lead on Anglian Water\'s Strategic Pipeline Alliance, organising habitat specialists across a programme of about 500 km. I built R and Python tools for the survey records and the Biodiversity Net Gain calculations.',
    },
    {
      org: 'Jacobs',
      role: 'Graduate Ecologist',
      startLabel: 'Aug 2017',
      startYear: 2017,
      note: 'I surveyed and assessed roads, rail and utilities, and took on more of the analysis as I went. On HS2 I deputised for ecology and analysed the bat data, and I started writing tools to check and report it.',
    },
    {
      org: 'Jacobs',
      role: 'Seasonal Ecologist',
      startLabel: 'Apr 2017',
      startYear: 2017,
      note: 'I spent the summer on protected-species surveys. That work led to the graduate role.',
    },
    {
      org: 'Total Ecology',
      role: 'Assistant Ecologist',
      startLabel: 'May 2016',
      startYear: 2016,
      note: 'My first ecology job. I did field surveys and protected-species work.',
    },
  ],
} as const;

export type TimelineEntry = (typeof site.timeline)[number];

/** Nav order matches page section order. */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
