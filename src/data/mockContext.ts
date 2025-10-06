export interface SimilarBill {
  id: string;
  billNumber: string;
  year: number;
  title: string;
  rationale: string;
  similarity: number;
}

export const mockSimilarBills: SimilarBill[] = [
  {
    id: 'sb1',
    billNumber: 'HB234',
    year: 2023,
    title: 'West Oʻahu Educational Land Development',
    rationale: 'Similar land lease mechanism and West Oʻahu focus',
    similarity: 0.92,
  },
  {
    id: 'sb2',
    billNumber: 'SB156',
    year: 2024,
    title: 'Higher Education Technology Modernization',
    rationale: 'Overlapping technology infrastructure priorities',
    similarity: 0.88,
  },
  {
    id: 'sb3',
    billNumber: 'HB412',
    year: 2023,
    title: 'Graduate Student Support Enhancement',
    rationale: 'Same stipend adjustment approach and funding source',
    similarity: 0.95,
  },
  {
    id: 'sb4',
    billNumber: 'SB289',
    year: 2022,
    title: 'Community College Capacity Expansion',
    rationale: 'Similar funding mechanism for UH system expansion',
    similarity: 0.85,
  },
  {
    id: 'sb5',
    billNumber: 'HB567',
    year: 2024,
    title: 'Hawaiian Language Education Programs',
    rationale: 'Shared cultural preservation and language education goals',
    similarity: 0.91,
  },
];
