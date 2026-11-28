/** Editable site copy — grounded in Notion Master CV; do not invent claims. */
export const site = {
  name: 'Matthew Whittle',
  title: 'Matthew Whittle',
  description:
    'Data scientist and analytics lead with a background in ecology. Projects in software, geospatial data and machine learning.',
  email: 'matthewjwhittle@gmail.com',
  github: 'https://github.com/MatthewJWhittle',
  linkedin: 'https://www.linkedin.com/in/matthewjwhittle/',
  location: 'West Yorkshire, UK',
  about:
    "Hi, I'm Matt. I'm a data scientist and analytics lead with a background in ecology. These days I lead a team at SLR Consulting, working across data engineering, reporting and data science. This is where I share projects I've worked on, things I'm building and ideas I'm exploring.",
  /**
   * Full role chronology from Notion Master CV (career chronology).
   * startLabel = when the role began (no end dates in the UI).
   * summary = always visible; detail = expanded disclosure.
   */
  timeline: [
    {
      org: 'SLR Consulting',
      role: 'Interim Head of Data Warehouse & Analytics',
      startLabel: 'Jan 2026',
      startYear: 2026,
      summary:
        "Helping people across SLR make better use of data while leading our analytics team.",
      detail:
        "Much of the challenge is making reporting more reliable while giving colleagues better access to data without losing sight of its quality or ownership. I work with Finance, Operations and People on priorities and technical direction, and stay involved in designing the data platform.",
    },
    {
      org: 'SLR Consulting',
      role: 'Data Science Lead, Europe — Geospatial',
      startLabel: 'Sep 2023',
      startYear: 2023,
      summary:
        "Led geospatial data science projects in Europe, from habitat modelling to machine learning with camera-trap images.",
      detail:
        "Alongside the modelling, I worked with the GIS development team to introduce version control, testing and more reliable ways of releasing software.",
    },
    {
      org: 'Jacobs',
      role: 'Senior Data Scientist',
      startLabel: 'Jul 2022',
      startYear: 2022,
      summary:
        "Moved from ecological consultancy into a dedicated data science role.",
      detail:
        "I built models and software for ecology and infrastructure projects, and helped bring a coding community that had started within ecology to colleagues across Jacobs.",
    },
    {
      org: 'Jacobs',
      role: 'Senior Ecologist / Ecology Data Science Lead',
      startLabel: 'Sep 2021',
      startYear: 2021,
      summary:
        "Ecological consultancy alongside bat habitat modelling, data pipelines and Biodiversity Net Gain tools.",
      detail:
        "I designed surveys and data pipelines for bat habitat modelling on a large water pipeline, led work on Biodiversity Net Gain tools and started a coding community to help colleagues make better use of code.",
    },
    {
      org: 'Jacobs',
      role: 'Ecologist',
      startLabel: 'Jan 2021',
      startYear: 2021,
      summary:
        "Combined habitat survey coordination with a growing interest in building tools to manage the data.",
      detail:
        "On Anglian Water's Strategic Pipeline Alliance, I was deputy habitats lead, coordinating specialists across a programme of about 500 km. I also wrote R and Python tools for survey records and Biodiversity Net Gain calculations.",
    },
    {
      org: 'Jacobs',
      role: 'Graduate Ecologist',
      startLabel: 'Aug 2017',
      startYear: 2017,
      summary:
        "Ecological surveys and assessments for roads, rail and utilities, with growing involvement in data analysis.",
      detail:
        "I worked on field surveys and environmental assessments. On HS2, I helped with ecology coordination and bat data analysis, and began writing tools to check and report survey data.",
    },
    {
      org: 'Jacobs',
      role: 'Seasonal Ecologist',
      startLabel: 'Apr 2017',
      startYear: 2017,
      summary: "A season of protected-species surveys at Jacobs.",
      detail: "This seasonal role followed my first ecology job and led into the graduate position at Jacobs later that year.",
    },
    {
      org: 'Total Ecology',
      role: 'Assistant Ecologist',
      startLabel: 'May 2016',
      startYear: 2016,
      summary: "My first job in ecology, at Total Ecology.",
      detail: "I worked on field surveys and protected-species assessments.",
    },
  ],
} as const;

export type TimelineEntry = (typeof site.timeline)[number];

/** Homepage on-page sections (hash targets). CV is a separate /cv/ route. */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
