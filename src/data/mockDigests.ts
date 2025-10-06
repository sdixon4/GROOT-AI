export interface Digest {
  id: string;
  title: string;
  audience: 'Leadership' | 'Campus' | 'Board of Regents';
  period: string;
  status: 'Draft' | 'Final' | 'Distributed';
  createdAt: string;
  createdBy: string;
  billCount: number;
}

export const mockDigests: Digest[] = [
  {
    id: 'd1',
    title: 'Weekly Leadership Brief - Week 3',
    audience: 'Leadership',
    period: 'Jan 15-19, 2025',
    status: 'Distributed',
    createdAt: '2025-01-19T17:00:00Z',
    createdBy: 'J. Yamada',
    billCount: 12,
  },
  {
    id: 'd2',
    title: 'Campus Update - Session Start',
    audience: 'Campus',
    period: 'Jan 8-12, 2025',
    status: 'Distributed',
    createdAt: '2025-01-12T16:00:00Z',
    createdBy: 'M. Chen',
    billCount: 8,
  },
  {
    id: 'd3',
    title: 'BOR Monthly Summary - January',
    audience: 'Board of Regents',
    period: 'January 2025',
    status: 'Final',
    createdAt: '2025-01-25T10:00:00Z',
    createdBy: 'K. Tanaka',
    billCount: 25,
  },
  {
    id: 'd4',
    title: 'Critical Bills Alert - Budget Impact',
    audience: 'Leadership',
    period: 'Jan 20-24, 2025',
    status: 'Draft',
    createdAt: '2025-01-24T14:30:00Z',
    createdBy: 'J. Yamada',
    billCount: 6,
  },
  {
    id: 'd5',
    title: 'Weekly Leadership Brief - Week 4',
    audience: 'Leadership',
    period: 'Jan 22-26, 2025',
    status: 'Draft',
    createdAt: '2025-01-26T09:00:00Z',
    createdBy: 'M. Chen',
    billCount: 10,
  },
];
