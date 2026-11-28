/**
 * Short CV overview tags — grounded in the published experience and projects.
 * Keep the list small; do not invent tools or claims for completeness.
 */
export const cvOverview = [
  { id: 'leadership', label: 'Analytics leadership' },
  { id: 'data-science', label: 'Data science & ML' },
  { id: 'geospatial', label: 'Geospatial' },
  { id: 'ecology', label: 'Ecology' },
  { id: 'data-engineering', label: 'Data engineering' },
  { id: 'python', label: 'Python' },
  { id: 'location', label: 'West Yorkshire' },
] as const;

export type CvOverviewId = (typeof cvOverview)[number]['id'];
