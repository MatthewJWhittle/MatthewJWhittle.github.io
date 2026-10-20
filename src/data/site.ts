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
  about: [
    "I started in ecological survey and assessment, moved into applied geospatial machine learning and software, and now lead SLR's Data Warehouse & Analytics function on an interim basis — still hands-on. Based in West Yorkshire, UK.",
    'Previously geospatial data science at SLR and data science / ecology roles at Jacobs.',
  ],
} as const;

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' },
] as const;
