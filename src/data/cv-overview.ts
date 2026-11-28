/**
 * Short CV overview tags — grounded in the published experience and projects.
 * Keep the list small; do not invent tools or claims for completeness.
 */
export const cvOverview = [
  { id: 'leadership', label: 'Technical leadership' },
  { id: 'data-science', label: 'Applied machine learning' },
  { id: 'geospatial', label: 'Geospatial & remote sensing' },
  { id: 'ecology', label: 'Ecology' },
  { id: 'data-engineering', label: 'Data engineering' },
  { id: 'python', label: 'Python & software engineering' },
] as const;

export type CvOverviewId = (typeof cvOverview)[number]['id'];
