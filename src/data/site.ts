/** Editable site copy — grounded in Notion Master CV; do not invent claims. */
export const site = {
  name: 'Matthew Whittle',
  title: 'Matthew Whittle',
  description:
    'Data scientist and analytics lead with a background in ecology. Projects in software, geospatial data and machine learning.',
  /** Short LinkedIn-style line under the CV name. */
  headline: 'Data scientist and analytics lead with a background in ecology',
  email: 'matthewjwhittle@gmail.com',
  github: 'https://github.com/MatthewJWhittle',
  linkedin: 'https://www.linkedin.com/in/matthewjwhittle/',
  location: 'West Yorkshire, UK',
  about:
    "Hi, I'm Matt. I'm a data scientist and analytics lead with a background in ecology. These days I lead a team at SLR Consulting, working across data engineering, reporting and data science. This is where I share projects I've worked on, things I'm building and ideas I'm exploring.",
} as const;

/** Homepage on-page sections (hash targets). CV is a separate /cv/ route. */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
