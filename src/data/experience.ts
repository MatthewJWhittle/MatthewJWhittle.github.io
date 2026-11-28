/** Roles are grouped by employer, most recent first. */
export const experience: EmployerExperience[] = [
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
        overview: 'I lead SLR’s global data and analytics function, covering data engineering, business intelligence and data science. I took on the role during a period of investment in the company’s data infrastructure, with responsibility for bringing together technical teams, developing the platform and establishing how analytics is delivered across the business.',
        highlights: [
          { label: 'Data architecture and delivery', text: 'Led the technical direction of our enterprise data platform, consolidating engineering workstreams around Microsoft Fabric and reusable data and semantic models. Oversaw the migration of core financial reporting into production.' },
          { label: 'Technical team development', text: 'Brought together internal technical teams and specialist delivery partners, shaping engineering practices, recruitment priorities and investment decisions. A particular focus has been developing the internal capability to build, operate and maintain our own data products.' },
          { label: 'Analytics strategy', text: 'Developed the enterprise analytics roadmap and established a steering committee with business leaders. Led initiatives to make data more accessible through shared definitions, governed self-service and early applications of AI-assisted analytics.' },
          { label: 'Engineering and applied data science', text: 'Remained actively involved in development, building production data pipelines and dbt models, contributing to engineering and deployment tooling, and developing and evaluating predictive models for financial forecasting.' },
        ],
      },
      {
        title: 'Geospatial Data Science Lead',
        dates: 'September 2023–January 2026',
        overview: 'I joined SLR to establish a geospatial data science capability, developing new applications of machine learning and remote sensing for environmental consultancy. I combined hands-on development with recruiting and mentoring colleagues and shaping the technical direction of our work.',
        highlights: [
          {
            label: 'Habitat mapping',
            text: 'Designed and built the initial deep learning pipeline for mapping UKHab habitats from aerial imagery and elevation data, then led the technical development as we took it from proof of concept into use on live projects. The maps give ecologists a starting point for assessment and help bring biodiversity evidence into the early stages of development and infrastructure planning.',
            link: { label: 'Habitat mapping case study', href: 'https://bluesky-world.com/2026/01/29/slr-consulting-harnesses-bluesky-internationals-geospatial-data-to-advance-machine-learning-for-sustainability-and-renewable-energy-projects/' },
          },
          {
            label: 'Deforestation risk',
            text: 'Led the technical requirements, architecture and API development for the Book Chain Project’s deforestation risk assessment system. I built Python services for validating sourcing locations and integrating geospatial risk checks into a wider supply chain due diligence workflow.',
            link: { label: 'Book Chain case study', href: 'https://pro-news.globalforestwatch.org/news-events/gfw-pro-user-spotlight-slr-consulting' },
          },
          {
            label: 'Camera-trap analysis',
            text: 'Developed a computer vision tool with Dixy Msapato to screen wildlife camera-trap footage using SpeciesNet. On one primate survey it reduced nearly 9,000 videos to around 1,600 for expert review, leaving species identification to specialists.',
            link: { label: 'Camera trap case study', href: 'https://cieem.net/international-focus-using-machine-learning-to-analyse-camera-trap-footage/' },
          },
          { label: 'Engineering practices', text: 'Introduced shared version control, code review, automated testing and CI/CD practices alongside the GIS development team, and helped establish the Azure environment and skills needed to train models and deploy software.' },
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
            label: 'Graph-based routing',
            text: 'Developed routing algorithms for Velocity, a tool for active travel planning, with transport planners and software engineers. My work focused on efficient shortest-path calculations over large OpenStreetMap-derived graphs, optimising execution time and memory use.',
            link: { label: 'Velocity', href: 'https://www.jacobs.com/solutions/velocity' },
          },
          {
            label: 'Scientific software',
            text: 'Contributed Python features to the open-source Flood Modeller API and refactored parts of its test suite to support automated testing and continuous integration.',
            link: { label: 'Flood Modeller Python API', href: 'https://github.com/People-Places-Solutions/floodmodeller-api' },
          },
          { label: 'Technical community', text: 'Continued to lead and expand the data science and programming community I founded at Jacobs in 2021, organising technical talks, coding challenges and a mentoring programme for colleagues across disciplines.' },
        ],
      },
      {
        title: 'Senior Ecologist / Ecology Data Science Lead',
        dates: 'September 2021–July 2022',
        highlights: [
          {
            label: 'Bat habitat suitability',
            text: 'Designed elements of the survey methodology and built the geospatial data pipelines for bat habitat suitability modelling on Anglian Water’s Strategic Pipeline Alliance. Working with other ecologists, we used the models to help target survey effort and published the approach through CIEEM.',
            link: { label: 'Habitat Suitability Modelling for Bats', href: 'https://cieem.net/wp-content/uploads/2025/03/InPractice118_Dec2022.pdf#page=46' },
          },
          { label: 'Reusable modelling', text: 'Developed methods for making habitat suitability modelling easier to reproduce and apply to other projects, work that I’ve continued outside consultancy.', link: { label: 'Yorkshire bat habitat modelling', href: '/work/bat-habitat-yorkshire/' } },
          { label: 'Biodiversity Net Gain', text: 'Secured internal funding and led a multidisciplinary team to develop more consistent, repeatable methods and tools for Biodiversity Net Gain assessments.' },
        ],
      },
      {
        title: 'Ecologist',
        dates: 'January–September 2021',
        highlights: [
          { label: 'Survey delivery', text: 'As deputy habitats lead on Anglian Water’s Strategic Pipeline Alliance, coordinated the work of up to ten habitat specialists, planning surveys and managing delivery across multiple pipeline projects.' },
          { label: 'Survey automation', text: 'Built a survey management system in R to automate parts of survey scheduling, progress tracking and Biodiversity Net Gain calculations across alternative pipeline routes.' },
          { label: 'Spatial data pipelines', text: 'Automated the extraction and processing of spatial habitat records from ArcGIS Online for a road scheme, making the biodiversity assessment repeatable as survey data changed.' },
        ],
      },
      {
        title: 'Graduate Ecologist',
        dates: 'August 2017–January 2021',
        highlights: [
          { label: 'Bat acoustics', text: 'Led otter surveys and analysed large bat acoustic monitoring datasets for the A82 upgrade at Loch Lomond. I developed code to automate data processing and explored how to interpret the acoustic evidence more consistently.' },
          { label: 'HS2 ecology and data analysis', text: 'Worked as a deputy ecological impact assessment lead and lead bat-data analyst on HS2 Phase 2b, developing automated survey data quality checks and analysis that helped inform design decisions to maintain bat habitat connectivity.' },
          { label: 'Field and construction ecology', text: 'Delivered protected-species surveys and ecological assessments, alongside construction ecology work as an Ecological Clerk of Works.' },
        ],
      },
      {
        title: 'Seasonal Ecologist',
        dates: 'April–August 2017',
        highlights: [
          { text: 'Carried out protected-species field surveys to support ecological assessments.' },
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
          { text: 'My first ecology consultancy role, carrying out field surveys and supporting protected-species assessments.' },
        ],
      },
    ],
  },
];

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
      label?: string;
      text: string;
      link?: { label: string; href: string };
    }[];
  }[];
};
