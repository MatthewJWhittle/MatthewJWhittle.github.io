/** Roles are grouped by employer, most recent first. */
export const experience = [
  {
    employer: 'SLR Consulting',
    logo: {
      src: '/images/employers/slr.png',
      alt: 'SLR Consulting logo',
    },
    roles: [
      {
        title: 'Interim Head of Data Warehouse & Analytics',
        dates: 'January 2026–present',
        overview: 'I lead the internal analytics function, covering data engineering, reporting and data science.',
        highlights: [
          { text: 'Brought the team’s data engineering and reporting work under a shared roadmap with colleagues in Finance, Operations and People.' },
          { text: 'Coordinated internal engineers and delivery partners as we brought the warehouse and reporting work onto a shared Microsoft Fabric platform.' },
          { text: 'Led the launch of an Analytics Hub and prioritised Finance reporting migration, documentation and knowledge transfer.' },
        ],
      },
      {
        title: 'Geospatial Data Science Lead',
        dates: 'September 2023–January 2026',
        overview: 'I led geospatial data science projects, working with ecologists and GIS developers.',
        highlights: [
          {
            text: 'Built the early computer vision pipeline for mapping UK habitats from aerial imagery and led the technical work as ecologists began using the maps in assessments.',
            link: { label: 'Habitat mapping case study', href: 'https://bluesky-world.com/2026/01/29/slr-consulting-harnesses-bluesky-internationals-geospatial-data-to-advance-machine-learning-for-sustainability-and-renewable-energy-projects/' },
          },
          {
            text: 'Led requirements and helped build a deforestation-risk API for the Book Chain Project to screen paper sourcing locations.',
            link: { label: 'Book Chain case study', href: 'https://pro-news.globalforestwatch.org/news-events/gfw-pro-user-spotlight-slr-consulting' },
          },
          { text: 'Helped the GIS development team adopt version control, code reviews, automated testing and cloud deployment on Azure.' },
        ],
      },
    ],
  },
  {
    employer: 'Jacobs',
    logo: {
      src: '/images/employers/jacobs.png',
      alt: 'Jacobs logo',
    },
    roles: [
      {
        title: 'Senior Data Scientist',
        dates: 'July 2022–September 2023',
        highlights: [
          {
            text: 'Worked with transport planners to build and optimise a cycling-routing service for Velocity, turning OpenStreetMap data into a graph for comparing route options.',
            link: { label: 'Velocity', href: 'https://www.jacobs.com/solutions/velocity' },
          },
          {
            text: 'Contributed to the open-source Flood Modeller Python API, including work on automated testing.',
            link: { label: 'Flood Modeller Python API', href: 'https://github.com/People-Places-Solutions/floodmodeller-api' },
          },
          { text: 'Helped grow a data science and programming community through mentoring and practical coding sessions.' },
        ],
      },
      {
        title: 'Senior Ecologist / Ecology Data Science Lead',
        dates: 'September 2021–July 2022',
        highlights: [
          {
            text: 'Helped design surveys and built spatial data pipelines for bat habitat suitability modelling on Anglian Water’s Strategic Pipeline Alliance. We published the method and results with CIEEM.',
            link: { label: 'Habitat Suitability Modelling for Bats', href: 'https://cieem.net/wp-content/uploads/2025/03/InPractice118_Dec2022.pdf#page=46' },
          },
          { text: 'Worked on making the habitat modelling approach easier to reuse on other projects.' },
          { text: 'Led work with ecologists and GIS specialists to make Biodiversity Net Gain assessments more consistent and repeatable.' },
        ],
      },
      {
        title: 'Ecologist',
        dates: 'January–September 2021',
        highlights: [
          { text: 'Coordinated survey delivery for up to ten habitat specialists as deputy habitats lead on Anglian Water’s Strategic Pipeline Alliance.' },
          { text: 'Built a semi-automated R workflow to schedule surveys, track results and calculate Biodiversity Net Gain by pipeline route.' },
          { text: 'Built an R pipeline to extract and standardise habitat records from ArcGIS Online for a road scheme’s biodiversity assessment.' },
        ],
      },
      {
        title: 'Graduate Ecologist',
        dates: 'August 2017–January 2021',
        highlights: [
          { text: 'Led otter surveys and analysed bat acoustic monitoring data for the A82 upgrade at Loch Lomond, building tools to automate survey data processing.' },
          { text: 'Managed bat survey data and automated quality checks on HS2 Phase 2b. The team used the analysis to support design changes that maintained bat habitat connectivity.' },
          { text: 'Carried out protected-species surveys and site work, including supervising clearance and installation of newt exclusion fencing.' },
        ],
      },
      {
        title: 'Seasonal Ecologist',
        dates: 'April–August 2017',
        highlights: [
          { text: 'Carried out protected-species surveys and supported ecological assessments.' },
        ],
      },
    ],
  },
  {
    employer: 'Total Ecology',
    logo: {
      src: '/images/employers/total-ecology.png',
      alt: 'Total Ecology logo',
    },
    roles: [
      {
        title: 'Assistant Ecologist',
        dates: 'May–October 2016',
        highlights: [
          { text: 'Worked on field surveys and protected-species assessments.' },
        ],
      },
    ],
  },
] satisfies EmployerExperience[];

type EmployerExperience = {
  employer: string;
  logo?: {
    src: string;
    alt: string;
  };
  roles: {
    title: string;
    dates: string;
    overview?: string;
    highlights: {
      text: string;
      link?: { label: string; href: string };
    }[];
  }[];
};
