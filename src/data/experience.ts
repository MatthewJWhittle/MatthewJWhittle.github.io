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
        dates: '2026–present',
        overview: 'I lead a team of data engineers, BI developers and data scientists. Much of my work is about making our enterprise data reliable and useful, and helping people across the business answer more of their own questions.',
        highlights: [
          { text: 'Set a shared technical direction and roadmap for the analytics team, bringing together internal developers, delivery partners and colleagues in finance, operations and people.' },
          { text: 'Led the development of our data warehouse and reporting platform in Microsoft Fabric, with a focus on reusable data models, engineering standards and reliable delivery.' },
          { text: 'Led the launch of an Analytics Hub to make it easier for people to find and use trusted data and reports, alongside the migration of existing reporting to the new platform.' },
        ],
      },
      {
        title: 'Geospatial Data Science Lead',
        dates: 'September 2023–January 2026',
        overview: 'I helped develop SLR’s geospatial data science capability, working with environmental specialists and developers on problems that needed a mixture of scientific knowledge, machine learning and software engineering.',
        highlights: [
          {
            text: 'Developed the initial computer vision pipeline for mapping UK habitats from aerial imagery, then led the technical work with colleagues as we turned the approach into something ecologists could use. The aim was to make habitat information available early enough to influence decisions about infrastructure and development.',
            link: { label: 'Habitat mapping case study', href: 'https://bluesky-world.com/2026/01/29/slr-consulting-harnesses-bluesky-internationals-geospatial-data-to-advance-machine-learning-for-sustainability-and-renewable-energy-projects/' },
          },
          {
            text: 'Led the technical requirements and helped build an API for the Book Chain Project that screens the locations of paper suppliers for deforestation risk, bringing geospatial analysis into the wider due diligence workflow.',
            link: { label: 'Book Chain case study', href: 'https://pro-news.globalforestwatch.org/news-events/gfw-pro-user-spotlight-slr-consulting' },
          },
          {
            text: 'Worked with Dixy Msapato to develop a computer vision tool for screening camera trap footage using SpeciesNet. On a primate survey, it narrowed nearly 9,000 videos to around 1,600 for specialist review.',
            link: { label: 'Camera trap case study', href: 'https://cieem.net/international-focus-using-machine-learning-to-analyse-camera-trap-footage/' },
          },
          { text: 'Worked with the GIS development team to move towards shared codebases, pull requests, code review and automated testing. I also helped establish cloud development and deployment practices on Azure.' },
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
            text: 'Worked with transport planners on Velocity, a tool for modelling cycling journeys. I helped develop a routing service using a graph derived from OpenStreetMap, focusing on algorithm performance, memory use and testing.',
            link: { label: 'Velocity', href: 'https://www.jacobs.com/solutions/velocity' },
          },
          {
            text: 'Contributed to the open-source Python API for Flood Modeller, including automated tests for the library.',
            link: { label: 'Flood Modeller Python API', href: 'https://github.com/People-Places-Solutions/floodmodeller-api' },
          },
          { text: 'Helped develop an internal community of people using code in their work, through mentoring and practical programming sessions.' },
        ],
      },
      {
        title: 'Senior Ecologist / Ecology Data Science Lead',
        dates: 'September 2021–July 2022',
        highlights: [
          {
            text: 'Worked with ecologists on bat habitat suitability modelling for Anglian Water’s Strategic Pipeline Alliance. I helped design the surveys and built the spatial data pipelines for the modelling work; we later published the approach and findings through CIEEM.',
            link: { label: 'Habitat Suitability Modelling for Bats', href: 'https://cieem.net/wp-content/uploads/2025/03/InPractice118_Dec2022.pdf#page=46' },
          },
          { text: 'Worked on making the habitat modelling workflow reusable across projects, an interest I’ve continued independently.', link: { label: 'Yorkshire bat habitat modelling', href: '/work/bat-habitat-yorkshire/' } },
          { text: 'Led work with ecologists and GIS specialists to develop more consistent and repeatable methods for Biodiversity Net Gain assessments.' },
        ],
      },
      {
        title: 'Ecologist',
        dates: 'January–September 2021',
        highlights: [
          { text: 'As deputy habitats lead on Anglian Water’s Strategic Pipeline Alliance, I coordinated survey work across a team of up to ten habitat specialists.' },
          { text: 'Built a semi-automated survey management system in R, covering survey scheduling, progress tracking and Biodiversity Net Gain calculations for different pipeline routes.' },
          { text: 'Developed a separate R workflow for a road scheme, extracting and standardising habitat survey data from ArcGIS Online for biodiversity assessment.' },
        ],
      },
      {
        title: 'Graduate Ecologist',
        dates: 'August 2017–January 2021',
        highlights: [
          { text: 'Led otter surveys and analysed bat acoustic monitoring data for the A82 upgrade at Loch Lomond. I started building tools to handle the volume of survey data and make the analysis more repeatable.' },
          { text: 'Managed bat survey data on HS2 Phase 2b and developed automated quality checks. Our ecological analysis helped inform design changes to maintain connectivity between bat habitats.' },
          { text: 'Carried out protected-species surveys and worked as an Ecological Clerk of Works, supervising activities such as vegetation clearance and installation of newt exclusion fencing.' },
        ],
      },
      {
        title: 'Seasonal Ecologist',
        dates: 'April–August 2017',
        highlights: [
          { text: 'Supported ecological assessments through protected-species field surveys.' },
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
          { text: 'My first consultancy role, carrying out field surveys and supporting protected-species assessments.' },
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
