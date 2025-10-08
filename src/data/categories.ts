export const categories = [
  "Higher Education",
  "Facilities",
  "Workforce",
  "Budget",
  "Research"
] as const;

export type Category = typeof categories[number];
